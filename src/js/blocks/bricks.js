/**
 * Define all catrobat supported categories
 * @author andreas.karner@student.tugraz.at
 */

import Blockly from "scratch-blocks";
import categories from "./categories";

Blockly.Categories = Object.keys(categories).reduce((acc, cur) => ({ ...acc, [cur]: cur }), {});

const loadBricks = (cats = categories) => {
  for (const catName in cats) {
    const cat = cats[catName];
    for (const brickName in cat) {
      const brickBody = cat[brickName];
      brickBody['category'] = catName;
      Blockly.Blocks[brickName] = {
        init: function() {
          this.jsonInit(brickBody);
        }
      };
    }
  }
};
loadBricks();