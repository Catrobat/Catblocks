import "../css/style.css";
import { Playground } from "./playground/playground";
import { Share } from "./share/share";
import * as shareUtils from './share/utils';
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
    break;
  }
  case 'share': {
    window.share = new Share();
    break;
  }
  case 'render': {
    const progPath = (process.env.PO_FOLDER) ? process.env.PO_FOLDER : 'assets/programs/';
    const catblocksWs = 'catblocks-workspace-container';
    const progContainer = document.getElementById('catblocks-programs-container');

    console.log(`Render every program which is located in ${progPath} directory`);
    console.log(`If this page was loaded by your catblocks docker image, we copy first /test/programs/ to ${progPath}`);

    const share = initShare(catblocksWs, 'en_GB');
    renderAllPrograms(share, progContainer, progPath);
    break;
  }
  case 'testing': {
    window.Blockly = Blockly;
    window.playground = new Playground();
    window.share = new Share();
    window.shareUtils = shareUtils;
    break;
  }
  default: {
    // TODO: add more cases
    console.warn(`Please define some code in index.js for type: ${process.env.TYPE}`);
  }
  }
})();