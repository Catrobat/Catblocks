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

var DEBUG = false;

/**
 * Check if all blocks exists in to_validate file
 * Ref blocks are (block_library && catetorys)
 */
function test_AllBlocksExists() {
  // define here which categories should be validated
  const block_categories_ref = [
    "motion",
    "looks",
    "sound",
    "event",
    "control",
    "pen",
    "data",
    "arduino",
    "raspi",
    "phiro",
    "legoEV3",
    "legoNXT",
    "jumpingSumo",
    "drone"
  ];

  const block_categories = listDir(
    getUrl("/scratch-blocks-develop/blocks_vertical/")
  )
    .map(category => category.split(".")[0])
    .filter(category => block_categories_ref.includes(category));
  consoleDebug(block_categories);

  const blocks_js = block_categories
    .map(category =>
      loadPageSync(
        getUrl("/scratch-blocks-develop/blocks_vertical/" + category + ".js")
      )
        .split("\n")
        .filter(line => /^Blockly\.Blocks\[.*\].*$/.test(line))
    )
    .flat()
    .map(block => block.split("Blockly.Blocks['")[1].split("']")[0]);
  consoleDebug(blocks_js);

  const blocks_xml = listDir("http://localhost:8080/BlockLibrary/").map(
    block => block.split(".")[0]
  );
  consoleDebug(blocks_xml);

  const blocks_to_check = blocks_js.filter(block => blocks_xml.includes(block));
  consoleDebug(blocks_to_check);

  const result_to_check = loadPageSync(
    getUrl("/scratch-blocks-develop/blocks_vertical/default_toolbox.js")
  );
  consoleDebug(result_to_check);

  // now lets check
  blocks_to_check.forEach(block => {
    console.log(`Check block name: ${block} for existenz`);
    assertTrue(result_to_check.indexOf(block) != -1);
  });
}

// TODO: add some more test here
// function test_ForeverExists() {
//   var workspace = new Blockly.Workspace();
//   var text = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="WhenStartedBrick" id="[o^[E$HNVwUIJ=8I[Un3" x="393" y="76"> <next> <block type="WaitBrick" id="L9cGX`#NH}Vg=wyUMHmI"> <value name="TIME_TO_WAIT_IN_SECONDS"> <shadow type="text" id="p=:9g`L~Pt5%c0fp;Di$"> <field name="TEXT">1</field> </shadow> </value> <next> <block type="SetColorBrick" id="fDgz@lgrr~7pQqh]Upa."> <value name="COLOR"> <shadow type="text" id="qViCQ1)-!*3`s`]oua=7"> <field name="TEXT">0</field> </shadow> </value> </block> </next> </block> </next> </block> </xml>';
//   var xml = Blockly.Xml.textToDom(text);
//   Blockly.Xml.domToWorkspace(xml, workspace);
//   console.debug(workspace.getTopBlocks())
// }
