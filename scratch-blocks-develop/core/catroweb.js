/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
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

/**
 * @fileoverview Catblocks integrationt into Catroweb
 * @author andreas.karner@student.tugraz.at (Andreas Karner)
 */

'use strict';

goog.provide('Blockly.Catroweb');

goog.require('Blockly.inject');
goog.require('Blockly.Xml');
goog.require('Blockly.CatblocksMsgs');
goog.require('Blockly.Msg');


/**
 * Initiate Blockly for Catroweb
 * @param {String} locale to use for Catroweb, loaded from CatblocksMsgs
 */
Blockly.Catroweb.initBlockly = function (locale = "en_GB") {
  // #TODO: use the locale from the server
  Blockly.CatblocksMsgs.setLocale(locale);
}

/**
 * Create new workspace for Scene DOM DIV
 * @param {DOM} div to from scene where we should inject the workspace
 */
Blockly.Catroweb.createSceneWorkspace = function (div) {
  if (div.tagName !== "DIV") {
    console.error("Please provide a div in args0 - createSceneWorkspace");
  }

  // force to use the entire width
  div.style.width = "100%";

  // inject a new workspace, we will reuse this one for all scenes
  const workspace = Blockly.inject(div.id, {
    readOnly: true,
    zoom: {
      controls: false,
      wheel: false,
      startScale: 0.75,
    }
  });
  return workspace;
}

/**
 * Clean workspace, reset size to 0 and remove all blocks
 * @param {workspace} workspace to clean
 */
Blockly.Catroweb.clearSceneWorkspace = function (workspace) {
  const injectDiv = workspace.blockDragSurface_.container_.parentElement;
  const mainBlock = injectDiv.getElementsByTagName('svg')[0];
  workspace.clear();
  injectDiv.setAttribute('height', '0px');
  mainBlock.setAttribute('height', '0px');
}

/**
 * Load new xml to workspace, clean first if not already done
 * @param {Object} xml either String or DOM XML with all the scene blocks
 * @param {workspace} workspace to which we should load the xml
 */
Blockly.Catroweb.loadSceneXml = function (xml, workspace) {
  // get DOM xml, either convert or directly
  const xmlDom = goog.isString(xml) ? Blockly.Xml.textToDom(xml) : xml;

  const injectDiv = workspace.blockDragSurface_.container_.parentElement;
  const mainBlock = injectDiv.getElementsByTagName('svg')[0];

  const heightOffset = 50;
  const workspaceWidth = injectDiv.clientWidth;
  const widthOffset = workspaceWidth / 2;

  // move it awai from the edges
  const blocks = xmlDom.getElementsByTagName('block');
  if (blocks.length > 0) {
    blocks[0].setAttribute('x', widthOffset);
    blocks[0].setAttribute('y', heightOffset);
  }
  Blockly.Catroweb.clearSceneWorkspace(workspace);
  Blockly.Xml.domToWorkspace(xmlDom, workspace);

  // remove first the size define by blockly
  const gbox = mainBlock.getBBox();
  mainBlock.setAttribute('height', gbox.height + heightOffset + 'px');
  mainBlock.style.position = 'inherit';
  injectDiv.setAttribute('height', gbox.height + heightOffset + 'px');
}