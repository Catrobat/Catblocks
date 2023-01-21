/**
 * Define all catrobat supported categories
 */

import Blockly from 'blockly';
import categories from './categories';
import { initCatblocksColours } from './colours';

export const getBrickScriptMapping = () => {
  return new Map()
    .set('WhenClonedBrick', 'WhenClonedScript')
    .set('WhenStartedBrick', 'StartScript')
    .set('WhenBrick', 'WhenScript')
    .set('WhenTouchDownBrick', 'WhenTouchDownScript')
    .set('BroadcastReceiverBrick', 'BroadcastScript')
    .set('WhenConditionBrick', 'WhenConditionScript')
    .set('WhenBounceOffBrick', 'WhenBounceOffScript')
    .set('WhenBackgroundChangesBrick', 'WhenBackgroundChangesScript')
    .set('WhenRaspiPinChangedBrick', 'RaspiInterruptScript');
};

export const getScriptToBrickMapping = () => {
  const bricksToScripts = getBrickScriptMapping();
  const scriptsToBricks = new Map();

  for (const [key, value] of bricksToScripts) {
    scriptsToBricks.set(value, key);
  }

  return scriptsToBricks;
};

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
        'WhenRaspiPinChangedBrick',
        'UserDefinedScript',
        'EmptyScript',
        'RaspiInterruptScript'
      ].includes(blockName)
    ) {
      this.hat = 'cap';
    } else {
      this.setPreviousStatement(true, 'CatBlocksBrick');
    }
    this.setNextStatement(true, 'CatBlocksBrick');
  };
};

/**
 * Load all bricks from cats into Blockly
 * @param {*} cats
 * @param {*} blockly
 */
const loadBricks = (cats = categories, blockly = Blockly, advancedMode) => {
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
          if (advancedMode) {
            this.setStyle(catName);
          }
        }
      };
    }
  }
};

/**
 * Init bricks for blockly
 * @param {*} blockly
 */
export function initBricks(advancedMode) {
  removeAllBricks(Blockly);
  loadBricks(categories, Blockly, advancedMode);
  initCatblocksColours();
}

/**
 * Main brick function
 */
// (() => {
//   initBricks();
// })();
