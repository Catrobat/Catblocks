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
 * Hidden workspace to render svg images
 * @type {Object}
 * @private
 */
Blockly.Web.renderWorkspace_ = null;

/**
 * Default image if we have not found the source
 * @type {string}
 * @private
 */
Blockly.Web.noImageFound_ = '/scratch-blocks-develop/tests/catroweb/public/resources/No_Image_Available.jpg';

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
 * Default options defined here
 * @enum {object}
 * @private
 */
Blockly.Web.defaultOptions_ = {
  renderOptions: {
    container: 'body',
    blockScale: 0.75
  },
  injectAllScenes: {
    expandable: true
  },
  createSceneContainer: {
    writeHeader: true,
    expandable: true
  },
  createObjectContainer: {
    writeHeader: true,
    writeStats: true,
    writeLook: true,
    expandable: true
  }
};

/**
 * Parse options, if value exists in inputValues use this one
 * Otherwise go with the value from defaultValues
 * @param {Object} inputValues to use if exists
 * @param {Object} defaultValues to parse down
 * @return {Object} either input or default value
 * @private
 */
Blockly.Web.parseOptions_ = function(inputValues, defaultValues) {
  if (!goog.isDefAndNotNull(inputValues)) {
    return Object.assign({}, defaultValues);
  } else {
    var resultObject = Object.assign({});
    var keys = Object.keys(inputValues).concat(Object.keys(defaultValues));
    for (var ikey = 0; ikey < keys.length; ikey++) {
      var key = keys[ikey];
      if (goog.isDefAndNotNull(inputValues[key])) {
        resultObject[key] = inputValues[key];
      } else {
        resultObject[key] = defaultValues[key];
      }
    }
  }

  return resultObject;
};

/**
 * Parse xml for Web into catblocks dom object
 * @param {string} xmlString to parse into catblocks dom object
 * @return {Element} xml object
 * @public
 */
Blockly.Web.xmlToDom = function(xmlString) {
  if (!goog.isDefAndNotNull(Blockly.Web.domParser_)) {
    console.error("Blockly.Web.domParser_ is not initiated yet, please run initBlockly first.");
    return;
  }

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
  var xmlDom = goog.isString(xml) ? Blockly.Web.xmlToDom(xml) : xml;

  var tagNames = Object.keys(tagActions);
  for (var itag = 0; itag < tagNames.length; itag++) {
    var tagName = tagNames[itag];
    var nodes = xmlDom.getElementsByTagName(tagName);
    for (var inodes = 0; inodes < nodes.length; inodes++) {
      var actions = tagActions[tagName];
      for (var iaction = 0; iaction < actions.length; iaction++) {
        var actionType = actions[iaction].split('-')[0];
        var actionValue = actions[iaction].split('-')[1];
        switch (actionType) {
          case 'remAttr': {
            nodes[inodes].removeAttribute(actionValue);
            break;
          }
          default: {
            console.warn("Ignore undefined XML transformation.");
          }
        }
      }
    }
  }
};

/**
 * Create new read only workspace and inject it into container Element
 * @param {Element} container where to inject Blockly workspace
 * @param {number} blockscale block scale for workspace
 * @returns {workspace} created workspace object
 * @private
 */
Blockly.Web.createReadonlyWorkspace_ = function(container, blockscale) {
  if (container.tagName !== goog.dom.TagName.DIV.tagName_) {
    console.error("Please provide a div as container - createSceneWorkspace");
  }

  var workspace = Blockly.inject(container, {
    readOnly: true,
    media: '/public/images/catblocks/',
    zoom: {
      controls: false,
      wheel: false,
      startScale: blockscale
    }
  });
  workspace.getInjectionDiv().id = workspace.id;

  return workspace;
};

/**
 * Inject new dom into container with provided attributes and textContent is present
 * @param {Element} container dom where to injectAllScenes the new scene
 * @param {Object} tagName to injectAllScenes into container
 * @param {?Object<string, string>|?string} attributes attribute object or just class name
 * @param {?string} textContent to set for new dom element
 * @return {Element} new created subcontainer
 * @private
 */
Blockly.Web.injectNewDom_ = function(container, tagName, attributes, textContent) {
  var subContainer = goog.dom.createDom(tagName, attributes);
  if (goog.isDefAndNotNull(textContent)) {
    subContainer.textContent = textContent;
  }
  container.appendChild(subContainer);
  return subContainer;
};

