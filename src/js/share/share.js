/**
 * This file will be used in catroweb to render everything properly
 */

import Blockly from 'scratch-blocks';
import Parser from '../parser/parser';
import { defaultOptions, parseOptions, transformXml, injectNewDom, wrapElement, removeAllChildren, getDomElement, hasChildren, enableExpandable, trimString, checkNextBlock } from './utils';

export class Share {
  constructor() {
    this.blockly = Blockly;
    this.parser = Parser;
    this.config = {};
    this.workspaceDom = undefined;
    this.workspace = undefined;
    this.cssNode = undefined;
  }

  /**
	 * init share class instance
	 * @param {Element} options for rendering process
	 */
  init(options) {
    this.config = parseOptions(options, defaultOptions.render);
    this.cssNode = document.createElement('style');
    document.head.insertBefore(this.cssNode, document.head.firstChild);
    const cssText = document.createTextNode(this.getCssContent());
    this.cssNode.appendChild(cssText);

    this.createReadonlyWorkspace();
  }

  /**
   * Create new read only workspace and inject it into container Element
   */
  createReadonlyWorkspace() {
    const hiddenContainer = injectNewDom(this.config.container, 'DIV', {
      id: 'hidden-workspace',
      class: 'hidden'
    });

    this.workspace = this.blockly.inject(hiddenContainer, {
      readOnly: true,
      media: `${this.config.shareRoot}${this.config.media}`,
      zoom: {
        controls: false,
        wheel: false,
        startScale: this.config.renderSize
      }
    });
    this.blockly.CatblocksMsgs.setLocale(this.config.language);

    this.workspaceDom = this.workspace.getInjectionDiv();
    this.workspaceDom.id = this.workspace.id;
  }

  /**
   * Little helper function to update object stats object
   * It returns the merged objects, on same key we generate the sum
   * @param {Object} oldStats status to update
   * @param {Object} newStats update, either append or sum up
   * @returns {Object} updated stats
   */
  updateObjectStats(oldStats, newStats) {
    const updatedStats = Object.assign({}, oldStats);
    if (newStats) {
      Object.keys(newStats).forEach(key => {
        if (oldStats[key]) {
          updatedStats[key] += newStats[key];
        } else {
          updatedStats[key] = newStats[key];
        }
      });
      updatedStats['scripts'] = (updatedStats['scripts'])
        ? updatedStats['scripts'] + 1 : 1;
    }
    return updatedStats;
  }

  /**
	 * Get script stats and return
	 * @param {XMLDocument} script to parse starts
	 * @returns {Element} starts value dictonary
	 */
  getScriptStats(script) {
    if (!script) return {};

    const blocks = script.getElementsByTagName('block');
    return Array.from(blocks).map(block => {
      const name = block.getAttribute('type') || 'undefined';
      if (this.blockly.Blocks[name]) {
        const category = this.blockly.Blocks[name].init.toString().match(/Categories.[a-zA-Z]+/);
        if (category.length > 0) return category[0].split('.')[1];
        return 'unknown';
      } else {
        return 'unknown';
      }
    }).reduce((acc, val) => {
      if (acc[val]) {
        acc[val] = acc[val] + 1;
      } else {
        acc[val] = 1;
      }
      return acc;
    }, {});
  }

  /**
   * Get workspace stats and return it
   * @param {object} workspace to parse stats
   * @returns {object} stats from worspace
   */
  getWorkspaceBlockStats() {
    const workspaceStats = {
      scripts: 1
    };

    const blockNames = Object.keys(this.workspace.blockDB_);
    for (let iblock = 0; iblock < blockNames.length; iblock++) {
      const blockName = blockNames[iblock];
      const block = this.workspace.blockDB_[blockName];
      if (block.category_) {
        if (workspaceStats[block.category_]) {
          workspaceStats[block.category_]++;
        } else {
          workspaceStats[block.category_] = 1;
        }
      }
    }
    return workspaceStats;
  }

