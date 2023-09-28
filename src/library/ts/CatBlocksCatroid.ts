import { Modal } from 'bootstrap';
import { CatblocksParser } from '../../common/ts/parser/Parser';
import { CatBlocksConfig } from './config/CatBlocksConfig';
import { Catroid } from '../js/integration/catroid';
import { CatBlocksBase } from './CatBlocksBase';

export class CatBlocksCatroid extends CatBlocksBase {
  private constructor() {
    super();
  }

  public static get controller(): Catroid {
    return this.controller_ as Catroid;
  }

  public static init(config: Partial<CatBlocksConfig>): Promise<void> {
    if (this.instance_) {
      throw new Error('Double initalization of LibraryShare');
    }

    this.instance_ = this;
    this.controller_ = new Catroid();
    return super.init(config);
  }

  public static render(codeXML: string, showScene?: string, showObject?: string, brickIDToFocus?: string) {
    if (!showObject || !showScene) {
      throw new Error('Invalid object or scene. Object and scene must be selected');
    }

    return new Promise<void>((resolve, reject) => {
      const spinnerElement = document.getElementById('spinnerModal');
      if (!spinnerElement) {
        return reject(new Error('Spinner element not found'));
      }

      const spinnerModal = new Modal(spinnerElement);

      const eventListener = () => {
        spinnerElement.removeEventListener('shown.bs.modal', eventListener, false);
        try {
          const parser = new CatblocksParser(codeXML);
          const objectJSON = parser.xmlToCatblocksObject(showScene, showObject);
          console.log(objectJSON);
          this.controller.scene = showScene;
          this.controller.object = showObject;
          this.controller.brickIDToFocus = brickIDToFocus;
          this.controller.renderObjectScripts(objectJSON);
          return resolve();
        } catch (error) {
          return reject(error);
        } finally {
          spinnerModal.hide();
        }
      };
      spinnerElement.addEventListener('shown.bs.modal', eventListener);
      spinnerModal.show();
    });
  }

  public static reorderCurrentScripts() {
    this.controller.reorderCurrentScripts();
  }

  public static addBricks(bricks: Array<Record<string, unknown>>) {
    this.controller.addBricks(bricks);
  }

  public static getBrickAtTopOfScreen() {
    return this.controller.getBrickAtTopOfScreen();
  }

  public static showBrickCategories(categoryInfos: Array<Record<string, unknown>>) {
    this.controller.showBrickCategories(categoryInfos);
  }

  public static updateBrickFields(brickFields: { brickId: string; fields: Array<Record<string, unknown>> }) {
    this.controller.updateBrickFields(brickFields);
  }

  public static scrollToInputField(domFieldID: string) {
    this.controller.scrollToInputField(domFieldID);
  }
}