/**
 * Wrap element into new element, type defined via wrapTag
 * Map all attributes to wrap element
 * @param {Element|string} element to wrap
 * @param {Object} wrapTag to wrap element into
 * @param {?Object} attributes map to wrapTag element
 * @return {Element} wrapped element and mapped attributes
 * @private
 */
Blockly.Web.wrapElement_ = function(element, wrapTag, attributes) {
  var parent = goog.dom.createDom(wrapTag);
  if (goog.isDefAndNotNull(attributes)) {
    var keys = Object.keys(attributes);
    for (var ikey = 0; ikey < keys.length; ikey++) {
      var key = keys[ikey];
      parent.setAttribute(key, attributes[key]);
    }
  }
  parent.appendChild(element);

  return parent;
};

/**
 * Inject new scene container into Element container provied in params
 * @param {Element} container append new scene container to this element
 * @param {string} sceneName mapped to id from the new dom
 * @param {!object<string, object>} options how we should build up the scene container
 * @return {Element} new created scene container
 * @private
 */
Blockly.Web.addSceneContainer_ = function(container, sceneName, options) {
  var sceneOptions = Blockly.Web.parseOptions_(options, Blockly.Web.defaultOptions_.createSceneContainer);
  var sceneContainer = Blockly.Web.injectNewDom_(container, goog.dom.TagName.DIV, { 'class': 'catblocks-scene', 'id': 'sceneName' });

  var sceneHeader = null;
  if (sceneOptions.writeHeader) {
    sceneHeader = Blockly.Web.injectNewDom_(sceneContainer, goog.dom.TagName.DIV, { 'class': 'catblocks-scene-header', 'id': sceneName + '-header' });
    var sceneText = Blockly.Web.injectNewDom_(sceneHeader, goog.dom.TagName.P, 'catblocks-scene-text');
    sceneText.innerHTML = 'Scene: <span class="catblocks-scene-name">' + sceneName + '</span>';
  }

  var sceneObjectContainer = Blockly.Web.injectNewDom_(sceneContainer, goog.dom.TagName.DIV, 'catblocks-object-container');

  // TODO: use something different than the name element
  if (sceneOptions.expandable) {
    sceneText.addEventListener('click', Blockly.Web.codeClickHandler_);
    sceneObjectContainer.style.display = 'none';
  }

  return sceneContainer;
};

/**
 * Inject new object container into Element container provied in params
 * @param {Element} container append new object container to this element
 * @param {string} objectName mapped to id from the new dom
 * @param {!object<string, object>} options how we should build up the scene container
 * @return {Element} new created object container
 * @private
 */
Blockly.Web.addObjectContainer_ = function(container, objectName, options) {
  var objectOptions = Blockly.Web.parseOptions_(options, Blockly.Web.defaultOptions_.createObjectContainer);
  var objectContainer = Blockly.Web.injectNewDom_(container, goog.dom.TagName.DIV, { 'class': 'catblocks-object', 'id': objectName });

  if (objectOptions.writeHeader) {
    var objectHeader = Blockly.Web.injectNewDom_(objectContainer, goog.dom.TagName.DIV, { 'class': objectName + ' - header', 'id': 'catblocks-object-header' });
    var objectText = Blockly.Web.injectNewDom_(objectHeader, goog.dom.TagName.P, 'catblocks-object-text');
    objectText.innerHTML = 'Object: <span class="catblocks-object-name">' + objectName + '</span>';
  }

  var objectProps = Blockly.Web.injectNewDom_(objectContainer, goog.dom.TagName.DIV, 'catblocks-object-props-container');

  if (objectOptions.writeLook && goog.isString(objectOptions.lookImgPath)) {
    var lookContainer = Blockly.Web.injectNewDom_(objectProps, goog.dom.TagName.DIV, 'catblocks-object-look-container');
    // INFO: we get this information via {{ path }} twig attribute
    var lookImgRoot = '/scratch-blocks-develop/tests/catroweb/public/resources/extract/adf0839ae32edc6d5664dc637c24b6c4/';
    var lookImg = Blockly.Web.injectNewDom_(lookContainer, goog.dom.TagName.IMG, {
      'class': 'catblocks-object-look-item',
      'src': lookImgRoot + options.lookImgPath.split('#').join('%23'),
      'onerror': function(event) { event.target.src = Blockly.Web.noImageFound_ }
      // 'title': 'Look-' + sceneName,
      // 'alt': goog.isString(options.lookAlt) ? options.lookAlt : 'Look from current scene'
    });
  }

  if (objectOptions.writeStats) {
    var statsContainer = Blockly.Web.injectNewDom_(objectProps, goog.dom.TagName.DIV, 'catblocks-object-stats-container');
    var labelContainer = Blockly.Web.injectNewDom_(statsContainer, goog.dom.TagName.DIV, 'catblocks-object-stats-label-container');
    var valueContainer = Blockly.Web.injectNewDom_(statsContainer, goog.dom.TagName.DIV, 'catblocks-object-stats-value-container');
    Blockly.Web.injectNewDom_(labelContainer, goog.dom.TagName.UL, "catblocks-object-stats-lable-list");
    Blockly.Web.injectNewDom_(valueContainer, goog.dom.TagName.UL, "catblocks-object-stats-value-list");
  }

  var objectScriptContainer = Blockly.Web.injectNewDom_(objectContainer, goog.dom.TagName.DIV, 'catblocks-scripts-container');

  // TODO: use something different than the name element
  if (objectOptions.expandable) {
    objectText.addEventListener('click', Blockly.Web.codeClickHandler_);
    objectScriptContainer.style.display = 'none';
  }

  return objectContainer;
};