  /**
   * Render svg from blockXml via renderWorkspace
   * After rendering, we deep copy just the svg and return it
   * @param {Element} blockXml blocks to render into svg
   * @returns {Object<Element, Object>} svg with block stats
   */
  domToSvg(blockXml) {
    const xOffset = 50;
    const yOffset = 50;

    // move it away from the edges
    transformXml(blockXml, {
      'block': ['remAttr-id', 'remAttr-x', 'remAttr-y'],
      'shadow': ['remAttr-id', 'remAttr-x', 'remAttr-y']
    });
    blockXml.firstElementChild.setAttribute('x', xOffset);
    blockXml.firstElementChild.setAttribute('y', yOffset);

    this.workspace.clear();
    let svg = undefined;
    try {
      this.blockly.Xml.domToWorkspace(blockXml, this.workspace);
      checkNextBlock(this.workspace.topBlocks_);
      const oriSvg = this.workspace.getParentSvg();
      const oriBox = oriSvg.lastElementChild.getBBox();

      // remove rect around it
      svg = oriSvg.cloneNode(true);
      svg.lastElementChild.removeChild(svg.lastElementChild.firstElementChild);
      svg.setAttribute('width', oriBox.width + xOffset);
      svg.setAttribute('height', oriBox.height + yOffset);
      svg.setAttribute('class', 'catblocks-svg');

    } catch (e) {
      console.error('Failed to generate SVG from workspace, properly due to unknown bricks');
      return undefined;
    }

    return svg;
  }

  /**
 * Write objects stats to object stats elements
 * Remove the old stats first before we write the new one
 * Please use updateObjectStats to get the sum or multiple substats
 * @param {Element} objectContainer to update the stats
 * @param {Object} stats stats to write into Elemnt
 */
  writeObjectStats(objectContainer, stats) {
    const statsToWrite = Object.assign({}, stats);
    const labelList = getDomElement('.catblocks-object-stats-label-list', objectContainer);
    const valueList = getDomElement('.catblocks-object-stats-value-list', objectContainer);

    removeAllChildren(labelList);
    removeAllChildren(valueList);

    injectNewDom(labelList, 'LI', { 'class': 'catblocks-object-stats-label-item catblocks-category-name' }, "Name:");
    injectNewDom(valueList, 'LI', { 'class': 'catblocks-object-stats-value-item catblocks-category-name' }, trimString(stats['name']));
    delete (statsToWrite['name']);

    injectNewDom(labelList, 'LI', { 'class': 'catblocks-object-stats-label-item catblocks-category-scripts' }, "Scripts:");
    injectNewDom(valueList, 'LI', { 'class': 'catblocks-object-stats-value-item catblocks-category-scripts' }, stats['scripts']);
    delete (statsToWrite['scripts']);

    Object.keys(statsToWrite).sort().forEach(cat => {
      const label = injectNewDom(labelList, 'LI', { 'class': `catblocks-object-stats-label-item catblocks-category-${cat}` });
      const value = injectNewDom(valueList, 'LI', { 'class': `catblocks-object-stats-value-item catblocks-category-${cat}` });
      label.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      value.textContent = statsToWrite[cat];
    });
  }


  /**
 * Inject new scene container into Element container provied in params
 * @param {Element} container append new scene container to this element
 * @param {string} sceneName mapped to id from the new dom
 * @param {!object<string, object>} options how we should build up the scene container
 * @return {Element} new created scene container
 */
  addSceneContainer(container, sceneName, options = defaultOptions.scene) {
    const sceneContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-scene', 'id': `${sceneName}` });

    let sceneHeader = null;
    if (options.writeHeader) {
      sceneHeader = injectNewDom(sceneContainer, 'DIV', { 'class': 'catblocks-scene-header', 'id': `${sceneName}-header` });
      const sceneText = injectNewDom(sceneHeader, 'P', { 'class': 'catblocks-scene-text' });
      sceneText.innerHTML = `Scene: <span class="catblocks-scene-name">${sceneName}</span>`;
    }

    const sceneObjectContainer = injectNewDom(sceneContainer, 'DIV', { 'class': 'catblocks-object-container' });

    if (options.expandable) {
      enableExpandable(sceneObjectContainer, sceneHeader);
    }

    return sceneContainer;
  }

