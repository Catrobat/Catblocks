/**
 * This file will be used in catroweb to render everything properly
 */

import Blockly from 'scratch-blocks';
import Parser from '../parser/parser';
import { defaultOptions, parseOptions, transformXml, injectNewDom, wrapElement, removeAllChildren } from './utils';

export class Share {
	constructor(options) {
		this.blockly = Blockly;
		this.parser = Parser;
		this.config = parseOptions(options, defaultOptions.renderOptions);
		this.workspaceDom = undefined;
		this.workspace = undefined;
		this.cssNode = undefined;
	}

	init() {
		this.cssNode = document.createElement('style');
		document.head.insertBefore(this.cssNode, document.head.firstChild);
		const cssText = document.createTextNode(this.getCssContent());
		this.cssNode.appendChild(cssText);

		this.createReadonlyWorkspace();
	}

	/**
   * Create new read only workspace and inject it into container Element
   * @param {Element} container where to inject Blockly workspace
   * @param {number} blockscale block scale for workspace
   * @returns {workspace} created workspace object
   * @private
   */
	createReadonlyWorkspace() {
		const hiddenContainer = injectNewDom(this.config.container, 'DIV', {
			id: 'hidden-workspace',
			class: 'hidden'
		});

		this.workspace = this.blockly.inject(hiddenContainer, {
			readOnly: true,
			media: `${this.config.shareRoot}${this.catblocksImages}`,
			zoom: {
				controls: false,
				wheel: false,
				startScale: this.config.renderSize
			}
		});
		Blockly.CatblocksMsgs.setLocale(this.config.language);

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
		const statNames = Object.keys(newStats);
		for (let istat = 0; istat < statNames.length; istat++) {
			const statName = statNames[istat];
			if (oldStats[statName]) {
				updatedStats[statName] += newStats[statName];
			} else {
				updatedStats[statName] = newStats[statName];
			}
		}

		return updatedStats;
	}

	/**
   * Get workspace stats and return it
   * @param {object} workspace to parse stats
   * @returns {object} stats from worspace
   * @private
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
	domToSvgWithStats(blockXml) {
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
		//try {
		Blockly.Xml.domToWorkspace(blockXml, this.workspace);
		const oriSvg = this.workspace.getParentSvg();
		const oriBox = oriSvg.lastElementChild.getBBox();

		// remove rect around it
		const newSvg = oriSvg.cloneNode(true);
		newSvg.lastElementChild.removeChild(newSvg.lastElementChild.firstElementChild);
		newSvg.setAttribute('width', oriBox.width + xOffset);
		newSvg.setAttribute('height', oriBox.height + yOffset);
		newSvg.setAttribute('class', 'catblocks-svg');

		//} catch (e) {
		//	console.error('Failed to generate SVG from workspace');
		//}

		return {
			svg: newSvg,
			stats: this.getWorkspaceBlockStats()
		};
	}

	/**
 * Write objects stats to object stats elements
 * Remove the old stats first before we write the new one
 * Please use updateObjectStats_ to get the sum or multiple substats
 * @param {Element} objectContainer to update the stats
 * @param {Object} stats stats to write into Elemnt
 */
	writeObjectStats(objectContainer, stats) {
		const labelList = objectContainer.getElementsByClassName('catblocks-object-stats-lable-list')[0];
		const valueList = objectContainer.getElementsByClassName('catblocks-object-stats-value-list')[0];

		removeAllChildren(labelList);
		removeAllChildren(valueList);

		injectNewDom(labelList, 'LI', { 'class': 'catblocks-object-stats-lable-item' }, "Name:");
		injectNewDom(valueList, 'LI', { 'class': 'catblocks-object-stats-value-item' }, stats['name']);
		delete (stats['name']);

		injectNewDom(labelList, 'LI', { 'class': 'catblocks-object-stats-lable-item' }, "Scripts:");
		injectNewDom(valueList, 'LI', { 'class': 'catblocks-object-stats-value-item' }, stats['scripts']);
		delete (stats['scripts']);

		const categories = Object.keys(stats).sort();
		for (let icat = 0; icat < categories.length; icat++) {
			const category = categories[icat];
			const label = injectNewDom(labelList, 'LI', { 'class': 'catblocks-object-stats-lable-item' });
			const value = injectNewDom(valueList, 'LI', { 'class': 'catblocks-object-stats-value-item' });
			label.textContent = category.charAt(0).toUpperCase() + category.slice(1);
			value.textContent = stats[category];
		}
	}


