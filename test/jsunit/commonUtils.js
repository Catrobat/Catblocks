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
  return isString(variable) && variable.length > 0 && variable != "";
};

/**
 * List directory from relative path
 * @param {*} relPath 
 */
const listDirectorySync = (relPath) => {
  if (!isNotEmptyString(relPath)) return undefined;
  return fs.readdirSync(path.join(ROOT_PATH, relPath));
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
 * Read brick categories from file system
 */
const getCategoryList = () => {
  const files = listDirectorySync(path.join(ROOT_PATH, PATHS.BLOCKS));
  return files
    .map(file => file.split('.')[0])
    .filter(name => !['index'].includes(name));
};

/**
 * Parse the local stored file 
 * @param {*} category 
 */
const parseBlockCategoryFile = (category) => {
  const payload = readFileSync(path.join(PATHS.BLOCKS, `${category}.js`));
  const parts = payload.toString().split('export default');
  if (parts.length !== 2) {
    return undefined;
  }
  const body = parts[1].split(';').join('').split('`').join('"');
  return JSON.parse(body);
};

module.exports = {
  ROOT_PATH,
  PATHS,
  isString,
  isNotEmptyString,
  listDirectorySync,
  readFileSync,
  parseBlockCategoryFile,
  getCategoryList
};