/**
 * @description Catblocks color codes
 */

import Blockly from 'blockly';

('use strict');

const colourCodes = {
  arduino: { colourPrimary: '#26a6ae', colourSecondary: '#218C94', colourTertiary: '#18686E' },
  control: { colourPrimary: '#F99761', colourSecondary: '#BA7049', colourTertiary: '#7A4A30' },
  device: { colourPrimary: '#95750C', colourSecondary: '#7A600A', colourTertiary: '#544207' },
  dummy: { colourPrimary: '#ffffff', colourSecondary: '#ffffff', colourTertiary: '#ffffff' },
  embroidery: { colourPrimary: '#CC73A1', colourSecondary: '#8C4F6E', colourTertiary: '#4D2B3C' },
  event: { colourPrimary: '#CF5717', colourSecondary: '#8F3C10', colourTertiary: '#4F2109' },
  lego: { colourPrimary: '#FECC47', colourSecondary: '#BF9B36', colourTertiary: '#806724' },
  look: { colourPrimary: '#6B9C49', colourSecondary: '#5A823D', colourTertiary: '#3F5C2B' },
  motion: { colourPrimary: '#408AC5', colourSecondary: '#2A5C85', colourTertiary: '#163045' },
  pen: { colourPrimary: '#2F5415', colourSecondary: '#376118', colourTertiary: '#213B0F' },
  phiro: { colourPrimary: '#26a6ae', colourSecondary: '#218C94', colourTertiary: '#18686E' },
  report: { colourPrimary: '#999999', colourSecondary: '#808080', colourTertiary: '#595959' },
  script: { colourPrimary: '#F99761', colourSecondary: '#BA7049', colourTertiary: '#7A4A30' },
  sound: { colourPrimary: '#8F4CBA', colourSecondary: '#5F327A', colourTertiary: '#2D183B' },
  test: { colourPrimary: '#26a6ae', colourSecondary: '#218C94', colourTertiary: '#18686E' },
  user: { colourPrimary: '#999999', colourSecondary: '#808080', colourTertiary: '#595959' },
  userlist: { colourPrimary: '#F14E50', colourSecondary: '#B3393B', colourTertiary: '#732526' },
  uservariables: { colourPrimary: '#F14E50', colourSecondary: '#B3393B', colourTertiary: '#732526' }
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
