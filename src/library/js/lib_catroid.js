import { Catroid } from './integration/catroid';
import { Parser } from '../../common/js/parser/parser';
import './catblocks_msgs';
import './blocks';
import { preparePaths } from './lib_utils';
import $ from 'jquery';

let catblocks_instance = undefined;

export class CatBlocks {
  constructor(cfg) {
    if (!catblocks_instance) {
      this.config = cfg;
      this.share = undefined;
      catblocks_instance = this;
    }
    return catblocks_instance;
  }

  static init(config) {
    if (!config) {
      throw new Error('No configuration given');
    }

    catblocks_instance = new CatBlocks(config);

    preparePaths(catblocks_instance);

    catblocks_instance.share = new Catroid();
    return catblocks_instance.share.init(config);
  }

  /**
   * Renders the program given in codeXML with the given name.
   * Usually this function should be used for Catroid only-
   * @static
   * @param {string} codeXML XML-string containing the program description
   * @param {string} name name of the program
   * @param {string} showScene the script to be rendered
   * @param {string} showObject the object to be expanded
   * @param {string} showScript the script to scroll to
   * @returns {Promise<void>}
   * @memberof CatBlocks
   */
  static render(codeXML, showScene = null, showObject = null, brickIDToFocus = null) {
    return new Promise((resolve, reject) => {
      $('#spinnerModal').one('shown.bs.modal', () => {
        try {
          const objectJSON = Parser.convertObjectToJSON(codeXML, showScene, showObject);
          console.log(objectJSON);
          catblocks_instance.share.scene = showScene;
          catblocks_instance.share.object = showObject;
          catblocks_instance.share.brickIDToFocus = brickIDToFocus;
          catblocks_instance.share.renderObjectScripts(objectJSON);
          return resolve();
        } catch (error) {
          return reject(error);
        } finally {
          $('#spinnerModal').modal('hide');
        }
      });

      $('#spinnerModal').modal('show');
    });
  }

  /**
   * Reorders the scripts of the currently shown object.
   *
   */
  static reorderCurrentScripts() {
    catblocks_instance.share.reorderCurrentScripts();
  }

  /**
   * Adds the bricks to the current object.
   * If there is only one brick, it is assumed that the brick is a script.
   * Otherwise the first brick is assumed as the script brick,
   * the following its children.
   *
   */
  static addBricks(bricks) {
    catblocks_instance.share.addBricks(bricks);
  }

  static getBrickAtTopOfScreen() {
    return catblocks_instance.share.getBrickAtTopOfScreen();
  }
}
