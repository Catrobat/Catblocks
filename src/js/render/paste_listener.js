import { FileLoader } from './file_loader';

/**
 * Initialize Drag & Drop Field and handle Files.
 *
 * @author b.prattes@student.tugraz.at
 */

let pasteListenerInstance = null;
export class PasteListener {
  constructor(share, container, renderProgram) {
    this.share = share;
    this.container = container;
    this.renderProgram = renderProgram;
    this.ctrlDown = false;
    this.enabled = false;
  }

  /**
   * Creates or returns Singleton instance.
   * @static
   * @param {*} share
   * @param {*} container
   * @param {*} renderProgram
   * @returns {PasteListener}
   * @memberof PasteListener
   */
  static createInstance(share, container, renderProgram) {
    if (pasteListenerInstance == null) {
      pasteListenerInstance = new PasteListener(share, container, renderProgram);
      pasteListenerInstance.initListener();
    }
    return pasteListenerInstance;
  }

  /**
   * returns the singleton instance of PasteListener
   * throws an error if not initialized
   * @static
   */
  static getInstance() {
    if (pasteListenerInstance == null) {
      throw new Error('Paste Listener not initialized!');
    }
    return pasteListenerInstance;
  }

  /**
   * Register paste event on body.
   */
  initListener() {
    document.getElementsByTagName('body')[0].addEventListener('paste', function (e) {
      const pl = PasteListener.getInstance();
      if (!pl.enabled) {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      const pastedData = (e.clipboardData || window.clipboardData).getData('Text');

      if (pastedData) {
        const fl = new FileLoader(pastedData, pl.share, pl.container, pl.renderProgram);
        fl.loadAndRenderProgram().then(result => {
          if (result) {
            $('#catblocks-file-dropper').hide();
            pl.disablePasteListener();
          }
        });
      }
    });
  }

  enablePasteListener() {
    this.enabled = true;
  }

  disablePasteListener() {
    this.enabled = false;
  }
}
