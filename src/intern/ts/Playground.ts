import '../scss/style.scss';

import { Playground } from '../js/playground/playground';
import Blockly from 'blockly';
import { CatBlocksMsgs } from '../../library/ts/i18n/CatBlocksMsgs';
import { CatBlocksConfig } from '../../library/ts/config/CatBlocksConfig';
import { ConfigValidator } from '../../library/ts/config/ConfigValidator';

declare global {
  interface Window {
    Catblocks: Playground;
    Blockly: typeof Blockly;
  }
}

(async function () {
  const config: Partial<CatBlocksConfig> = {
    language: process.env.DISPLAY_LANGUAGE,
    rtl: process.env.DISPLAY_RTL?.toLowerCase() === 'true',
    container: 'catblocks-workspace-container',
    shareRoot: '/'
  };
  const validatedConfig = ConfigValidator.parseOptions(config);

  CatBlocksMsgs.init(validatedConfig.i18n);
  await CatBlocksMsgs.setLocale('en');
  window.Blockly = Blockly;
  const playground = new Playground();
  playground.init();
  window.Catblocks = playground;
})();
