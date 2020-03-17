/**
 * @description Msg tests
 */

'use strict';

const utils = require('../commonUtils');

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

  /**
   * Execute ones in this scope
   */
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
  });

  /**
   * Run before each test in this scope
  */
  beforeEach(async () => {
    // clean workspace before each test
    await page.evaluate(() => {
      playgroundWS.clear();
    });
  });

  /**
   * Test if each block is rendered 
   */
  test('en_GB Messages assigned to Blockly', async () => {
    const langToTest = 'en_GB';
    const msgDef = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${langToTest}.json`));

    expect(await page.evaluate((msgDef, lang) => {
      let failedLoading = false;

      playground.setLocale(lang);
      toolboxWS.getAllBlocks().forEach(block => {
        const blockName = block.type;
        const msgKeys = Object.keys(Blockly.Bricks[blockName])
          .filter(key => key.indexOf('message') > -1)
          .map(key => Blockly.Bricks[blockName][key])
          .filter(value => value.startsWith('%{BKY_'));

        const msgDefParts = msgKeys.flatMap(key => {
          const msgKey = key.split('%{BKY_').pop().split('}')[0];
          return msgDef[msgKey].split(/%\d/g).map(v => v.trim()).filter(v => v.length > 0);
        });

        const msgBlockParts = block.svgGroup_.querySelectorAll('g:not(.blocklyEditableText) > text.blocklyText');
        for (let idx = 0; idx < msgBlockParts.length; idx++) {
          const msgBlockPart = msgBlockParts[idx];
          const testString = msgBlockPart.innerHTML.replace(/&nbsp;/g, '').replace(/…$/, '');
          const refString = msgDefParts[idx].replace(/ /g, '');
          if (!refString.startsWith(testString)) {
            failedLoading = true;
            return failedLoading;
          }
        }
      });
      return failedLoading;
    }, msgDef, langToTest)).toBeFalsy();
  });

  /**
   * Check if language switch/change works proplery and all blocks are rendered
   *  with the new language, tested via toolbox blocks
   */
  test('Change lang from >en_GB< to >de< works properly', async () => {
    const langToTest = 'de';
    const msgDef = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${langToTest}.json`));

    expect(await page.evaluate((msgDef, lang) => {
      let failedLoading = false;

      playground.setLocale('en_GB');
      playground.setLocale(lang);
      toolboxWS.getAllBlocks().forEach(block => {
        const blockName = block.type;
        const msgKeys = Object.keys(Blockly.Bricks[blockName])
          .filter(key => key.indexOf('message') > -1)
          .map(key => Blockly.Bricks[blockName][key])
          .filter(value => value.startsWith('%{BKY_'));

        const msgDefParts = msgKeys.flatMap(key => {
          const msgKey = key.split('%{BKY_').pop().split('}')[0];
          return msgDef[msgKey].split(/%\d/g).map(v => v.trim()).filter(v => v.length > 0);
        });

        const msgBlockParts = block.svgGroup_.querySelectorAll('g:not(.blocklyEditableText) > text.blocklyText');
        for (let idx = 0; idx < msgBlockParts.length; idx++) {
          const msgBlockPart = msgBlockParts[idx];
          const testString = msgBlockPart.innerHTML.replace(/&nbsp;/g, '').replace(/…$/, '');
          const refString = msgDefParts[idx].replace(/ /g, '');
          if (!refString.startsWith(testString)) {
            failedLoading = true;
            return failedLoading;
          }
        }
      });
      return failedLoading;
    }, msgDef, langToTest)).toBeFalsy();
  });
});
