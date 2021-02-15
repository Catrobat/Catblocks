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
  injectNewDom,
  lazyLoadImage
} from './utils';
import { Parser } from '../../../common/js/parser/parser';

const all_blocks = new Map();
const rendered_scenes = new Map();

export class Share {
  constructor() {
    this.blockly = Blockly;
    this.config = {};
    this.workspaceDom = undefined;
    this.workspace = undefined;
    this.cssNode = undefined;
    this.scrollToElements = new Map();
    this.modifiableWorkspaces = new Map();
    all_blocks.clear();
    rendered_scenes.clear();
  }

  /**
   * init share class instance
   * @param {Element} options for rendering process
   */
  async init(options) {
    this.config = parseOptions(options, defaultOptions.render);
    this.generateFormulaModal();
    this.generateModalMagnifyingGlass();
    $('meta[name=viewport]')[0].content = $('meta[name=viewport]')[0].content + ' user-scalable=yes';
    this.createLoadingAnimation();

    const share_instance = this;
    $('body').on('click', '.blocklyNonEditableText', function () {
      const block = all_blocks[$(this).parent().attr('data-id')];
      const element_idx = $(this).parent().children('g').index($(this));
      const full_formula = block[element_idx];
      share_instance.showFormulaPopup(full_formula);
    });

    $('body').on('click', 'image', function () {
      if ($(this).attr('xlink:href').endsWith('info_icon.svg')) {
        const $parent = $(this).parent();
        const block = all_blocks[$parent.parent().attr('data-id')];
        const element_idx = $parent.parent().children('g').index($parent);
        const full_formula = block[element_idx - 1];
        share_instance.showFormulaPopup(full_formula);
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

    if (this.config.readOnly) {
      this.createReadonlyWorkspace();
    } else {
      const workspaceItem = {
        displayText: Blockly.CatblocksMsgs.getCurrentLocaleValues()['SWITCH_TO_1D'],
        preconditionFn: function () {
          return 'enabled';
        },
        callback: function (scope) {
          if (scope && scope.block && scope.block.id) {
            try {
              Android.switchTo1D(scope.block.id);
            } catch (error) {
              console.log(error);
            }
          }
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        id: 'catblocks-switch-to-1d',
        weight: -5
      };
      Blockly.ContextMenuRegistry.registry.register(workspaceItem);

      const thisShare = this;
      Blockly.ContextMenuRegistry.registry.getItem('blockDuplicate').callback = function (scope) {
        // console.log(scope);
        const newId = Android.duplicateBrick(scope.block.id);
        const programXml = Android.getCurrentProject();

        console.time('parse');

        // (event.blockId, position.x, position.y)

        const programJSON = Parser.convertProgramToJSONDebug(programXml);

        for (let sceneCtr = 0; sceneCtr < programJSON.scenes.length; ++sceneCtr) {
          const scene = programJSON.scenes[sceneCtr];
          for (let objCtr = 0; objCtr < scene.objectList.length; ++objCtr) {
            const object = scene.objectList[objCtr];
            const clone = object.scriptList.filter(x => x.id.toLowerCase() == newId.toLowerCase());
            if (clone && clone.length) {
              const workspace = thisShare.getWorkspaceOfActiveObject();
              thisShare.domToSvgModifiable(clone[0], workspace);
              const oldPosition = scope.block.getRelativeToSurfaceXY();
              const newBrick = workspace.getBlockById(newId);
              if (newBrick) {
                const newX = oldPosition.x + scope.block.width;
                const newY = oldPosition.y;
                newBrick.moveBy(newX, newY);
                Android.updateScriptPosition(newId, newX, newY);
              }
            }
          }
        }

        console.timeEnd('parse');
      };
    }
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

  createModifiableWorkspace(container) {
    let mediapath = `${this.config.shareRoot}${this.config.media}`;
    // full link or absolute path given
    if (this.config.media.startsWith('http') || this.config.media.startsWith('/')) {
      mediapath = this.config.media;
    }
    const workspace = this.blockly.inject(container, {
      readOnly: false,
      media: mediapath,
      zoom: {
        controls: false,
        wheel: false,
        pinch: true,
        startScale: this.config.renderSize
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: false
      },
      collapse: false,
      renderer: 'zelos',
      rtl: this.config.rtl,
      sounds: false
    });
    // Blockly.svgResize(workspace);

    return workspace;
  }

  domToSvgModifiable(blockJSON, workspace) {
    try {
      jsonDomToWorkspace(blockJSON, workspace);
      // store all block inputs in a map for later use
      workspace.getAllBlocks().forEach(block => {
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
      return true;
    } catch (e) {
      console.error(e.message);
      console.error('Failed to generate SVG from workspace, properly due to unknown bricks');
    }
    return false;
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
  addSceneContainer(accordionID, sceneID, container, sceneName, expanded) {
    const sceneContainer = this.generateOrInjectNewDOM(container, 'div', {
      class: 'catblocks-scene card',
      id: sceneID
    });

    const sceneHeader = this.generateOrInjectNewDOM(sceneContainer, 'div', {
      class:
        'catblocks-scene-header card-header d-flex justify-content-between expansion-header' +
        (expanded ? '' : ' collapsed'),
      id: `${sceneID}-header`,
      'data-toggle': 'collapse',
      'data-target': `#${sceneID}-collapseOne`,
      'aria-expanded': expanded ? 'true' : 'false',
      'aria-controls': `${sceneID}-collapseOne`
    });

    if (expanded) {
      this.scrollToElements['scene'] = sceneHeader;
    }

    if (sceneName && sceneName.display) {
      sceneHeader.innerHTML = `<div class="header-title">${sceneName.display}</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    } else {
      sceneHeader.innerHTML = `<i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    }

    const sceneObjectContainer = this.generateOrInjectNewDOM(sceneContainer, 'div', {
      class: 'catblocks-object-container collapse' + (expanded ? ' show' : ''),
      id: `${sceneID}-collapseOne`,
      'aria-labelledby': `${sceneID}-header`,
      'data-parent': `#${accordionID}`,
      'data-scene': sceneName.real
    });

    const cardBody = this.generateOrInjectNewDOM(sceneObjectContainer, 'div', {
      class: 'card-body'
    });

    const accordionObjects = this.generateOrInjectNewDOM(cardBody, 'div', {
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
    let programContainers;
    if (this.config.readOnly) {
      programContainers = this.createProgramContainer(generateID(programID), undefined);
    } else {
      programContainers = this.createProgramContainer(generateID(programID), container);
    }
    const programContainer = programContainers[1];
    const scenesContainerID = `${generateID(programID)}-accordionScenes`;
    const scenesContainer = this.generateOrInjectNewDOM(programContainer, 'div', {
      class: 'catblocks-scene-container accordion',
      id: scenesContainerID
    });

    if (programJSON == null || programJSON.scenes == null || programJSON.scenes.length === 0) {
      const errorContainer = this.generateOrInjectNewDOM(scenesContainer, 'div', {
        class: 'catblocks-scene card'
      });
      this.generateOrInjectNewDOM(
        errorContainer,
        'div',
        {
          class: 'card-header d-flex justify-content-between'
        },
        'Empty program found'
      );
      if (this.config.readOnly) {
        container.appendChild(programContainers[0]);
      }
      throw new Error('Empty program found');
    }

    for (let i = 0; i < programJSON.scenes.length; i++) {
      const scene = programJSON.scenes[i];
      const sceneID = generateID(`${programID}-${scene.name}`);

      let renderNow = false;
      if (options.scene.renderNow.scene && scene.name) {
        renderNow = options.scene.renderNow.scene.trim() === scene.name.trim();
      }

      const sceneName = {
        real: trimString(scene.name),
        display: undefined
      };
      if (programJSON.scenes.length === 1) {
        sceneName.display = programJSON.programName;
      } else {
        sceneName.display = trimString(scene.name);
      }

      const sceneObjectContainer = this.addSceneContainer(
        scenesContainerID,
        sceneID,
        scenesContainer,
        sceneName,
        renderNow
      );
      if (scene.objectList == null || scene.objectList.length === 0) {
        const errorContainer = this.generateOrInjectNewDOM(sceneObjectContainer, 'div', {
          class: 'catblocks-object card'
        });
        this.generateOrInjectNewDOM(
          errorContainer,
          'div',
          {
            class: 'card-header d-flex justify-content-between'
          },
          'No objects found'
        );
        continue;
      }

      if (!renderEverything) {
        this.renderAllObjectsFromOneScene(options, scene, programID, sceneID, sceneObjectContainer, renderEverything);
        continue;
      }

      const $spinnerModal = $('#spinnerModal');
      if (renderNow) {
        $spinnerModal.one('shown.bs.modal', () => {
          this.renderAllObjectsFromOneScene(options, scene, programID, sceneID, sceneObjectContainer, renderEverything);
          $spinnerModal.modal('hide');

          let scrollTo = this.scrollToElements['script'];

          if (!scrollTo) {
            scrollTo = this.scrollToElements['object'];
          }

          if (!scrollTo) {
            scrollTo = this.scrollToElements['scene'];
          }

          if (scrollTo) {
            $('html, body').animate(
              {
                scrollTop: $(scrollTo).offset().top
              },
              'slow'
            );
          }
        });
        $spinnerModal.modal('show');
        continue;
      }

      $('body').on('click', `#${sceneID}`, () => {
        if (rendered_scenes[sceneID] !== true) {
          $spinnerModal.one('shown.bs.modal', () => {
            this.renderAllObjectsFromOneScene(
              options,
              scene,
              programID,
              sceneID,
              sceneObjectContainer,
              renderEverything
            );
            $spinnerModal.modal('hide');
          });
          $spinnerModal.modal('show');
        }
      });
    }

    if (this.config.readOnly) {
      container.appendChild(programContainers[0]);
    }
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

    let performanceContainer;
    if (this.config.readOnly) {
      performanceContainer = this.generateOrInjectNewDOM(undefined, 'div');
    } else {
      performanceContainer = sceneObjectContainer;
    }

    let sceneDisplayedDefault = false;
    if (options.scene.renderNow.scene && scene.name) {
      sceneDisplayedDefault = options.scene.renderNow.scene.trim() == scene.name.trim();
    }

    const scenesWorkspaces = new Map();
    if (bgWorkspaceDetails) {
      scenesWorkspaces[bgWorkspaceDetails.name] = bgWorkspaceDetails.workspace;
    }

    options.object.sceneName = scene.name;
    for (let j = 1; j < scene.objectList.length; j++) {
      const object = scene.objectList[j];
      const objectID = generateID(`${programID}-${scene.name}-${object.name}`);

      const objectsWorkspace = this.renderObjectJSON(
        objectID,
        `${sceneID}-accordionObjects`,
        performanceContainer,
        object,
        sceneDisplayedDefault,
        parseOptions(options.object, parseOptions(options.object, defaultOptions.object))
      );
      scenesWorkspaces[scene.objectList[j].name] = objectsWorkspace;
    }
    if (this.config.readOnly) {
      sceneObjectContainer.appendChild(performanceContainer);
    }
    this.modifiableWorkspaces[scene.name] = scenesWorkspaces;
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

    let sceneDisplayedDefault = false;
    if (options.scene.renderNow.scene && scene.name) {
      sceneDisplayedDefault = options.scene.renderNow.scene.trim() == scene.name.trim();
    }

    const bgWorkspace = this.renderObjectJSON(
      backgroundObjID,
      `${sceneID}-accordionObjects`,
      sceneObjectContainer,
      scene.objectList[0],
      sceneDisplayedDefault,
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
   *
   * @returns {Map} a map of workspaces for each object name
   *                Map is empty if readOnly is set in options
   */
  renderObjectJSON(
    objectID,
    accordionID,
    sceneObjectContainer,
    object,
    sceneDisplayedDefault,
    options = defaultOptions.object
  ) {
    const objectCard = this.generateOrInjectNewDOM(sceneObjectContainer, 'div', {
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

    let expandObject = false;
    if (sceneDisplayedDefault === true) {
      if (object.name) {
        expandObject = object.name.trim() == options.renderNow.object;
      }
    }

    const objHeadingID = `${objectID}-header`;
    const objCollapseOneSceneID = `${objectID}-collapseOneScene`;
    const cardHeader = this.generateOrInjectNewDOM(objectCard, 'div', {
      class: 'card-header d-flex justify-content-between expansion-header',
      id: objHeadingID,
      'data-toggle': 'collapse',
      'data-target': `#${objCollapseOneSceneID}`,
      'aria-expanded': expandObject ? 'true' : 'false',
      'aria-controls': objCollapseOneSceneID
    });

    if (expandObject) {
      this.scrollToElements['object'] = cardHeader;
    }

    // attach listener for lazyloading
    $(cardHeader).on('click', lazyLoadImage);

    if (this.config.rtl) {
      cardHeader.style.paddingLeft = '1.5em';
      cardHeader.style.paddingRight = '3.5em';
    }

    if (object && object.name) {
      cardHeader.innerHTML = `<div class="header-title">${object.name}</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    } else {
      cardHeader.innerHTML = `<i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>`;
    }

    const objectContentContainer = this.generateOrInjectNewDOM(objectCard, 'div', {
      class: 'catblocks-script-container collapse' + (expandObject ? ' show' : ''),
      id: objCollapseOneSceneID,
      'aria-labelledby': objHeadingID,
      'data-parent': `#${accordionID}`,
      'data-object': object.name
    });

    this.generateTabs(objectContentContainer, objectID, object);
    const contentContainer = this.generateOrInjectNewDOM(objectContentContainer, 'div', {
      class: 'tab-content card-body'
    });

    let scriptToDisplay = -1;
    if (expandObject) {
      if (options.renderNow.script !== null && options.renderNow.script !== undefined) {
        scriptToDisplay = options.renderNow.script;
      }
    }

    let objectsWorkspace = undefined;
    if (this.config.renderScripts) {
      objectsWorkspace = this.generateScripts(contentContainer, objectID, object, scriptToDisplay);
    }
    if (this.config.renderLooks) {
      this.generateLooks(contentContainer, objectID, object, options);
    }
    if (this.config.renderSounds) {
      this.generateSounds(contentContainer, objectID, object, options);
    }
    return objectsWorkspace;
  }

  /**
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
   * @param {Object} [options=defaultOptions.object]
   */
  generateSounds(container, objectID, object, options = defaultOptions.object) {
    const soundsContainer = this.generateOrInjectNewDOM(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-sounds`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-sounds-tab`
    });

    const noSoundsText = 'No Sounds found';
    if (!object || !object.soundList || object.soundList.length <= 0) {
      soundsContainer.appendChild(
        this.generateOrInjectNewDOM(
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

    const group = this.generateOrInjectNewDOM(soundsContainer, 'div', {
      class: 'list-group-flush'
    });

    let failed = 0;
    for (const sound of object.soundList) {
      const row = this.generateOrInjectNewDOM(group, 'div', {
        class: 'list-group-item row'
      });

      const col = this.generateOrInjectNewDOM(row, 'div', {
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

      const soundName = this.generateOrInjectNewDOM(
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

      const audioContainer = this.generateOrInjectNewDOM(col, 'audio', {
        class: 'catblocks-object-sound-item',
        controls: 'controls'
      });
      this.generateOrInjectNewDOM(audioContainer, 'source', {
        src: src
      });
    }

    if (failed > 0) {
      const failedSoundsText = 'ERROR parsing ' + failed + ' Sounds';
      soundsContainer.appendChild(
        this.generateOrInjectNewDOM(
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
   * @param {Object} [options=defaultOptions.object]
   */
  generateLooks(container, objectID, object, options = defaultOptions.object) {
    const looksContainer = this.generateOrInjectNewDOM(container, 'div', {
      class: 'tab-pane fade p-3',
      id: `${objectID}-looks`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-looks-tab`
    });

    const noLooksText = 'No Looks found';
    if (!object || !object.lookList || object.lookList.length <= 0) {
      looksContainer.appendChild(
        this.generateOrInjectNewDOM(
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

    const group = this.generateOrInjectNewDOM(looksContainer, 'div', {
      class: 'list-group-flush'
    });

    let failed = 0;
    for (const look of object.lookList) {
      const row = this.generateOrInjectNewDOM(group, 'div', {
        class: 'list-group-item align-items-center'
      });
      const col = this.generateOrInjectNewDOM(row, 'div', {
        class: 'col-3'
      });
      const button = this.generateOrInjectNewDOM(row, 'span', {
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
      this.generateOrInjectNewDOM(
        col,
        'img',
        {
          'data-src': src,
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

      const lookName = this.generateOrInjectNewDOM(
        row,
        'div',
        {
          class: 'col-9'
        },
        look.name
      );

      const magnifyingGlassID = generateID(`${objectID}-button-${displayLookName}`);
      const magnifyingGlass = this.generateOrInjectNewDOM(button, 'button', {
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
      const failedLooksText = 'ERROR parsing ' + failed + ' Looks';
      looksContainer.appendChild(
        this.generateOrInjectNewDOM(
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
   * @param {number} scriptToDisplay
   */
  generateScripts(container, objectID, object, scriptToDisplay) {
    const wrapperContainer = this.generateOrInjectNewDOM(container, 'div', {
      class: 'tab-pane show active fade p-3',
      id: `${objectID}-scripts`,
      role: 'tabpanel',
      'aria-labelledby': `${objectID}-scripts-tab`
    });
    if (!object || !object.scriptList || object.scriptList.length <= 0) {
      const noScriptText = 'No Scripts found';
      wrapperContainer.appendChild(
        this.generateOrInjectNewDOM(
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
    let modifiableWorkspace;
    if (this.config.readOnly) {
      for (let i = 0; i < object.scriptList.length; i++) {
        const scriptContainer = this.generateOrInjectNewDOM(wrapperContainer, 'div', {
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
          if (i === scriptToDisplay) {
            this.scrollToElements['script'] = blockSvg;
          }
        }
      }
    } else {
      const scriptContainer = this.generateOrInjectNewDOM(wrapperContainer, 'div', {
        class: 'catblocks-script-modifiable'
      });
      modifiableWorkspace = this.createModifiableWorkspace(scriptContainer);
      Blockly.svgResize(modifiableWorkspace);

      for (let i = 0; i < object.scriptList.length; i++) {
        if (this.domToSvgModifiable(object.scriptList[i], modifiableWorkspace) === false) {
          ++failed;
        }
      }
      zebraChangeColor(modifiableWorkspace.topBlocks_);

      $(scriptContainer)
        .parents('.catblocks-script-container')
        .one('shown.bs.collapse', () => {
          Blockly.svgResize(modifiableWorkspace);
        });

      modifiableWorkspace.cleanUp();
      const topBricks = modifiableWorkspace.getTopBlocks();
      for (let i = 0; i < topBricks.length; ++i) {
        const brick = topBricks[i];
        const script = object.scriptList[i];

        brick.setMovable(true);

        if (script.posX !== undefined && script.posY !== undefined && (script.posX != 0 || script.posY != 0)) {
          const position = brick.getRelativeToSurfaceXY();
          brick.moveBy(Math.round(script.posX - position.x), Math.round(script.posY - position.y));
        }
      }

      modifiableWorkspace.addChangeListener(event => {
        if (event.type == Blockly.Events.UI && event.element == 'dragStop') {
          const droppedBrick = modifiableWorkspace.getBlockById(event.blockId);
          const isTopBrick = droppedBrick.hat !== undefined;
          const position = droppedBrick.getRelativeToSurfaceXY();

          if (isTopBrick) {
            Android.updateScriptPosition(event.blockId, position.x, position.y);
          } else {
            const bricksToMove = [];
            for (let i = 0; i < event.oldValue.length; ++i) {
              bricksToMove.push(event.oldValue[i].id);
            }

            if (droppedBrick.getParent() == undefined) {
              const newEmptyBrickId = Android.moveBricksToEmptyScriptBrick(bricksToMove);
              const newBrick = modifiableWorkspace.newBlock('EmptyScript', newEmptyBrickId);
              newBrick.initSvg();
              newBrick.moveBy(position.x, position.y);
              newBrick.nextConnection.connect(droppedBrick.previousConnection);
              newBrick.render();
              droppedBrick.setParent(newBrick);
              Android.updateScriptPosition(newEmptyBrickId, position.x, position.y);

              if (newBrick.pathObject && newBrick.pathObject.svgRoot) {
                Blockly.utils.dom.addClass(newBrick.pathObject.svgRoot, 'catblockls-blockly-invisible');
              }

              const idsToRemove = Android.removeEmptyScriptBricks();
              this.removeEmptyScriptBricksById(modifiableWorkspace, idsToRemove);
            } else {
              const firstBrickInStack = droppedBrick.getTopStackBlock();
              const isFirstBrickInStack = firstBrickInStack.id.toLowerCase() == droppedBrick.id.toLowerCase();

              let subStackIdx = -1;
              if (
                isFirstBrickInStack &&
                firstBrickInStack &&
                firstBrickInStack.getParent() &&
                firstBrickInStack.getParent().inputList &&
                firstBrickInStack.getParent().inputList.length > 0
              ) {
                const subStacks = firstBrickInStack.getParent().inputList.filter(x => x.type == 3);
                for (let i = 0; i < subStacks.length; ++i) {
                  if (subStacks[i].connection.targetConnection) {
                    if (subStacks[i].connection.targetConnection.sourceBlock_.id == firstBrickInStack.id) {
                      subStackIdx = i;
                      break;
                    }
                  }
                }
              }
              Android.moveBricks(droppedBrick.getParent().id, subStackIdx, bricksToMove);
              const idsToRemove = Android.removeEmptyScriptBricks();
              this.removeEmptyScriptBricksById(modifiableWorkspace, idsToRemove);
            }
          }
        } else if (event.type == Blockly.Events.DELETE) {
          Android.removeBricks(event.ids);
        }
      });
    }

    if (failed > 0) {
      const failedScriptText = 'ERROR parsing ' + failed + ' Scripts';
      wrapperContainer.appendChild(
        this.generateOrInjectNewDOM(
          wrapperContainer,
          'p',
          {
            class: 'catblocks-empty-text'
          },
          failedScriptText
        )
      );
    }
    return modifiableWorkspace;
  }

  removeEmptyScriptBricksById(workspace, strBrickIDs) {
    try {
      const brickIDs = JSON.parse(strBrickIDs);
      if (brickIDs) {
        for (let i = 0; i < brickIDs.length; ++i) {
          const brickToRemove = workspace.blockDB_[brickIDs[i]];
          if (brickToRemove) {
            workspace.removeBlockById(brickIDs[i]);
            brickToRemove.dispose(false);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Generate Tabcontainer for sounds
   * @param {Element} container
   * @param {string} objectID
   * @param {Object} object
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

    const tabs = this.generateOrInjectNewDOM(container, 'div', {
      class: 'catro-tabs'
    });
    const ul = this.generateOrInjectNewDOM(tabs, 'ul', {
      class: 'nav nav-tabs nav-fill',
      id: `${objectID}-tabs`,
      role: 'tablist'
    });

    if (this.config.renderScripts) {
      const liScript = this.generateOrInjectNewDOM(ul, 'li', {
        class: 'nav-item'
      });

      this.generateOrInjectNewDOM(
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
        `
        <div class="catblocks-tab-script">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32px" viewBox="0 0 32 32" version="1.1">
            <g id="surface1">
              <path style="fill:none;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:10;" d="M 27.322266 11.595703 C 27.322266 11.595703 20.138672 9.339844 14.958984 9.333984 C 10.564453 9.375 8.033203 10.904297 8.033203 10.904297 L 7.998047 22.740234 L 7.998047 37.125 L 12.228516 37.125 L 14.039062 40.001953 L 21.445312 40.001953 L 23.255859 37.125 L 40.001953 37.125 L 40.001953 11.595703 Z M 27.322266 11.595703 " transform="matrix(0.666667,0,0,0.666667,0,0)"/>
              <path style="fill:none;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:10;" d="M 7.998047 24.123047 L 12.228516 24.123047 L 14.039062 27 L 21.445312 27 L 23.255859 24.123047 L 40.001953 24.123047 " transform="matrix(0.666667,0,0,0.666667,0,0)"/>
            </g>
          </svg>(${object.scriptList.length})
        </div>`
      );
    }

    if (this.config.renderLooks) {
      const liLooks = this.generateOrInjectNewDOM(ul, 'li', {
        class: 'nav-item'
      });
      this.generateOrInjectNewDOM(
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
        `<i id="code-view-toggler" class="material-icons catblocks-tab-icon">visibility</i> (${object.lookList.length})`
      );
    }

    if (this.config.renderSounds) {
      const liSounds = this.generateOrInjectNewDOM(ul, 'li', {
        class: 'nav-item'
      });
      this.generateOrInjectNewDOM(
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
        `<i id="code-view-toggler" class="material-icons catblocks-tab-icon">volume_up</i> (${object.soundList.length})`
      );
    }
  }

  /**
   * Create program wrapper structure
   * @param {string} containerID unique ID of the container
   * @param {Element} container parent container where the structure is added
   * @returns {Element} wrapper where the scene container should be injected
   * @memberof Share
   */
  createProgramContainer(containerID, container) {
    const row = this.generateOrInjectNewDOM(container, 'div', {
      class: 'row',
      id: containerID
    });

    const col = this.generateOrInjectNewDOM(row, 'div', {
      class: 'col-12'
    });

    return [row, col];
  }

  /**
   * Injects or generates new dom depending on readOnly configuration
   * @param {Element} container dom where to injectAllScenes the new scene
   * @param {Object} tagName to injectAllScenes into container
   * @param {?Object<string, string>|?string} attributes attribute object or just class name
   * @param {?string} textContent to set for new dom element
   * @return {Element} new created subcontainer
   */
  generateOrInjectNewDOM(container, tagName, attributes, textContent) {
    if (this.config.readOnly) {
      return generateNewDOM(container, tagName, attributes, textContent);
    } else {
      return injectNewDom(container, tagName, attributes, textContent);
    }
  }

  getWorkspaceOfActiveObject() {
    const scene = $('.catblocks-object-container.show').attr('data-scene');
    const object = $('.catblocks-script-container.show').attr('data-object');

    if (!scene || !object) {
      return null;
    }

    const sceneWorkspaces = this.modifiableWorkspaces[scene];
    if (sceneWorkspaces) {
      return sceneWorkspaces[object];
    }
    return null;
  }

  reorderCurrentScripts() {
    const objectsWorkspace = this.getWorkspaceOfActiveObject();
    if (!objectsWorkspace) {
      return;
    }

    objectsWorkspace.cleanUp();

    const topBricks = objectsWorkspace.getTopBlocks();
    for (let i = 0; i < topBricks.length; ++i) {
      Android.updateScriptPosition(topBricks[i].id, 0, 0);
    }
  }

  addBricks(bricksToAdd) {
    const workspace = this.getWorkspaceOfActiveObject();
    if (!workspace) {
      return;
    }
    if (!bricksToAdd || bricksToAdd.length == 0) {
      return;
    }

    const metrics = workspace.getMetrics();

    const scriptBrick = workspace.newBlock(bricksToAdd[0].brickType, bricksToAdd[0].brickId);
    scriptBrick.initSvg();
    const topLeftPixelCoords = new Blockly.utils.Coordinate(metrics.viewLeft, metrics.viewTop);
    const topLeftWsCoords = topLeftPixelCoords.scale(1 / workspace.scale);
    scriptBrick.setMovable(true);
    scriptBrick.moveBy(topLeftWsCoords.x, topLeftWsCoords.y);
    const pixelWsSize = new Blockly.utils.Coordinate(metrics.viewWidth, metrics.viewHeight);
    const wsSize = pixelWsSize.scale(1 / workspace.scale);
    scriptBrick.moveBy(wsSize.x / 2, wsSize.y / 2);

    const scriptPos = scriptBrick.getRelativeToSurfaceXY();
    Android.updateScriptPosition(bricksToAdd[0].brickId, scriptPos.x, scriptPos.y);

    scriptBrick.render();

    let lastBrick = scriptBrick;

    for (let i = 1; i < bricksToAdd.length; ++i) {
      const newBrick = workspace.newBlock(bricksToAdd[i].brickType, bricksToAdd[i].brickId);
      newBrick.initSvg();
      lastBrick.nextConnection.connect(newBrick.previousConnection);
      newBrick.setParent(lastBrick);
      newBrick.render();
      lastBrick = newBrick;
    }

    if (bricksToAdd[0].brickType == 'EmptyScript') {
      if (scriptBrick.pathObject && scriptBrick.pathObject.svgRoot) {
        Blockly.utils.dom.addClass(scriptBrick.pathObject.svgRoot, 'catblockls-blockly-invisible');
      }
    }
  }
}