  /**
 * Inject new object container into Element container provied in params
 * @param {Element} container append new object container to this element
 * @param {string} objectName mapped to id from the new dom
 * @param {!object<string, object>} options how we should build up the scene container
 * @return {Element} new created object container
 */
  addObjectContainer(container, objectName, options = defaultOptions.object) {
    const objectContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-object', 'id': objectName });

    let objectHeader = undefined;
    if (options.writeHeader) {
      objectHeader = injectNewDom(objectContainer, 'DIV', { 'class': 'catblocks-object-header', 'id': `${objectName}-header` });
      const objectText = injectNewDom(objectHeader, 'P', { 'class': 'catblocks-object-text' });
      objectText.innerHTML = `Object: <span class="catblocks-object-name">${objectName}</span>`;
    }

    if (options.writeStats) {
      const objectProps = injectNewDom(objectContainer, 'DIV', { 'class': 'catblocks-object-props-container' });
      const statsContainer = injectNewDom(objectProps, 'DIV', { 'class': 'catblocks-object-stats-container' });
      const labelContainer = injectNewDom(statsContainer, 'DIV', { 'class': 'catblocks-object-stats-label-container' });
      const valueContainer = injectNewDom(statsContainer, 'DIV', { 'class': 'catblocks-object-stats-value-container' });
      injectNewDom(labelContainer, 'UL', { 'class': 'catblocks-object-stats-label-list' });
      injectNewDom(valueContainer, 'UL', { 'class': 'catblocks-object-stats-value-list' });

      if (options.writeLook && options.objectImage !== undefined) {
        const lookContainer = injectNewDom(objectProps, 'DIV', { 'class': 'catblocks-object-look-container' });
        
        if (options.fileMap != null && options.fileMap[options.objectImage]) {
          var src = options.fileMap[options.objectImage];
        }
        console.log(options.fileMap, options.objectImage);
        const lookImage = injectNewDom(lookContainer, 'IMG', {
          'class': 'catblocks-object-look-item',
          'src': (src != null) ? src : `${this.config.shareRoot}${options.programRoot}${options.objectImage.split('#').join('%23')}`
        });
        lookImage.onerror = function(e) {
          console.log('Error: ', e);
          e.target.src = 'https://cdn2.iconfinder.com/data/icons/symbol-blue-set-3/100/Untitled-1-94-512.png';
        };
      }
    }

    const objectScriptContainer = injectNewDom(objectContainer, 'DIV', { 'class': 'catblocks-script-container' });
    if (options.expandable) enableExpandable(objectScriptContainer, objectHeader);

    return objectContainer;
  }

