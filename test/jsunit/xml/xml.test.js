/**
 * @description xml tests
 */

const utils = require('../commonUtils');

/**
 * Tests if import and export of Blocks to xml format works
 */
describe('Export and Import XML files to workspace', () => {

  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
  });

  /**
   * Export and import Block xml
   */
  test('Blocks export/import Xml', async () => {
    let failed = false;

    failed = await page.evaluate(() => {
      let failed = false;
      let xmlStrings = {};

      // first get all xml strings for each block
      Object.keys(toolboxWS.blockDB_).forEach(blockName => {
        blocklyWS.newBlock(blockName);
        xmlStrings[blockName] = (Blockly.Xml.workspaceToDom(blocklyWS, true)).outerHTML;
        blocklyWS.clear();

        // check if they fitt your requiremets
        if (xmlStrings[blockName].match(/<xml>.*<block.*>.*<\/block><\/xml>/) === null) {
          failed = true;
          return failed;
        }
      });

      // Reimport them and check again
      Object.keys(xmlStrings).forEach(blockName => {
        blocklyWS.clear();
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlStrings[blockName]), blocklyWS);

        if (Object.keys(blocklyWS.blockDB_).length !== 1) {
          failed = true;
          return failed;
        }
      });
      
      return failed;
    });

    expect(failed).toBeFalsy();
  });
});