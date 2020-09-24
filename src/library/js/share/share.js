/**
 * This file will be used in catroweb to render everything properly
 */
import '../../css/share.css';
import Blockly from 'blockly';
import {
  escapeURI,
  generateID,
  defaultOptions,
  parseOptions,
  trimString,
  zebraChangeColor,
  jsonDomToWorkspace,
  generateNewDOM,
  injectNewDom
} from './utils';

const all_blocks = new Map();
const rendered_scenes = new Map();

export class Share {
  constructor() {
    this.blockly = Blockly;
    this.config = {};
    this.workspaceDom = undefined;
    this.workspace = undefined;
    this.cssNode = undefined;
    all_blocks.clear();
    rendered_scenes.clear();
  }

  /**
   * init share class instance
   * @param {Element} options for rendering process
   */
  async init(options) {
    this.config = parseOptions(options, defaultOptions.render);
    this.createReadonlyWorkspace();
    this.generateFormulaModal();
    this.generateModalMagnifyingGlass();
    $('meta[name=viewport]')[0].content = $('meta[name=viewport]')[0].content + ' user-scalable=yes';
    this.createLoadingAnimation();

    $('body').on('click', '.blocklyNonEditableText', function () {
      const block = all_blocks[$(this).parent().attr('data-id')];
      const element_idx = $(this).parent().children('g').index($(this));
      const full_formula = block[element_idx];
      // const displayed_formula = $(this).children('text').text();
      if (full_formula.length >= Blockly.Tooltip.LIMIT) {
        $('#formulaPopupClose').text(Blockly.CatblocksMsgs.getCurrentLocaleValues()['CLOSE']);
        $('#formulaPopupContent').text(full_formula);
        $('#formulaPopup').modal('show');
      }
    });

    $('body').on('click', 'image', function () {
      if ($(this).attr('xlink:href').endsWith('info_icon.svg')) {
        const $parent = $(this).parent();
        const block = all_blocks[$parent.parent().attr('data-id')];
        const element_idx = $parent.parent().children('g').index($parent);
        const full_formula = block[element_idx - 1];
        if (full_formula.length >= Blockly.Tooltip.LIMIT) {
          $('#formulaPopupClose').text(Blockly.CatblocksMsgs.getCurrentLocaleValues()['CLOSE']);
          $('#formulaPopupContent').text(full_formula);
          $('#formulaPopup').modal('show');
        }
      }
    });

    // for now only convert when in library
    if (window.CatBlocks) {
      this.insertRightMediaURI();
    }
    if (this.config.rtl) {
      document.documentElement.style.direction = 'rtl';
    }
    await Blockly.CatblocksMsgs.setLocale(this.config.language, this.config.i18n);
  }

