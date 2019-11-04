/**
 * @description common utils usefull for unit tests
 */

const path = require('path');
const realfs = require('fs');
const fs = require('graceful-fs');
fs.gracefulify(realfs);

/**
 * root path from catblocks directory
 */
const ROOT_PATH = './';

/**
 * Workspace html file path for unit test
 */
const WORKSPACE_URL = 'tests/jsunit/workspace.html';

/**
 * constant paths from project for testing
 */
const PATHS = {
  BLOCKS: 'blocks_vertical/',
  TOOLBOX: 'blocks_vertical/default_toolbox.js',
  BLOCKLY_COMPRESSED: 'blockly_compressed_vertical.js',
  BLOCKLY_MEDIA: 'media/',
  BLOCKS_COMPRESSED: 'blocks_compressed_vertical.js',
  MESSAGE_MAPPING: 'i18n/strings_to_json_mapping.json',
  WEBPACK: 'dist/web/vertical.js',
  CATROID_MSGS: 'msg/catroid_strings/',
  CATBLOCKS_MSGS: 'msg/json/',
  CATBLOCKS_MSG: 'msg/catblocks_msgs.js'
};
/**
 * Check if variable is string
 * @param {*} variable 
 */
const isString = (variable) => {
  return Object.prototype.toString.call(variable) === "[object String]";
};

/**
 * Check if variable is not empty string
 * @param {*} variable 
 */
const isNotEmptyString = (variable) => {
  return isString(variable) && variable.length > 0 && variable != ""
};

/**
 * List directory from relative path
 * @param {*} relPath 
 */
const listDirectorySync = (relPath) => {
  if (!isNotEmptyString(relPath)) return undefined;
  return fs.readdirSync(path.join(ROOT_PATH, relPath))
};

/**
 * Read file from relative path sync
 * @param {*} relPath 
 */
const readFileSync = (relPath) => {
  if (!isNotEmptyString(relPath)) return undefined;
  return fs.readFileSync(path.join(ROOT_PATH, relPath));
};

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
};

/**
 * Parse the local stored file 
 * @param {*} category 
 */
const parseBlockCategoryFile = (category) => {
  const payload = readFileSync(path.join(PATHS.BLOCKS, `${category}.js`));
  const blocks = payload.toString().split('Blockly.Blocks[\'').slice(1)

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
}

module.exports = {
  ROOT_PATH,
  WORKSPACE_URL,
  PATHS,
  isString,
  isNotEmptyString,
  listDirectorySync,
  readFileSync,
  escapeJsonValues,
  parseBlockCategoryFile
};