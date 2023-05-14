import '../scss/style.scss';

import { CatBlocksConfig } from '../../library/ts/config/CatBlocksConfig';
import { Render } from './Render';

(async function () {
  const programPath = 'assets/programs/';
  const config: Partial<CatBlocksConfig> = {
    language: process.env.DISPLAY_LANGUAGE,
    rtl: process.env.DISPLAY_RTL?.toLowerCase() === 'true',
    container: 'catblocks-workspace-container',
    shareRoot: 'Catblocks/develop/'
  };
  const programContainer = document.getElementById('catblocks-programs-container');

  const render = new Render();
  await render.run(config, programPath, programContainer);
})();
