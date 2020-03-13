/**
 * Define all catrobat supported categories
 * @author andreas.karner@student.tugraz.at
 */

import Blockly from "scratch-blocks";
import categories from "./categories";

// Blockly.Categories = Object.keys(categories).reduce((acc, cur) => ({ ...acc, [cur]: cur }), {});

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
 * Load all bricks from cats into Blockly
 * @param {*} cats 
 * @param {*} blockly
 */
const loadBricks = (cats = categories, blockly = Blockly) => {
  for (const catName in cats) {
    const cat = cats[catName];
    blockly.Categories[catName] = [];
    for (const brickName in cat) {
      const brickBody = cat[brickName];
      blockly.Bricks[brickName] = brickBody;
      blockly.Categories[catName].push(brickName);
      blockly.Blocks[brickName] = {
        init: function() {
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