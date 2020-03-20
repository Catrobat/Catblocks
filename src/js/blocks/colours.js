/**
 * @description Catblocks color codes
 */

import Blockly from 'scratch-blocks';

'use strict';

const colourCodes = {
  'arduino': { primary: '#34c8a5', secondary: '#299377', tertiary: '#238770' },
  'control': { primary: '#FFAB19', secondary: '#e39613', tertiary: '#CF8B17' },
  'data': { primary: '#FF6680', secondary: '#ce4562', tertiary: '#FF3355' },
  'drone': { primary: '#91d149', secondary: '#6d9c36', tertiary: '#669334' },
  'event': { primary: '#FF661A', secondary: '#d44c00', tertiary: '#E64D00' },
  'jumpingSumo': { primary: '#91d149', secondary: '#6d9c36', tertiary: '#669334' },
  'legoEV3': { primary: '#cbca3e', secondary: '#aead38', tertiary: '#acab34' },
  'legoNXT': { primary: '#cbca3e', secondary: '#aead38', tertiary: '#acab34' },
  'looks': { primary: '#59C059', secondary: '#3c943c', tertiary: '#389438' },
  'motion': { primary: '#4C97FF', secondary: '#386bb8', tertiary: '#3373CC' },
  'pen': { primary: '#0fBD8C', secondary: '#0b8965', tertiary: '#0B8E69' },
  'phiro': { primary: '#34c8a5', secondary: '#299377', tertiary: '#238770' },
  'raspi': { primary: '#34c8a5', secondary: '#299377', tertiary: '#238770' },
  'sound': { primary: '#9966FF', secondary: '#6c51b4', tertiary: '#774DCB' },
  'stitch': { primary: '#BC4793', secondary: '#bb3a8d', tertiary: '#b72a86' },
  'default': { primary: '#34c8a5', secondary: '#299377', tertiary: '#238770' }
};

/**
 * Initiate colour codes for catblocks bricks
 *  if no colour code is defined yet, we use the default one
 * @param {*} colours
 * @param {*} blockly 
 */
const initCatblocksColours = (colours = colourCodes, blockly = Blockly) => {
  if (colours) {
    if (Object.keys(blockly.Categories).length > 0) {
      for (const catName in blockly.Categories) {
        console.debug(`Init colour for category: ${catName}`);
        const colourName = colours[catName] ? catName : 'default';
        blockly.Colours[catName] = colours[colourName];
        // INFO: only due to old scratch-block version
        if (!blockly.Extensions.ALL_[`colours_${catName}`]) {
          blockly.Extensions.register(`colours_${catName}`, blockly.ScratchBlocks.VerticalExtensions.colourHelper(colourName));
        }
      }
    } else {
      console.warn('No categories registerd, maybe you have missed to load some bricks');
    }
  } else {
    console.error('Failed to initiate colours, because undefined or null options passed in params');
  }
};


(() => {
  initCatblocksColours(colourCodes, Blockly);
})();