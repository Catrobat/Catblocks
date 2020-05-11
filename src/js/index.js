import "../css/style.css";
import { Playground } from "./playground/playground";
import { Share } from "./share/share";
import * as shareUtils from './share/utils';
import Blockly from "blockly";
import { renderAllPrograms } from './render/render';

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
    const programPath = 'assets/';
    initShareAndRenderPrograms(programPath);
    break;
  }
  case 'render': {
    const programPath = 'assets/programs/';
    initShareAndRenderPrograms(programPath);
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
    console.warn(`Please set process.env.TYPE properly in package.json, current value: ${process.env.TYPE}`);
  }
  }
})();

function initShareAndRenderPrograms(programPath) {
  const catblocksWorkspaceContainer = 'catblocks-workspace-container';
  const programContainer = document.getElementById('catblocks-programs-container');
  const share = new Share();
  let language = 'en';
  if (process.env.DISPLAY_LANGUAGE !== undefined && process.env.DISPLAY_LANGUAGE.length > 0) {
    const values = Blockly.CatblocksMsgs.locales[process.env.DISPLAY_LANGUAGE];
    if (values === undefined) {
      console.warn('no language found for ' + process.env.DISPLAY_LANGUAGE + '. set to default.');
      language = 'en';
    }
    else {
      language = process.env.DISPLAY_LANGUAGE;
    }
  }
  console.log("language: " + language);
  share.init({
    'container': catblocksWorkspaceContainer,
    'renderSize': 0.75,
    'language': language,
    'shareRoot': '',
    'media': 'media/',
    'noImageFound': 'No_Image_Available.jpg',
  });
  renderAllPrograms(share, programContainer, programPath);
}