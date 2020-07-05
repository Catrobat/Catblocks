import '../css/style.css';
import { Playground } from './playground/playground';
import * as shareUtils from '../../library/js/share/utils';
import Blockly from 'blockly';
import { CatBlocks } from '../../library/js/lib';
import { Parser } from '../../common/js/parser/parser';
import { initShareAndRenderPrograms } from './render/utils';

(async () => {
  if (process.env.NODE_ENV === 'development') {
    window.Blockly = Blockly;
  }

  let language = 'en';
  let isRtl = false;
  if (process.env.DISPLAY_LANGUAGE !== undefined && process.env.DISPLAY_LANGUAGE.length > 0) {
    language = process.env.DISPLAY_LANGUAGE;
  }
  if (process.env.DISPLAY_RTL !== undefined && process.env.DISPLAY_RTL.toLowerCase() === 'true') {
    isRtl = true;
  }
  await Blockly.CatblocksMsgs.setLocale(language);

  switch (process.env.TYPE) {
    case 'playground': {
      const app = new Playground();
      app.init();
      break;
    }
    case 'render': {
      const programPath = 'assets/programs/';
      initShareAndRenderPrograms(programPath, language, isRtl);
      break;
    }
    case 'testing': {
      window.Blockly = Blockly;
      window.playground = new Playground();
      CatBlocks.init({
        container: 'share',
        renderSize: 0.75,
        shareRoot: '',
        media: 'media/',
        language: language,
        rtl: isRtl,
        noImageFound: 'No_Image_Available.jpg'
      });
      window.share = CatBlocks.getInstance().share;
      window.shareUtils = shareUtils;
      window.playground.workspace = Blockly.inject('playworkspace', {
        media: '../media/',
        zoom: { startScale: 0.75 },
        toolbox: window.playground.getToolbox(true),
        renderer: 'zelos'
      });
      window.parser = Parser;
      window.shareWS = window.share.workspace;
      window.playgroundWS = window.playground.workspace;
      window.toolboxWS = Blockly.Workspace.getById(
        Object.keys(Blockly.Workspace.WorkspaceDB_).filter(
          key => ![window.shareWS.id, window.playgroundWS.id].includes(key)
        )
      );
      break;
    }
    default: {
      console.warn(`Please set process.env.TYPE properly in package.json, current value: ${process.env.TYPE}`);
    }
  }
})();