  /**
 * Inject all catblocks scenes from xml into div
 * @param {Element} container dom to inject all loaded scenes
 * @param {Element} xmlElement which includes all scenes to iject as XMLDocument
 * @param {Object} options how we should inject all scenes
 */
  injectAllScenes(container, xmlElement, options = {}) {
    // const program = xmlElement.cloneNode(true);
    container = getDomElement(container);
    const scenesContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-scene-container' });

    if (xmlElement === undefined) {
      console.warn('Inject message to upgrade programm to newer version!');
      injectNewDom(scenesContainer, 'P', { 'class': 'catblocks-empty-text' }, 'Unsupported program version! Please reupload your Programm using our app!');
      return;
    }

    const scenes = xmlElement.getElementsByTagName('scene');
    if (!hasChildren(scenes)) {
      const emptyContainer = injectNewDom(scenesContainer, 'DIV', { 'class': 'catblocks-object-container catblocks-empty-container' });
      injectNewDom(emptyContainer, 'P', { 'class': 'catblocks-empty-text' }, 'Empty programm found, nothting to display.');
      return;
    }


    scenes.forEach(scene => {
      const sceneName = scene.getAttribute('type');
      const sceneOptions = parseOptions(options.scene, defaultOptions.scene);
      const sceneContainer = this.addSceneContainer(scenesContainer, trimString(sceneName), sceneOptions);
      const sceneObjectContainer = getDomElement('.catblocks-object-container', sceneContainer);

      const objects = scene.getElementsByTagName('object');
      if (!hasChildren(objects)) {
        const emptyContainer = injectNewDom(sceneObjectContainer, 'DIV', { 'class': 'catblocks-object catblocks-empty-container' });
        injectNewDom(emptyContainer, 'P', { 'class': 'catblocks-empty-text' }, 'Empty scene found, nothting to display.');
        return;
      }
      objects.forEach(object => {
        const objectName = object.getAttribute('type');
        const objectOptions = (() => {
          if (object.getAttribute('look') !== undefined && object.getAttribute('look') !== null) {
            const lookOptions = Object.assign({}, options.object, {
              'objectImage': `${sceneName}/images/${object.getAttribute('look')}`
            });
            return parseOptions(lookOptions, defaultOptions.object);
          } else {
            return parseOptions(options.object, defaultOptions.object);
          }
        })();

        const objectContainer = this.addObjectContainer(sceneObjectContainer, trimString(objectName), objectOptions);
        const objectScriptContainer = getDomElement('.catblocks-script-container', objectContainer);

        let objectStats = {
          'name': objectName,
          'scripts': 0
        };

        if (!hasChildren(object)) {
          const emptyContainer = injectNewDom(objectScriptContainer, 'DIV', { 'class': 'catblocks-script catblocks-empty-container' });
          injectNewDom(emptyContainer, 'P', { 'class': 'catblocks-empty-text' }, "Empty object found, nothting to display.");

        } else {
          const scripts = object.getElementsByTagName('script');
          scripts.forEach(script => {
            const blockXml = wrapElement(script.firstElementChild, 'xml', { 'xmlns': 'http://www.w3.org/1999/xhtml' });

            const scriptContainer = injectNewDom(objectScriptContainer, 'DIV', { 'class': 'catblocks-script' });

            const blockSvg = this.domToSvg(blockXml);
            if (blockSvg === undefined) {
              scriptContainer.appendChild(injectNewDom(scriptContainer, 'P', { 'class': 'catblocks-empty-text' }, "Failed to parse script properly."));
            } else {
              const blockStats = this.getScriptStats(script);
              objectStats = this.updateObjectStats(objectStats, blockStats);
              scriptContainer.appendChild(blockSvg);
            }
          });
        }

        if (objectOptions.writeStats) {
          this.writeObjectStats(objectContainer, objectStats);
        }
      });
    });
  }

  /**
	 * Array making up the CSS content for Blockly.
	 * @return {String} css node string
	 */
  getCssContent() {
    return `
		.catblocks-scene,
		.catblocks-object {
				padding: 5px 20px;
				border-radius: 20px;
				margin: 5px 0px;
				overflow: hidden;
		}
		
		.catblocks-scene {
				border-style: solid;
				border-color: gainsboro;
		}
		
		.catblocks-object {
				background-color: #17a5b8;
		}
		.catblocks-scene:hover {
			background-color: aliceblue;
		}
		.catblocks-object:hover {
			background-color: #17a5b880;
		}
		
		.catblocks-scene-text, 
		.catblocks-object-text {
		}
		
		.catblocks-scene-name, 
		.catblocks-object-name {
				font-size: 16px;
				font-weight: bold;
		}
		
		.catblocks-object-stats-container {
				display: flex;
				min-width: 400px;
				max-width: 400px;
		}
		.catblocks-object-stats-label-container {
				font-weight: bold;
				min-width: 150px;
				max-width: 150px;
		}
		.catblocks-object-stats-value-container ul{
				list-style-type: none;
		}
		.catblocks-script {
				margin: 2px 0px;
				overflow-x: scroll;
				overflow-y: hidden;
				scrollbar-width: none;
				background: aliceblue;
				width: 100%;
				border-radius: 20px;
		}
		.catblocks-empty-text {
				text-align: center;
				vertical-align: middle;
				line-height: 50px;
				font-weight: bold;
		}
		.catblocks-object-props-container {
				display: flex;
				flex-wrap: wrap;
				border-radius: 20px;
				border: 2px solid #ffffff;
				background: lightblue;
		}
		.catblocks-object-look-container {
				min-width: 100px;
				max-width: 100px;
				margin: auto auto auto auto;
		}
		.catblocks-object-look-item {
				min-width: 100px;
				max-width: 100px;
				border-radius: 20%;
		}
		.blocklyEditableLabel {
				fill: white !important;
		}
		.container-closed {
			/*max-height: 0;
			transition: max-height 1s ease-out;
			overflow: hidden;*/
		}
		.container-open {
			/*max-height: 5000px;
			transition: max-height 1s ease-in;*/
		}`;
  }
}