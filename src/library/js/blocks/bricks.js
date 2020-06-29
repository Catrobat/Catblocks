/**
 * Define all catrobat supported categories
 */

import Blockly from 'blockly';
import categories from './categories';

/**
 * Remove all bricks from Blockly instance
 * @param {*} blockly
 */
const removeAllBricks = (blockly = Blockly) => {
  ['Blocks', 'Bricks', 'Categories'].forEach(obj => {
    if (blockly[obj]) {
      Object.keys(blockly[obj]).forEach(elem => {
        delete blockly[obj][elem];
      });
    } else {
      blockly[obj] = {};
    }
  });
};

/**
 * Shape bricks extention
 */
const shapeBricksExtention = () => {
  return function () {
    const blockName = this.type;
    // TODO: please find a better logic than this
    if (
      [
        'WhenClonedScript',
        'StartScript',
        'WhenScript',
        'WhenTouchDownScript',
        'BroadcastScript',
        'WhenConditionScript',
        'WhenBounceOffScript',
        'WhenBackgroundChangesScript',
        'WhenRaspiPinChangedBrick'
      ].includes(blockName)
    ) {
      this.hat = 'cap';
    } else {
      this.setPreviousStatement(true, null);
    }
    this.setNextStatement(true, null);
  };
};

/**
 * Load all bricks from cats into Blockly
 * @param {*} cats
 * @param {*} blockly
 */
const loadBricks = (cats = categories, blockly = Blockly) => {
  blockly.Extensions.register(`shapeBrick`, shapeBricksExtention());

  for (const catName in cats) {
    const cat = cats[catName];
    blockly.Categories[catName] = [];
    for (const brickName in cat) {
      const brickBody = cat[brickName];
      brickBody['category'] = catName;
      if (Array.isArray(brickBody['extensions'])) {
        brickBody['extensions'] = brickBody['extensions'].concat(['shapeBrick']);
      } else {
        brickBody['extensions'] = ['shapeBrick'];
      }

      blockly.Bricks[brickName] = brickBody;
      blockly.Categories[catName].push(brickName);
      blockly.Blocks[brickName] = {
        init: function () {
          this.jsonInit(blockly.Bricks[brickName]);
        }
      };
    }
  }
};

/**
 * Init bricks for blockly
 * @param {*} blockly
 */
const initBricks = (blockly = Blockly) => {
  removeAllBricks(blockly);
  loadBricks(categories, blockly);
};

/**
 * Main brick function
 */
(() => {
  initBricks();
})();
