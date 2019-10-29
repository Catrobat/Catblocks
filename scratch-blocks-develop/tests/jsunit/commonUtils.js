/**
 * @description common utils usefull for unit tests
 */

const path = require('path');
const realfs = require('fs');
const fs = require('graceful-fs');
fs.gracefulify(realfs);

module.exports = {
  /**
   * root path from catblocks directory
   */
  ROOT_PATH: './',

  /**
   * constant paths from project for testing
   */
  PATHS: {
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
  },

  /**
   * Check if variable is string
   * @param {*} variable 
   */
  isString: function(variable) {
    return Object.prototype.toString.call(variable) === "[object String]";
  },

  /**
   * Check if variable is not empty string
   * @param {*} variable 
   */
  isNotEmptyString: function(variable) {
    return this.isString(variable) && variable.length > 0 && variable != ""
  },

  /**
   * List directory from relative path
   * @param {*} relPath 
   */
  listDirectorySync: function(relPath) {
    if (!this.isNotEmptyString(relPath)) return undefined;
    return fs.readdirSync(path.join(this.ROOT_PATH, relPath))
  },

  /**
   * Read file from relative path sync
   * @param {*} relPath 
   */
  readFileSync: function(relPath) {
    if (!this.isNotEmptyString(relPath)) return undefined;
    return fs.readFileSync(path.join(this.ROOT_PATH, relPath));
  }
}