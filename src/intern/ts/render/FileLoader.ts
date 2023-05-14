import { FileHandlerBase, ViewUpdateEvent } from './FileHandlerBase';
import { MessageBox } from './MessageBox';

/**
 * Try to load .catrobat file from a given URL and handle Files.
 */
export class FileLoader extends FileHandlerBase {
  private URL: string;
  private downloadURL: string;
  private container: HTMLElement;

  constructor(URL: string, container: HTMLElement) {
    super();
    this.URL = URL;
    this.container = container;
    this.downloadURL = URL;
  }

  /**
   * Fixes CORS-Error for GH URLs.
   */
  public fixCorsForGithubUrl() {
    if (this.URL.startsWith('https://github.com')) {
      this.downloadURL = this.URL.replace('https://github.com', 'https://raw.githubusercontent.com').replace(
        '/raw/',
        '/'
      );
    }
  }

  /**
   * Downloads the file from the passed URL and calls the render function.
   */
  public async loadAndRenderProgram() {
    const containerCounter = 1;
    this.updateView(ViewUpdateEvent.START);
    this.fixCorsForGithubUrl();
    try {
      const resp = await fetch(this.downloadURL);
      if (resp.status == 200 && resp.ok) {
        const zipResult = await this.loadArchive(await resp.arrayBuffer());

        if (zipResult !== null) {
          this.renderProgramByLocalFile(
            this.container,
            zipResult.codeXML,
            this.URL,
            containerCounter,
            zipResult.fileMap
          );

          MessageBox.show(`Rendered ${this.URL}`, 4000);
          return true;
        }
      }
    } catch (error) {
      console.log(error);
      MessageBox.show('<b>' + this.URL + ':</b><br /> ' + error);
      throw error;
    } finally {
      this.updateView(ViewUpdateEvent.DONE);
    }
  }
}
