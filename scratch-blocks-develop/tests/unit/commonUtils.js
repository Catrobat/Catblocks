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
    BLOCKS: 'blocks_vertical/'
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
    return fs.readdirSync(path.join(this.ROOT_PATH, relPath))
  },
}