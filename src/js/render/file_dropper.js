import $ from "jquery";
import { MessageBox } from "./message_box";
import { loadArchive, updateView } from "./utils";
import { PasteListener } from "./paste_listener";

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


  /**
   * Creates or returns Singleton instance.
   * @static
   * @param {*} share
   * @param {*} container
   * @param {*} renderProgram
   * @returns {FileDropper}
   * @memberof FileDropper
   */
  static createInstance(share, container, renderProgram) {
    if (instance != null) {
      return instance;
    }
    instance = new FileDropper(share, container, renderProgram);
    return instance;
  }


  /**
   * Returns Singleton instance.
   * @static
   * @returns {FileDropper}
   * @memberof FileDropper
   */
  static getInstance() {
    return instance;
  }


  /**
   * Register all Events for drag&drop area.
   * @memberof FileDropper
   */
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


  /**
   * EventHandler for drop area.
   * @private
   * @param {Event} e
   * @memberof FileDropper
   */
  _handleFileDrop(e) {
    const files = e.originalEvent.dataTransfer.files;
    if (files && files.length > 0) {
      FileDropper.getInstance().computeFiles(files);
    }
  }

  /**
   * EventHandler for <input type="file">
   * @private
   * @param {Event} e
   * @memberof FileDropper
   */
  _handleInputChange(e) {
    const files = e.originalEvent.target.files;
    if (files && files.length > 0) {
      FileDropper.getInstance().computeFiles(files);
    }
  }



  /**
   * Unpack Archive and start rendering of code.xml
   * @param {File} inputFiles
   * @memberof FileDropper
   */
  computeFiles(inputFiles) {
    updateView('onStart');
    let containerCounter = 0;
    let finished = 0;
    const renderPromises = [];

    for (const containerfile of inputFiles) {
      const fileArray = containerfile.name.split('.');
      const ext = fileArray[fileArray.length - 1];

      if (ext === 'zip' || ext === 'catrobat') {
        const promise = loadArchive(containerfile);
        containerCounter++;
        renderPromises.push(promise);
        promise.then((result) => {
          if(result !== null) {
            try {
              this.renderProgram(this.share, this.container, result.codeXML, containerfile.name, containerCounter, result.fileMap);
              MessageBox.show(`Rendered ${++finished}/${containerCounter} Programs`, 4000);
            } catch(error) {
              MessageBox.show('<b>' + containerfile.name + ':</b> ' + error);
            }
          }
        });
      } else {
        MessageBox.show(`File "${containerfile.name}" is not of type .catrobat/.zip`);
      }
    }

    if (renderPromises.length > 0) {
      Promise.all(renderPromises).then(result => {
        for (const res of result) {
          if (res !== undefined && res) {
            $('#catblocks-file-dropper').hide();
            try {
              PasteListener.getInstance().disablePasteListener();
            } catch(error) {
              // ignore
            }
            break;
          }
        }

        updateView('onDone');
      });
    } else {
      updateView('onDone');
    }
    
  }
}