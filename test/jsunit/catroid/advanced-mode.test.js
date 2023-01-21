/* global Test, page */
/* eslint no-global-assign:0 */
'use strict';

const fs = require('fs');
const path = require('path');

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

    await page.evaluate(() => {
      // function to JSON.stringify circular objects
      window.shallowJSON = (obj, indent = 2) => {
        let cache = [];
        const retVal = JSON.stringify(
          obj,
          (key, value) =>
            typeof value === 'object' && value !== null
              ? cache.includes(value)
                ? undefined // Duplicate reference found, discard key
                : cache.push(value) && value // Store value in our collection
              : value,
          indent
        );
        cache = null;
        return retVal;
      };
    });
  });

  test('Background color test', async () => {
    const backgroundColor = await page.evaluate(() => {
      return document.querySelector('#catroid .blocklySvg').style.backgroundColor;
    });

    expect(backgroundColor).toBe('rgb(26, 26, 26)');
  });

  test('Blocks color test', async () => {
    const allBlockColors = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      return Array.from(blocks).map(b => {
        return { color: b.attributes.fill.value };
      });
    });

    expect.hasAssertions();
    for (const block of allBlockColors) {
      expect(block.color).toBe('#1a1a1a');
    }
  });

  test('Blocks select color test', async () => {
    const selectedGlowColour = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      return blocks[0].tooltip.workspace.getTheme().componentStyles.selectedGlowColour;
    });

    expect(selectedGlowColour).toBe('#9a9a9a');
  });

  test('Input fields color test', async () => {
    const allFieldColors = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyEditableText > rect:not(.blocklyDropdownRect)');
      return Array.from(blocks).map(b => {
        return { color: b.attributes.stroke.value };
      });
    });

    expect.hasAssertions();
    for (const field of allFieldColors) {
      expect(field.color).toBe('#1a1a1a');
    }
  });

  test('JS Syntax characters test', async () => {
    const syntaxCharacters = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      const ifBlock = Array.from(blocks).find(block => block.tooltip.type === 'IfThenLogicBeginBrick');

      return [
        ifBlock.tooltip.inputList[0].fieldRow[0].getValue(),
        ifBlock.tooltip.inputList[0].fieldRow[2].getValue(),
        ifBlock.tooltip.inputList[0].fieldRow[3].getValue(),
        ifBlock.tooltip.inputList[2].fieldRow[0].getValue()
      ];
    });

    expect(syntaxCharacters[0]).toBe('If (');
    expect(syntaxCharacters[1]).toBe(')');
    expect(syntaxCharacters[2]).toBe('is true then {');
    expect(syntaxCharacters[3]).toBe('}');
  });

  test('Smaller vertical spacing test', async () => {
    const blocksHeight = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      const startBlock = Array.from(blocks).find(block => block.tooltip.type === 'StartScript');
      return startBlock.tooltip.height;
    });

    expect(blocksHeight).toBeLessThan(40);
  });

  test('Semicolon test', async () => {
    const semicolons = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');

      return [
        blocks[3].tooltip.inputList[0].fieldRow[5].getValue(),
        blocks[12].tooltip.inputList[0].fieldRow[5].getValue(),
        blocks[26].tooltip.inputList[0].fieldRow[2].getValue()
      ];
    });

    expect.hasAssertions();
    for (const endChars of semicolons) {
      expect(endChars).toBe(');');
    }
  });

  test('Formulas formatting test', async () => {
    const fieldValues = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      return [
        blocks[4].tooltip.inputList[0].fieldRow[1].getValue(),
        blocks[24].tooltip.inputList[0].fieldRow[4].getValue()
      ];
    });

    expect(fieldValues[0]).toBe('"currentcaption" = 7');
    expect(fieldValues[1]).toBe('item("currentcaption", *Language List-Caption*)');
  });

  test('Commented out bricks test', async () => {
    const commentedOut = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyPath');
      return blocks[25].tooltip.inputList[0].fieldRow[0].getValue();
    });

    expect(commentedOut).toBe('// Show variable (');
  });
});
