/**
 * @description Block tests
 */

'use strict';

const utils = require('../commonUtils');

const BLOCK_CATEGORIES = utils.getCategoryList();

/**
 * Parse all defined blocks from BLOCK_CATEGORIES
 */
const BLOCKS = (function() {
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
  /**
   * Check if each defined blocks has a message0 referenced to BLOCK_MSG_MAPPINGS
   */
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
            if (block[key].length === 0) return false;
            return ['field_dropdown', 'field_number', 'field_input'].includes(block[key][0]['type']);
          }
          return false;
        });
        const msgArgs = BLOCK_MSG_MAPPINGS[blockMsgName].match(/%\d+/) || [];
        expect(defArgs.length).toBe(msgArgs.length);
      });
    });
  });

  /**
   * Check args count in json definition and BLOCK_MSG_MAPPINGS match up
   */
  test('Block argsCount match with i18n/strings_to_json_mapping.json', () => {
    Object.keys(BLOCKS).forEach(categoryName => {
      Object.keys(BLOCKS[categoryName]).forEach(blockName => {
        const block = BLOCKS[categoryName][blockName];
        const blockMsg = block.message0;
        const blockMsgName = blockMsg.substring(6, blockMsg.length - 1);

        const defArgs = Object.keys(block).filter(key => {
          if (key.indexOf('args') > -1) {
            if (block[key].length === 0) return false;
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

/**
 * Check if everything is rendered in Webview
 */
describe('WebView Block tests', () => {

  /**
   * Execute ones in this scope
   */
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
    page.on('console', message => console.log(message.text()));
  });

  /**
   * Test if Scratch-Blocks got initialized properly
   */
  describe('Workspace initialization', () => {

    /**
     * Run before each test in this scope
     */
    beforeEach(async () => {
      // clean workspace before each test
      await page.evaluate(() => {
        playgroundWS.clear();
      });
      page.on('console', (message) => console.log(message.text()));
    });

    /**
     * Test if we playground workspace is loaded
     */
    test('Playground workspace is loaded', async () => {
      expect(await page.evaluate(() => {
        return (playgroundWS !== undefined && playgroundWS !== null && playgroundWS instanceof Object);
      })).toBeTruthy();
    });

    /**
     * Test if playground blockDB is empty
     */
    test('Playground blockDB is empty', async () => {
      expect(await page.evaluate(() => {
        if (!playgroundWS) return false;
        return (Object.keys(playgroundWS.blockDB_).length === 0);
      })).toBeTruthy();
    });

    /**
     * Test if playground toolbox workspace is loaded
     */
    test('Playground toolbox workspace is loaded', async () => {
      expect(await page.evaluate(() => {
        return (toolboxWS !== undefined && toolboxWS !== null && toolboxWS instanceof Object);
      })).toBeTruthy();
    });

    /**
     * Test if playground blockDB is empty
     */
    test('Playground toolbox blockDB is not empty', async () => {
      expect(await page.evaluate(() => {
        if (!toolboxWS) return false;
        return (Object.keys(toolboxWS.blockDB_).length !== 0);
      })).toBeTruthy();
    });

    /**
     * Test if all categories are defined
     */
    test('Blockly loaded all categories', async () => {
      expect(await page.evaluate((catsFile) => {
        for (const cat of catsFile) {
          if (!Blockly.Categories[cat]) return false;
        }
        return true;
      }, BLOCK_CATEGORIES)).toBeTruthy();
    });

    /**
     * Check if all blocks are loaded to blockly
     */
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

      expect(await page.evaluate((allBlocks) => {
        for (const blockName of allBlocks) {
          if (!Blockly.Bricks[blockName]) return false;
        }
        return true;
      }, allBlocks)).toBeTruthy();
    });

    /**
     * Check if all blocks exists in TOOLBOX
     */
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

      expect(await page.evaluate((allBlocks) => {
        for (const blockName of allBlocks) {
          if (toolboxWS.getBlocksByType(blockName).length === 0) return false;
        }
        return true;
      }, allBlocks)).toBeTruthy();
    });
  });

  /**
   * Test if Scratch-Blocks got initialized properly
   */
  describe('Workspace actions', () => {

    /**
     * Test if all icons/media files from the blocks are accessible
     */
    test('All icons available and rendered', async () => {
      expect(await page.evaluate(() => {
        const imgHref = new Set(Array.from(document.querySelectorAll('svg.blocklyFlyout image')).map(node => node.href.baseVal));
        const codes = [];
        imgHref.forEach(href => {
          codes.push(fetch(href).then(res => res.status));
        });

        return Promise.all(codes).then(res => {
          return res.includes(404);
        });
      })).toBeFalsy();
    });

    /**
     * Test if formula blocks (without child) are rendered properly.
     */
    test('formula blocks (without child) are rendered properly', async () => {
      expect(await page.evaluate(() => {
        let block = playgroundWS.newBlock('ChangeBrightnessByNBrick');
        block.initSvg();
        block.render(false);
        //get default scale value
        let value = block.inputList[0].fieldRow[1].getText();
        return (block.getFieldValue() === 'Change brightness  by'
          && value === '50'
          && block.getCategory() === 'looks');
      })).toBeTruthy();
    });

    /**
     * Test if formula blocks (with left child) are rendered properly.
     */
    test('formula blocks (with left child) are rendered properly', async () => {
      expect(await page.evaluate(() => {
        let block = playgroundWS.newBlock('ChangeBrightnessByNBrick');
        block.initSvg();
        block.render(false);
        //set scale value
        let valueToSet = 'MINUS 1';
        block.inputList[0].fieldRow[1].setText(valueToSet);
        let value = block.inputList[0].fieldRow[1].getText();
        return (block.getFieldValue() === 'Change brightness  by'
          && valueToSet === value
          && block.getCategory() === 'looks');
      })).toBeTruthy();
    });

    /**
     * Test if formula blocks (with left and right child) are rendered properly.
     */
    test('formula blocks (with left and right child) are rendered properly', async () => {
      expect(await page.evaluate(() => {
        let block = playgroundWS.newBlock('WaitBrick');
        block.initSvg();
        block.render(false);
        //set scale value
        let valueToSet = '37 RAND 58';
        block.inputList[0].fieldRow[1].setText(valueToSet);
        let value = block.inputList[0].fieldRow[1].getText();
        let desiredBlockText = 'Wait' + valueToSet + 'second';
        desiredBlockText = desiredBlockText.replace(/\s/g, '');
        //check if field text matches when block is in workspace
        return (block.getFieldValue() === 'Wait'
          && valueToSet === value
          && block.getCategory() === 'control'
          && block.svgGroup_.textContent.replace(/\s/g, '') === desiredBlockText);
      })).toBeTruthy();
    });

    /**
     * Check if each defined blocks arguments are rendered properly
     */
    test('Block arguments are rendered properly', async () => {
      expect(await page.evaluate((BLOCKS) => {
        const allRenderedBlocks = toolboxWS.getAllBlocks();
        let indexOfBlock = 0;
        let returnStatus = true;
        Object.keys(BLOCKS).forEach(categoryName => {
          Object.keys(BLOCKS[categoryName]).forEach(blockName => {
            const jsBlock = BLOCKS[categoryName][blockName];
            const renderedBlock = allRenderedBlocks[indexOfBlock].svgGroup_.querySelectorAll('g.blocklyEditableText');
            //get args from js-files (in blocks/categories directory)
            let allJsArguments = [];
            if (jsBlock['args0'] !== undefined) {
              let jsBlockIndex = 0;
              while(jsBlock['args0'][jsBlockIndex] !== undefined) {
                if (jsBlock['args0'][jsBlockIndex]['value'] !== undefined)
                  allJsArguments.push(jsBlock['args0'][jsBlockIndex]['value']);
                if (jsBlock['args0'][jsBlockIndex]['text'] !== undefined)
                  allJsArguments.push(jsBlock['args0'][jsBlockIndex]['text']);
                if (jsBlock['args0'][jsBlockIndex]['options'] !== undefined)
                  allJsArguments.push(jsBlock['args0'][jsBlockIndex]['options'][0][0]);
                jsBlockIndex++;
              }
            }
            if (allJsArguments.length !== renderedBlock.length)
              returnStatus = false;
            //check if rendered arguments and js arguments are equal
            for (let argIndex = 0; argIndex < renderedBlock.length; argIndex++) {
              let jsArgument = allJsArguments[argIndex].trim().replace(/\s/g, '');
              let renderedArgument = renderedBlock[argIndex].textContent.trim().replace(/\s/g, '');
              if (jsArgument !== renderedArgument) {
                returnStatus = false;
                console.log(jsArgument + ' ' + renderedArgument);
              }
            }
            indexOfBlock++;
          });
        });
        return returnStatus;
      }, BLOCKS)).toBeTruthy();
    });
  });
});
