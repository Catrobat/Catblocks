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
 * @fileoverview Catblocks integrationt into Web
 * @author andreas.karner@student.tugraz.at (Andreas Karner)
 */

'use strict';

goog.provide('Blockly.Web');

goog.require('Blockly.inject');
goog.require('Blockly.Xml');
goog.require('Blockly.CatblocksMsgs');
goog.require('Blockly.Msg');
goog.require('goog.dom');
goog.require('goog.dom.TagName');



/**
 * DOMParser instance for Web
 * @type {domparser}
 * @private
 */
Blockly.Web.domParser = null;

/**
 * Parsing formats for domParser
 * @type {Object}
 * @private
 */
Blockly.Web.parseFormats = {
  HTML: 'text/html',
  XML: 'text/xml',
  APP_XML: 'application/xml',
  APP_HTML_XML: 'application/xhtml+xml',
  IMG_SVG: 'image/svg+xml'
};

/**
 * Defaul options
 * @type {object}
 * @private
 */
Blockly.Web.defaultOptions = {
  injectAllScenesToDiv: {
    'test': 'test'
  },
  createScene: {
    writeHeader: true,
    injectOnClick: true,
    expandable: true
  },
  createObject: {
    writeHeader: true,
    injectOnClick: true,
    expandable: true
  }
};

/**
 * Initiate Blockly for Web
 * @param {string} locale to use for Web, loaded from CatblocksMsgs
 * @public
 */
Blockly.Web.initBlockly = function (locale = "en_GB") {
  // #TODO: use the locale from the server
  Blockly.CatblocksMsgs.setLocale(locale);
  Blockly.Web.domParser = new DOMParser();

  // inject css into document head
  let cssNode = document.createElement('style');
  document.head.insertBefore(cssNode, document.head.firstChild);

  let cssText = document.createTextNode(Blockly.Web.CSS_CONTENT.join('\n'));
  cssNode.appendChild(cssText);
}

/**
 * Parse xml for Web into catblocks dom object
 * @param {string} xml to parse into catblocks dom object
 * @return {dom} xml object
 * @public
 */
Blockly.Web.xmlToDom = function (xml) {
  let xmlDoc = Blockly.Web.domParser.parseFromString(xml, Blockly.Web.parseFormats.XML);
  if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
    console.error("Failed to parse Web xml");
    return undefined;
  }
  return xmlDoc;
}

/**
 * Transform dom xml, execute actions define in options
 * @param {dom} xml to transform
 * @param {object} tagActions to map against tag elements
 * @return {dom} prepared xml object
 * @private
 */
Blockly.Web.transformXml_ = function (xml, tagActions) {
  // TODO: may move into xml.js file
  let xmlDom = goog.isString(xml) ? Blockly.Web.xmlToDom(xml) : xml;
  // run actions against xmlDom
  Object.keys(tagActions).forEach(tagName => {
    // TODO: excute based on actions
    let actions = tagActions[tagName];
    let nodes = xmlDom.getElementsByTagName(tagName);
    for (let inodes = 0; inodes < nodes.length; inodes++) {
      nodes[inodes].removeAttribute('id');
      nodes[inodes].removeAttribute('x');
      nodes[inodes].removeAttribute('y');
    }
  });
}

/**
 * Create new read only workspace and inject it into container
 * @param {dom} container to from scene where we should inject the workspace
 * @param {integer} blockscale block scale for workspace
 * @returns {workspace} created workspace object
 * @private
 */
Blockly.Web.createReadonlyWorkspace_ = function (container, blockscale = 0.75) {
  if (container.tagName !== goog.dom.TagName.DIV.tagName_) {
    console.error("Please provide a div as container - createSceneWorkspace");
  }

  // force to use the entire width
  // TODO: remove before fly
  //container.style.width = "100%";
  //container.style.height = "1000px";

  // inject a new workspace, we will reuse this one for all scenes
  let workspace = Blockly.inject(container, {
    readOnly: true,
    media: '/public/images/catblocks/',
    zoom: {
      controls: false,
      wheel: false,
      startScale: blockscale
    }
  });
  return workspace;
}

/**
 * Clean workspace, reset size to 0 and remove all blocks
 * @param {workspace} workspace to clean
 * @public
 */
Blockly.Web.clearSceneWorkspace = function (workspace) {
  let injectContainer = workspace.blockDragSurface_.container_.parentElement;
  let mainBlock = injectContainer.getElementsByTagName('svg')[0];
  workspace.clear();
  injectContainer.setAttribute('height', '0px');
  mainBlock.setAttribute('height', '0px');
}


