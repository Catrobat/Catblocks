import { Share } from "./share/share";
import { renderProgram } from "./render/render";
import "./catblocks_msgs";
import "./blocks";


/**
 * Initialize Share-Object and change Language
 * @export
 * @param {*} config
 */
export function init (config) {
  if (!config) {
    throw new Error("No configuration given");
  }

  this.config = config;

  preparePaths(this);

  this.share = new Share();
  this.share.init(config);
}

/**
 * Prepares all paths given in config
 */
function preparePaths(that) {
  that.config.shareRoot = addTrailingSlash(that.config.shareRoot);
  that.config.shareRoot = that.config.shareRoot.replace(/^\//, "");

  that.config.media = addTrailingSlash(that.config.media);
  that.config.i18n = addTrailingSlash(that.config.i18n);
  
  that.config.media = createURL(that, that.config.media);
  that.config.i18n = createURL(that, that.config.i18n);
}

/**
 * Create URL
 * @param {*} path
 * @returns
 */
function createURL(that, path) {
  if (path.startsWith("http")) {
    return path;
  }
  if (path.startsWith("/")) {
    return window.location.origin + path;
  } 
  
  if (that.config.shareRoot.startsWith("http")) {
    return that.config.shareRoot + path;
  } 
  return window.location.origin + "/" + that.config.shareRoot + path;
}

/**
 * Be sure there is a trailing slash. Only one.
 * @param {*} string
 * @returns
 */
function addTrailingSlash (string) {
  if (string) {
    return string.replace(/\/$/, "") + "/";
  }
}


/**
 * Render program from given path
 * @export
 * @param {*} path Path containing the program folders
 * @param {*} name Name of program folder
 * @returns Promise 
 */
export function render (path, name) {
  if (this.config == null || this.config.container == null) {
    throw new Error("No Container specified");
  } else if (path == null) {
    throw new Error("No path specified");
  }

  const programContainer = document.getElementById(this.config.container);
  return renderProgram(this.share, programContainer, path, name);
}
