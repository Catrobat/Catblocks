import "../css/style.css";
import { Playground } from "./playground/playground";
import { Share } from "./share/share";
import $ from 'jquery';
import Blockly from "scratch-blocks";

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
  case 'share': {

    // {{path}}
    const progPath = 'assets/extracted/dc7fb2eb-1733-11ea-8f2b-000c292a0f49/';
    const progLang = 'en_GB';

    const share = new Share();
    share.init({
      'container': 'catblocks-code-container',
      'renderSize': 0.75,
      'language': progLang,
      'shareRoot': '',
      'media': 'media/',
      'noImageFound': 'No_Image_Available.jpg',
    });

    // render my code.xml file
    $(document).ready(() => {
      share.parser.parseFile(`${progPath}code.xml`)
        .then(xmlDoc => {
          console.log(xmlDoc);
          const div = document.getElementById('catblocks-code-container');
          share.injectAllScenes(div, xmlDoc, {
            object: {
              programRoot: `${progPath}`
            }
          });
        })
        .catch(err => {
          console.error(`Failed to parse catroid file.`);
          console.error(err);
        });

    });
    break;
  }
  default: {
    // TODO: add more cases
    console.warn(`Please define some code in index.js for type: ${process.env.TYPE}`);
  }
  }
})();