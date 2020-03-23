import $ from "jquery";
import JSZip from "jszip";

/** 
 * Initialize Drag & Drop Field and handle Files.
 * 
 * @author michael.flucher@student.tugraz.at
 */

let instance = null;
export class FileDropper {
  constructor(share, container, renderProgram) {
    this.usedFiles = {};
    this.share = share;
    this.container = container;
    this.renderProgram = renderProgram;
  }

  static createInstance(share, container, renderProgram) {
    if (instance != null) {
      return instance;
    }
    instance = new FileDropper(share, container, renderProgram);
    return instance;
  }

  static getInstance() {
    return instance;
  }

  enableDragAndDrop() {
    const $ele = $('#catblocks-file-dropper');

    $ele.on('drag dragstart dragend dragover dragenter dragleave drop', e => {
      e.preventDefault();
      e.stopPropagation();
    }).on('dragover dragenter', () => {
      $ele.addClass('hover');
    }).on('dragleave dragend drop', () => {
      $ele.removeClass('hover');
    }).on('drop', this._handleFileDrop);

    $('#dropper-file-input').on('change', this._handleInputChange);

    $ele.css('display', 'flex');
  }

  _handleFileDrop(e) {
    const files = e.originalEvent.dataTransfer.files;
    if (files && files.length > 0) {
      FileDropper.getInstance().computeFiles(files);
    }
  }

  _handleInputChange(e) {
    const files = e.originalEvent.target.files;
    if (files && files.length > 0) {
      FileDropper.getInstance().computeFiles(files);
    }
  }

  _updateView(event) {
    switch (event) {
    case "onStart": {
      $('#catblocks-file-dropper > .dropper-inner').hide();
      $('#catblocks-file-dropper > #dropper-loader').show();
      break;
    }
    case "onDone": {
      $('#catblocks-file-dropper').hide();
      $('#catblocks-file-dropper > #dropper-loader').hide();
      break;
    }
    default: {
      console.warn(`Ignore file dropper event: ${event}`);
    }
    }
  }

  computeFiles(inputFiles) {
    this._updateView('onStart');
    let containerCounter = 0;

    for (const containerfile of inputFiles) {
      const fileArray = containerfile.name.split('.');
      const ext = fileArray[fileArray.length - 1];

      if (ext === 'zip' || ext === 'catrobat') {
        // open ZIP
        const zip = new JSZip();
        zip.loadAsync(containerfile, {
          createFolders: true
        }).then(element => {

          if (element.files['code.xml'] == null) {
            throw new Error('Code.xml not found');
          }

          const fileMap = {};
          let codeXML = "";

          const zipFileKeys = Object.keys(element.files);
          const filePromises = [];

          for (const key of zipFileKeys) {
            const file = element.files[key];

            if (!file.dir) {

              if (file.name === 'code.xml') {
                const promise = zip.file(file.name).async('string');
                filePromises.push(promise);

                promise.then(str => {
                  codeXML = str;
                });

              } else {
                const promise = zip.file(file.name).async('base64');
                filePromises.push(promise);

                promise.then(base64 => {
                  let fileEnding = file.name.split('.');
                  fileEnding = fileEnding[fileEnding.length - 1];

                  switch (fileEnding) {

                  case 'png':
                    fileMap[file.name] = 'data:image/png;charset=utf-8;base64,' + base64;
                    break;
                  case 'jpg':
                    fileMap[file.name] = 'data:image/jpg;charset=utf-8;base64,' + base64;
                    break;
                  case 'jpeg':
                    fileMap[file.name] = 'data:image/jpeg;charset=utf-8;base64,' + base64;
                    break;

                  case 'wav':
                    fileMap[file.name] = 'data:audio/wav;charset=utf-8;base64,' + base64;
                    break;
                  case 'mp3':
                    fileMap[file.name] = 'data:audio/mp3;charset=utf-8;base64,' + base64;
                    break;

                  case 'mp4':
                    fileMap[file.name] = 'data:video/mp4;charset=utf-8;base64,' + base64;
                    break;

                  default:
                    fileMap[file.name] = 'ignoreMePlease_fixMeLater';
                  }
                });
              }
            }
          }

          Promise.all(filePromises).then(response => {
            if (response.length !== Object.keys(fileMap).length + 1) {
              throw new Error('Some Async stuff went wrong?');
            }
            this._updateView('onDone');
            const fd = FileDropper.getInstance();
            fd.renderProgram(fd.share, fd.container, codeXML, containerfile.name, containerCounter++, fileMap);
          });
        });
      }
    }
  }
}