/**
 * Load new xml to workspace, clean first if not already done
 * @param {object} block either String or DOM XML with all the scene blocks
 * @param {workspace} workspace to which we should load the xml
 * @param {boolean} erase workspace or not
 * @private
 */
Blockly.Web.addBlockXmlToWorkspace_ = function (xml, workspace, erase = true) {
  // get DOM xml, either convert or directly
  let xmlDom = goog.isString(xml) ? Blockly.Xml.textToDom(xml) : xml;

  // some dom nodes we need to deal with
  //console.log(workspace);

  let injectContainer = workspace.blockDragSurface_.container_.parentElement;
  workspace.getInjectionDiv().id = workspace.id;
  let blockSvg = injectContainer.getElementsByTagName('svg')[0];

  let heightOffset = injectContainer.clientHeight === 0 ? 50 : injectContainer.clientHeight;
  //let workspaceWidth = injectContainer.clientWidth;
  let widthOffset = 20; //workspaceWidth / 2;

  // move it awai from the edges
  xmlDom.firstElementChild.setAttribute('x', widthOffset);
  xmlDom.firstElementChild.setAttribute('y', heightOffset);
  // erase if require
  if (erase) Blockly.Web.clearSceneWorkspace(workspace);

  Blockly.Xml.domToWorkspace(xmlDom, workspace);
  let gbox = blockSvg.getBBox();

  // remove first the size define by blockly
  blockSvg.setAttribute('height', gbox.height + 100 + 'px');
  blockSvg.style.position = 'inherit';
}

/**
 * Inject new dom into container with id and class given
 * @param {dom} container dom where to inject the new scene
 * @param {object} tag to inject into container
 * @param {string} idName to set for the new dom element
 * @param {string} className to set for the new dom element
 * @return {dom} new created subcontainer
 * @private
 */
Blockly.Web.injectNewDom_ = (container, tagName, idName, className) => {
  let subContainer = goog.dom.createDom(tagName, {
    'id': idName,
    'class': className
  });
  container.appendChild(subContainer);
  return subContainer;
};

/**
 * Inject new scene into cotainer
 * @param {dom} container dom where to inject the new scene
 * @param {string} sceneName mapped to id from the new dom
 * @return {dom} new created subcontainer
 * @private
 */
Blockly.Web.addSceneContainer_ = function (container, sceneName, options = Blockly.Web.defaultOptions.createScene) {
  let sceneContainer = Blockly.Web.injectNewDom_(container, goog.dom.TagName.DIV, sceneName, 'catblocks-scene');

  let sceneHeader = null;
  if (options.writeHeader) {
    sceneHeader = Blockly.Web.injectNewDom_(sceneContainer, goog.dom.TagName.DIV, `${sceneName}-header`, 'catblocks-scene-header');
    let sceneText = Blockly.Web.injectNewDom_(sceneHeader, goog.dom.TagName.H3, ``, 'catblocks-scene-text');
    sceneText.textContent = `Scene - ${sceneName}`;

    if (options.expandable) {
      sceneText.addEventListener('click', Blockly.Web.codeClickHandler);
    }
  }

  return sceneContainer;
}

/**
 * Inject new object into cotainer
 * @param {dom} container dom where to inject the new scene
 * @param {string} objectName mapped to id from the new dom
 * @return {workspace} new create workspace for object
 * @private
 */
Blockly.Web.addObjectContainer_ = function (container, objectName, options = Blockly.Web.defaultOptions.createObject) {
  let objectContainer = Blockly.Web.injectNewDom_(container, goog.dom.TagName.DIV, objectName, 'catblocks-object');

  let objectHeader = null;
  if (options.writeHeader) {
    objectHeader = Blockly.Web.injectNewDom_(objectContainer, goog.dom.TagName.DIV, `${objectName}-header`, 'catblocks-object-header');
    let objectText = Blockly.Web.injectNewDom_(objectHeader, goog.dom.TagName.H4, ``, 'catblocks-object-text');
    objectText.textContent = `Object - ${objectName}`;

    if (options.expandable) {
      objectText.addEventListener('click', Blockly.Web.codeClickHandler);
    }
  }
  //let svgContainer = Blockly.Web.injectNewDom_(objectContainer, goog.dom.TagName.DIV, `${objectName}-svg`, 'catblocks-svg');

  return objectContainer;
}

/**
 * Inject all catblocks scenes from xml into div
 * @param {dom} div parent node where we should inject it
 * @public
 */
