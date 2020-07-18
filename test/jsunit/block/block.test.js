/**
 * @description Block tests
 */
/* global playground, page, SERVER, playgroundWS, toolboxWS, Blockly */
/* eslint no-global-assign:0 */
'use strict';

const utils = require('../commonUtils');

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
        expect(defArgs.length).toBe(msgArgs.length);
      });
    });
  });

  test('Block argsCount match with i18n/strings_to_json_mapping.json', () => {
    Object.keys(BLOCKS).forEach(categoryName => {
      Object.keys(BLOCKS[categoryName]).forEach(blockName => {
        const block = BLOCKS[categoryName][blockName];
        const blockMsg = block.message0;
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
        expect(defArgs.length).toBe(msgArgs.length);
      });
    });
  });
});

describe('WebView Block tests', () => {
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
    page.on('console', message => console.log(message.text()));
  });

  describe('Workspace initialization', () => {
    beforeEach(async () => {
      // clean workspace before each test
      await page.evaluate(() => {
        playgroundWS.clear();
      });
      page.on('console', message => console.log(message.text()));
    });

    test('Playground workspace is loaded', async () => {
      expect(
        await page.evaluate(() => {
          return playgroundWS !== undefined && playgroundWS !== null && playgroundWS instanceof Object;
        })
      ).toBeTruthy();
    });

    test('Playground blockDB is empty', async () => {
      expect(
        await page.evaluate(() => {
          if (!playgroundWS) {
            return false;
          }
          return Object.keys(playgroundWS.blockDB_).length === 0;
        })
      ).toBeTruthy();
    });

    test('Playground toolbox workspace is loaded', async () => {
      expect(
        await page.evaluate(() => {
          return toolboxWS !== undefined && toolboxWS !== null && toolboxWS instanceof Object;
        })
      ).toBeTruthy();
    });

    test('Playground toolbox blockDB is not empty', async () => {
      expect(
        await page.evaluate(() => {
          if (!toolboxWS) {
            return false;
          }
          return Object.keys(toolboxWS.blockDB_).length !== 0;
        })
      ).toBeTruthy();
    });

    test('Blockly loaded all categories', async () => {
      expect(
        await page.evaluate(catsFile => {
          for (const cat of catsFile) {
            if (!Blockly.Categories[cat]) {
              return false;
            }
          }
          return true;
        }, BLOCK_CATEGORIES)
      ).toBeTruthy();
    });

    test('Blockly includes all blocks', async () => {
      const allBlocks = (() => {
        const blocks = [];
        Object.keys(BLOCKS).forEach(categoryName => {
          Object.keys(BLOCKS[categoryName]).forEach(blockName => {
            blocks.push(blockName);
          });
        });
        return blocks;
      })();

      expect(
        await page.evaluate(allBlocks => {
          for (const blockName of allBlocks) {
            if (!Blockly.Bricks[blockName]) {
              return false;
            }
          }
          return true;
        }, allBlocks)
      ).toBeTruthy();
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

      expect(
        await page.evaluate(allBlocks => {
          for (const blockName of allBlocks) {
            if (toolboxWS.getBlocksByType(blockName).length === 0) {
              return false;
            }
          }
          return true;
        }, allBlocks)
      ).toBeTruthy();
    });
  });

  describe('Workspace actions', () => {
    test('All icons available and rendered', async () => {
      expect(
        await page.evaluate(() => {
          const imgHref = new Set(
            Array.from(document.querySelectorAll('svg.blocklyFlyout image')).map(node => node.href.baseVal)
          );
          const codes = [];
          imgHref.forEach(href => {
            codes.push(fetch(href).then(res => res.status));
          });

          return Promise.all(codes).then(res => {
            return res.includes(404);
          });
        })
      ).toBeFalsy();
    });

    test('formula blocks (without child) are rendered properly', async () => {
      const languageToTest = 'en';
      const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));
      const blockText = languageObject['LOOKS_CHANGEBRIGHTHNESSBY'].replace('%1', '').trim();
      expect(
        await page.evaluate(blockText => {
          const block = playgroundWS.newBlock('ChangeBrightnessByNBrick');
          block.initSvg();
          block.render(false);
          //get default scale value
          const refValue = Blockly.Bricks['ChangeBrightnessByNBrick'].args0[0].text;
          const value = block.inputList[0].fieldRow[1].getText();
          return block.getFieldValue() === blockText && value === refValue;
        }, blockText)
      ).toBeTruthy();
    });

    test('formula blocks (with left child) are rendered properly', async () => {
      const languageToTest = 'en';
      const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));
      const blockText = languageObject['LOOKS_CHANGEBRIGHTHNESSBY'].replace('%1', '').trim();
      expect(
        await page.evaluate(blockText => {
          const block = playgroundWS.newBlock('ChangeBrightnessByNBrick');
          block.initSvg();
          block.render(false);
          //set scale value
          const valueToSet = '-1';
          block.inputList[0].fieldRow[1].setValue(valueToSet);
          const value = block.inputList[0].fieldRow[1].getValue().toString();
          return block.getFieldValue() === blockText && valueToSet === value;
        }, blockText)
      ).toBeTruthy();
    });

    test('formula blocks (with left and right child) are rendered properly', async () => {
      const languageToTest = 'en';
      const languageObject = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${languageToTest}.json`));
      const blockText = languageObject['CONTROL_WAIT'].trim();
      expect(
        await page.evaluate(blockText => {
          const block = playgroundWS.newBlock('WaitBrick');
          block.initSvg();
          block.render(false);
          //set scale value
          const valueToSet = '37';
          block.inputList[0].fieldRow[1].setValue(valueToSet);
          const value = block.inputList[0].fieldRow[1].getValue().toString();
          let desiredBlockText = blockText.replace('%1', valueToSet);
          desiredBlockText = desiredBlockText.replace(/\s/g, '');
          //check if field text matches when block is in workspace
          return valueToSet === value && block.svgGroup_.textContent.replace(/\s/g, '') === desiredBlockText;
        }, blockText)
      ).toBeTruthy();
    });

    test('check if zebra is working properly', async () => {
      expect(
        await page.evaluate(() => {
          const topBlock = playgroundWS.newBlock('WaitBrick');
          topBlock.childBlocks_.push(playgroundWS.newBlock('WaitBrick'));
          topBlock.childBlocks_[0].childBlocks_.push(playgroundWS.newBlock('WaitBrick'));
          topBlock.childBlocks_[0].childBlocks_[0].childBlocks_.push(playgroundWS.newBlock('WaitBrick'));
          playground.zebra();
          return topBlock.colour_ === topBlock.childBlocks_[0].childBlocks_[0].colour_ && topBlock.colour_ !== topBlock.childBlocks_[0].colour_;
        })
      ).toBeTruthy();
    });

    test('Block arguments are rendered properly', async () => {
      expect(
        await page.evaluate(BLOCKS => {
          const allRenderedBlocks = toolboxWS.getAllBlocks();
          let indexOfBlock = 0;
          let returnStatus = true;
          Object.keys(BLOCKS).forEach(categoryName => {
            Object.keys(BLOCKS[categoryName]).forEach(blockName => {
              const jsBlock = BLOCKS[categoryName][blockName];
              const renderedBlock = allRenderedBlocks[indexOfBlock].svgGroup_.querySelectorAll('g.blocklyEditableText');
              //get args from js-files (in blocks/categories directory)
              const allJsArguments = [];
              if (jsBlock['args0'] !== undefined) {
                let jsBlockIndex = 0;
                while (jsBlock['args0'][jsBlockIndex] !== undefined) {
                  if (jsBlock['args0'][jsBlockIndex]['value'] !== undefined) {
                    allJsArguments.push(jsBlock['args0'][jsBlockIndex]['value']);
                  }
                  if (jsBlock['args0'][jsBlockIndex]['text'] !== undefined) {
                    allJsArguments.push(jsBlock['args0'][jsBlockIndex]['text']);
                  }
                  if (jsBlock['args0'][jsBlockIndex]['options'] !== undefined) {
                    allJsArguments.push(jsBlock['args0'][jsBlockIndex]['options'][0][0]);
                  }
                  jsBlockIndex++;
                }
              }
              if (allJsArguments.length !== renderedBlock.length) {
                returnStatus = false;
              }
              //check if rendered arguments and js arguments are equal
              for (let argIndex = 0; argIndex < renderedBlock.length; argIndex++) {
                const jsArgument = allJsArguments[argIndex].toString().trim().replace(/\s/g, ' ');
                const renderedArgument = renderedBlock[argIndex].textContent.trim().replace(/\s/g, ' ');
                if (jsArgument !== renderedArgument) {
                  returnStatus = false;
                }
              }
              indexOfBlock++;
            });
          });
          return returnStatus;
        }, BLOCKS)
      ).toBeTruthy();
    });
  });
});
