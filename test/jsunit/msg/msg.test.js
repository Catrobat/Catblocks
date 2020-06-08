/**
 * @description Msg tests
 */
/* global share, page, SERVER, playground, playgroundWS, toolboxWS, Blockly */
/* eslint no-global-assign:0 */
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

  test('JSON exists for catroid_strings xml file', () => {
    CATROID_MSGS.forEach(catMsg => {
      const langName = catMsg.replace('values-', '').replace('-', '_').replace('/', '').replace('_r', '_');
      expect(CATBLOCKS_MSGS.includes(`${langName}.json`)).toBeTruthy();
    });
  });

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

  test('Lang JSON file linked in CatblocksMsg.js', () => {
    const langs = CATBLOCKS_PAYLOAD.split('\n')
      .filter(line => line.indexOf(`"DROPDOWN_NAME"`) > -1)
      .map(value => value.split('"')[1].split('"')[0]);

    CATBLOCKS_MSGS.forEach(lang => {
      expect(langs.includes(lang.split('.')[0])).toBeTruthy();
    });
  });
});

describe('Webview test', () => {

  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
    page.on('console', message => console.log(message.text()));
    // clean workspace before each test
    await page.evaluate(() => {
      playgroundWS.clear();
    });
  });

  test('en Messages assigned to Blockly', async () => {
    const languageToTest = 'en';
    const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));

    expect(await page.evaluate((languageObject, languageToTest) => {
      let failedLoading = false;

      return playground.setLocale(languageToTest).then(() => {
        toolboxWS.getAllBlocks().forEach(block => {
          const blockName = block.type;
          const msgKeys = Object.keys(Blockly.Bricks[blockName])
            .filter(key => key.indexOf('message') > -1)
            .map(key => Blockly.Bricks[blockName][key])
            .filter(value => value.startsWith('%{BKY_'));

          const msgDefParts = msgKeys.flatMap(key => {
            const msgKey = key.split('%{BKY_').pop().split('}')[0];
            return languageObject[msgKey].split(/%\d/g).map(v => v.trim()).filter(v => v.length > 0);
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
      });
    }, languageObject, languageToTest)).toBeFalsy();
  });

  test('Change lang from >en< to >de< works properly', async () => {
    const languageToTest = 'de';
    const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));

    expect(await page.evaluate((languageObject, languageToTest) => {
      let failedLoading = false;

      return playground.setLocale(Blockly.CatblocksMsgs.getCurrentLocale()).then(() => {
        return playground.setLocale(languageToTest).then(() => {
          toolboxWS.getAllBlocks().forEach(block => {
            const blockName = block.type;
            const msgKeys = Object.keys(Blockly.Bricks[blockName])
              .filter(key => key.indexOf('message') > -1)
              .map(key => Blockly.Bricks[blockName][key])
              .filter(value => value.startsWith('%{BKY_'));

            const msgDefParts = msgKeys.flatMap(key => {
              const msgKey = key.split('%{BKY_').pop().split('}')[0];
              return languageObject[msgKey].split(/%\d/g).map(v => v.trim()).filter(v => v.length > 0);
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
        });
      });
    }, languageObject, languageToTest)).toBeFalsy();
  });

  test('Changing language on share page is working', async () => {
    const languageToTest = 'de';
    const testLanguageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));
    const defaultLanguage = 'en';
    const defaultLanguageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${defaultLanguage}.json`));

    expect(await page.evaluate((testLanguageObject, defaultLanguageObject, languageToTest) => {
      const defaultBlock = share.workspace.newBlock("WaitBrick");
      defaultBlock.initSvg();
      defaultBlock.render(false);
      return Blockly.CatblocksMsgs.setLocale(languageToTest)
        .then(() => {
          const testBlock = share.workspace.newBlock("WaitBrick");
          testBlock.initSvg();
          testBlock.render(false);
          return (defaultLanguageObject['CONTROL_WAIT'].startsWith(defaultBlock.getFieldValue())
            && testLanguageObject['CONTROL_WAIT'].startsWith(testBlock.getFieldValue()));
        });
    }, testLanguageObject, defaultLanguageObject, languageToTest)).toBeTruthy();
  });
});