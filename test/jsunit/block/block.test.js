/**
 * @description Block tests
 */
/* global Test, page */
/* eslint no-global-assign:0 */
'use strict';

const utils = require('../commonUtils');
const fs = require('fs');
const path = require('path');

const BLOCK_CATEGORIES = utils.getCategoryList();
/**
 * Parse all defined blocks from BLOCK_CATEGORIES
 */
const BLOCKS = (function () {
  const result = {};
  BLOCK_CATEGORIES.map(category => {
    result[category] = utils.parseBlockCategoryFile(category);
  });
  return result;
})();

/**
 * Load block messages mapping
 */
const BLOCK_MSG_MAPPINGS = JSON.parse(utils.readFileSync(utils.PATHS.MESSAGE_MAPPING).toString());

/**
 * Check if everything exists on filesystem level
 */
describe('Filesystem Block tests', () => {
  test('Block Messages exists in i18n/strings_to_json_mapping.json', () => {
    Object.keys(BLOCKS).forEach(categoryName => {
      Object.keys(BLOCKS[categoryName]).forEach(blockName => {
        const block = BLOCKS[categoryName][blockName];
        const blockMsg = block.message0;

        if (blockName == 'EmptyScript') {
          return blockMsg == ' ';
        }

        const blockMsgName = blockMsg.substring(6, blockMsg.length - 1);
        // verify if it exists
        expect(BLOCK_MSG_MAPPINGS[blockMsgName]).not.toBeUndefined();

        const defArgs = Object.keys(block).filter(key => {
          if (key.indexOf('args') > -1) {
            if (block[key].length === 0) {
              return false;
            }
            return ['field_dropdown', 'field_number', 'field_input'].includes(block[key][0]['type']);
          }
          return false;
        });
        const msgArgs = BLOCK_MSG_MAPPINGS[blockMsgName].match(/%\d+/) || [];
        if (blockName === 'ParameterizedBrick') {
          const blockMsg2 = block.message2;
          const blockMsgName2 = blockMsg2.substring(6, blockMsg2.length - 1);
          msgArgs.push(BLOCK_MSG_MAPPINGS[blockMsgName2].match(/%\d+/) || []);
        }
        expect(defArgs.length).toBe(msgArgs.length);
      });
    });
  });

  test('Block argsCount match with i18n/strings_to_json_mapping.json', () => {
    Object.keys(BLOCKS).forEach(categoryName => {
      Object.keys(BLOCKS[categoryName]).forEach(blockName => {
        const block = BLOCKS[categoryName][blockName];
        const blockMsg = block.message0;

        if (blockName == 'EmptyScript') {
          return blockMsg == ' ';
        }

        const blockMsgName = blockMsg.substring(6, blockMsg.length - 1);

        const defArgs = Object.keys(block).filter(key => {
          if (key.indexOf('args') > -1) {
            if (block[key].length === 0) {
              return false;
            }
            return ['field_dropdown', 'field_number', 'field_input'].includes(block[key][0]['type']);
          }
          return false;
        });
        const msgArgs = BLOCK_MSG_MAPPINGS[blockMsgName].match(/%\d+/) || [];
        if (blockName === 'ParameterizedBrick') {
          const blockMsg2 = block.message2;
          const blockMsgName2 = blockMsg2.substring(6, blockMsg2.length - 1);
          msgArgs.push(BLOCK_MSG_MAPPINGS[blockMsgName2].match(/%\d+/) || []);
        }
        expect(defArgs).toHaveLength(msgArgs.length);
      });
    });
  });
});

