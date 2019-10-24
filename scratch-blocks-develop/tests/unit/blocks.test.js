/**
 * @description Block tests
 */

const path = require('path');
const utils = require('./commonUtils');


const FILE_BLOCK_DEFINITION = 'Blockly.Blocks[\'';
const BLOCK_CATEGORIES = ['control', 'data', 'event', 'looks', 'motion', 'pen', 'sound'];

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
  const result = {};
  BLOCK_CATEGORIES.forEach(category => {
    result[category] = parseBlockCategoryFile(category);
  });
  return result;
})();

/**
 * Check if each defined blocks has a message0 referenced to Blockly.Msg object
 */
test('Block have Message', () => {
  Object.keys(BLOCKS).forEach(categoryName => {
    Object.keys(BLOCKS[categoryName]).forEach(blockName => {
      let block = BLOCKS[categoryName][blockName];
      expect(block['message0']).toMatch(/Blockly\.Msg/);
    });
  });
});


// /**
//  * Check if the field types from all blocks matching with
//  * the build-in types from Blockly
//  * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/overview
//  */
// test('Blocks FieldTypes', () => {
//   for (category of BLOCK_CATEGORIES) {
//     let catBlocks = parseBlockCategoryFile(category);
//     console.log(catBlocks);
//   }
//   expect(2).toBe(2);
// });