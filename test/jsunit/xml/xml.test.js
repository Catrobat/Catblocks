/**
 * @description xml tests
 */
/* global page, SERVER, Test */
/* eslint no-global-assign:0 */
'use strict';

/**
 * Tests if import and export of Blocks to xml format works
 */
describe('Export and Import XML files to workspace', () => {
  /**
   * Execute once in this scope
   */
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
    page.on('console', message => {
      if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
        console.log(message.text());
      }
    });

    await page.evaluate(async () => {
      await Test.CatBlocks.init({
        container: 'share',
        renderSize: 0.75,
        shareRoot: '',
        media: 'media/',
        language: 'en',
        rtl: false,
        noImageFound: 'No_Image_Available.jpg',
        advancedMode: false
      });

      Test.Playground.workspace = Test.Blockly.inject('playworkspace', {
        media: '../media/',
        zoom: { startScale: 0.75 },
        toolbox: Test.Playground.getToolbox(true),
        renderer: 'zelos'
      });

      const share = Test.CatBlocks.getInstance().share;
      const toolbox = Test.Blockly.Workspace.getAll().find(
        ws => ![share.workspace.id, Test.Playground.workspace.id].includes(ws.id)
      );
      Test.Toolbox = {
        workspace: toolbox
      };
      Test.Share = share;
    });
  });

  /**
   * Run before each test in this scope
   */
  beforeEach(async () => {
    // clean workspace before each test
    await page.evaluate(() => {
      Test.Playground.workspace.clear();
    });
  });

  /**
   * Test if exported xml file from block matches with regex expresseion
   */
  test('Export xml for each block from toolbox', async () => {
    expect.hasAssertions();

    const toolboxBlocks = await page.evaluate(() => {
      return Test.Toolbox.workspace.getAllBlocks().map(block => block.type);
    });

    for (const block of toolboxBlocks) {
      const xml = await page.evaluate(pBlock => {
        Test.Playground.workspace.newBlock(pBlock);
        return Test.Blockly.Xml.workspaceToDom(Test.Playground.workspace, true).outerHTML;
      }, block);
      expect(xml.match(/<xml>.*<block.*>.*<\/block><\/xml>/)).not.toBeNull();
    }
  });

  /**
   * Export/Import combination test for all blocks from toolbox
   */
  test('Export/Import combi test for each block from toolbox', async () => {
    expect.hasAssertions();

    const toolboxBlocks = await page.evaluate(() => {
      return Test.Toolbox.workspace.getAllBlocks().map(block => block.type);
    });

    const xmlStrings = {};
    for (const block of toolboxBlocks) {
      const xml = await page.evaluate(pBlock => {
        Test.Playground.workspace.newBlock(pBlock);
        const xml = Test.Blockly.Xml.workspaceToDom(Test.Playground.workspace, true).outerHTML;
        Test.Playground.workspace.clear();
        return xml;
      }, block);
      expect(xml.match(/<xml>.*<block.*>.*<\/block><\/xml>/)).not.toBeNull();
      xmlStrings[block] = xml;
    }

    for (const blockName in xmlStrings) {
      if (Object.hasOwnProperty.call(xmlStrings, blockName)) {
        const block = xmlStrings[blockName];
        const length = await page.evaluate(pBlock => {
          Test.Playground.workspace.clear();
          Test.Blockly.Xml.domToWorkspace(Test.Blockly.Xml.textToDom(pBlock), Test.Playground.workspace);
          return Object.keys(Test.Playground.workspace.blockDB_).length;
        }, block);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(length).toBe(1);
      }
    }
  });
});
