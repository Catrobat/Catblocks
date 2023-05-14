import { FileHandlerBase, ViewUpdateEvent } from './FileHandlerBase';
import { MessageBox } from './MessageBox';
import { PasteListener } from './PasteListener';

/**
 * Initialize Drag & Drop Field and handle Files.
 * Used on renderer page.
 */
export class FileDropper extends FileHandlerBase {
  private static instance_: FileDropper;
  private container: HTMLElement | null = null;

  private constructor(container: HTMLElement) {
    super();
    this.container = container;
  }

  public static get instance(): FileDropper {
    if (!this.instance_) {
      throw new Error('FileDropper not initialized');
    }
    return this.instance_;
  }

  public static init(container: HTMLElement) {
    if (this.instance_) {
      throw new Error('Double initalization of FileDropper');
    }
    this.instance_ = new FileDropper(container);
    return this.instance_;
  }

  public enableDragAndDrop() {
    const element = document.getElementById('catblocks-file-dropper');
    const dropperElement = document.getElementById('dropper-file-input');
    if (!element || !dropperElement) {
      throw new Error('Element not found');
    }

    for (const event of ['drag', 'dragstart', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop']) {
      element.addEventListener(event, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    }
    for (const event of ['dragenter', 'dragover']) {
      element.addEventListener(event, () => {
        element.classList.add('hover');
      });
    }
    for (const event of ['dragleave', 'dragend', 'drop']) {
      element.addEventListener(event, () => {
        element.classList.remove('hover');
      });
    }
    element.addEventListener('drop', this.handleFileDrop);

    dropperElement.addEventListener('change', this.handleInputChange);
    element.style.display = 'flex';
  }

  private handleFileDrop(event: DragEvent) {
    const files = event.dataTransfer?.files;
    if (!files) {
      throw new Error('No files found');
    }
    FileDropper.instance.computeFiles(files);
  }

  private handleInputChange(event: Event) {
    const files = (event.currentTarget as HTMLInputElement)?.files;
    if (files && files.length > 0) {
      FileDropper.instance.computeFiles(files);
    }
  }

  private async computeFiles(inputFiles: FileList) {
    this.updateView(ViewUpdateEvent.START);
    try {
      let containerCounter = 0;
      let finished = 0;
      const renderPromises = [];

      for (const containerfile of inputFiles) {
        const fileArray = containerfile.name.split('.');
        const ext = fileArray[fileArray.length - 1];

        if (ext === 'zip' || ext === 'catrobat') {
          const promise = this.loadArchive(containerfile);
          containerCounter++;
          renderPromises.push(promise);
          const result = await promise;
          if (result !== null) {
            try {
              if (!this.container) {
                throw new Error('Container not found');
              }
              this.renderProgramByLocalFile(
                this.container,
                result.codeXML,
                containerfile.name,
                containerCounter,
                result.fileMap
              );
              MessageBox.show(`Rendered ${++finished}/${inputFiles.length} Programs`, 4000);
              const el = document.getElementById('catblocks-file-dropper');
              if (el) {
                el.style.display = 'none';
              }
            } catch (error) {
              console.error(error);
              MessageBox.show('<b>' + containerfile.name + ':</b> ' + error);
            }
          }
        } else {
          MessageBox.show(`File "${containerfile.name}" is not of type .catrobat/.zip`);
        }
      }

      if (renderPromises.length > 0) {
        const result = await Promise.all(renderPromises);
        for (const res of result) {
          if (res !== undefined && res) {
            try {
              PasteListener.instance.disablePasteListener();
            } catch (error) {
              // ignore
            }
            break;
          }
        }
      }
    } catch (error) {
      MessageBox.show((error as Error).message);
    } finally {
      this.updateView(ViewUpdateEvent.DONE);
    }
  }
}
