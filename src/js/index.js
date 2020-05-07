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

  console.log(`Render every program which is located in ${programPath} directory`);
  console.log(`If this page was loaded by your catblocks docker image, we copy first /test/programs/ to ${programPath}`);

  const share = new Share();
  share.init({
    'container': catblocksWorkspaceContainer,
    'renderSize': 0.75,
    'language': 'en_AU',
    'shareRoot': '',
    'media': 'media/',
    'noImageFound': 'No_Image_Available.jpg',
  });
  renderAllPrograms(share, programContainer, programPath);
}