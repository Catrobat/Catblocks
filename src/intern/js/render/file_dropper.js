import { MessageBox } from './message_box';
import { loadArchive, updateView } from './utils';
import { PasteListener } from './paste_listener';
import { renderProgramByLocalFile } from './render';
import $ from 'jquery';

/**
 * Initialize Drag & Drop Field and handle Files.
 */

let instance = null;
export class FileDropper {
  constructor(container) {
    this.usedFiles = {};
    this.container = container;
  }

  /**
   * Creates or returns Singleton instance.
   * @static
   * @param {*} container
   * @param {*} renderProgram
   * @returns {FileDropper}
   * @memberof FileDropper
   */
  static createInstance(container, renderProgram) {
    if (instance != null) {
      return instance;
    }
    instance = new FileDropper(container, renderProgram);
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

    $ele
      .on('drag dragstart dragend dragover dragenter dragleave drop', e => {
        e.preventDefault();
        e.stopPropagation();
      })
      .on('dragover dragenter', () => {
        $ele.addClass('hover');
      })
      .on('dragleave dragend drop', () => {
        $ele.removeClass('hover');
      })
      .on('drop', this._handleFileDrop);

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
  async computeFiles(inputFiles) {
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
        const result = await promise;
        if (result !== null) {
          try {
            renderProgramByLocalFile(
              this.container,
              result.codeXML,
              containerfile.name,
              containerCounter,
              result.fileMap
            );
            MessageBox.show(`Rendered ${++finished}/${inputFiles.length} Programs`, 4000);
            $('#catblocks-file-dropper').hide();
          } catch (error) {
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
            PasteListener.getInstance().disablePasteListener();
          } catch (error) {
            // ignore
          }
          break;
        }
      }
    }
    updateView('onDone');
  }
}