describe('WebView Block tests', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });
    page.on('console', message => {
      if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
        console.log(message.text());
      }
    });

    await page.evaluate(async () => {
      await Test.CatBlocks.init({
        container: 'share',
        renderSize: 0.75,
        shareRoot: '',
        media: 'media/',
        language: 'en',
        rtl: false,
        noImageFound: 'No_Image_Available.jpg',
        advancedMode: false
      });

      Test.Playground.workspace = Test.Blockly.inject('playworkspace', {
        media: '../media/',
        zoom: { startScale: 0.75 },
        toolbox: Test.Playground.getToolbox(true),
        renderer: 'zelos'
      });

      const share = Test.CatBlocks.getInstance().share;
      const toolbox = Test.Blockly.Workspace.getAll().find(
        ws => ![share.workspace.id, Test.Playground.workspace.id].includes(ws.id)
      );
      Test.Toolbox = {
        workspace: toolbox
      };
      Test.Share = share;
    });

    await page.evaluate(() => {
      // function to JSON.stringify circular objects
      window.shallowJSON = (obj, indent = 2) => {
        let cache = [];
        const retVal = JSON.stringify(
          obj,
          (key, value) =>
            typeof value === 'object' && value !== null
              ? cache.includes(value)
                ? undefined // Duplicate reference found, discard key
                : cache.push(value) && value // Store value in our collection
              : value,
          indent
        );
        cache = null;
        return retVal;
      };
    });
  });

  describe('Workspace initialization', () => {
    beforeEach(async () => {
      // clean workspace before each test
      await page.evaluate(() => {
        Test.Playground.workspace.clear();
      });
    });

    test('Playground workspace is loaded', async () => {
      const workspaceJSON = await page.evaluate(() => {
        return window.shallowJSON(Test.Playground.workspace);
      });
      const workspace = JSON.parse(workspaceJSON);
      expect(workspace).not.toBeNull();
      expect(typeof workspace).toBe('object');
    });

    test('Playground blockDB is empty', async () => {
      const blocksJSON = await page.evaluate(() => {
        return window.shallowJSON(Test.Playground.workspace.getAllBlocks());
      });
      const blocks = JSON.parse(blocksJSON);
      expect(Object.keys(blocks)).toHaveLength(0);
    });

    test('Playground toolbox workspace is loaded', async () => {
      const workspaceJSON = await page.evaluate(() => {
        return window.shallowJSON(Test.Toolbox.workspace);
      });
      const workspace = JSON.parse(workspaceJSON);
      expect(workspace).not.toBeNull();
      expect(typeof workspace).toBe('object');
    });

    test('Playground toolbox blockDB is not empty', async () => {
      const blockJSON = await page.evaluate(() => {
        if (!Test.Toolbox.workspace) {
          return false;
        }
        return window.shallowJSON(Test.Toolbox.workspace.getAllBlocks());
      });

      const block = JSON.parse(blockJSON);
      expect(Object.keys(block)).not.toHaveLength(0);
    });

    test('Blockly loaded all categories', async () => {
      const blockJSON = await page.evaluate(() => {
        return window.shallowJSON(Test.Blockly.Categories);
      });

      const blocksCategories = JSON.parse(blockJSON);
      for (const cat of BLOCK_CATEGORIES) {
        expect(blocksCategories[cat]).toBeDefined();
      }
    });

    test('Blockly includes all blocks', async () => {
      const blockJSON = await page.evaluate(() => {
        return window.shallowJSON(Test.Blockly.Bricks);
      });

      const bricks = JSON.parse(blockJSON);

      const allBlocks = (() => {
        const blocks = [];
        Object.keys(BLOCKS).forEach(categoryName => {
          Object.keys(BLOCKS[categoryName]).forEach(blockName => {
            blocks.push(blockName);
          });
        });
        return blocks;
      })();

      for (const blockName of allBlocks) {
        expect(bricks[blockName]).toBeDefined();
      }
    });

    test('All Blocks exists in Toolbox', async () => {
      const allBlocks = (() => {
        const blocks = [];
        Object.keys(BLOCKS).forEach(categoryName => {
          Object.keys(BLOCKS[categoryName]).forEach(blockName => {
            blocks.push(blockName);
          });
        });
        return blocks;
      })();

      const result = await page.evaluate(pAllBlocks => {
        for (const blockName of pAllBlocks) {
          if (Test.Toolbox.workspace.getBlocksByType(blockName).length === 0) {
            return false;
          }
        }
        return true;
      }, allBlocks);
      expect(result).toBeTruthy();
    });
  });

  describe('Workspace actions', () => {
    test('All icons available and rendered', async () => {
      const imgHref = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('svg.blocklyFlyout image')).map(node => node.href.baseVal);
      });

      const statusCodes = await page.evaluate(async hrefs => {
        const codes = [];
        for (const href of hrefs) {
          const res = await fetch(href);
          codes.push(res.status);
        }
        return codes;
      }, imgHref);

      expect(statusCodes.includes(404)).toBeFalsy();
    });

    test('formula blocks (without child) are rendered properly', async () => {
      const languageToTest = 'en';
      const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));
      const blockText = languageObject['LOOKS_CHANGEBRIGHTHNESSBY'].replace('%1', 'unset ').replace('%2', '(i)').trim();

      const [blockFieldValue, refValue, value] = await page.evaluate(() => {
        const block = Test.Playground.workspace.newBlock('ChangeBrightnessByNBrick');
        block.initSvg();
        block.render(false);
        //get default scale value
        const refValue = Test.Blockly.Bricks['ChangeBrightnessByNBrick'].args0[0].text;
        const value = block.inputList[0].fieldRow[1].getText();

        return [block.toString(), refValue, value];
      });

      expect(blockFieldValue).toBe(blockText);
      expect(refValue).toBe(value);
    });

    test('formula blocks (with left child) are rendered properly', async () => {
      const languageToTest = 'en';
      const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));
      const blockText = languageObject['LOOKS_CHANGEBRIGHTHNESSBY'].replace('%1', '-1 ').replace('%2', '(i)').trim();

      const valueToSet = '-1';

      const [blockFieldValue, value] = await page.evaluate(pValue => {
        const block = Test.Playground.workspace.newBlock('ChangeBrightnessByNBrick');
        block.initSvg();
        block.render(false);
        //set scale value

        block.inputList[0].fieldRow[1].setValue(pValue);
        const value = block.inputList[0].fieldRow[1].getValue().toString();
        return [block.toString(), value];
      }, valueToSet);

      expect(blockFieldValue).toBe(blockText);
      expect(valueToSet).toBe(value);
    });

    test('formula blocks (with left and right child) are rendered properly', async () => {
      const languageToTest = 'en';
      const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));
      const blockText = languageObject['CONTROL_WAIT'].trim();

      const valueToSet = '37';
      const desiredBlockText = blockText.replace('%1', valueToSet).replace('%2', '').replace(/\s/g, '');

      const [value, blockContent] = await page.evaluate(pValue => {
        const block = Test.Playground.workspace.newBlock('WaitBrick');
        block.initSvg();
        block.render(false);
        //set scale value

        block.inputList[0].fieldRow[1].setValue(pValue);
        const value = block.inputList[0].fieldRow[1].getValue().toString();

        //check if field text matches when block is in workspace
        return [value, block.svgGroup_.textContent.replace(/\s/g, '')];
      }, valueToSet);

      expect(valueToSet).toBe(value);
      expect(desiredBlockText).toBe(blockContent);
    });

    test('check if zebra is working properly', async () => {
      const [color1, color2, color3] = await page.evaluate(() => {
        const topBlock = Test.Playground.workspace.newBlock('WaitBrick');
        topBlock.childBlocks_.push(Test.Playground.workspace.newBlock('WaitBrick'));
        topBlock.childBlocks_[0].childBlocks_.push(Test.Playground.workspace.newBlock('WaitBrick'));
        topBlock.childBlocks_[0].childBlocks_[0].childBlocks_.push(Test.Playground.workspace.newBlock('WaitBrick'));
        Test.Playground.zebra();
        return [topBlock.colour_, topBlock.childBlocks_[0].colour_, topBlock.childBlocks_[0].childBlocks_[0].colour_];
      });

      expect(color1).toBe(color3);
      expect(color1).not.toBe(color2);
    });

    test('Block arguments are rendered properly', async () => {
      // checks for same argument count of toolbox blocks and BLOCKS
      expect.hasAssertions();

      const allRenderedBlocksJSON = await page.evaluate(() => {
        const blocks = Test.Toolbox.workspace.getAllBlocks();

        const returnArray = [];
        for (const block of blocks) {
          const currentObj = block.svgGroup_.querySelectorAll('g.blocklyEditableText');
          const parameterArray = [];

          // extract arguments of blocks
          for (const node of currentObj) {
            parameterArray.push({ textContent: node.textContent });
          }

          returnArray.push(parameterArray);
        }

        return window.shallowJSON(returnArray);
      });

      const allRenderedBlocks = JSON.parse(allRenderedBlocksJSON);

      for (const renderedBlock of allRenderedBlocks) {
        let returnStatus = false;
        for (const categoryName in BLOCKS) {
          if (Object.hasOwnProperty.call(BLOCKS, categoryName)) {
            for (const blockName in BLOCKS[categoryName]) {
              if (Object.hasOwnProperty.call(BLOCKS[categoryName], blockName)) {
                const jsBlock = BLOCKS[categoryName][blockName];
                //get args from js-files (in blocks/categories directory)
                const allJsArguments = [];
                if (jsBlock['args0'] !== undefined) {
                  let jsBlockIndex = 0;
                  while (jsBlock['args0'][jsBlockIndex] !== undefined) {
                    if (jsBlock['args0'][jsBlockIndex]['value'] !== undefined) {
                      allJsArguments.push(jsBlock['args0'][jsBlockIndex]['value']);
                    }
                    if (jsBlock['args0'][jsBlockIndex]['text'] !== undefined) {
                      // this is needed for blocks where the default value is a string from the strings_to_json mapping
                      if (jsBlock['args0'][jsBlockIndex]['text'].includes('%{BKY')) {
                        const stringReplace = jsBlock['args0'][jsBlockIndex]['text']
                          .replace('%{BKY_', '')
                          .replace('}', '');
                        const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}en.json`));
                        const jsonArgument = languageObject[stringReplace];
                        allJsArguments.push(jsonArgument);
                      } else {
                        allJsArguments.push(jsBlock['args0'][jsBlockIndex]['text']);
                      }
                    }
                    if (jsBlock['args0'][jsBlockIndex]['options'] !== undefined) {
                      allJsArguments.push(jsBlock['args0'][jsBlockIndex]['options'][0][0]);
                    }
                    jsBlockIndex++;
                  }
                }
                if (jsBlock['args2'] !== undefined) {
                  let jsBlockIndex = 0;
                  while (jsBlock['args2'][jsBlockIndex] !== undefined) {
                    if (jsBlock['args2'][jsBlockIndex]['value'] !== undefined) {
                      allJsArguments.push(jsBlock['args2'][jsBlockIndex]['value']);
                    }
                    if (jsBlock['args2'][jsBlockIndex]['text'] !== undefined) {
                      allJsArguments.push(jsBlock['args2'][jsBlockIndex]['text']);
                    }
                    if (jsBlock['args2'][jsBlockIndex]['options'] !== undefined) {
                      allJsArguments.push(jsBlock['args2'][jsBlockIndex]['options'][0][0]);
                    }
                    jsBlockIndex++;
                  }
                }
                if (allJsArguments.length !== Object.keys(renderedBlock).length) {
                  continue;
                }

                let check = true;
                //check if rendered arguments and js arguments are equal
                for (let argIndex = 0; argIndex < renderedBlock.length; argIndex++) {
                  const jsArgument = allJsArguments[argIndex].toString().trim().replace(/\s/g, ' ');
                  const renderedArgument = renderedBlock[argIndex].textContent.trim().replace(/\s/g, ' ');

                  if (jsArgument !== renderedArgument) {
                    check = false;
                  }
                }
                if (!check) {
                  continue;
                }

                returnStatus = true;
                break;
              }
            }

            if (returnStatus) {
              break;
            }
          }
        }

        expect(returnStatus).toBeTruthy();
      }
    });
  });
});

describe('Catroid Block IDs', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });
    page.on('console', message => {
      if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
        console.log(message.text());
      }
    });
    page.evaluate(() => {
      // function to JSON.stringify circular objects
      window.shallowJSON = (obj, indent = 2) => {
        let cache = [];
        const retVal = JSON.stringify(
          obj,
          (key, value) =>
            typeof value === 'object' && value !== null
              ? cache.includes(value)
                ? undefined // Duplicate reference found, discard key
                : cache.push(value) && value // Store value in our collection
              : value,
          indent
        );
        cache = null;
        return retVal;
      };
    });
  });

  test('UserDefinedBrick IDs', async () => {
    const programXML = fs.readFileSync(path.resolve(__dirname, '../../programs/udb_nested_recursion.xml'), 'utf8');

    await page.evaluate(async () => {
      await Test.CatroidCatBlocks.init({
        container: 'catroid',
        renderSize: 0.75,
        language: 'en',
        shareRoot: '',
        media: 'media/',
        noImageFound: 'No_Image_Available.jpg',
        renderLooks: false,
        renderSounds: false,
        readOnly: false
      });
    });

    await page.evaluate(async pProgramXML => {
      await Test.CatroidCatBlocks.render(pProgramXML, 'Scene', 'testSprite');
    }, programXML);

    const checkQuerySelectorExistence = async function (querySelector) {
      const brickContent = await page.$eval(querySelector, node => node.innerHTML);
      expect(typeof brickContent).toBe('string');
      expect(brickContent.length).not.toBe(0);
    };

    const firstQueryBase = '#UserDefinedScript-0 #IfLogicBeginBrick-0 ';
    await checkQuerySelectorExistence(firstQueryBase + '#UserDefinedScript-0-Call-0');
    await checkQuerySelectorExistence(firstQueryBase + '#UserDefinedScript-0-Call-1');
    await checkQuerySelectorExistence(firstQueryBase + '#UserDefinedScript-1-Call-0');

    const secondQueryBase = '#UserDefinedScript-1 #IfLogicBeginBrick-1 ';
    await checkQuerySelectorExistence(secondQueryBase + '#UserDefinedScript-1-Call-1');
    await checkQuerySelectorExistence(secondQueryBase + '#UserDefinedScript-1-Call-2');
    await checkQuerySelectorExistence(secondQueryBase + '#UserDefinedScript-0-Call-2');
  });
});
