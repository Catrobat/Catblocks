import { Share } from './share/share';
import { Parser } from '../../common/js/parser/parser';
import './catblocks_msgs';
import './blocks';

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
  /**
   * Initialize Share-Object and change Language
   * @export
   * @param {*} config
   * @returns Promise which should be waited before rendering
   */
  static init(config) {
    if (!config) {
      throw new Error('No configuration given');
    }

    catblocks_instance = new CatBlocks(config);

    preparePaths();

    catblocks_instance.share = new Share();
    return catblocks_instance.share.init(config);
  }

  /**
   * Render program from given path
   * @export
   * @param {*} path Path containing the program folders
   * @param {*} name Name of program folder
   * @returns Promise
   */
  static render(path, name) {
    if (catblocks_instance.config == null || catblocks_instance.config.container == null) {
      throw new Error('No Container specified');
    } else if (path == null) {
      throw new Error('No path specified');
    }

    const programContainer = document.getElementById(catblocks_instance.config.container);
    return renderProgram(catblocks_instance.share, programContainer, path, name);
  }

  /**
   * Renders the program given in codeXML with the given name.
   * @static
   * @param {*} codeXML XML-string containing the program description
   * @param {*} name name of the program
   * @memberof CatBlocks
   */
  static renderForAndroid(codeXML, name, showScene = null, showObject = null, showScript = null) {
    const programJSON = Parser.convertProgramToJSONDebug(codeXML);

    const programContainer = document.getElementById(catblocks_instance.config.container);

    const options = {
      scene: {
        renderNow: {
          scene: showScene
        }
      },
      object: {
        renderNow: {
          object: showObject,
          script: showScript
        }
      }
    };

    catblocks_instance.share.renderProgramJSON(
      `catblocks-program-${name}`,
      programContainer,
      programJSON,
      options,
      true
    );
  }

  static getInstance() {
    if (!catblocks_instance) {
      throw new Error('catblocks_instance is not defined yet! Call init() first!');
    }
    return catblocks_instance;
  }
}

/**
 * Prepares all paths given in config
 */
function preparePaths() {
  catblocks_instance.config.shareRoot = addTrailingSlash(catblocks_instance.config.shareRoot);
  catblocks_instance.config.shareRoot = catblocks_instance.config.shareRoot.replace(/^\//, '');

  catblocks_instance.config.media = addTrailingSlash(catblocks_instance.config.media);
  catblocks_instance.config.i18n = addTrailingSlash(catblocks_instance.config.i18n);

  catblocks_instance.config.media = createURL(catblocks_instance.config.media);
  catblocks_instance.config.i18n = createURL(catblocks_instance.config.i18n);

  if (!catblocks_instance.config.shareRoot.startsWith('http')) {
    catblocks_instance.config.shareRoot = '/' + catblocks_instance.config.shareRoot;
  }
}

/**
 * Create URL
 * @param {*} path
 * @returns
 */
function createURL(path) {
  if (path.startsWith('http')) {
    return path;
  }
  if (path.startsWith('/')) {
    return window.location.origin + path;
  }

  if (catblocks_instance.config.shareRoot.startsWith('http')) {
    return catblocks_instance.config.shareRoot + path;
  }
  return window.location.origin + '/' + catblocks_instance.config.shareRoot + path;
}

/**
 * Be sure there is a trailing slash. Only one.
 * @param {*} string
 * @returns
 */
function addTrailingSlash(string) {
  if (!string) {
    return '';
  }
  if (!string.endsWith('/')) {
    return string + '/';
  }
  return string;
}

/**
 * Render a program from filesystem, used on share.
 * Does not catch any errors.
 * @param {Share} share instance of share
 * @param {Element} container parent container for structure
 * @param {string} path path of the folder containing the program
 * @param {string} name name of the program file
 * @param {number} counter number added to ID to be unique
 * @returns {Promise}
 */
export function renderProgram(share, container, path, name, counter = -1) {
  // be sure that path has a trailing slash
  path = path.replace(/\/$/, '') + '/';

  // remove the leading slash
  name = name.replace(/^\//, '');

  return fetch(`${path}${name}/code.xml`)
    .then(res => res.text())
    .then(codeXML => {
      const programJSON = Parser.convertProgramToJSONDebug(codeXML);

      let programID = `catblocks-program-${name}`;
      if (counter >= 0) {
        programID = `catblocks-program-${name}-${counter}`;
      }

      share.renderProgramJSON(
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
    });
}