/**
 * Little helper function to update object stats object
 * It returns the merged objects, on same key we generate the sum
 * @param {Object} oldStats status to update
 * @param {Object} newStats update, either append or sum up
 * @returns {Object} updated stats
 * @private
 */
Blockly.Web.updateObjectStats_ = function(oldStats, newStats) {
  var updatedStats = Object.assign({}, oldStats);
  var statNames = Object.keys(newStats);
  for (var istat = 0; istat < statNames.length; istat++) {
    var statName = statNames[istat];
    if (goog.isDefAndNotNull(oldStats[statName])) {
      updatedStats[statName] += newStats[statName];
    } else {
      updatedStats[statName] = newStats[statName];
    }
  }

  return updatedStats;
};

/**
 * Write objects stats to object stats elements
 * Remove the old stats first before we write the new one
 * Please use updateObjectStats_ to get the sum or multiple substats
 * @param {Element} objectContainer to update the stats
 * @param {Object} stats stats to write into Elemnt
 * @private
 */
Blockly.Web.writeObjectStats_ = function(objectContainer, stats) {
  var labelList = objectContainer.getElementsByClassName('catblocks-object-stats-lable-list')[0];
  var valueList = objectContainer.getElementsByClassName('catblocks-object-stats-value-list')[0];
  goog.dom.removeChildren(labelList);
  goog.dom.removeChildren(valueList);

  Blockly.Web.injectNewDom_(labelList, goog.dom.TagName.LI, "catblocks-object-stats-lable-item", "Name:");
  Blockly.Web.injectNewDom_(valueList, goog.dom.TagName.LI, "catblocks-object-stats-value-item", stats['name']);
  delete (stats['name']);

  Blockly.Web.injectNewDom_(labelList, goog.dom.TagName.LI, "catblocks-object-stats-lable-item", "Scripts:");
  Blockly.Web.injectNewDom_(valueList, goog.dom.TagName.LI, "catblocks-object-stats-value-item", stats['scripts']);
  delete (stats['scripts']);

  var categories = Object.keys(stats).sort();
  for (var icat = 0; icat < categories.length; icat++) {
    var category = categories[icat];
    var label = Blockly.Web.injectNewDom_(labelList, goog.dom.TagName.LI, "catblocks-object-stats-lable-item");
    var value = Blockly.Web.injectNewDom_(valueList, goog.dom.TagName.LI, "catblocks-object-stats-value-item");
    label.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    value.textContent = stats[category];
  }
};

/**
 * Get workspace stats and return it
 * @param {object} workspace to parse stats
 * @returns {object} stats from worspace
 * @private
 */
