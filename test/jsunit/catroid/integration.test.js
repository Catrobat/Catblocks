/* global Test, page */
/* eslint no-global-assign:0 */
'use strict';

const fs = require('fs');
const path = require('path');

describe('Catroid Integration Position tests', () => {
  test('RTL right alligment', async () => {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });
    const programXML = fs.readFileSync(path.resolve(__dirname, '../../programs/binding_of_krishna_1_12.xml'), 'utf8');

    const language = 'ar';
    const rtl = true;
    await page.evaluate(
      async (pLanguage, pRTL) => {
        try {
          await Test.CatroidCatBlocks.init({
            container: 'catroid',
            renderSize: 0.75,
            language: pLanguage,
            rtl: pRTL,
            i18n: '/i18n',
            shareRoot: '',
            media: 'media/',
            noImageFound: 'No_Image_Available.jpg',
            renderLooks: false,
            renderSounds: false,
            readOnly: false
          });
        } catch (e) {
          console.error(e);
        }
      },
      language,
      rtl
    );

    await page.evaluate(async pProgramXML => {
      await Test.CatroidCatBlocks.render(pProgramXML, 'Main Menu', 'Play', 'd9e76a0d-8f6b-44b4-887d-fdd31b7e5bf1');
    }, programXML);

    const { scriptOffset, textOffset } = await page.evaluate(() => {
      return {
        scriptOffset: document.querySelector('#WhenConditionScript-0').getBoundingClientRect().right,
        textOffset: document.querySelector('#WhenConditionScript-0-text').getBoundingClientRect().right
      };
    });

    const textToScriptBorderOffset = scriptOffset - textOffset;
    expect(textToScriptBorderOffset < 7).toBe(true);
  });
});

describe('Catroid Integration Advanced Mode tests', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });
    const programXML = fs.readFileSync(path.resolve(__dirname, '../../programs/binding_of_krishna_1_12.xml'), 'utf8');
    const language = 'en';
    const rtl = false;
    const advancedMode = true;
    await page.evaluate(
      async (pLanguage, pRTL, pAdvancedMode) => {
        try {
          await Test.CatroidCatBlocks.init({
            container: 'catroid',
            renderSize: 0.75,
            language: pLanguage,
            rtl: pRTL,
            i18n: '/i18n',
            shareRoot: '',
            media: 'media/',
            noImageFound: 'No_Image_Available.jpg',
            renderLooks: false,
            renderSounds: false,
            readOnly: false,
            advancedMode: pAdvancedMode
          });
        } catch (e) {
          console.error(e);
        }
      },
      language,
      rtl,
      advancedMode
    );
    await page.evaluate(async pProgramXML => {
      await Test.CatroidCatBlocks.render(
        pProgramXML,
        'Introduction',
        'Caption',
        '7fc239bb-d330-4226-b075-0c4c545198e2'
      );
    }, programXML);
  });

  test('Background color test', async () => {
    const backgroundColor = await page.evaluate(() => {
      return document.querySelector('#catroid .blocklySvg').style.backgroundColor;
    });

    expect(backgroundColor).toBe('rgb(26, 26, 26)');
  });

  test('Blocks color test', async () => {
    const allBlocksInAdvancedMode = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      let counter = 0;
      let darkColor = true;
      blocks.forEach(block => {
        darkColor = block.attributes.fill.value === '#1a1a1a' && darkColor;
        counter++;
      });
      darkColor = counter > 10 && darkColor;
      return darkColor;
    });

    expect(allBlocksInAdvancedMode).toBe(true);
  });

  test('Blocks select color test', async () => {
    const selectedGlowColour = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      return blocks[0].tooltip.workspace.getTheme().componentStyles.selectedGlowColour;
    });

    expect(selectedGlowColour).toBe('#9a9a9a');
  });

  test('Input fields color test', async () => {
    const inputFieldsInAdvancedMode = await page.evaluate(() => {
      const inputFields = document.querySelectorAll('.blocklyEditableText > rect:not(.blocklyDropdownRect)');
      let counter = 0;
      let darkColor = true;
      inputFields.forEach(field => {
        darkColor = field.attributes.stroke.value === '#1a1a1a' && darkColor;
        counter++;
      });
      darkColor = counter > 20 && darkColor;
      return darkColor;
    });

    expect(inputFieldsInAdvancedMode).toBe(true);
  });

  test('JS Syntax characters test', async () => {
    const syntaxCharacters = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      const ifBlock = Array.from(blocks).find(block => block.tooltip.type === 'IfThenLogicBeginBrick');

      if (
        ifBlock.tooltip.inputList[0].fieldRow[0].getValue() === 'If (' &&
        ifBlock.tooltip.inputList[0].fieldRow[2].getValue() === ')' &&
        ifBlock.tooltip.inputList[0].fieldRow[3].getValue() === 'is true then {' &&
        ifBlock.tooltip.inputList[2].fieldRow[0].getValue() === '}'
      ) {
        return true;
      } else {
        return false;
      }
    });

    expect(syntaxCharacters).toBe(true);
  });

  test('Smaller vertical spacing test', async () => {
    const blocksHeight = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      const startBlock = Array.from(blocks).find(block => block.tooltip.type === 'StartScript');
      return startBlock.tooltip.height;
    });

    expect(blocksHeight < 40).toBe(true);
  });

  test('Semicolon test', async () => {
    const semicolons = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      if (
        blocks[3].tooltip.inputList[0].fieldRow[5].getValue() === ');' &&
        blocks[12].tooltip.inputList[0].fieldRow[5].getValue() === ');' &&
        blocks[26].tooltip.inputList[0].fieldRow[2].getValue() === ');'
      ) {
        return true;
      } else {
        return false;
      }
    });

    expect(semicolons).toBe(true);
  });

  test('Formulas formatting test', async () => {
    const formatted = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      if (
        blocks[4].tooltip.inputList[0].fieldRow[1].getValue() === '"currentcaption" = 7' &&
        blocks[24].tooltip.inputList[0].fieldRow[4].getValue() === 'item("currentcaption", *Language List-Caption*)'
      ) {
        return true;
      } else {
        return false;
      }
    });

    expect(formatted).toBe(true);
  });

  test('Commented out bricks test', async () => {
    const commentedOut = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      return blocks[25].tooltip.inputList[0].fieldRow[0].getValue();
    });

    expect(commentedOut).toBe('// Show variable (');
  });
});
