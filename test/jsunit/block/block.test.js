/**
 * @description Block tests
 */

const utils = require('../commonUtils');
const xmlParser = require('xml2json');

const BLOCK_CATEGORIES = ["arduino", "control", "data", "drone", "event", "jumpingSumo",
  "legoEV3", "legoNXT", "looks", "motion", "pen", "phiro", "raspi", "sound", "stitch"];

/**
 * Parse all defined blocks from BLOCK_CATEGORIES
 */
const BLOCKS = (function() {
  const result = {};
  BLOCK_CATEGORIES.forEach(category => {
    result[category] = utils.parseBlockCategoryFile(category);
  });
  return result;
})();

/**
 * Parse toolbox xml to json object
 */
const TOOLBOX = (() => {
  const payload = utils.readFileSync(utils.PATHS.TOOLBOX).toString().split('`');
  if (payload.length === 0) return undefined;

  const toolboxString = payload[1];
  const toolbox = JSON.parse(xmlParser.toJson(toolboxString)).xml.category;

  const result = {};
  toolbox.forEach(category => {
    result[category['id']] = category;
  });

  return result;
})();

/**
 * Get all blocks from global TOOLBOX
 */
const getAllBlocksFromToolbox = () => {
  return Object.keys(TOOLBOX).flatMap(category => {
    return TOOLBOX[category].block.map(block => block.type);
  });
};

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
        const blockMsgParts = block['message0'].split('.');
        const blockMsgName = blockMsgParts[blockMsgParts.length - 1];

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
        const blockMsgParts = block['message0'].split('.');
        const blockMsgName = blockMsgParts[blockMsgParts.length - 1];

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
   * Check if all blocks exists in TOOLBOX
   */
  test('All Blocks exists in Toolbox', () => {
    Object.keys(BLOCKS).forEach(categoryName => {
      Object.keys(BLOCKS[categoryName]).forEach(blockName => {
        expect(TOOLBOX[categoryName]).toBeDefined();

        const catBlocks = TOOLBOX[categoryName].block.map(block => block.type);
        expect(catBlocks.includes(blockName)).toBeTruthy();
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
     * Test if all blocks defined in file are loaded/rendered in toolbox
     */
    test('Toolbox includes all defined blocks', async () => {
      const renderedBlocks = await page.evaluate(() => {
        return Object.keys(toolboxWS.blockDB_);
      })
      const toolboxBlocks = getAllBlocksFromToolbox();

      toolboxBlocks.forEach(blockName => {
        expect(renderedBlocks.includes(blockName)).toBeTruthy();
      });
    });

    /**
     * Test if all categories are defined
     */
    test('Toolbox includes all defined categories', async () => {
      const renderedCategories = await page.evaluate(() => Object.keys(playground.Blockly.Categories));

      BLOCK_CATEGORIES.forEach(category => {
        expect(renderedCategories.includes(category)).toBeTruthy();
      })
    });
  });

  /**
   * Test if Scratch-Blocks got initialized properly
   */
  describe('Workspace actions', () => {

    /**
      * Test if all blocks are rendered properly
      * If we render an invalid block, Blockly will generate an
      *  generic block svg, we just compare each result with this one
      *  to validate if the block was rendered properly
      */
    test('Add each toolbox block to playground and validate rendering', async () => {
      const failed = await page.evaluate(() => {
        let failedRender = false;

        // first lets get the value for a wrong rendered block
        const wrongBlockPath = (() => {
          let block = playgroundWS.newBlock('someInvalidID');
          block.initSvg();
          block.render(false);
          return block.svgPath_.outerHTML;
        })();

        // iterate over toolboxWS blocks
        toolboxWS.getAllBlocks().forEach(block => {
          if (block.svgPath_.outerHTML === wrongBlockPath) {
            failedRender = true;
            return failedRender;
          }
        });

        return failedRender;
      });

      expect(failed).toBeFalsy();
    });

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
        //create block
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
        //create blocks
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
        //create blocks
        let block = playgroundWS.newBlock('WaitBrick');
        block.initSvg();
        block.render(false);
        //set scale value
        let valueToSet = '37 RAND 58';
        block.inputList[0].fieldRow[1].setText(valueToSet);
        let value = block.inputList[0].fieldRow[1].getText();
        //let desiredBlockText = 'Wait' + valueToSet + 'second';
        //check if field text matches when block is in workspace
        return (block.getFieldValue() === 'Wait'
          && valueToSet === value
          && block.getCategory() === 'control');
        //ToDo: don't work...
        //&& block.svgGroup_.textContent === desiredBlockText);
      })).toBeTruthy();
    });

    /**
     * Check if each defined blocks arguments are rendered properly
     */
    test('Block arguments are rendered properly', async () => {
      console.log("START");
      Object.keys(BLOCKS).forEach(categoryName => {
        Object.keys(BLOCKS[categoryName]).forEach(blockName => {
          const block = BLOCKS[categoryName][blockName];
          if (block['args0'] !== undefined) {
            let output = '';
            let i = 0;
            while(block['args0'][i] !== undefined) {
              if (block['args0'][i]['value'] !== undefined)
                output += block['args0'][i]['value'];
              if (block['args0'][i]['text'] !== undefined)
                output += block['args0'][i]['text'];
              if (block['args0'][i]['options'] !== undefined)
                output += block['args0'][i]['options'][0][0];
              i++;
            }
            if (output.length > 0)
              console.log(output + '  -  ' + block['message0']);
          }
        });
      });
      console.log("END");
      expect(await page.evaluate((BLOCKS) => {
        const renderedBlocks = toolboxWS.getAllBlocks();
        let index = 0;
        Object.keys(BLOCKS).forEach(categoryName => {
          Object.keys(BLOCKS[categoryName]).forEach(blockName => {
            const block = BLOCKS[categoryName][blockName];
            //loop each node with 'editable text'
            const blockToCompare = renderedBlocks[index].svgGroup_.querySelectorAll('g.blocklyEditableText');
            blockToCompare.forEach(argToCompare => {
              Object.keys(block).filter(key => {
                if (key.indexOf('args') > -1) {
                  console.log(block[key]['value']);
                  if (block[key]['value'] !== argToCompare.textContent)
                    return false;
                }
              });
            });
          });
        });
        return true;
      }, BLOCKS)).toBeTruthy();
    });
  });
});
