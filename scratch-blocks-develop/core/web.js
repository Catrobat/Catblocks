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
 * DomParser_ instance for Web
 * @type {Object}
 * @private
 */
Blockly.Web.domParser_ = null;

/**
 * Parsing formats for DomParser object
 * @enum {string}
 * @private
 */
Blockly.Web.parseFormats_ = {
  HTML: 'text/html',
  XML: 'text/xml',
  APP_XML: 'application/xml',
  APP_HTML_XML: 'application/xhtml+xml',
  IMG_SVG: 'image/svg+xml'
};

/**
 * Default options for function calls
 * @enum {object<}
 * @private
 */
Blockly.Web.defaultOptions_ = {
  injectAllScenes: {
    'test': 'test'
  },
  createSceneContainer: {
    writeHeader: true,
    injectOnClick: true,
    expandable: true
  },
  createObjectContainer: {
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
Blockly.Web.initBlockly = function(locale) {

  // #TODO: use the locale from the server
  var locale_ = goog.isString(locale) ? locale : "en_GB";
  Blockly.CatblocksMsgs.setLocale(locale_);
  Blockly.Web.domParser_ = new DOMParser();

  // injectAllScenes css into document head
  var cssNode = document.createElement('style');
  document.head.insertBefore(cssNode, document.head.firstChild);

  var cssText = document.createTextNode(Blockly.Web.CSS_CONTENT.join('\n'));
  cssNode.appendChild(cssText);
};

/**
 * Parse xml for Web into catblocks dom object
 * @param {string} xmlString to parse into catblocks dom object
 * @return {Element} xml object
 * @public
 */
Blockly.Web.xmlToDom = function(xmlString) {
  var xmlDoc = Blockly.Web.domParser_.parseFromString(xmlString, Blockly.Web.parseFormats_.XML);
  if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
    console.error("Failed to parse xml string, please check if you have passed a valid xml file.");
    return undefined;
  }
  return xmlDoc;
};

/**
 * Transform dom xml, execute actions define in options
 * @param {Element|string} xml to transform
 * @param {object} tagActions to map against tag elements
 * @private
 */
Blockly.Web.transformXml_ = function(xml, tagActions) {
  // TODO: may move into xml.js file
  var xmlDom = goog.isString(xml) ? Blockly.Web.xmlToDom(xml) : xml;
  // run actions against xmlDom
  for (var iaction = 0; iaction < tagActions.length; iaction++) {
    var tagName = tagActions[iaction];
    var nodes = xmlDom.getElementsByTagName(tagName);
    for (var inodes = 0; inodes < nodes.length; inodes++) {
      nodes[inodes].removeAttribute('id');
      nodes[inodes].removeAttribute('x');
      nodes[inodes].removeAttribute('y');
    }
  }
};

/**
 * Create new read only workspace and injectAllScenes it into container
 * @param {Element} container to from scene where we should injectAllScenes the workspace
 * @param {number} blockscale block scale for workspace
 * @returns {workspace} created workspace object
 * @private
 */
Blockly.Web.createReadonlyWorkspace_ = function(container, blockscale) {
  if (container.tagName !== goog.dom.TagName.DIV.tagName_) {
    console.error("Please provide a div as container - createSceneWorkspace");
  }

  var blockscale_ = goog.isNumber(blockscale) ? blockscale : 0.75;
  // force to use the entire width
  // TODO: remove before fly
  //container.style.width = "100%";
  //container.style.height = "1000px";

  // injectAllScenes a new workspace, we will reuse this one for all scenes
  var workspace = Blockly.inject(container, {
    readOnly: true,
    media: './../../media/',
    zoom: {
      controls: false,
      wheel: false,
      startScale: blockscale_
    }
  });
  return workspace;
};

/**
 * Clean workspace, reset size to 0 and remove all blocks
 * @param {workspace} workspace to clean
 * @public
 */
Blockly.Web.clearSceneWorkspace = function(workspace) {
  var injectContainer = workspace.blockDragSurface_.container_.parentElement;
  var mainBlock = injectContainer.getElementsByTagName('svg')[0];
  workspace.clear();
  injectContainer.setAttribute('height', '0px');
  mainBlock.setAttribute('height', '0px');
};


/**
 * Load new xml to workspace, clean first if not already done
 * @param {Element|string} xml to load into workspace
 * @param {workspace} workspace to which we should load the xml
 * @param {boolean} erase workspace or not
 * @private
 */
Blockly.Web.addBlockXmlToWorkspace_ = function(xml, workspace, erase) {
  // get DOM xml, either convert or directly
  var xmlDom = goog.isString(xml) ? Blockly.Xml.textToDom(xml) : xml;
  var cleanWorkspace = goog.isBoolean(erase) ? erase : true;

  // some dom nodes we need to deal with
  console.log(workspace);

  var injectContainer = workspace.blockDragSurface_.container_.parentElement;
  workspace.getInjectionDiv().id = workspace.id;
  var blockSvg = injectContainer.getElementsByTagName('svg')[0];

  var heightOffset = injectContainer.clientHeight === 0 ? 50 : injectContainer.clientHeight;
  //var workspaceWidth = injectContainer.clientWidth;
  var widthOffset = 20; //workspaceWidth / 2;

  // move it awai from the edges
  xmlDom.firstElementChild.setAttribute('x', widthOffset);
  xmlDom.firstElementChild.setAttribute('y', heightOffset);
  // erase if require
  if (cleanWorkspace) {
    Blockly.Web.clearSceneWorkspace(workspace);
  }

  Blockly.Xml.domToWorkspace(xmlDom, workspace);
  var gbox = blockSvg.getBBox();

  // remove first the size define by blockly
  blockSvg.setAttribute('height', gbox.height + 100 + 'px');
  blockSvg.style.position = 'inherit';
};

/**
 * Inject new dom into container with id and class given
 * @param {Element} container dom where to injectAllScenes the new scene
 * @param {Object} tagName to injectAllScenes into container
 * @param {string} idName to set for the new dom element
 * @param {string} className to set for the new dom element
 * @return {Element} new created subcontainer
 * @private
 */
Blockly.Web.injectNewDom_ = function(container, tagName, idName, className) {
  var subContainer = goog.dom.createDom(tagName, {
    'id': idName,
    'class': className
  });
  container.appendChild(subContainer);
  return subContainer;
};

/**
 * Inject new scene into cotainer
 * @param {Element} container dom where to injectAllScenes the new scene
 * @param {string} sceneName mapped to id from the new dom
 * @param {!object<string, object>} options how we should build up the scene container
 * @return {Element} new created scene container
 * @private
 */
Blockly.Web.addSceneContainer_ = function(container, sceneName, options) {
  var sceneOptions = Blockly.Web.parseOptions_(options, Blockly.Web.defaultOptions_.createSceneContainer);
  var sceneContainer = Blockly.Web.injectNewDom_(container, goog.dom.TagName.DIV, sceneName, 'catblocks-scene');

  var sceneHeader = null;
  if (sceneOptions.writeHeader) {
    sceneHeader = Blockly.Web.injectNewDom_(sceneContainer, goog.dom.TagName.DIV, sceneName + '-header', 'catblocks-scene-header');
    var sceneText = Blockly.Web.injectNewDom_(sceneHeader, goog.dom.TagName.H3, '', 'catblocks-scene-text');
    sceneText.textContent = 'Scene - ' + sceneName;
    if (sceneOptions.expandable) {
      sceneText.addEventListener('click', Blockly.Web.codeClickHandler_);
    }
  }

  return sceneContainer;
};

/**
 * Inject new object into cotainer
 * @param {Element} container dom where to injectAllScenes the new scene
 * @param {string} objectName mapped to id from the new dom
 * @param {!object<string, object>} options how we should build up the scene container
 * @return {Element} new created object container
 * @private
 */
Blockly.Web.addObjectContainer_ = function(container, objectName, options) {
  var objectOptions = Blockly.Web.parseOptions_(options, Blockly.Web.defaultOptions_.createObjectContainer);
  var objectContainer = Blockly.Web.injectNewDom_(container, goog.dom.TagName.DIV, objectName, 'catblocks-object');

  var objectHeader = null;
  if (objectOptions.writeHeader) {
    objectHeader = Blockly.Web.injectNewDom_(objectContainer, goog.dom.TagName.DIV, objectName + '-header', 'catblocks-object-header');
    var objectText = Blockly.Web.injectNewDom_(objectHeader, goog.dom.TagName.H4, '', 'catblocks-object-text');
    objectText.textContent = 'Object - ' + objectName;
    if (objectOptions.expandable) {
      objectText.addEventListener('click', Blockly.Web.codeClickHandler_);
    }
  }

  return objectContainer;
};


/**
 * Parse options, if value exists in inputValues use this one
 * Otherwise go with the value from defaultValues
 * @param {Object<string, string} inputValues to use if exists
 * @param {Object<string, string} defaultValues to parse down
 * @return {Object<string, string} either input or default value
 * @private
 */
Blockly.Web.parseOptions_ = function(inputValues, defaultValues) {
  if (!goog.isDefAndNotNull(inputValues)) {
    return defaultValues;
  } else {
    var resultObject = {};
    var keys = Object.keys(defaultValues);
    for (var ikey = 0; ikey < keys.length; ikey++) {
      if (goog.isDefAndNotNull(inputValues[keys])) {
        resultObject[key] = inputValues[key];
      } else {
        inputValues[keys] = defaultValues[key];
      }
    }
  }
}

/**
 * Inject all catblocks scenes from xml into div
 * @param {Element} container dom to inject all loaded scenes
 * @param {string} xmlString which includes all scenes to inject
 * @param {Object} options how we should inject all scenes
 * @public
 */
Blockly.Web.injectAllScenes = function(container, xmlString, options) {
  if (goog.isString(container)) {
    container = document.getElementById(container) ||
      document.querySelector(container);
  }
  if (!goog.dom.contains(document, container)) {
    throw 'Error: container is not in current document.';
  }

  var injectOptions = Blockly.Web.parseOptions_(options, Blockly.Web.defaultOptions_.injectAllScenes);

  var xmlElement = Blockly.Web.xmlToDom(xmlString);
  if (!goog.isDefAndNotNull(xmlElement)) {
    console.error('Failed to injectAllScenes, could not parse xmlString');
    return;
  }



  // INFO: all preperations are done, let's start with the injection
  var scenes = xmlElement.firstChild.children;
  for (var iscene = 0; iscene < scenes.length; iscene++) {
    var scene = scenes[iscene];
    var sceneContainer = Blockly.Web.addSceneContainer_(container, scene.getAttribute('type'));


    var objects = scene.children;
    for (var iobject = 0; iobject < objects.length; iobject++) {
      var object = objects[iobject];
      var objectName = object.getAttribute('type');
      var objectContainer = Blockly.Web.addObjectContainer_(sceneContainer, objectName);

      Blockly.Web.transformXml_(object, {
        'block': ['rmAtt_id', 'rmAtt_id', 'rmAtt_id']
      });

      var workspace = Blockly.Web.createReadonlyWorkspace_(objectContainer, 0.75);
      //console.log(workspace);

      // load all scripts and update workspace size
      while (object.childElementCount > 0) {
        var script = object.firstElementChild;

        var blockXml = goog.dom.createDom('xml', { 'xmlns': 'http://www.w3.org/1999/xhtml' });
        blockXml.appendChild(script.firstElementChild);
        object.removeChild(script);

        Blockly.Web.addBlockXmlToWorkspace_(blockXml, workspace, false);
      }
      workspace.getInjectionDiv().style.display = 'none';
      objectContainer.style.display = 'none';
    }
  }
};



/**
 * EventHandler for code, expand/collapse scene and object
 * @param {Event} event to handle
 * @private
 */
Blockly.Web.codeClickHandler_ = function(event) {
  var container = event.target.parentElement.parentElement;
  // console.log(container);

  var className = event.target.classList.contains('catblocks-scene-text') ? 'catblocks-object' : 'injectionDiv';
  var objects = container.getElementsByClassName(className);
  for (var iobject = 0; iobject < objects.length; iobject++) {
    var object = objects[iobject];
    object.style.display = object.style.display === 'none' ? 'block' : 'none';

    // Blockly does not draw the svg's if the container is display none
    // so we need to call svgResize for each expaned workspace
    if (className === 'injectionDiv') {
      var workspaceId = object.id;
      Blockly.svgResize(Blockly.Workspace.WorkspaceDB_[workspaceId]);
    }
  }
};


/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Web.CSS_CONTENT = [
];
