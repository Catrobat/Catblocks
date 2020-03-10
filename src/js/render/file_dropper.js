import $ from "jquery";
import JSZip from "jszip";

/** 
 * Initialize Drag & Drop Field and handle Files.
 * 
 * @author michael.flucher@student.tugraz.at
 */

export class FileDropper {
  constructor(share, container, renderProgram) {
    this.usedFiles = {};
    this.share = share;
    this.container = container;
    this.renderProgram = renderProgram;
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
      FileDropper.computeFiles(files);
    }
  }
  
  _handleInputChange(e) {
    const files = e.originalEvent.target.files;
    if (files && files.length > 0) {
      FileDropper.computeFiles(files);
    }
  }

  static computeFiles(files) {
    for (const file of files) {
      const fileArray = file.name.split('.');
      const ext = fileArray[fileArray.length - 1];

      if (ext === 'zip' || ext === 'catrobat') {
        JSZip.loadAsync(file).then(element => {
          element.forEach((relPath, zipEntry) => {
            console.log(zipEntry.name);
          });
        });
      }
    }
  }
}