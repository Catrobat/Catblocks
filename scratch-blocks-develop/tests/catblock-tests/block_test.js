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

const loadPageSync = url => {
  assertTrue(url != "");
  assertTrue(url != null);
  assertTrue(url.length != 0);

  var req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  if (req.status == 200) {
    return req.responseText;
  }
};

const parseTextToDirArray = text => {
  assertTrue(text != "");
  assertTrue(text != null);
  assertTrue(text.length != 0);

  const tmp = document.createElement("html");
  tmp.innerHTML = text;
  const files = tmp.getElementsByClassName("display-name");
  return Object.keys(files).map(idx => files[idx].children[0].text);
};

function test_AllBlocksExists() {
  var ref_blocks = parseTextToDirArray(
    loadPageSync("http://localhost:8080/BlockLibrary/")
  );
  const default_toolbox = loadPageSync('http://localhost:8080/scratch-blocks-develop/blocks_vertical/default_toolbox.js');

  ref_blocks.filter(item => item !== '../').forEach(block => {
    console.log(`Check block name: ${block.slice(0, -4)} for existenz`);
    assertTrue(default_toolbox.indexOf(block.slice(0, -4)) != -1);
  })
}


// TODO: add some more test here

// function test_ForeverExists() {

//   var workspace = new Blockly.Workspace();

//   var text = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="WhenStartedBrick" id="[o^[E$HNVwUIJ=8I[Un3" x="393" y="76"> <next> <block type="WaitBrick" id="L9cGX`#NH}Vg=wyUMHmI"> <value name="TIME_TO_WAIT_IN_SECONDS"> <shadow type="text" id="p=:9g`L~Pt5%c0fp;Di$"> <field name="TEXT">1</field> </shadow> </value> <next> <block type="SetColorBrick" id="fDgz@lgrr~7pQqh]Upa."> <value name="COLOR"> <shadow type="text" id="qViCQ1)-!*3`s`]oua=7"> <field name="TEXT">0</field> </shadow> </value> </block> </next> </block> </next> </block> </xml>';

//   var xml = Blockly.Xml.textToDom(text);

//   Blockly.Xml.domToWorkspace(xml, workspace);

//   console.debug(workspace.getTopBlocks())
// }
