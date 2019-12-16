/**
 * @description Block tests
 */

const utils = require('../commonUtils');
const xmlParser = require('xml2json');

const BLOCK_CATEGORIES = ['motion', 'looks', 'sound', 'event', 'control', 'pen', 'data',
  'drone', 'jumpingSumo', 'arduino', 'raspi', 'phiro', 'legoEV3', 'legoNXT'];
const TOOLBOX_DEFINITION = 'Blockly.Blocks.defaultToolbox =';


/**
 * Parse all defined blocks from BLOCK_CATEGORIES
 */
const BLOCKS = (function() {
  let result = {};
  BLOCK_CATEGORIES.forEach(category => {
    result[category] = utils.parseBlockCategoryFile(category);
  });
  return result;
})();

/**
 * Parse toolbox xml to json object
 */
const TOOLBOX = (function() {
  const payload = utils.readFileSync(utils.PATHS.TOOLBOX).toString().split(TOOLBOX_DEFINITION)[1];
  if (payload.length === 0) return undefined;

  eval(`var toolboxString = ${payload}`);
  const toolbox = JSON.parse(xmlParser.toJson(toolboxString)).xml.category;

  let result = {};
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
        let block = BLOCKS[categoryName][blockName];
        let blockMsgParts = block['message0'].split('.');
        let blockMsgName = blockMsgParts[blockMsgParts.length - 1];

        // verify if it exists
        expect(BLOCK_MSG_MAPPINGS[blockMsgName]).not.toBeUndefined();

        let defArgs = Object.keys(block).filter(key => {
          if (key.indexOf('args') > -1) {
            if (block[key].length === 0) return false;
            return ['field_dropdown', 'field_number', 'field_input'].includes(block[key][0]['type']);
          }
          return false;
        });
        let msgArgs = BLOCK_MSG_MAPPINGS[blockMsgName].match(/\%\d+/) || [];
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
        let block = BLOCKS[categoryName][blockName];
        let blockMsgParts = block['message0'].split('.');
        let blockMsgName = blockMsgParts[blockMsgParts.length - 1];

        let defArgs = Object.keys(block).filter(key => {
          if (key.indexOf('args') > -1) {
            if (block[key].length === 0) return false;
            return ['field_dropdown', 'field_number', 'field_input'].includes(block[key][0]['type']);
          }
          return false;
        });
        let msgArgs = BLOCK_MSG_MAPPINGS[blockMsgName].match(/\%\d+/) || [];
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

        let catBlocks = TOOLBOX[categoryName].block.map(block => block.type);
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
   * Test if Scratch-Blocks got initialized properly
   */
  describe('Workspace initialization', () => {
    let workspaceBlocks = {};

    beforeEach(async () => {
      await page.goto(`${SERVER}${utils.WORKSPACE_URL}`, { waitUntil: 'domcontentloaded' });

      workspaceBlocks = await page.evaluate(() => {
        let workspaces = {};
        Object.keys(Blockly.Workspace.WorkspaceDB_).forEach(id => {
          if (Blockly.Workspace.WorkspaceDB_[id].toolbox_) {
            workspaces['userWorkspace'] = Object.keys(Blockly.Workspace.WorkspaceDB_[id].blockDB_)
          } else {
            workspaces['toolbox'] = Object.keys(Blockly.Workspace.WorkspaceDB_[id].blockDB_)
          }

        });
        return workspaces;
      });
    });

    /**
     * Check if we have create two workspaces [toolbox, userWorkspace]
     */
    test('Empty workspace is loaded with toolbox', async () => {
      expect(Object.keys(workspaceBlocks).length).toBe(2);
    });

    /**
     * Check if empty userWorkspace and nonEmpty toolbox workspace exists
     */
    test('Found empty userWorkspace and not empty Toolbox', async () => {
      expect(workspaceBlocks['userWorkspace'].length).toBe(0);
      expect(workspaceBlocks['toolbox'].length).toBeGreaterThan(0);
    });

    /**
     * Check if all blocks are rendered in the toolbox
     */
    test('Toolbox includes all Blocks', () => {
      const renderedBlocks = workspaceBlocks['toolbox'];
      const toolboxBlocks = getAllBlocksFromToolbox();

      toolboxBlocks.forEach(blockName => {
        expect(renderedBlocks.includes(blockName)).toBeTruthy();
      });
    });

    /**
     * Check if categories from toolbox rendered properly
     */
    test('Toolbox includes all Categories', async () => {
      const renderedCategories = await page.evaluate(() => Object.keys(Blockly.Categories));
      BLOCK_CATEGORIES.forEach(category => {
        expect(renderedCategories.includes(category)).toBeTruthy();
      })
    });

    /**
     * Check if all blocks are rendered properly
     */
    test('Toolbox rendered all Blocks properly', async () => {
      const failed = await page.evaluate(() => {
        let failedRender = false;

        // first lets get the value for a wrong rendered block
        const wrongBlockPath = (() => {
          let block = blocklyWS.newBlock('someInvalidID');
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
  });

  /**
   * Test if Scratch-Blocks got initialized properly
   */
  describe('Workspace actions', () => {

    test('Add all Blockly from toolbox ones to workspace via JS', async () => {
      const failed = await page.evaluate(() => {
        let failedRender = false;

        // first lets get the value for a wrong rendered block
        const wrongBlockPath = (() => {
          let block = blocklyWS.newBlock('someInvalidID');
          block.initSvg();
          block.render(false);
          return block.svgPath_.outerHTML;
        })();

        // get all blocks available in the toolbox
        const toolboxBlocks = blocklyWS.toolbox_.categoryMenu_.categories_
          .flatMap(cat => cat.contents_.map(block => block.getAttribute('type')));

        // check if we can render each successfully
        toolboxBlocks.forEach(blockName => {
          blocklyWS.clear();
          let block = blocklyWS.newBlock(blockName);
          block.initSvg();
          block.render(false);

          if (block.svgPath_.outerHTML === wrongBlockPath) {
            failedRender = true;
            return failedRender;
          }
        });

        return failedRender;
      });

      expect(failed).toBeFalsy();
    });
  });
});