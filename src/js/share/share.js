/**
 * This file will be used in catroweb to render everything properly
 */
import "../../css/share.css";
import Blockly from 'blockly';
import Parser from '../parser/parser';
import { escapeURI, generateID, defaultOptions, parseOptions, transformXml, injectNewDom, wrapElement, hasChildren, trimString, checkNextBlock } from './utils';

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

    if (sceneName) {
      sceneHeader.innerHTML = `${sceneName}<i class="material-icons">expand_more</i>`;
    } else {
      sceneHeader.innerHTML = `<i class="material-icons">expand_more</i>`;
    }

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
   * Render the program with the JSON generated by the parser
   * @param {string} programID
   * @param {HTMLElement} container
   * @param {Object} programJSON
   * @param {xmlElement} xmlElement
   * @param {Object} [options={}]
   */
  renderProgramJSON(programID, container, programJSON, xmlElement, options = {}) {
    // TODO: create rendering by JSON only, so we can remove the xmlElement
    options = parseOptions(options, defaultOptions);
    // create row and col
    const programContainer = this.createProgramContainer(generateID(programID), container);
    const scenesContainerID = `${generateID(programID)}-accordionScenes`;
    const scenesContainer = injectNewDom(programContainer, 'div', { 
      class: 'catblocks-scene-container accordion',
      id: scenesContainerID
    });

    let xmlScenes = undefined;
    if (xmlElement != null) {
      xmlScenes = xmlElement.getElementsByTagName('scene');
    }
    
    if (programJSON == null || programJSON.scenes == null || 
      programJSON.scenes.length === 0 || xmlElement == null || xmlScenes == null ||
      !hasChildren(xmlScenes) || xmlScenes.length != programJSON.scenes.length) {

      const errorContainer = injectNewDom(scenesContainer, 'div', { 
        class: 'catblocks-scene card'
      });
      injectNewDom(errorContainer, 'div', {
        class: 'card-header d-flex justify-content-between'
      }, 'Empty program found');
      throw new Error('Empty program found');
    }

    for (let i = 0; i < programJSON.scenes.length; i++) {
      const scene = programJSON.scenes[i];
      const xmlScene = xmlScenes[i];
      const sceneID = generateID(`${programID}-${scene.name}`);
      const sceneObjectContainer = this.addSceneContainer(scenesContainerID, sceneID, scenesContainer, trimString(scene.name), parseOptions(options.scene, defaultOptions.scene));
      
      const xmlObjects = xmlScene.getElementsByTagName('object');
      if (scene.objectList == null || scene.objectList.length === 0 || !hasChildren(xmlObjects) || 
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
          xmlObject, object, parseOptions(options.object, parseOptions(options.object, defaultOptions.object)));
      }
    }
  }

  /**
   * Render object given as JSON
   * @param {string} objectID ID of object container
   * @param {string} accordionID ID of parent accordion
   * @param {Element} sceneObjectContainer HTMLElement
   * @param {XMLDocument} xmlObject XML of the program
   * @param {Object} object JSON of the program
   * @param {Object} [options=defaultOptions.object]
   */
  renderObjectJSON(objectID, accordionID, sceneObjectContainer, xmlObject, object, options = defaultOptions.object) {
    const objectCard = injectNewDom(sceneObjectContainer, 'div', {
      class: 'catblocks-object card',
      id: objectID
    });

    const objHeadingID = `${objectID}-header`;
    const objCollapseOneSceneID = `${objectID}-collapseOneScene`;
    const cardHeader = injectNewDom(objectCard, 'div', {
      class: 'card-header d-flex justify-content-between expansion-header',
      id: objHeadingID,
      'data-toggle': 'collapse',
      'data-target': `#${objCollapseOneSceneID}`,
      'aria-expanded': 'false',
      'aria-controls': objCollapseOneSceneID
    });

    if (object && object.name) {
      cardHeader.innerHTML = `${object.name}<i class="material-icons">expand_more</i>`;
    } else {
      cardHeader.innerHTML = `<i class="material-icons">expand_more</i>`;
    }
    

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

  /**
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} [options=defaultOptions.object]
   */
  generateSounds(container, objectID, object, options = defaultOptions.object) {
    const soundsContainer = injectNewDom(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-sounds`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-sounds-tab`
    });

    if (!object || !object.soundList || object.soundList.length <= 0) {
      soundsContainer.appendChild(injectNewDom(soundsContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, 'No Sounds found'));
      return;
    }

    const group = injectNewDom(soundsContainer, 'div', {
      class: 'list-group-flush'
    });

    let failed = 0;
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

      if (!options.sceneName || !sound.fileName) {
        failed++;
        continue;
      }

      const soundPath = `${options.sceneName}/sounds/${sound.fileName}`;
      let src = escapeURI(`${this.config.shareRoot}${options.programRoot}${soundPath}`); 
      
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

    if (failed > 0) {
      soundsContainer.appendChild(injectNewDom(soundsContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, `Failed to parse ${failed} sounds(s) properly.`));
    }
  }

  /**
   * Generate Tabcontainer for looks
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} [options=defaultOptions.object]
   */
  generateLooks(container, objectID, object, options = defaultOptions.object) {
    const looksContainer = injectNewDom(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-looks`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-looks-tab`
    });

    if (!object || !object.lookList || object.lookList.length <= 0) {
      looksContainer.appendChild(injectNewDom(looksContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, 'No Looks found'));
      return;
    }

    const group = injectNewDom(looksContainer, 'div', {
      class: 'list-group-flush'
    });

    let failed = 0;
    for (const look of object.lookList) {
      const row = injectNewDom(group, 'div', {
        class: 'list-group-item row'
      });
      const col = injectNewDom(row, 'div', {
        class: 'col-3'
      });

      if (!options.sceneName || !look.fileName) {
        failed++;
        continue;
      }

      const imgPath = `${options.sceneName}/images/${look.fileName}`;
      let src = escapeURI(`${this.config.shareRoot}${options.programRoot}${imgPath}`); 
      
      if (options.fileMap != null && options.fileMap[imgPath]) {
        src = options.fileMap[imgPath];
      } 
      
      injectNewDom(col, 'img', {
        src: src,
        class: 'img-fluid catblocks-object-look-item'
      });

      injectNewDom(row, 'div', {
        class: 'col-9'
      }, look.name);
    }

    if (failed > 0) {
      looksContainer.appendChild(injectNewDom(looksContainer, 'p', { 
        class: 'catblocks-empty-text' 
      }, `Failed to parse ${failed} look(s) properly.`));
    }
  }

  /**
   * Generate Tabcontainer for scripts
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {XMLDocument} 
   * @param {Object} [options=defaultOptions.object]
   */
  generateScripts(container, objectID, object, xmlObject, options = defaultOptions.object) {
    const wrapperContainer = injectNewDom(container, 'div', {
      class: 'tab-pane show active fade p-3',
      id: `${objectID}-scripts`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-scripts-tab`
    });

    if (!object || !object.scriptList || !xmlObject || 
      object.scriptList.length <= 0 || !hasChildren(xmlObject) ||
      object.scriptList.length !== xmlObject.children.length) {
        
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

  /**
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} [options=defaultOptions.object]
   */
  generateTabs(container, objectID, object) {

    if (!object) {
      object = {
        scriptList: [],
        lookList: [],
        soundList: []
      };
    } else {
      if (!object.scriptList) {
        object.scriptList = [];
      }
      if (!object.lookList) {
        object.lookList = [];
      }
      if (!object.soundList) {
        object.soundList = [];
      }
    }

    const tabs = injectNewDom(container, 'div', {
      class: 'catro-tabs'
    });
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
}
