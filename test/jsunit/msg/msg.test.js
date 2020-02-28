/**
 * @description Msg tests
 */

const path = require('path');
const utils = require('../commonUtils');
const xmlParser = require('xml2json');

/**
 * Load block messages mapping
 */
const BLOCK_MSG_MAPPINGS = JSON.parse(utils.readFileSync(utils.PATHS.MESSAGE_MAPPING).toString());

/**
 * Directory listing of all catroid message files
 */
const CATROID_MSGS = utils.listDirectorySync(utils.PATHS.CATROID_MSGS);

/**
 * Directory listing of all catblocks message files
 */
const CATBLOCKS_MSGS = utils.listDirectorySync(utils.PATHS.CATBLOCKS_MSGS);

const CATBLOCKS_PAYLOAD = utils.readFileSync(utils.PATHS.CATBLOCKS_MSG).toString();

/**
 * Msg filesystem tests
 */
describe('Filesystem msg tests', () => {

  /**
   * Each catroid string file generated a catblocks json file
   */
  test('JSON exists for catroid_strings xml file', () => {
    CATROID_MSGS.forEach(catMsg => {
      const langName = catMsg.replace('values-', '').replace('-', '_').replace('/', '').replace('_r', '_');
      expect(CATBLOCKS_MSGS.includes(`${langName}.json`)).toBeTruthy();
    });
  });

  /**
   * Each JSON needs to inculde all keys from the i18n mapping definition
   */
  test('JSON includes all i18n definitions', () => {
    CATBLOCKS_MSGS.forEach(lang => {
      const langKeys = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${lang}`));
      Object.keys(BLOCK_MSG_MAPPINGS).forEach(key => {
        if (!key.startsWith('@')) {
          expect(langKeys[key]).toBeDefined();
        }
      });
    });
  });

  /**
   * Each JSON file needs to be linked to your catblocks js file so we can load it dynamically
   */
  test('Lang JSON file linked in CatblocksMsg.js', () => {
    const langs = CATBLOCKS_PAYLOAD.split('\n')
      .filter(line => line.indexOf(`Blockly.CatblocksMsgs.locales["`) > -1)
      .map(value => value.split('"')[1].split('"')[0]);

    CATBLOCKS_MSGS.forEach(lang => {
      expect(langs.includes(lang.split('.')[0])).toBeTruthy();
    });
  });
});

describe('Webview test', () => {
  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      window.blocklyWS = playground.Blockly.getMainWorkspace();
      window.toolboxWS = (() => {
        for (const wsId in playground.Blockly.Workspace.WorkspaceDB_) {
          if (playground.Blockly.Workspace.WorkspaceDB_[wsId].toolbox_ === undefined) {
            return playground.Blockly.Workspace.WorkspaceDB_[wsId];
          }
        }
      })();
    });
  });

  test('en_GB Messages assigned to Blockly', async () => {
    const msgDef = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}en_GB.json`));

    const failed = await page.evaluate((msgDef) => {
      let failedLoading = false;

      toolboxWS.getAllBlocks().forEach(block => {
        console.log(block);
        const msgKeys = block.init.toString().match(/message\d\d?"?:[^,]*Msg.[a-zA-Z_1-9]+(?=,)/g);

        const msgDefParts = msgKeys.flatMap(key => {
          let msgKey = key.split(':')[1].trim().split('.').pop();
          return msgDef[msgKey].split(/\%\d/g).map(v => v.trim()).filter(v => v.length > 0);
        });

        const msgBlockParts = Array.prototype.slice.call(block.svgGroup_.getElementsByClassName('blocklyText'))
          .filter(v => v.classList.length === 1);

        for (let idx = 0; idx < msgBlockParts.length; idx++) {
          let msgBlockPart = msgBlockParts[idx];
          if (msgBlockPart.innerHTML.replace(/\&nbsp\;/g, '') !== msgDefParts[idx].replace(/ /g, '')) {
            failedLoading = true;
            // return failedLoading;
          }
        }
      });

      return failedLoading;
    }, msgDef);

    expect(failed).toBeFalsy();
  });
});
