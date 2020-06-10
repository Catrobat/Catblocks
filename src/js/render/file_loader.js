import { loadArchive, updateView } from './utils';
import { MessageBox } from './message_box';

/**
 * Try to load .catrobat file from a given URL and handle Files.
 *
 * @author b.prattes@student.tugraz.at
 */

export class FileLoader {
  constructor(url, share, container, renderProgram) {
    this.url = url;
    this.share = share;
    this.container = container;
    this.renderProgram = renderProgram;
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
  loadAndRenderProgram() {
    return new Promise(resolve => {
      const containerCounter = 1;
      updateView('onStart');
      this.fixCorsForGithubUrl();
      fetch(this.downloadUrl)
        .then(resp => {
          if (resp.status == 200 && resp.ok) {
            const zipPromise = loadArchive(resp.arrayBuffer());
            zipPromise
              .then(result => {
                if (result !== null) {
                  try {
                    this.renderProgram(
                      this.share,
                      this.container,
                      result.codeXML,
                      this.url,
                      containerCounter,
                      result.fileMap
                    );
                    updateView('onDone');
                    MessageBox.show(`Rendered ${this.url}`, 4000);
                    resolve(true);
                  } catch (error) {
                    updateView('onDone');
                    MessageBox.show('<b>' + this.url + ':</b><br /> ' + error);
                    resolve(false);
                  }
                } else {
                  updateView('onDone');
                  resolve(false);
                }
              })
              .catch(e => {
                console.error(e);
                resolve(false);
              });
          }
        })
        .catch(error => {
          updateView('onDone');
          MessageBox.show('<b>' + this.url + ':</b><br /> ' + error);
          resolve(false);
        });
    });
  }
}