  /**
   * As we don't know the MediaURL when injecting the JS file and we cannot load
   * the custom Blocks in a later state, we have to overwrite the URLs in an ugly way here
   */
  insertRightMediaURI() {
    if (this.config.media) {
      for (const brick in this.blockly.Bricks) {
        if (Object.prototype.hasOwnProperty.call(this.blockly.Bricks, brick)) {
          const obj = this.blockly.Bricks[brick];

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
      const sceneWidth = jsonDomToWorkspace(blockJSON, this.workspace);
      zebraChangeColor(this.workspace.topBlocks_);
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
      console.error(e.message);
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
      class: 'catblocks-scene card',
      id: sceneID
    });

    const sceneHeader = generateNewDOM(sceneContainer, 'div', {
      class: 'catblocks-scene-header card-header d-flex justify-content-between expansion-header',
      id: `${sceneID}-header`,
      'data-toggle': 'collapse',
      'data-target': `#${sceneID}-collapseOne`,
      'aria-expanded': 'false',
      'aria-controls': `${sceneID}-collapseOne`
    });

    if (sceneName) {
      sceneHeader.innerHTML = `<div class="header-title">${sceneName}</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    } else {
      sceneHeader.innerHTML = `<i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    }

    const sceneObjectContainer = generateNewDOM(sceneContainer, 'div', {
      class: 'catblocks-object-container collapse',
      id: `${sceneID}-collapseOne`,
      'aria-labelledby': `${sceneID}-header`,
      'data-parent': `#${accordionID}`
    });

    const cardBody = generateNewDOM(sceneObjectContainer, 'div', {
      class: 'card-body'
    });

    const accordionObjects = generateNewDOM(cardBody, 'div', {
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
   * @param {Object} [options={}]
   */
  renderProgramJSON(programID, container, programJSON, options = {}, renderEverything = false) {
    options = parseOptions(options, defaultOptions);
    // create row and col
    const programContainers = this.createProgramContainer(generateID(programID), undefined);
    const programContainer = programContainers[1];
    const scenesContainerID = `${generateID(programID)}-accordionScenes`;
    const scenesContainer = generateNewDOM(programContainer, 'div', {
      class: 'catblocks-scene-container accordion',
      id: scenesContainerID
    });

    if (programJSON == null || programJSON.scenes == null || programJSON.scenes.length === 0) {
      const errorContainer = generateNewDOM(scenesContainer, 'div', {
        class: 'catblocks-scene card'
      });
      generateNewDOM(
        errorContainer,
        'div',
        {
          class: 'card-header d-flex justify-content-between'
        },
        'Empty program found'
      );
      container.appendChild(programContainers[0]);
      throw new Error('Empty program found');
    }

    for (let i = 0; i < programJSON.scenes.length; i++) {
      const scene = programJSON.scenes[i];
      const sceneID = generateID(`${programID}-${scene.name}`);

      let sceneObjectContainer = undefined;
      if (programJSON.scenes.length === 1) {
        sceneObjectContainer = generateNewDOM(scenesContainer, 'div', {
          class: 'accordion',
          id: `${sceneID}-accordionObjects`
        });
      } else {
        sceneObjectContainer = this.addSceneContainer(
          scenesContainerID,
          sceneID,
          scenesContainer,
          trimString(scene.name)
        );
      }
      if (scene.objectList == null || scene.objectList.length === 0) {
        const errorContainer = generateNewDOM(sceneObjectContainer, 'div', {
          class: 'catblocks-object card'
        });
        generateNewDOM(
          errorContainer,
          'div',
          {
            class: 'card-header d-flex justify-content-between'
          },
          'No objects found'
        );
        continue;
      }

      const spinnerModal = $('#spinnerModal');

      if (!renderEverything) {
        this.renderAllObjectsFromOneScene(options, scene, programID, sceneID, sceneObjectContainer, renderEverything);
        continue;
      }

      if (programJSON.scenes.length === 1) {
        this.renderAllObjectsFromOneScene(options, scene, programID, sceneID, sceneObjectContainer, renderEverything);
      } else {
        $('body').on('click', `#${sceneID}`, () => {
          spinnerModal.on('shown.bs.modal', () => {
            this.renderAllObjectsFromOneScene(
              options,
              scene,
              programID,
              sceneID,
              sceneObjectContainer,
              renderEverything
            );
            spinnerModal.modal('hide');
          });
          if (rendered_scenes[sceneID] !== true) {
            spinnerModal.modal('show');
          }
        });
      }
    }

    container.appendChild(programContainers[0]);
  }

  renderAllObjectsFromOneScene(options, scene, programID, sceneID, sceneObjectContainer, renderEverything) {
    this.handleBackgroundName(programID, scene, sceneID, sceneObjectContainer, options, renderEverything);

    if (rendered_scenes[sceneID] === true) {
      return;
    }

    rendered_scenes[sceneID] = true;

    const performanceContainer = generateNewDOM(undefined, 'div');

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

  createLoadingAnimation() {
    const loadingAnimation = `
    <div class="modal fade" tabindex="-1" role="dialog" id="spinnerModal">
        <div class="modal-dialog modal-dialog-centered justify-content-center" role="document">
            <span class="spinner-border" data-dismiss='modal'></span>
        </div>
    </div>`;
    $('body').append(loadingAnimation);
  }

  handleBackgroundName(programID, scene, sceneID, sceneObjectContainer, options, renderEverything) {
    options.object.sceneName = scene.name;
    const backgroundObjID = generateID(`${programID}-${scene.name}-${scene.objectList[0].name}`);

    if (renderEverything) {
      scene.objectList[0].name = Blockly.CatblocksMsgs.getCurrentLocaleValues().BACKGROUND;
    }

    this.renderObjectJSON(
      backgroundObjID,
      `${sceneID}-accordionObjects`,
      sceneObjectContainer,
      scene.objectList[0],
      parseOptions(options.object, parseOptions(options.object, defaultOptions.object))
    );
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
      class: 'catblocks-object card',
      id: objectID
    });

    if (object.userBricks) {
      for (let i = 0; i < object.userBricks.length; ++i) {
        const jsonDef = object.userBricks[i].getJsonDefinition();
        const brickName = object.userBricks[i].id;
        Blockly.Bricks[brickName] = jsonDef;
        Blockly.Blocks[brickName] = {
          init: function () {
            this.jsonInit(Blockly.Bricks[brickName]);
          }
        };
      }
    }

    const objHeadingID = `${objectID}-header`;
    const objCollapseOneSceneID = `${objectID}-collapseOneScene`;
    const cardHeader = generateNewDOM(objectCard, 'div', {
      class: 'card-header d-flex justify-content-between expansion-header',
      id: objHeadingID,
      'data-toggle': 'collapse',
      'data-target': `#${objCollapseOneSceneID}`,
      'aria-expanded': 'false',
      'aria-controls': objCollapseOneSceneID
    });

    if (this.config.rtl) {
      cardHeader.style.paddingLeft = '1.5em';
      cardHeader.style.paddingRight = '3.5em';
    }

    if (object && object.name) {
      cardHeader.innerHTML = `<div class="header-title">${object.name}</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    } else {
      cardHeader.innerHTML = `<i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    }

    const objectContentContainer = generateNewDOM(objectCard, 'div', {
      class: 'collapse',
      id: objCollapseOneSceneID,
      'aria-labelledby': objHeadingID,
      'data-parent': `#${accordionID}`
    });
    const currentLocaleValues = Blockly.CatblocksMsgs.getCurrentLocaleValues();
    this.generateTabs(objectContentContainer, objectID, object, currentLocaleValues);
    const contentContainer = generateNewDOM(objectContentContainer, 'div', {
      class: 'tab-content card-body'
    });

    this.generateScripts(contentContainer, objectID, object, currentLocaleValues);
    this.generateLooks(contentContainer, objectID, object, currentLocaleValues, options);
    this.generateSounds(contentContainer, objectID, object, currentLocaleValues, options);
  }

  /**
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} currentLocaleValues
   * @param {Object} [options=defaultOptions.object]
   */
  generateSounds(container, objectID, object, currentLocaleValues, options = defaultOptions.object) {
    const soundsContainer = generateNewDOM(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-sounds`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-sounds-tab`
    });

    const noSoundsText = 'No ' + currentLocaleValues['SOUNDS'] + ' found';
    if (!object || !object.soundList || object.soundList.length <= 0) {
      soundsContainer.appendChild(
        generateNewDOM(
          soundsContainer,
          'p',
          {
            class: 'catblocks-empty-text'
          },
          noSoundsText
        )
      );
      if (this.config.rtl) {
        soundsContainer.style.textAlign = 'right';
      }
      return;
    }

    const group = generateNewDOM(soundsContainer, 'div', {
      class: 'list-group-flush'
    });

    let failed = 0;
    for (const sound of object.soundList) {
      const row = generateNewDOM(group, 'div', {
        class: 'list-group-item row'
      });

      const col = generateNewDOM(row, 'div', {
        class: 'col-12'
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

      const soundName = generateNewDOM(
        col,
        'span',
        {
          class: 'catblocks-object-sound-name d-block'
        },
        displaySoundName
      );
      if (this.config.rtl) {
        soundName.style.textAlign = 'right';
      }

      const audioContainer = generateNewDOM(col, 'audio', {
        class: 'catblocks-object-sound-item',
        controls: 'controls'
      });
      generateNewDOM(audioContainer, 'source', {
        src: src
      });
    }

    if (failed > 0) {
      const failedSoundsText = 'ERROR parsing ' + failed + ' ' + currentLocaleValues['SOUNDS'];
      soundsContainer.appendChild(
        generateNewDOM(
          soundsContainer,
          'p',
          {
            class: 'catblocks-empty-text'
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
   * @param {Object} currentLocaleValues
   * @param {Object} [options=defaultOptions.object]
   */
  generateLooks(container, objectID, object, currentLocaleValues, options = defaultOptions.object) {
    const looksContainer = generateNewDOM(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-looks`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-looks-tab`
    });

    const noLooksText = 'No ' + currentLocaleValues['LOOKS'] + ' found';
    if (!object || !object.lookList || object.lookList.length <= 0) {
      looksContainer.appendChild(
        generateNewDOM(
          looksContainer,
          'p',
          {
            class: 'catblocks-empty-text'
          },
          noLooksText
        )
      );
      if (this.config.rtl) {
        looksContainer.style.textAlign = 'right';
      }
      return;
    }

    const group = generateNewDOM(looksContainer, 'div', {
      class: 'list-group-flush'
    });

    let failed = 0;
    for (const look of object.lookList) {
      const row = generateNewDOM(group, 'div', {
        class: 'list-group-item align-items-center'
      });
      const col = generateNewDOM(row, 'div', {
        class: 'col-3'
      });
      const button = generateNewDOM(row, 'span', {
        class: 'align-items-center'
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
      generateNewDOM(
        col,
        'img',
        {
          src: src,
          class: 'img-fluid catblocks-object-look-item',
          id: imgID,
          'data-toggle': 'modal',
          'data-target': '#modalForImg'
        },
        displayLookName
      );

      const body = $('body');

      // register on click on image
      body.on('click', `#${imgID}`, () => {
        $('#modalHeader').text(displayLookName);
        $('#modalImg').attr('src', src);
        $('#imgPopupClose').text(Blockly.CatblocksMsgs.getCurrentLocaleValues()['CLOSE']);
      });

      const lookName = generateNewDOM(
        row,
        'div',
        {
          class: 'col-9'
        },
        look.name
      );

      const magnifyingGlassID = generateID(`${objectID}-button-${displayLookName}`);
      const magnifyingGlass = generateNewDOM(button, 'button', {
        class: 'search',
        id: magnifyingGlassID,
        'data-toggle': 'modal',
        'data-target': '#modalForImg',
        name: 'not clicked'
      });
      magnifyingGlass.innerHTML = '<i class="material-icons">search</i>';

      // register on click on magnifying glass
      body.on('click', `#${magnifyingGlassID}`, () => {
        $('#modalHeader').text(displayLookName);
        $('#modalImg').attr('src', src);
        $('#imgPopupClose').text(Blockly.CatblocksMsgs.getCurrentLocaleValues()['CLOSE']);
        magnifyingGlass.name = 'now got clicked!';
      });

      if (this.config.rtl) {
        lookName.style.textAlign = 'right';
      }
    }

    if (failed > 0) {
      const failedLooksText = 'ERROR parsing ' + failed + ' ' + currentLocaleValues['LOOKS'];
      looksContainer.appendChild(
        generateNewDOM(
          looksContainer,
          'p',
          {
            class: 'catblocks-empty-text'
          },
          failedLooksText
        )
      );
    }
  }

  /**
   * Generate Modal for magnifying glass
   */
  generateModalMagnifyingGlass() {
    const modal = $(
      ` <div class="modal" id="modalForImg">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <span id="modalHeader"></span>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
  
              <div class="modal-body">
                <img src="" id="modalImg" class="imagepreview" style="max-width: 100%; max-height: 100%; margin: auto; display: block" />
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal" id="imgPopupClose">Close</button>
              </div>
            </div>
          </div>
        </div>`
    );
    $('body').append(modal);
  }

  generateFormulaModal() {
    const formulaModal = `
      <div class="modal" id="formulaPopup">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="formulaPopupHeader"></h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body" id="formulaPopupContent">
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal" id="formulaPopupClose">Close</button>
          </div>
        </div>
      </div>
    </div>`;
    $('body').append(formulaModal);
  }

  /**
   * Generate Tabcontainer for scripts
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} currentLocaleValues
   */
  generateScripts(container, objectID, object, currentLocaleValues) {
    const wrapperContainer = generateNewDOM(container, 'div', {
      class: 'tab-pane show active fade p-3',
      id: `${objectID}-scripts`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-scripts-tab`
    });
    if (!object || !object.scriptList || object.scriptList.length <= 0) {
      const noScriptText = 'No ' + currentLocaleValues['SCRIPTS'] + ' found';
      wrapperContainer.appendChild(
        generateNewDOM(
          wrapperContainer,
          'p',
          {
            class: 'catblocks-empty-text'
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
      const scriptContainer = generateNewDOM(wrapperContainer, 'div', {
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
      const failedScriptText = 'ERROR parsing ' + failed + ' ' + currentLocaleValues['SCRIPTS'];
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
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} currentLocaleValues
   */
  generateTabs(container, objectID, object, currentLocaleValues) {
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

    const tabs = generateNewDOM(container, 'div', {
      class: 'catro-tabs'
    });
    const ul = generateNewDOM(tabs, 'ul', {
      class: 'nav nav-tabs nav-fill',
      id: `${objectID}-tabs`,
      role: 'tablist'
    });

    const liScript = generateNewDOM(ul, 'li', {
      class: 'nav-item'
    });
    generateNewDOM(
      liScript,
      'a',
      {
        class: 'nav-link active',
        id: `${objectID}-scripts-tab`,
        'data-toggle': 'tab',
        href: `#${objectID}-scripts`,
        role: 'tab',
        'aria-controls': 'scripts',
        'aria-selected': 'true'
      },
      `${currentLocaleValues['SCRIPTS']} (${object.scriptList.length})`
    );

    const liLooks = generateNewDOM(ul, 'li', {
      class: 'nav-item'
    });
    generateNewDOM(
      liLooks,
      'a',
      {
        class: 'nav-link',
        id: `${objectID}-looks-tab`,
        'data-toggle': 'tab',
        href: `#${objectID}-looks`,
        role: 'tab',
        'aria-controls': 'looks',
        'aria-selected': 'false'
      },
      `${currentLocaleValues['LOOKS']} (${object.lookList.length})`
    );

    const liSounds = generateNewDOM(ul, 'li', {
      class: 'nav-item'
    });
    generateNewDOM(
      liSounds,
      'a',
      {
        class: 'nav-link',
        id: `${objectID}-sounds-tab`,
        'data-toggle': 'tab',
        href: `#${objectID}-sounds`,
        role: 'tab',
        'aria-controls': 'sounds',
        'aria-selected': 'false'
      },
      `${currentLocaleValues['SOUNDS']} (${object.soundList.length})`
    );
  }

  /**
   * Create program wrapper structure
   * @param {string} containerID unique ID of the container
   * @param {Element} container parent container where the structure is added
   * @returns {Element} wrapper where the scene container should be injected
   * @memberof Share
   */
  createProgramContainer(containerID, container) {
    const row = generateNewDOM(container, 'div', {
      class: 'row',
      id: containerID
    });

    const col = generateNewDOM(row, 'div', {
      class: 'col-12'
    });

    return [row, col];
  }
}
