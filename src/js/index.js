import "../css/style.css";
import { Share } from "./share/share";
import $ from 'jquery';
import Blockly from "scratch-blocks";

(() => {
  if (process.env.NODE_ENV === 'development') {
    window.Blockly = Blockly;
  }
  // {{path}}
  const progPath = 'assets/extracted/dc7fb2eb-1733-11ea-8f2b-000c292a0f49/';
  const progLang = 'en_GB';

  const share = new Share();
  share.init({
    'container': 'catblocks-code-container',
    'renderSize': 0.75,
    'language': progLang,
    'languageFolder': 'i18n/',
    'shareRoot': '/',
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
})();