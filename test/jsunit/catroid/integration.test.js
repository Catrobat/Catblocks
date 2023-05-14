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
            container: 'catblocks-container',
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
  }, 999999);
});
