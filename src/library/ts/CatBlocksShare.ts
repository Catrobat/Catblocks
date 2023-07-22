import { CatblocksParser } from '../../common/ts/parser/Parser';
import { CatBlocksConfig } from './config/CatBlocksConfig';
import { Share } from '../js/integration/share';
import { CatBlocksBase } from './CatBlocksBase';

export class CatBlocksShare extends CatBlocksBase {
  protected constructor() {
    super();
  }

  public static get controller(): Share {
    return this.controller_ as Share;
  }

  public static init(config: Partial<CatBlocksConfig>): Promise<void> {
    if (this.instance_) {
      throw new Error('Double initalization of LibraryShare');
    }

    this.instance_ = this;
    this.controller_ = new Share();
    return super.init(config);
  }

  public static render(path: string, name: string) {
    if (!this.config?.container) {
      throw new Error('No Container specified');
    } else if (!path) {
      throw new Error('No path specified');
    }

    const programContainer = document.getElementById(this.config.container);
    if (!programContainer) {
      throw new Error('Container not found');
    }

    return this.renderProgram(programContainer, path, name);
  }

  public static async renderWithCounter(container: HTMLElement, path: string, name: string, counter: number) {
    return this.renderProgram(container, path, `${name}-${counter}`);
  }

  private static async renderProgram(container: HTMLElement, path: string, name: string) {
    // be sure that path has a trailing slash
    path = path.replace(/\/$/, '') + '/';

    // remove the leading slash
    name = name.replace(/^\//, '');

    const response = await fetch(`${path}${name}/code.xml`);
    const codeXML = await response.text();

    const parser = new CatblocksParser(codeXML);
    const programJSON = parser.xmlToCatblocksProject();

    const programID = `catblocks-program-${name}`;

    this.controller.renderProgramJSON(
      programID,
      container,
      programJSON,
      {
        object: {
          programRoot: `${path}${name}/`
        }
      },
      true
    );
  }
}
