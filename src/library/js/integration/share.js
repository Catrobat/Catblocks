/**
 * This file will be used in catroweb to render everything properly
 */
import '../../scss/share.scss';

import Blockly from 'blockly';
import { Modal, Tab } from 'bootstrap';

import {
  escapeURI,
  generateID,
  defaultOptions,
  parseOptions,
  trimString,
  zebraChangeColor,
  jsonDomToWorkspace,
  generateNewDOM,
  injectNewDom,
  lazyLoadImage,
  showFormulaPopup,
  generateFormulaModal,
  generateModalMagnifyingGlass,
  buildUserDefinedBrick,
  createLoadingAnimation,
  RenderSource_Share
} from './utils';
import { CatBlocksMsgs } from '../../ts/i18n/CatBlocksMsgs';
import { jQueryFunctions } from '../../../common/ts/jQueryFunctions';

const all_blocks = new Map();
const rendered_scenes = new Map();

export class Share {
  constructor() {
    this.blockly = Blockly;
    this.config = {};
    this.workspaceDom = undefined;
    this.workspace = undefined;
    all_blocks.clear();
    rendered_scenes.clear();
  }

  /**
   * init share class instance
   * @param {CatBBlocksConfig} options for rendering process
   */
  async init(options) {
    this.config = parseOptions(options, defaultOptions.render);
    generateFormulaModal();
    generateModalMagnifyingGlass();

    try {
      if (!document.querySelector('meta[name=viewport]').content.includes('user-scalable')) {
        document.querySelector('meta[name=viewport]').content += ' user-scalable=yes';
      }
    } catch (e) {
      // ignore
    }
    createLoadingAnimation();

    jQueryFunctions.addBodyClickListener('.blocklyNonEditableText', (event, target) => {
      const parent = target.parentNode;
      const block = all_blocks[parent.getAttribute('data-id')];
      const element_idx = [...parent.querySelectorAll('g')].indexOf(target);
      if (element_idx >= 0) {
        const full_formula = block[element_idx];
        showFormulaPopup(full_formula);
      }
    });

    jQueryFunctions.addBodyClickListener('image', (event, target) => {
      if (target.getAttribute('xlink:href').endsWith('info_icon.svg')) {
        const parent = target.parentNode;
        const block = all_blocks[parent.parentNode.getAttribute('data-id')];
        const element_idx = [...parent.parentNode.querySelectorAll('g')].indexOf(parent);
        const full_formula = block[element_idx - 1];
        showFormulaPopup(full_formula);
      }
    });

    // for now only convert when in library
    if (window.CatBlocks) {
      this.insertRightMediaURI();
    }
    if (this.config.rtl) {
      document.documentElement.style.direction = 'rtl';
    }
    await CatBlocksMsgs.setLocale(this.config.language);
    this.createReadonlyWorkspace();
  }

  /**
   * As we don't know the MediaURL when injecting the JS file and we cannot load
   * the custom Blocks in a later state, we have to overwrite the URLs in an ugly way here
   */
  insertRightMediaURI() {
    if (this.config.media) {
      for (const brick in Blockly.Bricks) {
        this.fixBrickMediaURI(brick);
      }
    }
  }

