/**
 * @license
 * Blockly Tests
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

// set DEBUG to true if you like to print
// consoleDebug(msg);
const DEBUG = false;

const PARSER_XML_FORMAT = "text/xml";

// some final stuff for block_test.js jsunit tests
const block_categories_ref = [
  "motion",
  "looks",
  "sound",
  "event",
  "control",
  "pen",
  "data"
];

const BLOCK_LIBRARY_PATH = "/BlockLibrary/";
const BLOCKS_VERTICAL_PATH = "/scratch-blocks-develop/blocks_vertical/";

// result file -> BLOCKS_VERTICAL_PATH/default_toolbox.js
const RESULT_XML = loadPageSync(
  getUrl(BLOCKS_VERTICAL_PATH + "default_toolbox.js")
)
  .split("Blockly.Blocks.defaultToolbox = ")[1]
  .split("\n")
  .filter(line => line != "'' +")
  .map(line =>
    line
      .replaceAll("\\'", "'")
      .replace(new RegExp("^' *<", "g"), "<")
      .replace(new RegExp("> *' +\\+$", "g"), ">")
      .replace(new RegExp("> *' *\\+ *' *<", "g"), "><")
  )
  .join("")
  .slice(0, -2);

/**
 * Anonymous function to get blocks which need to be tested
 * used by: test_AllBlocksExists
 *          test_AllBlockPayloadMatches
 */
const BLOCKS_TO_TEST = (function getBlocksToTest() {
  const block_categories = listDir(getUrl(BLOCKS_VERTICAL_PATH))
    .map(category => category.split(".")[0])
    .filter(category => block_categories_ref.includes(category));
  consoleDebug(block_categories);

  const blocks_js = block_categories
    .map(category =>
      loadPageSync(getUrl(BLOCKS_VERTICAL_PATH + category + ".js"))
        .split("\n")
        .filter(line => /^Blockly\.Blocks\[.*\].*$/.test(line))
    )
    .flat()
    .map(block => block.split("Blockly.Blocks['")[1].split("']")[0]);
  consoleDebug(blocks_js);

  const blocks_xml = listDir(BLOCK_LIBRARY_PATH).map(
    block => block.split(".")[0]
  );
  consoleDebug(blocks_xml);

  return blocks_js.filter(block => blocks_xml.includes(block));
})();

//#############################################################################
//### Test staring down here
//#############################################################################

/**
 * Check if all blocks exists in to_validate file
 * Ref blocks are (block_library && catetorys)
 */
function test_AllBlocksExists() {
  BLOCKS_TO_TEST.forEach(block => {
    console.log(`Check block name: ${block} for existenz`);
    assertTrue(RESULT_XML.indexOf(block) != -1);
  });
}

/**
 * Validate if default_toolbox.js includes an valid xml file via DOMParser
 */
function test_DefaulToolboxValidXML() {
  console.log("Check if result xml is valid");
  const xml = new DOMParser().parseFromString(RESULT_XML, PARSER_XML_FORMAT);
  assertTrue(xml.getElementsByTagName("parsererror").length == 0);
}

/**
 * Validate if all blocks properties from ref match with test
 */
function test_AllBlockPayloadMatches() {
  const parser = new DOMParser();
  const dom_test = parser.parseFromString(RESULT_XML, PARSER_XML_FORMAT);
  assertTrue(dom_test.getElementsByTagName("parsererror").length == 0);

  BLOCKS_TO_TEST.forEach(block => {
    console.log("Check payload from block: " + block);

    const block_ref_payload = loadPageSync(
      getUrl(BLOCK_LIBRARY_PATH + block + ".xml")
    );
    const block_ref = parser.parseFromString(
      block_ref_payload,
      PARSER_XML_FORMAT
    ).firstChild;
    const block_test = dom_test.querySelector(`[type=${block}]`);

    consoleDebug(sameXmlBlock(block_ref, block_test));
    assertTrue(sameXmlBlock(block_ref, block_test));
  });
}

// TODO: add some more test here
// function test_ForeverExists() {
//   var workspace = new Blockly.Workspace();
//   var text = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="WhenStartedBrick" id="[o^[E$HNVwUIJ=8I[Un3" x="393" y="76"> <next> <block type="WaitBrick" id="L9cGX`#NH}Vg=wyUMHmI"> <value name="TIME_TO_WAIT_IN_SECONDS"> <shadow type="text" id="p=:9g`L~Pt5%c0fp;Di$"> <field name="TEXT">1</field> </shadow> </value> <next> <block type="SetColorBrick" id="fDgz@lgrr~7pQqh]Upa."> <value name="COLOR"> <shadow type="text" id="qViCQ1)-!*3`s`]oua=7"> <field name="TEXT">0</field> </shadow> </value> </block> </next> </block> </next> </block> </xml>';
// var xml = Blockly.Xml.textToDom(text);
//   Blockly.Xml.domToWorkspace(xml, workspace);
//   console.debug(workspace.getTopBlocks())
// }
