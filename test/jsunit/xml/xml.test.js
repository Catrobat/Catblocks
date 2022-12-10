/**
 * @description xml tests
 */
/* global page, Test */
/* eslint no-global-assign:0 */
'use strict';

/**
 * Tests if import and export of Blocks to xml format works
 */
describe('Export and Import XML files to workspace', () => {
  /**
   * Run before each test in this scope
   */
  beforeEach(async () => {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });

    page.on('console', message => {
      if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
        console.log(message.text());
      }
    });

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
          return Object.keys(Test.Playground.workspace.getAllBlocks()).length;
        }, block);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(length).toBe(1);
      }
    }
  });
});
