/**
 * This file will be used in catroweb to render everything properly
 */
import "../../css/share.css";
import Blockly from 'blockly';
import Parser from '../parser/parser';
import { generateID, defaultOptions, parseOptions, transformXml, injectNewDom, wrapElement, removeAllChildren, getDomElement, hasChildren, enableExpandable, trimString, checkNextBlock } from './utils';

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

    this.createReadonlyWorkspace();
  }

  /**
   * Create new read only workspace and inject it into container Element
   */
  createReadonlyWorkspace() {
    const hiddenContainer = injectNewDom(this.config.container, 'DIV', {
      id: 'hidden-workspace'
    });

    this.workspace = this.blockly.inject(hiddenContainer, {
      readOnly: true,
      media: `${this.config.shareRoot}${this.config.media}`,
      zoom: {
        controls: false,
        wheel: false,
        startScale: this.config.renderSize
      },
      renderer: 'zelos'
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
	 * @returns {Element} starts value dictionary
	 */
  getScriptStats(script) {
    if (!script) return {};

    const blocks = script.getElementsByTagName('block');
    return Array.from(blocks).map(block => {
      const name = block.getAttribute('type') || 'undefined';
      return (this.blockly.Bricks[name]) ? this.blockly.Bricks[name].category : 'unknown';
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
   * @returns {object} stats from workspace
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
    // should happend in CSS, not inside of image
    // TODO: remove offset transformation
    const xOffset = 0;
    const yOffset = 0;

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
      svg.setAttribute('width', `${oriBox.width + xOffset}px`);
      svg.setAttribute('height', `${oriBox.height + yOffset}px`);
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
   * Inject new scene container into Element container provided in params
   * @param {string} accordionID unique accordion ID
   * @param {string} sceneID unique scene ID
   * @param {Element} container append new scene container to this element
   * @param {string} sceneName mapped to id from the new dom
   * @param {!object<string, object>} options how we should build up the scene container
   * @returns {Element} new created scene objects container
   */
  addSceneContainer(accordionID, sceneID, container, sceneName, options = defaultOptions.scene) {
    const sceneContainer = injectNewDom(container, 'div', { 
      class: 'catblocks-scene card', 
      id: sceneID 
    });

    const sceneHeader = injectNewDom(sceneContainer, 'div', { 
      class: 'catblocks-scene-header card-header d-flex justify-content-between expansion-header',
      id: `${sceneID}-header`,
      'data-toggle': 'collapse',
      'data-target': `#${sceneID}-collapseOne`,
      'aria-expanded': 'false',
      'aria-controls': `${sceneID}-collapseOne`
    });
    sceneHeader.innerHTML = `${sceneName}<i class="material-icons">expand_more</i>`;

    const sceneObjectContainer = injectNewDom(sceneContainer, 'div', { 
      class: 'catblocks-object-container collapse',
      id: `${sceneID}-collapseOne`,
      'aria-labelledby': `${sceneID}-header`,
      'data-parent': `#${accordionID}`
    });

    const cardBody = injectNewDom(sceneObjectContainer, 'div', {
      class: 'card-body'
    });

    const accordionObjects = injectNewDom(cardBody, 'div', {
      class: 'accordion',
      id: `${sceneID}-accordionObjects`
    });

    return accordionObjects;
  }

  /**
   * Inject new object container into Element container provied in params
   * @param {string} objectID unique object ID
   * @param {Element} container append new object container to this element
   * @param {string} objectName mapped to id from the new dom
   * @param {!object<string, object>} options how we should build up the object container
   * @return {Element} new created object container
   */
  addObjectContainer(objectID, container, objectName, options = defaultOptions.object) {
    const objectContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-object', 'id': objectID });

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

        let src = null;
        if (options.fileMap != null && options.fileMap[options.objectImage]) {
          src = options.fileMap[options.objectImage];
        }
        const lookImage = injectNewDom(lookContainer, 'IMG', {
          'class': 'catblocks-object-look-item',
          'src': (src != null) ? src : `${this.config.shareRoot}${options.programRoot}${options.objectImage.split('#').join('%23')}`
        });
        lookImage.onerror = function(e) {
          e.target.src = 'https://cdn2.iconfinder.com/data/icons/symbol-blue-set-3/100/Untitled-1-94-512.png';
        };
      }
    }

    const objectScriptContainer = injectNewDom(objectContainer, 'DIV', { 'class': 'catblocks-script-container' });
    if (options.expandable) enableExpandable(objectScriptContainer, objectHeader);

    return objectContainer;
  }


  /**
   * Render the program with the JSON generated by the parser
   * @param {*} programID
   * @param {*} container
   * @param {*} programJSON
   * @param {*} xmlElement
   * @param {*} [options={}]
   * @returns
   * @memberof Share
   */
  renderProgramJSON(programID, container, programJSON, xmlElement, options = {}) {
    // TODO: create rendering by JSON only, so we can remove the xmlElement
    return new Promise((resolve, reject) => {
      // create row and col
      const programContainer = this.createProgramContainer(generateID(programID), container);
      const scenesContainerID = generateID(`${programID}-accordionScenes`);
      const scenesContainer = injectNewDom(programContainer, 'div', { 
        class: 'catblocks-scene-container accordion',
        id: scenesContainerID
      });

      const xmlScenes = xmlElement.getElementsByTagName('scene');
      if (programJSON.scenes.length === 0 || xmlElement == null || !hasChildren(xmlScenes) ||
        xmlScenes.length != programJSON.scenes.length) {

        const errorContainer = injectNewDom(scenesContainer, 'div', { 
          class: 'catblocks-scene card'
        });
        injectNewDom(errorContainer, 'div', {
          class: 'card-header d-flex justify-content-between'
        }, 'Empty program found');
        return reject(new Error('Empty program found'));
      }

      for (let i = 0; i < programJSON.scenes.length; i++) {
        const scene = programJSON.scenes[i];
        const xmlScene = xmlScenes[i];
        const sceneID = generateID(`${programID}-${scene.name}`);
        const sceneObjectContainer = this.addSceneContainer(scenesContainerID, sceneID, scenesContainer, trimString(scene.name), parseOptions(options.scene, defaultOptions.scene));
        
        const xmlObjects = xmlScene.getElementsByTagName('object');
        if (scene.objectList.length === 0 || !hasChildren(xmlObjects) || 
          xmlObjects.length != scene.objectList.length) {

          const errorContainer = injectNewDom(sceneObjectContainer, 'div', { 
            class: 'catblocks-object card'
          });
          injectNewDom(errorContainer, 'div', {
            class: 'card-header d-flex justify-content-between'
          }, 'No objects found');
          continue;
        }

        options.object.sceneName = scene.name;
        for (let j = 0; j < scene.objectList.length; j++) {
          const object = scene.objectList[j];
          const xmlObject = xmlObjects[j];
          const objectID = generateID(`${programID}-${scene.name}-${object.name}`);
          
          this.renderObjectJSON(objectID, `${sceneID}-accordionObjects`, sceneObjectContainer, 
            xmlObject, object, parseOptions(options.object, defaultOptions.object));
        }
      }

      resolve();
    });
  }

  renderObjectJSON(objectID, accordionID, sceneObjectContainer, xmlObject, object, options = defaultOptions.object) {
    const objectCard = injectNewDom(sceneObjectContainer, 'div', {
      class: 'card',
      id: objectID
    });

    const objHeadingID = `${objectID}-heading`;
    const objCollapseOneSceneID = `${objectID}-collapseOneScene`;
    const cardHeader = injectNewDom(objectCard, 'div', {
      class: 'card-header d-flex justify-content-between expansion-header',
      id: objHeadingID,
      'data-toggle': 'collapse',
      'data-target': `#${objCollapseOneSceneID}`,
      'aria-expanded': 'false',
      'aria-controls': objCollapseOneSceneID
    });
    cardHeader.innerHTML = `${object.name}<i class="material-icons">expand_more</i>`;

    const objectContentContainer = injectNewDom(objectCard, 'div', {
      class: 'collapse',
      id: objCollapseOneSceneID,
      'aria-labelledby': objHeadingID,
      'data-parent': `#${accordionID}`
    });

    this.generateTabs(objectContentContainer, objectID, object);
    const contentContainer = injectNewDom(objectContentContainer, 'div', {
      class: 'tab-content card-body'
    });

    this.generateScripts(contentContainer, objectID, object, xmlObject, options);
    this.generateLooks(contentContainer, objectID, object, options);
    this.generateSounds(contentContainer, objectID, object, options);
  }

  generateSounds(container, objectID, object, options = defaultOptions.object) {
    const soundsContainer = injectNewDom(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-sounds`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-sounds-tab`
    });

    if (object.soundList.length <= 0) {
      soundsContainer.appendChild(injectNewDom(soundsContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, 'No Sounds found'));
      return;
    }

    const group = injectNewDom(soundsContainer, 'div', {
      class: 'list-group-flush'
    });
    for (const sound of object.soundList) {
      const row = injectNewDom(group, 'div', {
        class: 'list-group-item row'
      });
      const colIcon = injectNewDom(row, 'div', {
        class: 'col-3 text-center'
      });
      colIcon.innerHTML = `<i class="material-icons" style="font-size:3em">play_circle_outline</i>`;

      const col = injectNewDom(row, 'div', {
        class: 'col-9'
      });

      const soundPath = `${options.sceneName}/sounds/${sound.fileName}`;
      // TODO: check on docker image
      let src = `${this.config.shareRoot}${options.programRoot}${soundPath}`; 
      
      if (options.fileMap != null && options.fileMap[soundPath]) {
        src = options.fileMap[soundPath];
      } 
      
      const audioContainer = injectNewDom(col, 'audio', {
        class: 'catblocks-object-sound-item',
        controls: 'controls'
      });
      injectNewDom(audioContainer, 'source', {
        src: src
      });
    }
  }

  generateLooks(container, objectID, object, options = defaultOptions.object) {
    const looksContainer = injectNewDom(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-looks`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-looks-tab`
    });

    if (object.lookList.length <= 0) {
      looksContainer.appendChild(injectNewDom(looksContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, 'No Looks found'));
      return;
    }

    const group = injectNewDom(looksContainer, 'div', {
      class: 'list-group-flush'
    });
    for (const look of object.lookList) {
      const row = injectNewDom(group, 'div', {
        class: 'list-group-item row'
      });
      const col = injectNewDom(row, 'div', {
        class: 'col-3'
      });

      const imgPath = `${options.sceneName}/images/${look.fileName}`;
      // TODO: check on docker image
      let src = `${this.config.shareRoot}${options.programRoot}${imgPath}`; 
      
      if (options.fileMap != null && options.fileMap[imgPath]) {
        src = options.fileMap[imgPath];
      } 
      
      injectNewDom(col, 'img', {
        src: src,
        class: 'img-fluid catblocks-object-look-item'
      });
    }
  }

  generateScripts(container, objectID, object, xmlObject, options = defaultOptions.object) {
    const wrapperContainer = injectNewDom(container, 'div', {
      class: 'tab-pane show active fade p-3',
      id: `${objectID}-scripts`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-scripts-tab`
    });

    if (object.scriptList.length <= 0 || !hasChildren(xmlObject)) {
      wrapperContainer.appendChild(injectNewDom(wrapperContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, 'No Scripts found'));
      return;
    }

    const scripts = xmlObject.getElementsByTagName('script');
    let failed = 0;
    for (const script of scripts) {
      const blockXml = wrapElement(script.firstElementChild, 'xml', { 'xmlns': 'http://www.w3.org/1999/xhtml' });

      const scriptContainer = injectNewDom(wrapperContainer, 'div', { 
        class: 'catblocks-script' 
      });

      const blockSvg = this.domToSvg(blockXml);
      if (blockSvg === undefined) {
        failed++;
      } else {
        scriptContainer.appendChild(blockSvg);
      }
    }
    
    if (failed > 0) {
      wrapperContainer.appendChild(injectNewDom(wrapperContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, `Failed to parse ${failed} script(s) properly.`));
    }
  }

  generateTabs(container, objectID, object) {
    const tabs = injectNewDom(container, 'div', {
      class: 'catro-tabs'
    });
    console.log(object);
    const ul = injectNewDom(tabs, 'ul', {
      class: 'nav nav-tabs nav-fill',
      id: `${objectID}-tabs`,
      role: 'tablist'
    });

    const liScript = injectNewDom(ul, 'li', {
      class: 'nav-item'
    });
    injectNewDom(liScript, 'a', {
      class: 'nav-link active',
      id: `${objectID}-scripts-tab`,
      'data-toggle': 'tab',
      href: `#${objectID}-scripts`,
      role: 'tab',
      'aria-controls': 'scripts',
      'aria-selected': 'true'
    }, `Scripts (${object.scriptList.length})`);
    
    const liLooks = injectNewDom(ul, 'li', {
      class: 'nav-item'
    });
    injectNewDom(liLooks, 'a', {
      class: 'nav-link',
      id: `${objectID}-looks-tab`,
      'data-toggle': 'tab',
      href: `#${objectID}-looks`,
      role: 'tab',
      'aria-controls': 'looks',
      'aria-selected': 'false'
    }, `Looks (${object.lookList.length})`);

    const liSounds = injectNewDom(ul, 'li', {
      class: 'nav-item'
    });
    injectNewDom(liSounds, 'a', {
      class: 'nav-link',
      id: `${objectID}-sounds-tab`,
      'data-toggle': 'tab',
      href: `#${objectID}-sounds`,
      role: 'tab',
      'aria-controls': 'sounds',
      'aria-selected': 'false'
    }, `Sounds (${object.soundList.length})`);
  }

  /**
   * Create program wrapper structure
   * @param {string} containerID unique ID of the container
   * @param {Element} container parent container where the structure is added
   * @returns {Element} wrapper where the scene container should be injected
   * @memberof Share
   */
  createProgramContainer(containerID, container) {
    const row = injectNewDom(container, 'div', {
      class: 'row mt-5',
      id: containerID
    });

    const col = injectNewDom(row, 'div', {
      class: 'col-12'
    });

    return col;
  }

  /**
   * Inject all catblocks scenes from xml into div
   * @param {string} programID unique ID of the program
   * @param {Element} container dom to inject all loaded scenes
   * @param {Element} xmlElement which includes all scenes to iject as XMLDocument
   * @param {Object} options how we should inject all scenes
   */
  injectAllScenes(programID, container, xmlElement, options = {}) {
    return this.injectAllScenesPromise(container, xmlElement, options).then(result => {
      return result;
    }).catch(() => {
      return;
    });
  }

  /**
   * Inject all catblocks scenes from xml into div and returns a Promise.
   * @param {string} programID unique ID of the program
   * @param {Element} container
   * @param {Element} xmlElement
   * @param {Object} [options={}]
   * @returns {Promise}
   */
  injectAllScenesPromise(programID, container, xmlElement, options = {}) {
    return new Promise((resolve, reject) => {
      // const program = xmlElement.cloneNode(true);
      container = getDomElement(container);
      const scenesContainer = injectNewDom(container, 'DIV', { 'class': 'catblocks-scene-container' });

      if (xmlElement === undefined) {
        console.warn('Inject message to upgrade programm to newer version!');
        injectNewDom(scenesContainer, 'P', { 'class': 'catblocks-empty-text' }, 'Unsupported program version! Please reupload your Programm using our app!');
        return reject(new Error('Unsupported program version!'));
      }

      const scenes = xmlElement.getElementsByTagName('scene');
      if (!hasChildren(scenes)) {
        const emptyContainer = injectNewDom(scenesContainer, 'DIV', { 'class': 'catblocks-object-container catblocks-empty-container' });
        injectNewDom(emptyContainer, 'P', { 'class': 'catblocks-empty-text' }, 'Empty programm found, nothting to display.');
        return reject(new Error('Empty programm found'));
      }


      scenes.forEach(scene => {
        const sceneName = scene.getAttribute('type');
        const sceneOptions = parseOptions(options.scene, defaultOptions.scene);
        const scenesContainerID = generateID(`${programID}-accordionScenes`);
        const sceneID = generateID(`${programID}-${sceneName}`);
        const sceneContainer = this.addSceneContainer(scenesContainerID, sceneID, scenesContainer, trimString(sceneName), sceneOptions);
        const sceneObjectContainer = getDomElement('.catblocks-object-container', sceneContainer);

        const objects = scene.getElementsByTagName('object');
        if (!hasChildren(objects)) {
          const emptyContainer = injectNewDom(sceneObjectContainer, 'DIV', { 'class': 'catblocks-object catblocks-empty-container' });
          injectNewDom(emptyContainer, 'P', { 'class': 'catblocks-empty-text' }, 'Empty scene found, nothting to display.');
          return reject(new Error('Empty scene found'));
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

          const objectContainer = this.addObjectContainer(generateID(`${programID}-${objectName}`), sceneObjectContainer, trimString(objectName), objectOptions);
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

      resolve();
    });
  }

  /**
	 * Array making up the CSS content for Blockly.
	 * @return {String} css node string
	 */
  getCssContent() {
    // TODO: remove css content from javascript and move it to a .css file
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
    }
    .blocklyText {
      fill: #fff;
      font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;
      font-size: 12pt;
      font-weight: bold;
    }
    .blocklyNonEditableText>rect:not(.blocklyDropdownRect),
    .blocklyEditableText>rect:not(.blocklyDropdownRect) {
      fill: #fff;
    }
    .blocklyNonEditableText>text, 
    .blocklyEditableText>text, 
    .blocklyNonEditableText>g>text, 
    .blocklyEditableText>g>text {
      fill: #575E75;
    }
    .blocklyDropdownText {
      fill: #fff !important;
    }`;
  }
}
