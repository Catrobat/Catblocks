/**
 * @description Catblocks color codes
 */

import Blockly from 'blockly';

('use strict');

const colourCodes = {
  arduino: { colourPrimary: '#34c8a5', colourSecondary: '#299377', colourTertiary: '#238770' },
  assertions: { colourPrimary: '#26A6AE', colourSecondary: '#3BD7E1', colourTertiary: '#40F2Fd' },
  cast: { colourPrimary: '#866A4E', colourSecondary: '#C1966B', colourTertiary: '#FDC48D' },
  control: { colourPrimary: '#FFAB19', colourSecondary: '#e39613', colourTertiary: '#CF8B17' },
  data: { colourPrimary: '#FF6680', colourSecondary: '#ce4562', colourTertiary: '#FF3355' },
  device: { colourPrimary: '#BDBDBD', colourSecondary: '#A4A4A4', colourTertiary: '#848484' },
  drone: { colourPrimary: '#91d149', colourSecondary: '#6d9c36', colourTertiary: '#669334' },
  event: { colourPrimary: '#FF661A', colourSecondary: '#d44c00', colourTertiary: '#E64D00' },
  jumpingSumo: { colourPrimary: '#91d149', colourSecondary: '#6d9c36', colourTertiary: '#669334' },
  legoEV3: { colourPrimary: '#cbca3e', colourSecondary: '#aead38', colourTertiary: '#acab34' },
  legoNXT: { colourPrimary: '#cbca3e', colourSecondary: '#aead38', colourTertiary: '#acab34' },
  looks: { colourPrimary: '#59C059', colourSecondary: '#3c943c', colourTertiary: '#389438' },
  motion: { colourPrimary: '#4C97FF', colourSecondary: '#386bb8', colourTertiary: '#3373CC' },
  pen: { colourPrimary: '#0fBD8C', colourSecondary: '#0b8965', colourTertiary: '#0B8E69' },
  phiro: { colourPrimary: '#34c8a5', colourSecondary: '#299377', colourTertiary: '#238770' },
  raspi: { colourPrimary: '#34c8a5', colourSecondary: '#299377', colourTertiary: '#238770' },
  sound: { colourPrimary: '#9966FF', colourSecondary: '#6c51b4', colourTertiary: '#774DCB' },
  stitch: { colourPrimary: '#BC4793', colourSecondary: '#bb3a8d', colourTertiary: '#b72a86' },
  user: { colourPrimary: '#bbbbbb', colourSecondary: '#aaaaaa', colourTertiary: '#999999' },
  default: { colourPrimary: '#34c8a5', colourSecondary: '#299377', colourTertiary: '#238770' },
  dummy: { colourPrimary: '#ffffff', colourSecondary: '#ffffff', colourTertiary: '#ffffff' }
};

/**
 * Initiate colour codes for catblocks bricks
 *  if no colour code is defined yet, we use the default one
 * @param {*} colours
 * @param {*} blockly
 */
const initCatblocksColours = (colours = colourCodes, blockly = Blockly) => {
  if (colours) {
    blockly.Colours = {};
    if (Object.keys(blockly.Categories).length > 0) {
      for (const catName in blockly.Categories) {
        const colourName = colours[catName] ? catName : 'default';
        blockly.Colours[catName] = colours[colourName];

        for (const brickName of blockly.Categories[catName]) {
          blockly.Bricks[brickName]['colour'] = colours[colourName]['colourPrimary'];
          blockly.Bricks[brickName]['colourSecondary'] = colours[colourName]['colourSecondary'];
          blockly.Bricks[brickName]['colourTertiary'] = colours[colourName]['colourTertiary'];
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