Blockly.Web.getWorkspaceBlockStats_ = function(workspace) {
  var workspaceStats = {
    scripts: 1
  };

  var blockNames = Object.keys(workspace.blockDB_);
  for (var iblock = 0; iblock < blockNames.length; iblock++) {
    var blockName = blockNames[iblock];
    var block = workspace.blockDB_[blockName];
    if (goog.isDefAndNotNull(block.category_)) {
      if (goog.isDefAndNotNull(workspaceStats[block.category_])) {
        workspaceStats[block.category_]++;
      } else {
        workspaceStats[block.category_] = 1;
      }
    }
  }

  return workspaceStats;
};

/**
 * Render svg from blockXml via renderWorkspace
 * After rendering, we deep copy just the svg and return it
 * @param {Element} blockXml blocks to render into svg
 * @param {?Object} workspace to render in
 * @returns {Object<Element, Object>} svg with block stats
 * @public
 */
Blockly.Web.domToSvgWithStats = function(blockXml, workspace) {
  var renderWorkspace = goog.isDefAndNotNull(workspace) ? workspace : Blockly.Web.renderWorkspace_;
  if (!goog.isDefAndNotNull(renderWorkspace)) {
    console.error('Can not render block xml without workspace, please init first default or pass one as param');
    return;
  }
  var xOffset = 50;
  var yOffset = 50;

  // move it away from the edges
  Blockly.Web.transformXml_(blockXml, {
    'block': ['remAttr-id', 'remAttr-x', 'remAttr-y'],
    'shadow': ['remAttr-id', 'remAttr-x', 'remAttr-y']
  });
  blockXml.firstElementChild.setAttribute('x', xOffset);
  blockXml.firstElementChild.setAttribute('y', yOffset);

  renderWorkspace.clear();
  Blockly.Xml.domToWorkspace(blockXml, renderWorkspace);
  var oriSvg = renderWorkspace.getParentSvg();
  var oriBox = oriSvg.lastElementChild.getBBox();

  // remove rect around it
  var newSvg = oriSvg.cloneNode(true);
  newSvg.lastElementChild.removeChild(newSvg.lastElementChild.firstElementChild);
  newSvg.setAttribute('width', oriBox.width + xOffset);
  newSvg.setAttribute('height', oriBox.height + yOffset);
  newSvg.setAttribute('class', 'catblocks-svg');

  return {
    svg: newSvg,
    stats: Blockly.Web.getWorkspaceBlockStats_(renderWorkspace)
  };
};


/**
 * Initiate Blockly for Web useage
 * In case you need to render SVG elements, please set a container in params
 * @param {string} locale to use for Web, loaded from CatblocksMsgs
 * @param {object} renderOptions with settings for the hidden render workspace
 * @public
 */
