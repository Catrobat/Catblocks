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
    const advancedMode = false;
    await page.evaluate(
      async (pLanguage, pRTL, pAdvancedMode) => {
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

  test('Context menu item disable block text test', async () => {
    const brickID = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyText');
      const removedBlocks = Array.from(blocks).filter(
        block => block !== null && block !== undefined && block.getAttribute('id') !== null
      );
      const setVariableBlock = Array.from(removedBlocks).find(block =>
        block.getAttribute('id').includes('SetVariableBrick-0')
      );
      return setVariableBlock.id;
    });

    const mItems = [];
    let isBlocklyContextMenu = false;
    while (!isBlocklyContextMenu) {
      await page.waitForSelector(`[id="${brickID}"]`, { visible: true });
      await page.click(`[id="${brickID}"]`, { button: 'right' });

      isBlocklyContextMenu = await page.evaluate(() => {
        const contextMenu = document.querySelector('.blocklyMenu');
        if (contextMenu) {
          const menuItems = contextMenu.querySelectorAll('.blocklyMenuItemContent');
          if (menuItems) {
            return true;
          }
        }
        return false;
      });

      if (isBlocklyContextMenu) {
        const menuItems = await page.evaluate(() => {
          const items = [];
          const menuItems = document.querySelectorAll('.blocklyMenuItemContent');
          for (const item of menuItems) {
            items.push(item.innerText);
          }
          return items;
        });
        for (const i of menuItems) {
          mItems.push(i);
        }
      }
    }

    expect(mItems).toContain('Disable brick');
  }, 10000);

  test('Context menu item enable brick block text test', async () => {
    const brickID = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyText');
      const removedBlocks = Array.from(blocks).filter(
        block => block !== null && block !== undefined && block.getAttribute('id') !== null
      );
      const showVariableBlock = Array.from(removedBlocks).find(block =>
        block.getAttribute('id').includes('ShowTextColorSizeAlignmentBrick-6')
      );
      return showVariableBlock.id;
    });

    const mItems = [];
    let isBlocklyContextMenu = false;
    while (!isBlocklyContextMenu) {
      await page.waitForSelector(`[id="${brickID}"]`, { visible: true });
      await page.click(`[id="${brickID}"]`, { button: 'right' });

      isBlocklyContextMenu = await page.evaluate(() => {
        const contextMenu = document.querySelector('.blocklyMenu');
        if (contextMenu) {
          const menuItems = contextMenu.querySelectorAll('.blocklyMenuItemContent');
          if (menuItems) {
            return true;
          }
        }
        return false;
      });

      if (isBlocklyContextMenu) {
        const menuItems = await page.evaluate(() => {
          const items = [];
          const menuItems = document.querySelectorAll('.blocklyMenuItemContent');
          for (const item of menuItems) {
            items.push(item.innerText);
          }
          return items;
        });
        for (const i of menuItems) {
          mItems.push(i);
        }
      }
    }

    expect(mItems).toContain('Enable brick');
  }, 10000);

  test('Context menu item disable script block text test', async () => {
    const scriptID = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyText');
      const removedBlocks = Array.from(blocks).filter(
        block => block !== null && block !== undefined && block.getAttribute('id') !== null
      );
      const startBlock = Array.from(removedBlocks).find(block => block.getAttribute('id').includes('StartScript'));
      return startBlock.id;
    });

    const mItems = [];
    let isBlocklyContextMenu = false;
    while (!isBlocklyContextMenu) {
      await page.waitForSelector(`[id="${scriptID}"]`, { visible: true });
      await page.click(`[id="${scriptID}"]`, { button: 'right' });

      isBlocklyContextMenu = await page.evaluate(() => {
        const contextMenu = document.querySelector('.blocklyMenu');
        if (contextMenu) {
          const menuItems = contextMenu.querySelectorAll('.blocklyMenuItemContent');
          if (menuItems) {
            return true;
          }
        }
        return false;
      });

      if (isBlocklyContextMenu) {
        const menuItems = await page.evaluate(() => {
          const items = [];
          const menuItems = document.querySelectorAll('.blocklyMenuItemContent');
          for (const item of menuItems) {
            items.push(item.innerText);
          }
          return items;
        });
        for (const i of menuItems) {
          mItems.push(i);
        }
      }
    }

    expect(mItems).toContain('Disable script');
  }, 10000);

  test('Context menu item enable script block text test', async () => {
    const scriptID = await page.evaluate(() => {
      const blocks = document.querySelectorAll('.blocklyText');

      // Remove all null and undefined values from array
      const removedBlocks = Array.from(blocks).filter(
        block => block !== null && block !== undefined && block.getAttribute('id') !== null
      );
      const broadcastBlock = Array.from(removedBlocks).find(block =>
        block.getAttribute('id').includes('BroadcastScript')
      );
      return broadcastBlock.id;
    });

    const mItems = [];
    let isBlocklyContextMenu = false;
    while (!isBlocklyContextMenu) {
      await page.waitForSelector(`[id="${scriptID}"]`, { visible: true });
      await page.click(`[id="${scriptID}"]`, { button: 'right' });

      isBlocklyContextMenu = await page.evaluate(() => {
        const contextMenu = document.querySelector('.blocklyMenu');
        if (contextMenu) {
          const menuItems = contextMenu.querySelectorAll('.blocklyMenuItemContent');
          if (menuItems) {
            return true;
          }
        }
        return false;
      });

      if (isBlocklyContextMenu) {
        const menuItems = await page.evaluate(() => {
          const items = [];
          const menuItems = document.querySelectorAll('.blocklyMenuItemContent');
          for (const item of menuItems) {
            items.push(item.innerText);
          }
          return items;
        });
        for (const i of menuItems) {
          mItems.push(i);
        }
      }
    }

    expect(mItems).toContain('Enable script');
  });
}, 10000);
