import "../css/share.css";
import { Share } from "./share/share";
import Blockly from "blockly";
import { renderProgram } from "./render/render";
import "./catblocks_msgs";
import "./blocks";


/**
 * Initialize Share-Object and change Language
 *
 * @export
 * @param {*} config
 */
export function init (config) {
  this.config = config;
  this.share = new Share();
  this.share.init(config);

  let language = 'en';
  if (config.language != null) {
    language = config.language;
  }
  Blockly.CatblocksMsgs.setLocale(language, config.i18n);
}


/**
 * Render program from given path
 *
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
