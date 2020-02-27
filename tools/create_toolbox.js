#!/usr/bin/env node
/* eslint-env node */

/**
 * @author Andreas Karner <andreas.karner@student.tugraz.at>
 * @description generate default_toolbox.js file
 *                add all categories from the src/blocks/categories folder and map each block to the corresponding category
 *  
 * @changelog 2019-12-16: [AK] initial version, fork from existing updateToolbox.py file
 *            2019-02-18: [AK] moved file into tools folder, use path.join instead of plain string
 */

const fs = require('fs');
const path = require('path');

const CATEGORYDIR = path.join('src', 'js', 'blocks', 'categories');
const TOOLBOXFILE = path.join('src', 'js', 'blocks', 'default_toolbox.js');

const CONSTSTRING = {
  'xmlheader': '`<xml id="toolbox-categories" style="display: none">\n',
  'xmlfooter': '</xml>`;',
  'file': 'import Blockly from "scratch-blocks";\n\nBlockly.Blocks.defaultToolbox = '
}

const CATEGORYHEADER = {
  'motion': `name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC"`,
  'looks': `name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#59C059" secondaryColour="#59C059"`,
  'sound': `name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#9966FF" secondaryColour="#9966FF"`,
  'event': `name="%{BKY_CATEGORY_EVENTS}" id="event" colour="#FF661A" secondaryColour="#CC9900"`,
  'control': `name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17"`,
  'pen': `name="%{BKY_CATEGORY_PEN}" id="pen" colour="#0fBD8C" secondaryColour="#2E8EB8"`,
  'data': `name="%{BKY_CATEGORY_VARIABLES}" id="data" colour="#FF6680" secondaryColour="#389438"`,
  'drone': `name="%{BKY_CATEGORY_DRONE}" id="drone" colour="#91d149" secondaryColour="#7bb13e"`,
  'jumpingSumo': `name="%{BKY_CATEGORY_JUMPING_SUMO}" id="jumpingSumo" colour="#91d149" secondaryColour="#7bb13e"`,
  'arduino': `name="%{BKY_CATEGORY_ARDUINO}" id="arduino" colour="#34c8a5" secondaryColour="#31bc9c"`,
  'raspi': `name="%{BKY_CATEGORY_RASPI}" id="raspi" colour="#34c8a5" secondaryColour="#31bc9c"`,
  'phiro': `name="%{BKY_CATEGORY_PHIRO}" id="phiro" colour="#34c8a5" secondaryColour="#31bc9c"`,
  'legoEV3': `name="%{BKY_CATEGORY_LEGO_EV3}" id="legoEV3" colour="#cbca3e" secondaryColour="#d2d140"`,
  'legoNXT': `name="%{BKY_CATEGORY_LEGO_NXT}" id="legoNXT" colour="#cbca3e" secondaryColour="#d2d140"`,
  'stitch': `name="%{BKY_CATEGORY_EMBROIDERY}" id="stitch" colour="#bc4793" secondaryColour="#bb3a8d"`
};

console.log(`Started to create default toolbox file, destination path: ${TOOLBOXFILE}`);
console.log(`Load blocks from folder: ${CATEGORYDIR} `);
fs.access(CATEGORYDIR, (err) => {
  if (err) {
    console.error(`Unable to find given category director: ${CATEGORYDIR}, please double check.`);
    process.exit(-1);
  }

  let toDel = [];
  if (fs.existsSync(TOOLBOXFILE)) {
    console.warn(`Found existing toolbox file: ${TOOLBOXFILE}, will get overwritten.`);
  }

  fs.readdir(CATEGORYDIR, (err, catFiles) => {
    if (err) {
      console.error(`Failed to read category directory: ${CATEGORYDIR} `);
      process.exit(-1);
    }

    console.log(`Read all categorie files`);
    const blocks = catFiles.map(catFile => {
      console.info(`Read category: ${catFile} `);
      const catName = catFile.split('.')[0];

      const payload = fs.readFileSync(path.join(CATEGORYDIR, catFile), 'utf-8');
      const blocks = payload.split('\n')
        .filter(line => line.indexOf('Blockly.Blocks[') > -1)
        .map(line => (line.match(/(?<=(\['))[a-zA-Z0-9]+(?=('\]))/) || [''])[0]);
      return Object.assign({}, { [catName]: blocks });
    });

    console.log(`Generate default toolbox file from categories files`);
    const fdToolbox = fs.openSync(TOOLBOXFILE, 'w');
    fs.writeSync(fdToolbox, CONSTSTRING['file']);
    fs.writeSync(fdToolbox, CONSTSTRING['xmlheader']);

    blocks.forEach(block => {
      Object.keys(block).forEach(category => {
        console.info(`Dump category: ${category} `);
        fs.writeSync(fdToolbox, `<category ${CATEGORYHEADER[category]}>\n`);
        block[category].forEach(block => {
          fs.writeSync(fdToolbox, `  <block type="${block}"></block >\n`);
        });
        fs.writeSync(fdToolbox, `</category>\n`);
      });
    });

    fs.writeSync(fdToolbox, CONSTSTRING['xmlfooter']);
    fs.closeSync(fdToolbox);
    console.log(`Successfully created default toolbox file`);
  });
});