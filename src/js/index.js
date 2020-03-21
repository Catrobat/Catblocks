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
    window.share = new Share();
    break;
  }
  case 'render': {
    const progPath = 'assets/programs/';
    const catblocksWs = 'catblocks-workspace-container';
    const progContainer = document.getElementById('catblocks-programs-container');

    console.log(`Render every program which is located in ${progPath} directory`);
    console.log(`If this page was loaded by your catblocks docker image, we copy first /test/programs/ to ${progPath}`);

    const share = new Share();
    share.init({
      'container': catblocksWs,
      'renderSize': 0.75,
      'language': 'en_GB',
      'shareRoot': '',
      'media': 'media/',
      'noImageFound': 'No_Image_Available.jpg',
    });
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
    console.warn(`Please set process.env.TYPE properly in package.json, current value: ${process.env.TYPE}`);
  }
  }
})();