Blockly.Web.injectAllScenesToDiv = function (container, xmlString, options = Blockly.Web.defaultOptions.injectAllScenesToDiv) {
  if (goog.isString(container)) {
    container = document.getElementById(container) ||
      document.querySelector(container);
  }
  // Verify that the container is in document.
  if (!goog.dom.contains(document, container)) {
    throw 'Error: container is not in current document.';
  }

  let xmlDom = Blockly.Web.xmlToDom(xmlString);
  if (!xmlDom) {
    console.error('Failed to injectAllScenesToDiv, could not parse xmlString');
    return;
  }

  // iterate over all scenes -> objects -> scripts
  let scenes = xmlDom.firstChild.children;
  for (let iscene = 0; iscene < scenes.length; iscene++) {
    let scene = scenes[iscene];
    let sceneContainer = Blockly.Web.addSceneContainer_(container, scene.getAttribute('type'));


    let objects = scene.children;
    for (let iobject = 0; iobject < objects.length; iobject++) {
      let object = objects[iobject];
      let objectName = object.getAttribute('type');
      let objectContainer = Blockly.Web.addObjectContainer_(sceneContainer, objectName);
      let svgContainer = objectContainer.lastElementChild;

      // // transform xml -> 
      Blockly.Web.transformXml_(object, {
        'block': ['rmAtt_id', 'rmAtt_id', 'rmAtt_id']
      });

      // // wrap all the childs -> script into one xml for import
      // let mainNode = goog.dom.createDom('xml', { 'xmlns': 'http://www.w3.org/1999/xhtml' });
      // while (object.childElementCount > 0) {
      //   let subNode = object.firstElementChild.children;
      //   Object.keys(subNode).forEach(iblock => {
      //     mainNode.appendChild(subNode[iblock]);
      //   });
      //   object.removeChild(object.firstElementChild);
      // }

      // inject new read only workspace
      let workspace = Blockly.Web.createReadonlyWorkspace_(objectContainer, 0.75);
      //console.log(workspace);
      // load all scripts and update workspace size
      while (object.childElementCount > 0) {
        let script = object.firstElementChild;

        let blockXml = goog.dom.createDom('xml', { 'xmlns': 'http://www.w3.org/1999/xhtml' });
        blockXml.appendChild(script.firstElementChild);
        object.removeChild(script);

        Blockly.Web.addBlockXmlToWorkspace_(blockXml, workspace, false);
      }
      workspace.getInjectionDiv().style.display = 'none';
      objectContainer.style.display = 'none';

      // TODO: find a better logic, this does not work
      // append svg image into catblocks container to remove all EventHandler and enable scrolling, etc.
      //let injectDiv = workspace.getParentSvg().parentElement;
      //svgContainer.appendChild(workspace.getParentSvg());
      //objectContainer.removeChild(injectDiv);
    }
  }
  // INFO: remove before fly
  //container.style.display = 'none';
}

/**
 * EventHandler for code, expand/collapse scene and object
 * @param {Event} event to handle
 * @private
 */
Blockly.Web.codeClickHandler = function (event) {
  let container = event.target.parentElement.parentElement;
  // console.log(container);

  let className = event.target.classList.contains('catblocks-scene-text') ? 'catblocks-object' : 'injectionDiv';
  let objects = container.getElementsByClassName(className);
  for (let iobject = 0; iobject < objects.length; iobject++) {
    let object = objects[iobject];
    object.style.display = object.style.display === 'none' ? 'block' : 'none';

    // Blockly does not draw the svg's if the container is display none
    // so we need to call svgResize for each expaned workspace
    // TODO: fix bug -> on window change with compinatin display: 'none'
    if (className === 'injectionDiv' && object.style.display === 'block') {
      let workspaceId = object.id;
      console.log(workspaceId);
      Blockly.svgResize(Blockly.Workspace.WorkspaceDB_[workspaceId]);
    }
  }
}


/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Web.CSS_CONTENT = ['#catblocks {',
  '    height: 100%;',
  '    margin: 0px;',
  '    padding: 10px;',
  '}',
  '',
  '.catblocks-scene,',
  '.catblocks-object {',
  '    padding: 5px 10px;',
  '    border-radius: 20px;',
  '    margin: 5px 0px;',
  '}',
  '',
  '.catblocks-scene {',
  '    background-color: gainsboro;',
  '}',
  '',
  '.catblocks-object {',
  '    background-color: bisque;',
  '}',
  '',
  '.injectionDiv {',
  '    border-radius: 20px;',
  '    overflow: hidden;',
  '}'];