import JSZip from 'jszip';
import { MessageBox } from './MessageBox';
import { Parser } from '../../../common/js/parser/parser';
import { CatBlocksShare } from '../../../library/ts/CatBlocksShare';
import { generateNewDOM } from '../../../library/js/integration/utils';

enum FileType {
  IMAGE,
  VIDEO,
  AUDIO
}

enum ViewUpdateEvent {
  START,
  DONE
}

class FileHandlerBase {
  /**
   * Show or Hide loading overlay.
   * @param event - onDone / onStart
   */
  protected updateView(event: ViewUpdateEvent) {
    const element = document.getElementById('loading-overlay');
    if (!element) {
      throw new Error('Element not found');
    }

    switch (event) {
      case ViewUpdateEvent.START:
        element.style.display = 'block';
        break;

      case ViewUpdateEvent.DONE:
        element.style.display = 'none';
        break;

      default:
        console.warn(`Ignore file dropper event: ${event}`);
    }
  }

  /**
   * Returns the Base64 Src String for HTML
   * @param fileName relative Path to file
   * @param fileExt contains either exact file ending or a string which should contain the file ending
   * @param base64 encoded file
   */
  protected generateBase64Src(fileName: string, fileExt: string, base64: string): string {
    const dataString = `charset=utf-8;base64,${base64}`;

    const fileMappings: Record<FileType, Record<string, string>> = {
      [FileType.IMAGE]: {
        png: 'png',
        jpg: 'jpg',
        jpeg: 'jpeg',
        gif: 'gif',
        svg: 'svg+xml',
        bmp: 'bmp'
      },
      [FileType.VIDEO]: {
        mp4: 'mp4'
      },
      [FileType.AUDIO]: {
        wav: 'wav',
        mp3: 'mp3'
      }
    };

    // loop through FileType enum
    for (const fileType in FileType) {
      if (Object.prototype.hasOwnProperty.call(FileType, fileType)) {
        const element = FileType[fileType] as unknown as FileType;
        const fileString = this.getBase64StringPart(fileExt, element, fileMappings[element]);
        if (fileString) {
          return `${fileString}${dataString}`;
        }
      }
    }

    // last try
    if (fileName.includes('/images/')) {
      console.warn('generateBase64Src: guessing Image type for ' + fileName);
      return `data:image;${dataString}`;
    }
    if (fileName.includes('/sounds/')) {
      console.warn('generateBase64Src: guessing Sound type for ' + fileName);
      return `data:audio;${dataString}`;
    }

    // ignore the rest
    console.warn('generateBase64Src: Ignoring File ' + fileName);
    return '';
  }

  /**
   * Iterate over possible file extension and get the data string with MIME-Type
   * @param fileExt extension of the file
   * @param typeString
   * @param typeObject
   * @returns
   */
  private getBase64StringPart(fileExt: string, typeString: FileType, typeObject: Record<string, string>) {
    for (const fileType in typeObject) {
      if (Object.prototype.hasOwnProperty.call(typeObject, fileType)) {
        const element = typeObject[fileType];
        if (fileExt.toLocaleLowerCase() === fileType || fileExt.toLowerCase().includes(fileType)) {
          return `data:${typeString}/${element};`;
        }
      }
    }
    return null;
  }

  /**
   * Load .catrobat / .zip file
   * @param containerfile
   * @returns
   */
  public async loadArchive(
    containerfile: ArrayBuffer | File
  ): Promise<{ fileMap: Record<string, string>; codeXML: string } | null> {
    // open ZIP
    const zip = new JSZip();
    try {
      const element = await zip.loadAsync(containerfile, {
        createFolders: true
      });

      if (element.files['code.xml'] == null) {
        throw new Error('Code.xml not found');
      }

      const fileMap: Record<string, string> = {};
      let codeXML = '';

      const zipFileKeys = Object.keys(element.files);
      const filePromises: Promise<unknown>[] = [];

      for (const key of zipFileKeys) {
        const file = element.files[key];

        if (!file.dir) {
          if (file.name.toLowerCase() === 'code.xml') {
            const promise = file.async('string');
            filePromises.push(promise);

            promise.then(str => {
              codeXML = str;
            });
          } else {
            const promise = file.async('base64');
            filePromises.push(promise);

            promise.then(base64 => {
              const fileEndingList = file.name.split('.');

              if (fileEndingList.length > 1) {
                const fileEnding = fileEndingList[fileEndingList.length - 1];
                fileMap[file.name] = this.generateBase64Src(file.name, fileEnding, base64);
              } else {
                const decodedBase64 = Buffer.from(base64, 'base64').toString('utf-8');
                const stringToSearchForFileExt = decodedBase64.substring(0, 32);

                fileMap[file.name] = this.generateBase64Src(file.name, stringToSearchForFileExt, base64);
              }
            });
          }
        }
      }

      const response = await Promise.all(filePromises);
      if (response.length !== Object.keys(fileMap).length + 1) {
        MessageBox.show(
          `<b>${
            (containerfile as File).name ?? 'ArrayBuffer'
          }:</b> Number of Files in Archive do not match number of read files.`
        );
        console.error('Number of Files in ZIP do not match number of read files');
      }

      return { fileMap, codeXML };
    } catch (error) {
      console.error(error);
      MessageBox.show('<b>Error:</b> The file could not be loaded. Maybe you passed an invalid .catrobat/.zip file.');
    }
    return null;
  }

  /**
   * Render a local program (only on JS, not uploaded anywhere)
   * @param container parent container for structure
   * @param codeXML XML content of code.xml in program
   * @param name name of the program
   * @param counter number added to ID to be unique
   * @param fileMap contains [path => base64_of_file]
   */
  protected renderProgramByLocalFile(
    container: HTMLElement,
    codeXML: string,
    name: string,
    counter: number,
    fileMap: Record<string, string>
  ) {
    // inject code
    const programJSON = Parser.convertProgramToJSONDebug(codeXML);

    // prepare container for program injection
    const programContainer = this.createProgramContainer(container, name, counter);

    const programID = `catblocks-program-${name}-${counter}`;
    CatBlocksShare.controller.renderProgramJSON(
      programID,
      programContainer,
      programJSON,
      {
        object: {
          fileMap: fileMap
        }
      },
      true
    );
  }

  /**
   * Create container for the program
   * @param container Parent container for structure
   * @param programName contains name of the file
   * @param programCounter the current number of program rendered
   * @returns container for injecting scenes
   */
  private createProgramContainer(container: HTMLElement, programName: string, programCounter: number): HTMLElement {
    const programContainer = generateNewDOM(
      container,
      'div',
      {
        class: 'catblocks-container text-dark catblocks-scene-header card-header collapsed'
      },
      `Program ${programCounter} / ${programName}`
    );
    console.log(programName);
    console.log(container);
    console.log(programContainer);
    return programContainer;
  }
}

export { FileHandlerBase, FileType, ViewUpdateEvent };
