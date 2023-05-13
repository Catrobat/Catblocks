import '../scss/style.scss';

import { CatBlocksShare } from '../../library/ts/CatBlocksShare';
import { CatBlocksConfig } from '../../library/ts/config/CatBlocksConfig';
import { FileLoader } from './render/FileLoader';
import { PasteListener } from './render/PasteListener';
import { FileDropper } from './render/FileDropper';

class Render {
  public async run(config: Partial<CatBlocksConfig>, programPath: string, programContainer: HTMLElement | null) {
    if (!programContainer) {
      throw new Error('Container not found');
    }
    programContainer.classList.add('catblocks-render');

    try {
      await CatBlocksShare.init(config);
      await this.renderAllPrograms(programContainer, programPath);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.trim() !== 'INFO: Found no Programs') {
          console.error(error);
        }
      }

      if (!(await this.loadProjectByURLParameter(programContainer))) {
        this.initializeFileDropper(programContainer);
      }
    }
  }

  /**
   * Tries to get program URL from parameter and render it
   * @param container container, where the program should be rendered
   * @returns false if failed, true if success
   */
  private async loadProjectByURLParameter(container: HTMLElement) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlToRender = urlSearchParams.get('programurl');
    if (urlToRender != null) {
      // if there is a program passed via url: try to parse
      const fl = new FileLoader(urlToRender, container);
      try {
        await fl.loadAndRenderProgram();
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  /**
   * Initialize FileDropper and PasteListener
   * @param container container, where the pastelistener will be injected
   */
  private initializeFileDropper(container: HTMLElement) {
    const pasteListener = PasteListener.init(container);
    pasteListener.enablePasteListener();

    const fd = FileDropper.init(container);
    fd.enableDragAndDrop();
  }

  /**
   * Render all programs into page
   * @param container parent container for structure
   * @param path path where the file is
   */
  private async renderAllPrograms(container: HTMLElement, path: string) {
    // inject very program from ${path} into ${container} dom

    const file = await fetch(path);
    const text = await file.text();

    const page = new DOMParser().parseFromString(text, 'text/html');
    if (page === undefined) {
      throw new Error('Page is undefined');
    }

    if (file.statusText === 'Not Found') {
      throw new Error('INFO: Found no Programs');
    }

    const files = page.getElementsByTagName('ul')[0] || undefined;

    if (files === undefined || files.childElementCount === 0) {
      throw new Error('No Files in List');
    }

    const promises = [];
    for (let idx = 0; idx < files.childElementCount; idx++) {
      const fileli = files.children[idx];
      const filea = fileli.getElementsByTagName('a')[0];

      const name = filea.title !== '' ? filea.title : filea.innerText;
      if (name === '..' || name === '.') {
        continue;
      }

      promises.push(CatBlocksShare.renderWithCounter(container, path, name, idx));
    }

    const results = await Promise.allSettled(promises);
    for (const result of results) {
      if (result.status === 'rejected') {
        console.error(result.reason);
      }
    }
  }
}

export { Render };

(async function () {
  const programPath = 'assets/programs/';
  const config: Partial<CatBlocksConfig> = {
    language: process.env.DISPLAY_LANGUAGE,
    rtl: process.env.DISPLAY_RTL?.toLowerCase() === 'true',
    container: 'catblocks-workspace-container'
  };
  const programContainer = document.getElementById('catblocks-programs-container');

  const render = new Render();
  await render.run(config, programPath, programContainer);
})();
