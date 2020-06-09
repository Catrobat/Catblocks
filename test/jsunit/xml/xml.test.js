/**
 * @description xml tests
 */
/* global page, SERVER, playgroundWS, toolboxWS, Blockly */
/* eslint no-global-assign:0 */
'use strict';

/**
 * Tests if import and export of Blocks to xml format works
 */
describe('Export and Import XML files to workspace', () => {
  /**
   * Execute ones in this scope
   */
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  });

  /**
   * Run before each test in this scope
   */
  beforeEach(async () => {
    // clean workspace before each test
    await page.evaluate(() => {
      playgroundWS.clear();
    });
  });

  /**
   * Test if exported xml file from block matches with regex expresseion
   */
  test('Export xml for each block from toolbox', async () => {
    expect(
      await page.evaluate(() => {
        toolboxWS.getAllBlocks().forEach(block => {
          const blockName = block.type;
          playgroundWS.newBlock(blockName);
          const xml = Blockly.Xml.workspaceToDom(playgroundWS, true).outerHTML;
          if (xml.match(/<xml>.*<block.*>.*<\/block><\/xml>/) === null) {
            return false;
          }
        });
        return true;
      })
    ).toBeTruthy();
  });

  /**
   * Export/Import combination test for all blocks from toolbox
   */
  test('Export/Import combi test for each block from toolbox', async () => {
    expect(
      await page.evaluate(() => {
        const xmlStrings = {};

        // first get all xml strings for each block
        toolboxWS.getAllBlocks().forEach(block => {
          const blockName = block.type;
          playgroundWS.newBlock(blockName);
          xmlStrings[blockName] = Blockly.Xml.workspaceToDom(playgroundWS, true).outerHTML;
          playgroundWS.clear();

          // check if they fitt your requiremets
          if (xmlStrings[blockName].match(/<xml>.*<block.*>.*<\/block><\/xml>/) === null) {
            return false;
          }
        });

        // Reimport them and check again
        Object.keys(xmlStrings).forEach(blockName => {
          playgroundWS.clear();
          Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlStrings[blockName]), playgroundWS);

          if (Object.keys(playgroundWS.blockDB_).length !== 1) {
            return false;
          }
        });

        return true;
      })
    ).toBeTruthy();
  });
});
