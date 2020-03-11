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
// #INFO: for local testing use ./../../../
const ROOT_PATH = './';

/**
 * constant paths from project for testing
 */
const PATHS = {
  BLOCKS: 'src/js/blocks/categories/',
  TOOLBOX: 'src/js/blocks/default_toolbox.js',
  MESSAGE_MAPPING: 'i18n/strings_to_json_mapping.json',
  CATROID_MSGS: 'i18n/catroid_strings/',
  CATBLOCKS_MSGS: 'i18n/json/',
  CATBLOCKS_MSG: 'src/js/catblocks_msgs.js'
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
    parsedBlocks[blockName] = JSON.parse(blockBody);
  }

  return parsedBlocks;
}

module.exports = {
  ROOT_PATH,
  PATHS,
  isString,
  isNotEmptyString,
  listDirectorySync,
  readFileSync,
  parseBlockCategoryFile
};