Blockly.Web.initBlockly = function(locale, renderOptions) {

  var blockLocale = goog.isString(locale) ? locale : "en_GB";
  Blockly.CatblocksMsgs.setLocale(blockLocale);
  Blockly.Web.domParser_ = new DOMParser();

  var cssNode = document.createElement('style');
  document.head.insertBefore(cssNode, document.head.firstChild);
  var cssText = document.createTextNode(Blockly.Web.CSS_CONTENT.join('\n'));
  cssNode.appendChild(cssText);

  // create hidden workspace for svg rendering
  var renderConfig = Blockly.Web.parseOptions_(renderOptions, Blockly.Web.defaultOptions_.renderOptions);
  if (goog.isDefAndNotNull(renderConfig)) {
    var hiddenContainer = Blockly.Web.injectNewDom_(renderConfig.container, goog.dom.TagName.DIV, {
      id: 'hidden-workspace',
      class: 'hidden'
    });
    Blockly.Web.renderWorkspace_ = Blockly.Web.createReadonlyWorkspace_(hiddenContainer, renderConfig.blockScale);
  }
};


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

  var scenesContainer = Blockly.Web.injectNewDom_(container, goog.dom.TagName.DIV, { 'class': 'catblocks-scene-container', 'id': 'catblocks-scene-container' });
  if (injectOptions.expandable) {
    scenesContainer.style.display = 'none';
  }

  var scenes = xmlElement.firstChild.children;
  for (var iscene = 0; iscene < scenes.length; iscene++) {
    var scene = scenes[iscene];
    var sceneName = scene.getAttribute('type');
    var sceneContainer = Blockly.Web.addSceneContainer_(scenesContainer, sceneName);
    var sceneObjectContainer = sceneContainer.getElementsByClassName('catblocks-object-container')[0];

    var objects = scene.children;
    for (var iobject = 0; iobject < objects.length; iobject++) {
      var object = objects[iobject];
      var objectName = object.getAttribute('type');
      var objectContainer = Blockly.Web.addObjectContainer_(sceneObjectContainer, objectName, {
        lookImgPath: sceneName + '/images/' + object.getAttribute('look')
      });

      // object stats with init values
      var objectStats = {
        'name': objectName,
        'scripts': 0
      };
      var objectScriptContainer = objectContainer.getElementsByClassName('catblocks-scripts-container')[0];

      if (object.childElementCount === 0) {
        var scriptContainer = Blockly.Web.injectNewDom_(objectScriptContainer, goog.dom.TagName.DIV, 'catblocks-object-script-container catblocks-empty-script');
        Blockly.Web.injectNewDom_(scriptContainer, goog.dom.TagName.P, 'catblocks-empty-script-text', "No Script defined here");
      } else {
        while (object.childElementCount > 0) {
          var script = object.firstElementChild;
          var blockXml = Blockly.Web.wrapElement_(script.firstElementChild, 'xml', { 'xmlns': 'http://www.w3.org/1999/xhtml' });
          object.removeChild(script);

          var scriptContainer = Blockly.Web.injectNewDom_(objectScriptContainer, goog.dom.TagName.DIV, 'catblocks-object-script-container');
          var svgBlock = Blockly.Web.domToSvgWithStats(blockXml);
          scriptContainer.appendChild(svgBlock.svg);
          objectStats = Blockly.Web.updateObjectStats_(objectStats, svgBlock.stats);
        }
      }
      Blockly.Web.writeObjectStats_(objectContainer, objectStats);
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

  var className = container.classList.contains('catblocks-scene') ? 'catblocks-object-container' : 'catblocks-scripts-container';
  var objects = container.getElementsByClassName(className);
  for (var iobject = 0; iobject < objects.length; iobject++) {
    var object = objects[iobject];
    object.style.display = object.style.display === 'none' ? 'block' : 'none';
  }
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Web.CSS_CONTENT = [
  '.hidden {',
  '    height: 0px;',
  '    width: 0px;',
  '}',
  '.catblocks-scene,',
  '.catblocks-object {',
  '    padding: 5px 20px;',
  '    border-radius: 20px;',
  '    margin: 5px 0px;',
  '}',
  '',
  '.catblocks-scene {',
  '    border-style: solid;',
  '    border-color: gainsboro;',
  '}',
  '',
  '.catblocks-object {',
  '    background-color: #17a5b8;',
  '}',
  '.catblocks-scene:hover {',
  '   background-color: aliceblue;',
  '}',
  '.catblocks-object:hover {',
  '   background-color: #17a5b880;',
  '}',
  '',
  '.catblocks-scene-text, ',
  '.catblocks-object-text {',
  '}',
  '',
  '.catblocks-scene-name, ',
  '.catblocks-object-name {',
  '    font-size: 16px;',
  '    font-weight: bold;',
  '}',
  '',
  '.catblocks-object-stats-container {',
  '    display: flex;',
  '    min-width: 400px;',
  '    max-width: 400px;',
  '}',
  '.catblocks-object-stats-label-container {',
  '    font-weight: bold;',
  '    min-width: 150px;',
  '    max-width: 150px;',
  '}',
  '.catblocks-object-stats-value-container ul{',
  '    list-style-type: none;',
  '}',
  '.catblocks-object-script-container {',
  '    margin: 2px 0px;',
  '    overflow-x: scroll;',
  '    overflow-y: hidden;',
  '    scrollbar-width: none;',
  '    background: aliceblue;',
  '    width: 100%;',
  '    border-radius: 20px;',
  '}',
  '.catblocks-empty-script-text {',
  '    text-align: center;',
  '    vertical-align: middle;',
  '    line-height: 50px;',
  '    font-weight: bold;',
  '}',
  '.catblocks-object-props-container {',
  '    display: flex;',
  '    flex-wrap: wrap;',
  '}',
  '.catblocks-object-look-container {',
  '    min-width: 100px;',
  '    max-width: 100px;',
  '}',
  '.catblocks-object-look-item {',
  '    min-width: 100px;',
  '    max-width: 100px;',
  '    border-radius: 20%;',
  '}'];
