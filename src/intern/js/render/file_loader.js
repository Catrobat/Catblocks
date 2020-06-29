import { loadArchive, updateView } from './utils';
import { MessageBox } from './message_box';
import { renderProgramByLocalFile } from './render';

/**
 * Try to load .catrobat file from a given URL and handle Files.
 */

export class FileLoader {
  constructor(url, container) {
    this.url = url;
    this.container = container;
    this.downloadUrl = url;
  }

  /**
   * Fixes CORS-Error for GH URLs.
   */
  fixCorsForGithubUrl() {
    if (this.url.startsWith('https://github.com')) {
      this.downloadUrl = this.url
        .replace('https://github.com', 'https://raw.githubusercontent.com')
        .replace('/raw/', '/');
    }
  }

  /**
   * Downloads the file from the passed URL and calls the render function.
   */
  async loadAndRenderProgram() {
    const containerCounter = 1;
    updateView('onStart');
    this.fixCorsForGithubUrl();
    try {
      const resp = await fetch(this.downloadUrl);
      if (resp.status == 200 && resp.ok) {
        const zipResult = await loadArchive(resp.arrayBuffer());

        if (zipResult !== null) {
          renderProgramByLocalFile(this.container, zipResult.codeXML, this.url, containerCounter, zipResult.fileMap);
          updateView('onDone');
          MessageBox.show(`Rendered ${this.url}`, 4000);
          return true;
        } else {
          updateView('onDone');
        }
      }
    } catch (error) {
      console.log(error);
      updateView('onDone');
      MessageBox.show('<b>' + this.url + ':</b><br /> ' + error);
      throw error;
    }
  }
}
