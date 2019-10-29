/**
 * @description Block tests
 */

const path = require('path');
const utils = require('../commonUtils');
const xmlParser = require('xml2json');
const puppeteer = require('puppeteer');

const FILE_BLOCK_DEFINITION = 'Blockly.Blocks[\'';
const BLOCK_CATEGORIES = ['control', 'data', 'event', 'looks', 'motion', 'pen', 'sound'];
const TOOLBOX_DEFINITION = 'Blockly.Blocks.defaultToolbox =';

/**
 * Input is a json serialized as string
 * This funciton will excape all keys and values from the string with a double quoate
 * @param {*} jsonString 
 */
const escapeJsonValues = (jsonString) => {
  return jsonString
    // remove all spaces where no char is lookahead/behind
    .replace(/(?<!\w) +(?!\w)/g, '')
    .replace(/ true /g, 'true')
    .replace(/ false /g, 'false')
    .split('\"').join('')
    .replace(/([^:\{\}\[\]\,]+ ?)+/g, '"$&"')
}

/**
 * Parse the local stored file 
 * @param {*} category 
 */
const parseBlockCategoryFile = (category) => {
  const payload = utils.readFileSync(path.join(utils.PATHS.BLOCKS, `${category}.js`));
  const blocks = payload.toString().split(FILE_BLOCK_DEFINITION).slice(1)

  const parsedBlocks = {};
  for (let block of blocks) {
    let blockName = block.substr(0, block.indexOf('\''));

    let blockBody = block.split('\n').join(' ').match(/this.jsonInit\(\{.*\}\)/);
    if (blockBody.length === 0) return null;

    blockBody = blockBody[0].substr('this.jsonInit('.length).slice(0, -1);
    blockBody = escapeJsonValues(blockBody)
    parsedBlocks[blockName] = JSON.parse(blockBody);
  }

  return parsedBlocks;
};

/**
 * Parse all defined blocks from BLOCK_CATEGORIES
 */
const BLOCKS = (function() {
  let result = {};
  BLOCK_CATEGORIES.forEach(category => {
    result[category] = parseBlockCategoryFile(category);
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
describe('Filesystem Block test', () => {
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
      await page.goto(PATH, { waitUntil: 'domcontentloaded' });

      workspaceBlocks = await page.evaluate(() => {
        let workspaces = {};
        Object.keys(Blockly.Workspace.WorkspaceDB_).forEach(id => {
          workspaces[id] = Object.keys(Blockly.Workspace.WorkspaceDB_[id].blockDB_)
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
     * Check if one empty -> userWorkspace
     *  and one not empty -> toolbox 
     */
    test('Found empty userWorkspace and not empty Toolbox', async () => {
      let foundEmpty = false;
      let foundNotEmpty = false;

      Object.keys(workspaceBlocks).forEach(id => {
        if (workspaceBlocks[id].length === 0) foundEmpty = true;
        else foundNotEmpty = true;
      });

      expect(foundEmpty).toBeTruthy();
      expect(foundNotEmpty).toBeTruthy();
    });

    test('Toolbox rendered all Blocks', () => {
      const renderedBlocks = Object.keys(workspaceBlocks).flatMap(w => workspaceBlocks[w]);
      const toolboxBlocks = getAllBlocksFromToolbox();

      toolboxBlocks.forEach(blockName => {
        expect(renderedBlocks.includes(blockName)).toBeTruthy();
      });
    });
  });
});