  fixBrickMediaURI(brickName) {
    if (Object.prototype.hasOwnProperty.call(Blockly.Bricks, brickName)) {
      const obj = Blockly.Bricks[brickName];

      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop) && prop.startsWith('args')) {
          const args = obj[prop];
          for (const arg of args) {
            if (arg.src) {
              arg.src = arg.src.replace(`${document.location.pathname}media/`, this.config.media);
            }
          }
        }
      }
    }
  }

  /**
   * Create new read only workspace and inject it into container Element
   */
  createReadonlyWorkspace() {
    const hiddenContainer = injectNewDom(this.config.container, 'DIV', {
      id: 'hidden-workspace'
    });

    let mediapath = `${this.config.shareRoot}${this.config.media}`;
    // full link or absolute path given
    if (this.config.media.startsWith('http') || this.config.media.startsWith('/')) {
      mediapath = this.config.media;
    }
    this.workspace = this.blockly.inject(hiddenContainer, {
      readOnly: true,
      media: mediapath,
      zoom: {
        controls: false,
        wheel: false,
        startScale: this.config.renderSize
      },
      renderer: 'zelos',
      rtl: this.config.rtl
    });

    this.workspaceDom = this.workspace.getInjectionDiv();
    this.workspaceDom.id = this.workspace.id;
  }

  /**
   * Render svg from blockXml via renderWorkspace
   * After rendering, we deep copy just the svg and return it
   * @param {Object} blockJSON blocks to render into svg
   * @returns {Object<Element, Object>} svg with block stats
   */
  domToSvg(blockJSON) {
    this.workspace.clear();
    let svg = undefined;
    try {
      const sceneWidth = jsonDomToWorkspace(blockJSON, this.workspace, RenderSource_Share);
      zebraChangeColor(this.workspace.getTopBlocks());
      const oriSvg = this.workspace.getParentSvg();
      const oriBox = oriSvg.lastElementChild.getBBox();

      // store all block inputs in a map for later use
      this.workspace.getAllBlocks().forEach(block => {
        if (!(block.id in all_blocks)) {
          const input_list = [];
          try {
            block.inputList[0].fieldRow.forEach(input => {
              input_list.push(input.value_);
            });
          } catch {
            console.log('Cannot load input of block!');
          }
          all_blocks[block.id] = input_list;
        }
      });

      svg = oriSvg.cloneNode(true);
      svg.lastElementChild.removeChild(svg.lastElementChild.firstElementChild);
      svg.setAttribute('width', `${sceneWidth * this.config.renderSize}px`);
      svg.setAttribute('height', `${oriBox.height}px`);
      svg.setAttribute('class', 'catblocks-svg');
    } catch (e) {
      console.error(e);
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
   * @returns {Element} new created scene objects container
   */
  addSceneContainer(accordionID, sceneID, container, sceneName) {
    const sceneContainer = generateNewDOM(container, 'div', {
      class: 'catblocks-scene accordion-item',
      id: sceneID
    });

    const sceneHeader = generateNewDOM(sceneContainer, 'h2', {
      class: 'catblocks-scene-header accordion-header header-title',
      id: `${sceneID}-header`
    });

    generateNewDOM(
      sceneHeader,
      'button',
      {
        class: 'accordion-button collapsed',
        type: 'button',
        'data-bs-toggle': 'collapse',
        'data-bs-target': `#${sceneID}-collapseOne`,
        'aria-expanded': 'false',
        'aria-controls': `${sceneID}-collapseOne`
      },
      sceneName.display
    );

    const sceneObjectContainer = generateNewDOM(sceneContainer, 'div', {
      class: 'catblocks-object-container accordion-collapse collapse',
      id: `${sceneID}-collapseOne`,
      'aria-labelledby': `${sceneID}-header`,
      'data-bs-parent': `#${accordionID}`,
      'data-scene': sceneName.real
    });

    const cardBody = generateNewDOM(sceneObjectContainer, 'div', {
      class: 'accordion-body p-0'
    });

    const accordionObjects = generateNewDOM(cardBody, 'div', {
      class: 'accordion',
      id: `${sceneID}-accordionObjects`
    });

    return { accordionObjects: accordionObjects, sceneContainer: sceneContainer };
  }

  /**
   * Render the program with the JSON generated by the parser
   * @param {string} programID
   * @param {HTMLElement} container
   * @param {Object} programJSON
   * @param {Object} [options={}]
   */
  renderProgramJSON(programID, container, programJSON, options = {}, renderEverything = false) {
    options = parseOptions(options, defaultOptions);

    const programContainer = generateNewDOM(container, 'div', {
      class: 'catblocks-program-container',
      id: generateID(programID)
    });

    const scenesContainerID = `${generateID(programID)}-accordionScenes`;
    const scenesContainer = generateNewDOM(programContainer, 'div', {
      class: 'catblocks-scene-container accordion',
      id: scenesContainerID
    });

    if (programJSON == null || programJSON.scenes == null || programJSON.scenes.length === 0) {
      const errorContainer = generateNewDOM(scenesContainer, 'div', {
        class: 'catblocks-scene accordion-item'
      });
      generateNewDOM(
        errorContainer,
        'div',
        {
          class: 'accordion-header d-flex justify-content-between'
        },
        'Empty program found'
      );

      container.appendChild(programContainer);

      throw new Error('Empty program found');
    }

    for (let i = 0; i < programJSON.scenes.length; i++) {
      const scene = programJSON.scenes[i];
      const sceneID = generateID(`${programID}-${scene.name}`);

      const sceneName = {
        real: trimString(scene.name),
        display: undefined
      };
      if (programJSON.scenes.length === 1) {
        sceneName.display = programJSON.programName;
      } else {
        sceneName.display = trimString(scene.name);
      }

      const { accordionObjects, sceneContainer } = this.addSceneContainer(
        scenesContainerID,
        sceneID,
        scenesContainer,
        sceneName
      );
      if (scene.objectList == null || scene.objectList.length === 0) {
        const errorContainer = generateNewDOM(accordionObjects, 'div', {
          class: 'catblocks-object accordion-item'
        });
        generateNewDOM(
          errorContainer,
          'div',
          {
            class: 'accordion-header d-flex justify-content-between'
          },
          'No objects found'
        );
        continue;
      }

      if (!renderEverything) {
        this.renderAllObjectsFromOneScene(options, scene, programID, sceneID, accordionObjects, renderEverything);
        continue;
      }

      const spinnerElement = document.getElementById('spinnerModal');
      const spinnerModal = new Modal(spinnerElement);

      sceneContainer.addEventListener('click', () => {
        if (rendered_scenes[sceneID] !== true) {
          const eventListener = () => {
            spinnerElement.removeEventListener('shown.bs.modal', eventListener, false);

            this.renderAllObjectsFromOneScene(options, scene, programID, sceneID, accordionObjects, renderEverything);

            spinnerModal.hide();
          };
          spinnerElement.addEventListener('shown.bs.modal', eventListener);

          spinnerModal.show();
        }
      });
    }

    container.appendChild(programContainer);
  }

  renderAllObjectsFromOneScene(options, scene, programID, sceneID, sceneObjectContainer, renderEverything) {
    const bgWorkspaceDetails = this.handleBackgroundName(
      programID,
      scene,
      sceneID,
      sceneObjectContainer,
      options,
      renderEverything
    );

    if (rendered_scenes[sceneID] === true) {
      return;
    }
    rendered_scenes[sceneID] = true;

    const performanceContainer = generateNewDOM(undefined, 'div');

    const scenesWorkspaces = new Map();
    if (bgWorkspaceDetails) {
      scenesWorkspaces[bgWorkspaceDetails.name] = bgWorkspaceDetails.workspace;
    }

    options.object.sceneName = scene.name;
    for (let j = 1; j < scene.objectList.length; j++) {
      const object = scene.objectList[j];
      const objectID = generateID(`${programID}-${scene.name}-${object.name}`);

      this.renderObjectJSON(
        objectID,
        `${sceneID}-accordionObjects`,
        performanceContainer,
        object,
        parseOptions(options.object, parseOptions(options.object, defaultOptions.object))
      );
    }
    sceneObjectContainer.appendChild(performanceContainer);
  }

  handleBackgroundName(programID, scene, sceneID, sceneObjectContainer, options, renderEverything) {
    options.object.sceneName = scene.name;
    const backgroundObjID = generateID(`${programID}-${scene.name}-${scene.objectList[0].name}`);

    if (renderEverything) {
      scene.objectList[0].name = CatBlocksMsgs.getCurrentLocaleValues().BACKGROUND;
    }

    const bgWorkspace = this.renderObjectJSON(
      backgroundObjID,
      `${sceneID}-accordionObjects`,
      sceneObjectContainer,
      scene.objectList[0],
      parseOptions(options.object, parseOptions(options.object, defaultOptions.object))
    );
    return {
      name: scene.objectList[0].name,
      workspace: bgWorkspace
    };
  }

  /**
   * Render object given as JSON
   * @param {string} objectID ID of object container
   * @param {string} accordionID ID of parent accordion
   * @param {Element} sceneObjectContainer HTMLElement
   * @param {Object} object JSON of the program
   * @param {Object} [options=defaultOptions.object]
   */
  renderObjectJSON(objectID, accordionID, sceneObjectContainer, object, options = defaultOptions.object) {
    const objectCard = generateNewDOM(sceneObjectContainer, 'div', {
      class: 'catblocks-object accordion-item',
      id: objectID
    });

    const createdBricks = buildUserDefinedBrick(object);
    if (createdBricks) {
      createdBricks.forEach(brickName => {
        this.fixBrickMediaURI(brickName);
      });
    }

    const objHeadingID = `${objectID}-header`;
    const objCollapseOneSceneID = `${objectID}-collapseOneScene`;

    let src;

    if (object.lookList) {
      for (const look of object.lookList) {
        if (!options.sceneName || !look.fileName) {
          continue;
        }

        const imgPath = `${options.sceneName}/images/${look.fileName}`;
        src = escapeURI(`${this.config.shareRoot}${options.programRoot}${imgPath}`);

        if (options.programRoot.startsWith('http')) {
          src = escapeURI(`${options.programRoot}${imgPath}`);
        }

        if (options.fileMap != null && options.fileMap[imgPath]) {
          src = options.fileMap[imgPath];
        }

        if (src === undefined || src === '') {
          console.log('src is empty or null = ' + src);
        }
        break;
      }
    }

    const cardHeader = generateNewDOM(objectCard, 'div', {
      class: 'accordion-header header-title',
      id: objHeadingID
    });

    const headerButton = generateNewDOM(cardHeader, 'button', {
      class: 'accordion-button collapsed ps-sm-5',
      type: 'button',
      'data-bs-toggle': 'collapse',
      'data-bs-target': `#${objCollapseOneSceneID}`,
      'aria-expanded': 'false',
      'aria-controls': objCollapseOneSceneID
    });

    // attach listener for lazyloading
    jQueryFunctions.onEvent(cardHeader, 'click', lazyLoadImage);

    if (this.config.rtl) {
      cardHeader.style.paddingLeft = '1.5em';
      cardHeader.style.paddingRight = '3.5em';
    }

    const thumbnailContainer = generateNewDOM(headerButton, 'div', {
      class: 'catblocks-object-thumbnail-container'
    });

    if (src) {
      generateNewDOM(thumbnailContainer, 'img', {
        src: src,
        class: 'catblocks-object-thumbnail'
      });
    }

    if (object && object.name) {
      generateNewDOM(
        headerButton,
        'span',
        {
          class: 'ps-1'
        },
        object.name
      );
    }

    const objectContentContainer = generateNewDOM(objectCard, 'div', {
      class: 'catblocks-script-container accordion-collapse collapse',
      id: objCollapseOneSceneID,
      'aria-labelledby': objHeadingID,
      'data-bs-parent': `#${accordionID}`,
      'data-bs-object': object.name
    });

    const bodyContainer = generateNewDOM(objectContentContainer, 'div', {
      class: 'accordion-body p-0'
    });

    this.generateTabs(bodyContainer, objectID, object);
    const contentContainer = generateNewDOM(bodyContainer, 'div', {
      class: 'tab-content'
    });

    if (this.config.renderScripts) {
      this.generateScripts(contentContainer, objectID, object);
    }
    if (this.config.renderLooks) {
      this.generateLooks(contentContainer, objectID, object, options);
    }
    if (this.config.renderSounds) {
      this.generateSounds(contentContainer, objectID, object, options);
    }
  }

  /**
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} [options=defaultOptions.object]
   */
  generateSounds(container, objectID, object, options = defaultOptions.object) {
    const soundsContainer = generateNewDOM(container, 'div', {
      class: 'tab-pane fade container-fluid',
      id: `${objectID}-sounds`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-sounds-tab`
    });

    if (!object || !object.soundList || object.soundList.length <= 0) {
      const noSoundsText = 'No Sounds found';
      soundsContainer.appendChild(
        generateNewDOM(
          soundsContainer,
          'p',
          {
            class: 'catblocks-empty-text pt-3'
          },
          noSoundsText
        )
      );
      if (this.config.rtl) {
        soundsContainer.style.textAlign = 'right';
      }
      return;
    }

    let failed = 0;
    for (const sound of object.soundList) {
      const row = generateNewDOM(soundsContainer, 'div', {
        class: 'row pt-3 catblocks-object-sound-row'
      });

      const col = generateNewDOM(row, 'div', {
        class: 'col'
      });

      if (!options.sceneName || !sound.fileName) {
        failed++;
        continue;
      }

      const soundPath = `${options.sceneName}/sounds/${sound.fileName}`;
      let src = escapeURI(`${this.config.shareRoot}${options.programRoot}${soundPath}`);

      if (options.programRoot.startsWith('http')) {
        src = escapeURI(`${options.programRoot}${soundPath}`);
      }

      if (options.fileMap != null && options.fileMap[soundPath]) {
        src = options.fileMap[soundPath];
      }

      let displaySoundName = sound.name;
      if (!displaySoundName) {
        displaySoundName = sound.fileName;
      }

      const audioContainer = generateNewDOM(col, 'audio', {
        class: 'catblocks-object-sound-item w-100',
        controls: 'controls'
      });
      generateNewDOM(audioContainer, 'source', {
        src: src
      });

      const soundName = generateNewDOM(
        col,
        'span',
        {
          class: 'mb-0 text-wrap catblocks-object-sound-name'
        },
        displaySoundName
      );
      if (this.config.rtl) {
        soundName.style.textAlign = 'right';
      }
    }

    if (failed > 0) {
      const failedSoundsText = 'ERROR parsing ' + failed + ' Sounds';
      soundsContainer.appendChild(
        generateNewDOM(
          soundsContainer,
          'p',
          {
            class: 'catblocks-empty-text pt-3'
          },
          failedSoundsText
        )
      );
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
    const looksContainer = generateNewDOM(container, 'div', {
      class: 'tab-pane fade container-fluid',
      id: `${objectID}-looks`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-looks-tab`
    });

    if (!object || !object.lookList || object.lookList.length <= 0) {
      const noLooksText = 'No Looks found';
      looksContainer.appendChild(
        generateNewDOM(
          looksContainer,
          'p',
          {
            class: 'catblocks-empty-text pt-3'
          },
          noLooksText
        )
      );
      if (this.config.rtl) {
        looksContainer.style.textAlign = 'right';
      }
      return;
    }

    let failed = 0;
    for (const look of object.lookList) {
      const row = generateNewDOM(looksContainer, 'div', {
        class: 'row pt-3 catblocks-object-look-row'
      });
      const leftCol = generateNewDOM(row, 'div', {
        class: 'col-12 col-sm-6 mb-3 mb-sm-0 text-center'
      });
      const rightCol = generateNewDOM(row, 'div', {
        class: 'col-12 col-sm-6 d-flex align-items-center'
      });

      if (!options.sceneName || !look.fileName) {
        failed++;
        continue;
      }

      const imgPath = `${options.sceneName}/images/${look.fileName}`;
      let src = escapeURI(`${this.config.shareRoot}${options.programRoot}${imgPath}`);

      // renderProgram got a full link
      if (options.programRoot.startsWith('http')) {
        src = escapeURI(`${options.programRoot}${imgPath}`);
      }

      if (options.fileMap != null && options.fileMap[imgPath]) {
        src = options.fileMap[imgPath];
      }

      if (src === undefined || src === '') {
        console.log('src is empty or null = ' + src);
      }

      let displayLookName = look.name;
      if (!displayLookName) {
        displayLookName = look.fileName;
      }

      const imgID = generateID(`${objectID}-${displayLookName}`) + '-imgID';
      const imgElement = generateNewDOM(leftCol, 'img', {
        'data-src': src,
        class: 'img-fluid catblocks-object-look-item',
        id: imgID,
        'data-bs-toggle': 'modal',
        'data-bs-target': '#modalForImg'
      });

      // register on click on image
      imgElement.addEventListener('click', () => {
        document.getElementById('modalHeader').innerText = displayLookName;
        document.getElementById('modalImg').setAttribute('src', src);
        document.getElementById('imgPopupClose').innerText = CatBlocksMsgs.getCurrentLocaleValues()['CLOSE'];
      });

      const magnifyingGlassID = generateID(`${objectID}-button-${displayLookName}`);
      const magnifyingGlass = generateNewDOM(
        rightCol,
        'button',
        {
          class: 'btn btn-light search me-3',
          id: magnifyingGlassID,
          'data-bs-toggle': 'modal',
          'data-bs-target': '#modalForImg'
        },
        `<img src="${this.config.media}search_black_24dp.svg" />`
      );

      magnifyingGlass.addEventListener('click', () => {
        document.getElementById('modalHeader').innerText = displayLookName;
        document.getElementById('modalImg').setAttribute('src', src);
        document.getElementById('imgPopupClose').innerText = CatBlocksMsgs.getCurrentLocaleValues()['CLOSE'];
      });

      const lookName = generateNewDOM(
        rightCol,
        'span',
        {
          class: 'mb-0 text-wrap'
        },
        look.name
      );

      if (this.config.rtl) {
        lookName.style.textAlign = 'right';
      }
    }

    if (failed > 0) {
      const failedLooksText = 'ERROR parsing ' + failed + ' Looks';
      looksContainer.appendChild(
        generateNewDOM(
          looksContainer,
          'p',
          {
            class: 'catblocks-empty-text pt-3'
          },
          failedLooksText
        )
      );
    }
  }

  /**
   * Generate Tabcontainer for scripts
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {number} scriptToDisplay
   */
  generateScripts(container, objectID, object) {
    const wrapperContainer = generateNewDOM(container, 'div', {
      class: 'tab-pane show active fade container-fluid',
      id: `${objectID}-scripts`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-scripts-tab`
    });
    if (!object || !object.scriptList || object.scriptList.length <= 0) {
      const noScriptText = 'No Scripts found';
      wrapperContainer.appendChild(
        generateNewDOM(
          wrapperContainer,
          'p',
          {
            class: 'catblocks-empty-text pt-3'
          },
          noScriptText
        )
      );
      if (this.config.rtl) {
        wrapperContainer.style.textAlign = 'right';
      }
      return;
    }

    let failed = 0;
    for (let i = 0; i < object.scriptList.length; i++) {
      const rowContainer = generateNewDOM(wrapperContainer, 'div', {
        class: 'row pt-3 catblocks-object-script-row'
      });
      const colContainer = generateNewDOM(rowContainer, 'div', {
        class: 'col'
      });
      const scriptContainer = generateNewDOM(colContainer, 'div', {
        class: 'catblocks-script'
      });

      if (this.config.rtl) {
        scriptContainer.style.textAlign = 'right';
      }
      scriptContainer.style.overflowX = 'auto';

      const blockSvg = this.domToSvg(object.scriptList[i]);
      if (blockSvg === undefined) {
        failed++;
      } else {
        scriptContainer.appendChild(blockSvg);
      }
    }

    if (failed > 0) {
      const failedScriptText = 'ERROR parsing ' + failed + ' Scripts';
      wrapperContainer.appendChild(
        generateNewDOM(
          wrapperContainer,
          'p',
          {
            class: 'catblocks-empty-text'
          },
          failedScriptText
        )
      );
    }
  }

  /**
   * Generate Bootstrap 5 Tabs
   * @param {Element} container
   * @param {boolean} firstTab
   * @param {string} objectID
   * @param {string} imageName
   * @param {integer} count
   * @param {string} type
   */
  generateTabButton(container, firstTab, objectID, imageName, count, type) {
    const liScript = generateNewDOM(container, 'li', {
      class: 'nav-item',
      role: 'presentation'
    });

    const linkButton = generateNewDOM(liScript, 'button', {
      class: 'ps-1 nav-link' + (firstTab ? ' active' : ''),
      id: `${objectID}-${type}-tab`,
      'data-bs-toggle': 'tab',
      'data-bs-target': `#${objectID}-${type}`,
      role: 'tab',
      'aria-controls': `${type}-pane`,
      'aria-selected': firstTab + ''
    });

    generateNewDOM(linkButton, 'img', {
      src: this.config.media + imageName
    });
    generateNewDOM(linkButton, 'span', {}, `(${count})`);
  }

  /**
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   */
  generateTabs(container, objectID, givenObject) {
    const object = Object.assign(
      {
        scriptList: [],
        lookList: [],
        soundList: []
      },
      givenObject
    );

    const ul = generateNewDOM(container, 'ul', {
      class: 'nav nav-tabs nav-fill catro-tabs',
      id: `${objectID}-tabs`,
      role: 'tablist'
    });

    let firstTab = true;
    if (this.config.renderScripts) {
      firstTab = this.generateTabButton(
        ul,
        firstTab,
        objectID,
        'scripts_icon.svg',
        object.scriptList.length,
        'scripts'
      );
    }

    if (this.config.renderLooks) {
      firstTab = this.generateTabButton(
        ul,
        firstTab,
        objectID,
        'visibility_black_24dp.svg',
        object.lookList.length,
        'looks'
      );
    }

    if (this.config.renderSounds) {
      this.generateTabButton(ul, firstTab, objectID, 'volume_up_black_24dp.svg', object.soundList.length, 'sounds');
    }

    const tabButtons = ul.querySelectorAll('button');
    for (const button of tabButtons) {
      const tabTrigger = new Tab(button);
      button.addEventListener('click', event => {
        event.preventDefault();
        tabTrigger.show();
      });
    }
  }
}
