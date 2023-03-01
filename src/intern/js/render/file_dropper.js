import { MessageBox } from './message_box';
import { loadArchive, updateView } from './utils';
import { PasteListener } from './paste_listener';
import { renderProgramByLocalFile } from './render';

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
    const element = document.getElementById('catblocks-file-dropper');
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

    element.addEventListener('drop', this._handleFileDrop);

    document.getElementById('dropper-file-input').addEventListener('change', this._handleInputChange);
    element.style.display = 'flex';
  }

  /**
   * EventHandler for drop area.
   * @private
   * @param {Event} e
   * @memberof FileDropper
   */
  _handleFileDrop(e) {
    const files = e.dataTransfer.files;
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
    const files = e.currentTarget.files;
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
            document.getElementById('catblocks-file-dropper').style.display = 'none';
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
