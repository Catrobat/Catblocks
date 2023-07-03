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
    .set('WhenRaspiPinChangedBrick', 'RaspiInterruptScript')
    .set('WhenNfcBrick', 'WhenNfcScript')
    .set('WhenGamepadButtonBrick', 'WhenGamepadButtonScript')
    .set('UserDefinedReceiverBrick', 'UserDefinedScript');
};

export const scriptBricks = [
  'WhenClonedScript',
  'StartScript',
  'WhenScript',
  'WhenTouchDownScript',
  'BroadcastScript',
  'WhenConditionScript',
  'WhenBounceOffScript',
  'WhenBackgroundChangesScript',
  'UserDefinedScript',
  'EmptyScript',
  'RaspiInterruptScript',
  'WhenNfcScript',
  'WhenGamepadButtonScript'
];

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
    if (scriptBricks.includes(blockName)) {
      this.hat = 'cap';
    } else {
      this.setPreviousStatement(true, 'CatBlocksBrick');
    }
    this.setNextStatement(true, 'CatBlocksBrick');
  };
};

/**
 * @param {Array<string>} [cats]
 * @param {Blockly} [blockly]
 * @param {boolean} [advancedMode]
 */
const loadBricks = (cats = categories, blockly = Blockly, advancedMode = false) => {
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
          if (scriptBricks.includes(brickName)) {
            this.setNextStatement(false);
          }
        }
      };
    }
  }
};

/**
 * @param {boolean} advancedMode
 */
export function initBricks(advancedMode) {
  removeAllBricks(Blockly);
  loadBricks(categories, Blockly, advancedMode);
  initCatblocksColours();
}
