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
'use strict';

function test_ForeverExists() {

  var workspace = new Blockly.Workspace();

  var text = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="WhenStartedBrick" id="[o^[E$HNVwUIJ=8I[Un3" x="393" y="76"> <next> <block type="WaitBrick" id="L9cGX`#NH}Vg=wyUMHmI"> <value name="TIME_TO_WAIT_IN_SECONDS"> <shadow type="text" id="p=:9g`L~Pt5%c0fp;Di$"> <field name="TEXT">1</field> </shadow> </value> <next> <block type="SetColorBrick" id="fDgz@lgrr~7pQqh]Upa."> <value name="COLOR"> <shadow type="text" id="qViCQ1)-!*3`s`]oua=7"> <field name="TEXT">0</field> </shadow> </value> </block> </next> </block> </next> </block> </xml>';

  var xml = Blockly.Xml.textToDom(text);

  Blockly.Xml.domToWorkspace(xml, workspace);

  console.debug(workspace.getTopBlocks())
}