	/**
 * Inject new scene container into Element container provied in params
 * @param {Element} container append new scene container to this element
 * @param {string} sceneName mapped to id from the new dom
 * @param {!object<string, object>} options how we should build up the scene container
 * @return {Element} new created scene container
 */
	addSceneContainer(container, sceneName, options) {
		const sceneOptions = parseOptions(options, defaultOptions.createSceneContainer);
		const sceneContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-scene', 'id': 'sceneName' });

		let sceneHeader = null;
		if (sceneOptions.writeHeader) {
			sceneHeader = injectNewDom(sceneContainer, 'DIV', { 'class': 'catblocks-scene-header', 'id': sceneName + '-header' });
			const sceneText = injectNewDom(sceneHeader, 'P', { 'class': 'catblocks-scene-text' });
			sceneText.innerHTML = 'Scene: <span class="catblocks-scene-name">' + sceneName + '</span>';
		}

		injectNewDom(sceneContainer, 'DIV', { 'class': 'catblocks-object-container' });

		// TODO: use something different than the name element
		if (sceneOptions.expandable) {
			// TODO: add proper expand support
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
	addObjectContainer(container, objectName, options) {
		const objectOptions = parseOptions(options, defaultOptions.createObjectContainer);
		const objectContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-object', 'id': objectName });

		if (objectOptions.writeHeader) {
			const objectHeader = injectNewDom(objectContainer, 'DIV', { 'class': objectName + ' - header', 'id': 'catblocks-object-header' });
			const objectText = injectNewDom(objectHeader, 'P', { 'class': 'catblocks-object-text' });
			objectText.innerHTML = 'Object: <span class="catblocks-object-name">' + objectName + '</span>';
		}

		const objectProps = injectNewDom(objectContainer, 'DIV', { 'class': 'catblocks-object-props-container' });

		// if (objectOptions.writeLook && goog.isString(objectOptions.lookImgPath)) {
		//   var lookContainer = Blockly.Web.injectNewDom_(objectProps, 'DIV', 'catblocks-object-look-container');
		//   Blockly.Web.injectNewDom_(lookContainer, goog.dom.TagName.IMG, {
		//     'class': 'catblocks-object-look-item',
		//     'src': Blockly.Web.shareRoot_ + options.lookImgPath.split('#').join('%23'),
		//     'onerror': function(event) { event.target.src = Blockly.Web.noImageFound_; }
		//     // 'title': 'Look-' + sceneName,
		//     // 'alt': goog.isString(options.lookAlt) ? options.lookAlt : 'Look from current scene'
		//   });
		// }
		if (objectOptions.writeStats) {
			const statsContainer = injectNewDom(objectProps, 'DIV', { 'class': 'catblocks-object-stats-container' });
			const labelContainer = injectNewDom(statsContainer, 'DIV', { 'class': 'catblocks-object-stats-label-container' });
			const valueContainer = injectNewDom(statsContainer, 'DIV', { 'class': 'catblocks-object-stats-value-container' });
			injectNewDom(labelContainer, 'UL', { 'class': 'catblocks-object-stats-lable-list' });
			injectNewDom(valueContainer, 'UL', { 'class': 'catblocks-object-stats-value-list' });
		}

		injectNewDom(objectContainer, 'DIV', { 'class': 'catblocks-scripts-container' });

		// TODO: use something different than the name element
		if (objectOptions.expandable) {
			// TODO: add proper expand support
		}

		return objectContainer;
	}

	/**
 * Inject all catblocks scenes from xml into div
 * @param {Element} container dom to inject all loaded scenes
 * @param {string} xmlElement which includes all scenes to inject
 * @param {Object} options how we should inject all scenes
 */
	injectAllScenes(container, xmlElement, options) {
		if (typeof container === 'string') {
			container = document.getElementById(container) ||
				document.querySelector(container);
		}
		const injectOptions = parseOptions(options, defaultOptions.injectAllScenes);
		const scenesContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-scene-container', 'id': 'catblocks-scene-container' });

		if (injectOptions.expandable) {
			// TODO: define proper expand handling
		}

		const scenes = xmlElement.firstChild.children;
		for (let iscene = 0; iscene < scenes.length; iscene++) {
			const scene = scenes[iscene];
			const sceneName = scene.getAttribute('type');
			const sceneContainer = this.addSceneContainer(scenesContainer, sceneName);
			const sceneObjectContainer = sceneContainer.getElementsByClassName('catblocks-object-container')[0];

			const objects = scene.children;
			for (let iobject = 0; iobject < objects.length; iobject++) {
				const object = objects[iobject];
				const objectName = object.getAttribute('type');
				const objectContainer = this.addObjectContainer(sceneObjectContainer, objectName, {
					lookImgPath: sceneName + '/images/' + object.getAttribute('look')
				});

				// object stats with init values
				let objectStats = {
					'name': objectName,
					'scripts': 0
				};
				const objectScriptContainer = objectContainer.getElementsByClassName('catblocks-scripts-container')[0];

				if (object.childElementCount === 0) {
					const scriptContainer = injectNewDom(objectScriptContainer, 'DIV', { 'class': 'catblocks-object-script-container catblocks-empty-script' });
					injectNewDom(scriptContainer, 'P', { 'class': 'catblocks-empty-script-text' }, "No Script defined here");
				} else {
					while (object.childElementCount > 0) {
						const script = object.firstElementChild;
						const blockXml = wrapElement(script.firstElementChild, 'xml', { 'xmlns': 'http://www.w3.org/1999/xhtml' });
						object.removeChild(script);

						const scriptContainer = injectNewDom(objectScriptContainer, 'DIV', { 'class': 'catblocks-object-script-container' });
						const svgBlock = this.domToSvgWithStats(blockXml);
						scriptContainer.appendChild(svgBlock.svg);
						objectStats = this.updateObjectStats(objectStats, svgBlock.stats);
					}
				}
				this.writeObjectStats(objectContainer, objectStats);
			}
		}
	}

	/**
 * Array making up the CSS content for Blockly.
 */
	getCssContent() {
		return [
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
			'}',
			'.blocklyEditableLabel {',
			'		 fill: white !important;',
			'}'].join('\n');
	}
}