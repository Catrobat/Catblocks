import { FileLoader } from './FileLoader';

export class PasteListener {
  private static instance_: PasteListener;
  private container: HTMLElement | null = null;
  private ctrlDown = false;
  private enabled = false;

  private constructor(container: HTMLElement) {
    this.container = container;
  }

  public static get instance(): PasteListener {
    if (!this.instance_) {
      throw new Error('PasteListener not initialized');
    }
    return this.instance_;
  }

  public static init(container: HTMLElement) {
    if (this.instance_) {
      throw new Error('Double initalization of PasteListener');
    }
    this.instance_ = new PasteListener(container);
    this.instance_.initListener();
    return this.instance_;
  }

  /**
   * Register paste event on body.
   */
  private initListener() {
    document.getElementsByTagName('body')[0].addEventListener('paste', async function (e) {
      const pl = PasteListener.instance;
      if (!pl.enabled) {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      const pastedData = e.clipboardData?.getData('Text');

      if (pastedData) {
        if (!pl.container) {
          throw new Error('No container found');
        }
        const fl = new FileLoader(pastedData, pl.container);
        try {
          if (await fl.loadAndRenderProgram()) {
            const fileDropperElement = document.getElementById('catblocks-file-dropper');
            if (fileDropperElement) {
              fileDropperElement.style.display = 'none';
            }
            pl.disablePasteListener();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  public enablePasteListener() {
    this.enabled = true;
  }

  public disablePasteListener() {
    this.enabled = false;
  }
}
