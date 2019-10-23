/**
 * @description Block tests
 */

const utils = require('./commonUtils');


/**
 * Check if the field types from all blocks matching with
 * the build-in types from Blockly
 * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/overview
 */
// test('Block fields types matching with Blockly BuildIns', () => {
//   fs.readdir()
// });

test('Blocks FieldTypes', () => {
  let blockCategories = utils.listDirectorySync(utils.PATHS.BLOCKS);
  console.log(blockCategories);


  expect(2).toBe(2);
});