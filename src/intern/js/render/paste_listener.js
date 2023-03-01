import { FileLoader } from './file_loader';

/**
 * Initialize Drag & Drop Field and handle Files.
 */

let pasteListenerInstance = null;
export class PasteListener {
  constructor(container) {
    this.container = container;
    this.ctrlDown = false;
    this.enabled = false;
  }

  /**
   * Creates or returns Singleton instance.
   * @static
   * @param {*} container
   * @returns {PasteListener}
   * @memberof PasteListener
   */
  static createInstance(container) {
    if (pasteListenerInstance == null) {
      pasteListenerInstance = new PasteListener(container);
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
    document.getElementsByTagName('body')[0].addEventListener('paste', async function (e) {
      const pl = PasteListener.getInstance();
      if (!pl.enabled) {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      const pastedData = (e.clipboardData || window.clipboardData).getData('Text');

      if (pastedData) {
        const fl = new FileLoader(pastedData, pl.container);
        try {
          if (await fl.loadAndRenderProgram()) {
            document.getElementById('catblocks-file-dropper').style.display = 'none';
            pl.disablePasteListener();
          }
        } catch (error) {
          console.log(error);
        }
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
