import "../css/style.css";
import { Playground } from "./playground/playground";
import { Share } from "./share/share";
import Blockly from "scratch-blocks";
import { renderAllPrograms } from './render/render';


/**
 * Initiate share for rendering programs
 * @param {string} container 
 * @param {string} lang 
 * @returns {Object} share
 */
const initShare = (container, lang) => {
  const share = new Share();
  share.init({
    'container': container,
    'renderSize': 0.75,
    'language': lang,
    'shareRoot': '',
    'media': 'media/',
    'noImageFound': 'No_Image_Available.jpg',
  });
  return share;
};

(() => {
  if (process.env.NODE_ENV === 'development') {
    window.Blockly = Blockly;
  }

  switch (process.env.TYPE) {
  case 'playground': {
    const app = new Playground();
    app.init();
    window.Catblocks = app;
    window.blocklyWS = app.workspace;
    window.toolboxWS = (() => {
      for (const wsId in app.Blockly.Workspace.WorkspaceDB_) {
        if (app.Blockly.Workspace.WorkspaceDB_[wsId].toolbox_ === undefined) {
          return app.Blockly.Workspace.WorkspaceDB_[wsId];
        }
      }
    })();
    break;
  }
  case 'share':
  case 'po-review': {
    window.share = new Share();
    break;
  }
  case 'render': {
    console.log('Render every program which is located in assets/programs/ directory');
    console.log('If this page was loaded by your catblocks docker image, we copy first /test/programs/ to assert/programs/');

    const share = initShare('catblocks-workspace-container', 'en_GB');
    renderAllPrograms(share);
    break;
  }
  default: {
    // TODO: add more cases
    console.warn(`Please define some code in index.js for type: ${process.env.TYPE}`);
  }
  }
})();