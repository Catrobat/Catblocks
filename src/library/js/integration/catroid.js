import '../../scss/catroid.scss';

import { getBrickScriptMapping } from '../blocks/bricks';

import Blockly from 'blockly';
import { Parser } from '../../../common/js/parser/parser';
import {
  defaultOptions,
  generateFormulaModal,
  jsonDomToWorkspace,
  RenderSource_Catroid,
  parseOptions,
  createLoadingAnimation,
  buildUserDefinedBrick,
  injectNewDom,
  getMappedBrickNameIfExists,
  getColorForBrickCategory,
  advancedModeAddSemicolonsAndClassifyTopBricks,
  advancedModeAddParentheses,
  advancedModeAddCurlyBrackets,
  getFieldByCatroidFieldID,
  advancedModeRemoveWhiteSpacesInFormulas
} from './utils';
import { CatBlocksMsgs } from '../../ts/i18n/CatBlocksMsgs';
import advancedTheme from '../advanced_theme.json';
import { jQueryFunctions } from '../../../common/ts/jQueryFunctions';

export class Catroid {
  constructor() {
    this.config = {};
    this.workspace = undefined;
    this.all_blocks = new Map();
    this.scene = null;
    this.object = null;
    this.brickIDToFocus = null;
  }

  async init(options) {
    this.config = parseOptions(options, defaultOptions.render);
    this.createReadonlyWorkspace();
    this.createModifiableWorkspace();
    generateFormulaModal();
    createLoadingAnimation();

    if (this.config.advancedMode) {
      this.setAdvancedTheme();
    }

    if (window.CatBlocks) {
      this.insertRightMediaURI();
    }
    if (this.config.rtl) {
      document.documentElement.style.direction = 'rtl';
    }
    await CatBlocksMsgs.setLocale(this.config.language);

    const workspaceItem = {
      displayText: CatBlocksMsgs.getCurrentLocaleValues()['SWITCH_TO_1D'],
      preconditionFn: function (scope) {
        const block = scope.block;
        if (block && block.type && block.type.endsWith('_UDB_CATBLOCKS_DEF')) {
          return 'hidden';
        }
        return 'enabled';
      },
      callback: function (scope) {
        if (scope && scope.block && scope.block.id) {
          try {
            Android.switchTo1D(scope.block.id);
          } finally {
            // ignore
          }
        }
      },
      scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
      id: 'catblocks-switch-to-1d',
      weight: -5
    };
    Blockly.ContextMenuRegistry.registry.register(workspaceItem);

    // disable collapse option in context menu
    Blockly.ContextMenuRegistry.registry.unregister('collapseWorkspace');
    Blockly.ContextMenuRegistry.registry.unregister('blockCollapseExpand');

    Blockly.ContextMenuRegistry.registry.getItem('blockDuplicate').callback = scope => {
      const newId = Android.duplicateBrick(scope.block.id);
      const codeXML = Android.getCurrentProject();

      const objectJSON = Parser.convertObjectToJSON(codeXML, this.scene, this.object);

      const clone = objectJSON.scriptList.filter(x => x.id.toLowerCase() == newId.toLowerCase());
      if (clone && clone.length) {
        const workspace = this.workspace;
        this.domToSvgModifiable(clone[0], workspace);
        const oldPosition = scope.block.getRelativeToSurfaceXY();
        const newBrick = workspace.getBlockById(newId);
        if (newBrick) {
          const newX = oldPosition.x + scope.block.width;
          const newY = oldPosition.y;
          newBrick.moveBy(newX, newY);
          Android.updateScriptPosition(newId, newX, newY);
        }
      } else {
        // TODO: show error
      }
    };

    Blockly.ContextMenuRegistry.registry.getItem('blockDuplicate').preconditionFn = function (scope) {
      const block = scope.block;

      if ((block.type && block.type.endsWith('_UDB_CATBLOCKS_DEF')) || block.type === 'UserDefinedScript') {
        return 'hidden';
      }

      if (!block.isInFlyout && block.isDeletable() && block.isMovable()) {
        if (block.isDuplicatable()) {
          return 'enabled';
        }
        return 'disabled';
      }
      return 'hidden';
    };

    Blockly.ContextMenuRegistry.registry.getItem('blockHelp').callback = function (scope) {
      Android.helpBrick(scope.block.id);
    };

    Blockly.ContextMenuRegistry.registry.getItem('blockHelp').displayText = function () {
      return CatBlocksMsgs.getCurrentLocaleValues()['HELP'];
    };

    Blockly.ContextMenuRegistry.registry.getItem('blockHelp').preconditionFn = function (scope) {
      const block = scope.block;

      if ((block.type && block.type.endsWith('_UDB_CATBLOCKS_DEF')) || block.type === 'UserDefinedScript') {
        return 'hidden';
      }
      return 'enabled';
    };

    jQueryFunctions.addBodyClickListener('.catblocks-block-category-list-item', (event, eventRoot) => {
      const selectedCategory = eventRoot.getAttribute('categoryName');
      this.listBricksOfSelectedCategory(selectedCategory);
    });

    jQueryFunctions.addBodyClickListener('#catroid-catblocks-add-brick-dialog-close-container', () => {
      document.getElementById('catroid-catblocks-brick-category-container').innerHTML = '';
      document.getElementById('catroid-catblocks-bricks-container').innerHTML = '';
      document.getElementById('catroid-catblocks-add-brick-dialog-header-text').innerHTML = '';
      document.getElementById('catroid-catblocks-add-brick-dialog').style.display = 'none';
    });

    jQueryFunctions.addBodyClickListener('.catblocks-brick', (event, eventRoot) => {
      const addBrickElement = eventRoot;

      const category = addBrickElement.getAttribute('catroid-category');
      const brickType = getMappedBrickNameIfExists(addBrickElement.getAttribute('catroid-brickType'));

      if (category && brickType) {
        const addedBricks = Android.addBrickByName(category, brickType);
        if (addedBricks) {
          this.addBricks(JSON.parse(addedBricks));

          document.getElementById('catroid-catblocks-add-brick-dialog').style.display = 'none';
          document.getElementById('catroid-catblocks-bricks-container').style.display = 'none';
        }
      } else {
        console.log('invlid element for adding brick');
      }
    });

    jQueryFunctions.addBodyClickListener('#catroid-catblocks-add-brick-back-container', () => {
      const categories = JSON.parse(Android.getBrickCategoryInfos());
      this.showBrickCategories(categories);
    });
  }

  /**
   * Create new read only workspace and inject it into container Element
   */
  createReadonlyWorkspace() {
    // const hiddenContainer = injectNewDom('catroid-catblocks-hidden-container', 'DIV', {
    //   id: 'readonly-workspace'
    // });

    let mediapath = `${this.config.shareRoot}${this.config.media}`;
    // full link or absolute path given
    if (this.config.media.startsWith('http') || this.config.media.startsWith('/')) {
      mediapath = this.config.media;
    }
    //this.readonlyWorkspace = , {
    this.readonlyWorkspace = Blockly.inject('catroid-catblocks-hidden-container', {
      readOnly: true,
      media: mediapath,
      collapse: false,
      renderer: 'zelos',
      rtl: this.config.rtl,
      zoom: {
        startScale: this.config.renderSize
      }
    });
  }

  createModifiableWorkspace() {
    let mediapath = `${this.config.shareRoot}${this.config.media}`;
    // full link or absolute path given
    if (this.config.media.startsWith('http') || this.config.media.startsWith('/')) {
      mediapath = this.config.media;
    }
    this.workspace = Blockly.inject(this.config.container, {
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
    Blockly.svgResize(this.workspace);

    const blocklyWorkspaceContainer = document.getElementById(this.config.container);
    if (blocklyWorkspaceContainer) {
      const horizontalScrollbar = document.getElementsByClassName('blocklyScrollbarHorizontal')[0];
      const verticalScrollbar = document.getElementsByClassName('blocklyScrollbarVertical')[0];

      verticalScrollbar.setAttribute('id', 'catblocks-vertical-scrollbar');
      horizontalScrollbar.setAttribute('id', 'catblocks-horizontal-scrollbar');
    }
  }

  alignLTRBricks(object) {
    if (this.workspace.RTL) {
      return;
    }

    const topBricks = this.workspace.getTopBlocks();
    for (let i = 0; i < object.scriptList.length; ++i) {
      const script = object.scriptList[i];
      const brick = topBricks.find(x => x.id == script.id);
      if (!brick) {
        continue;
      }

      brick.setMovable(true);

      if (script.posX !== undefined && script.posY !== undefined && (script.posX != 0 || script.posY != 0)) {
        const position = brick.getRelativeToSurfaceXY();
        brick.moveBy(Math.round(script.posX - position.x), Math.round(script.posY - position.y));
      }
    }
  }

  handleWorkspaceChange(event) {
    if (event.type == Blockly.Events.BLOCK_DRAG && !event.isStart) {
      const droppedBrick = this.workspace.getBlockById(event.blockId);
      const isTopBrick = !!droppedBrick.hat;
      const position = droppedBrick.getRelativeToSurfaceXY();

      if (isTopBrick) {
        Android.updateScriptPosition(event.blockId, position.x, position.y);
      } else {
        const bricksToMove = [];
        for (let i = 0; i < event.blocks.length; ++i) {
          bricksToMove.push(event.blocks[i].id);
        }

        if (droppedBrick.getParent() == undefined) {
          const newEmptyBrickId = Android.moveBricksToEmptyScriptBrick(bricksToMove);
          const newEmptyBrick = this.workspace.newBlock('EmptyScript', newEmptyBrickId);
          newEmptyBrick.initSvg();
          newEmptyBrick.render();

          const newEmptyBrickSize = newEmptyBrick.getHeightWidth();
          const connectionOffset = 8;
          const newEmptyBrickPositionX = position.x;
          const newEmptyBrickPositionY = position.y - newEmptyBrickSize.height + connectionOffset;
          newEmptyBrick.moveBy(newEmptyBrickPositionX, newEmptyBrickPositionY);

          newEmptyBrick.setNextStatement(true);
          newEmptyBrick.nextConnection.connect(droppedBrick.previousConnection);
          droppedBrick.setParent(newEmptyBrick);

          Android.updateScriptPosition(newEmptyBrickId, newEmptyBrickPositionX, newEmptyBrickPositionY);

          if (newEmptyBrick.pathObject && newEmptyBrick.pathObject.svgRoot) {
            Blockly.utils.dom.addClass(newEmptyBrick.pathObject.svgRoot, 'catblockls-blockly-invisible');
          }
          this.removeEmptyScriptBricks();
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
                  subStackIdx = i - 1;
                  break;
                }
              }
            }
          }
          Android.moveBricks(droppedBrick.getParent().id, subStackIdx, bricksToMove);
          this.removeEmptyScriptBricks();
        }
      }
    } else if (event.type == Blockly.Events.DELETE) {
      Android.removeBricks(event.ids);
    }
  }

  renderObjectScripts(object) {
    if (!this.workspace) {
      throw Error('Workspace not initialized. Did you call init?');
    }

    const createdBricks = buildUserDefinedBrick(object, this.config.advancedMode);
    if (createdBricks) {
      createdBricks.forEach(brickName => {
        this.fixBrickMediaURI(brickName);
      });
    }

    let failed = 0;
    for (let i = 0; i < object.scriptList.length; i++) {
      if (this.domToSvgModifiable(object.scriptList[i]) === false) {
        ++failed;
        // console.log('failed to render script ' + i);
      }
    }

    if (failed > 0) {
      // TODO: Android.showMessage('Some scripts could not be rendered.');
    }

    this.workspace.cleanUp();
    this.alignLTRBricks(object);

    this.scrollToFocusBrick();

    this.workspace.addChangeListener(this.handleWorkspaceChange.bind(this));
  }

  scrollToFocusBrick() {
    const isRTL = this.workspace.RTL;
    let xScrollCorrection = this.workspace.scrollX;
    if (isRTL) {
      xScrollCorrection = xScrollCorrection * 2 - 5;
    } else {
      xScrollCorrection += 5;
    }
    let isScrolled = false;

    if (this.brickIDToFocus) {
      const focusBrick = this.workspace.getBlockById(this.brickIDToFocus);
      if (focusBrick) {
        const workspacePosition = focusBrick.getRelativeToSurfaceXY();
        const pixelPosition = workspacePosition.scale(this.workspace.scale);
        let improvedPositionX = -1 * (pixelPosition.x - 5);

        if (isRTL) {
          improvedPositionX += xScrollCorrection - 5;
        }

        const improvedPositionY = -1 * (pixelPosition.y - 5);
        this.workspace.scroll(improvedPositionX, improvedPositionY);
        isScrolled = true;
      }
    }
    if (!isScrolled) {
      this.workspace.scroll(xScrollCorrection, 0);
    }
  }

  domToSvgModifiable(blockJSON) {
    try {
      jsonDomToWorkspace(blockJSON, this.workspace, RenderSource_Catroid);
      // store all block inputs in a map for later use
      this.workspace.getAllBlocks().forEach(block => {
        if (!(block.id in this.all_blocks)) {
          const input_list = [];
          try {
            block.inputList[0].fieldRow.forEach(input => {
              input_list.push(input.value_);
            });
          } catch {
            console.log('Cannot load input of block!');
          }
          this.all_blocks[block.id] = input_list;
        }
      });
      return true;
    } catch (e) {
      console.error('Failed to generate SVG from workspace, properly due to unknown bricks', e);
    }
    return false;
  }

  removeEmptyScriptBricks() {
    try {
      const strBrickIDs = Android.removeEmptyScriptBricks();
      const brickIDs = JSON.parse(strBrickIDs);
      if (brickIDs) {
        for (let i = 0; i < brickIDs.length; ++i) {
          const brickToRemove = this.workspace.getBlockById(brickIDs[i])[brickIDs[i]];
          if (brickToRemove) {
            this.workspace.removeBlockById(brickIDs[i]);
            brickToRemove.dispose(false);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  reorderCurrentScripts() {
    if (!this.workspace) {
      return;
    }

    this.workspace.cleanUp();

    const topBricks = this.workspace.getTopBlocks();
    for (let i = 0; i < topBricks.length; ++i) {
      Android.updateScriptPosition(topBricks[i].id, 0, 0);
    }
  }

  addBricks(bricksToAdd) {
    if (!this.workspace) {
      return;
    }
    if (!bricksToAdd || bricksToAdd.length == 0) {
      return;
    }

    const newScriptId = bricksToAdd[0].brickId.toLowerCase();

    const codeXML = Android.getCurrentProject();
    const objectJSON = Parser.convertObjectToJSON(codeXML, this.scene, this.object);
    const newScript = objectJSON.scriptList.filter(x => x.id.toLowerCase() == newScriptId);

    if (newScript && newScript.length) {
      this.domToSvgModifiable(newScript[0], this.workspace);

      const renderedBrick = this.workspace.getBlockById(newScriptId);
      if (renderedBrick) {
        const metrics = this.workspace.getMetrics();
        const topLeftPixelCoords = new Blockly.utils.Coordinate(metrics.viewLeft, metrics.viewTop);
        const topLeftWsCoords = topLeftPixelCoords.scale(1 / this.workspace.scale);
        renderedBrick.setMovable(true);
        renderedBrick.moveBy(topLeftWsCoords.x, topLeftWsCoords.y);
        const pixelWsSize = new Blockly.utils.Coordinate(metrics.viewWidth, metrics.viewHeight);
        const wsSize = pixelWsSize.scale(1 / this.workspace.scale);
        renderedBrick.moveBy(wsSize.x / 2, wsSize.y / 2);

        const scriptPos = renderedBrick.getRelativeToSurfaceXY();
        Android.updateScriptPosition(bricksToAdd[0].brickId, scriptPos.x, scriptPos.y);
      }
    }
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

  getBrickAtTopOfScreen() {
    const allBricks = this.workspace.getAllBlocks(true);
    const metrics = this.workspace.getMetrics();

    const topLeftPixelCoords = new Blockly.utils.Coordinate(metrics.viewLeft, metrics.viewTop);
    const topLeftWsCoords = topLeftPixelCoords.scale(1 / this.workspace.scale);

    for (const brickIdx in allBricks) {
      const brickPos = allBricks[brickIdx].getRelativeToSurfaceXY();
      if (brickPos.y >= topLeftWsCoords.y) {
        if (allBricks[brickIdx].type.endsWith('_UDB_CATBLOCKS_DEF')) {
          continue;
        }
        // top brick
        return allBricks[brickIdx].id;
      }
    }
    return '';
  }

  showBrickCategories(categoryInfos) {
    document.getElementById('catroid-catblocks-bricks-container').innerHTML = '';
    document.getElementById('catroid-catblocks-bricks-container').style.display = 'none';

    document.getElementById('catroid-catblocks-brick-category-container').innerHTML = '';

    for (const idx in categoryInfos) {
      const categoryColor = getColorForBrickCategory(categoryInfos[idx].name);

      const categoryNameForID = categoryInfos[idx].name.replace(/\s/, '').toUpperCase();

      const categoryStyle = this.config.advancedMode
        ? 'background-color:#3c3c3c;color:#b3b3b3;'
        : `background-color:${categoryColor};color:#fff;`;

      injectNewDom(
        'catroid-catblocks-brick-category-container',
        'button',
        {
          class: 'list-group-item list-group-item-action catblocks-block-category-list-item',
          type: 'button',
          style: categoryStyle,
          categoryName: categoryInfos[idx].name,
          id: `category${categoryNameForID}`
        },
        categoryInfos[idx].name
      );
    }

    document.getElementById('catroid-catblocks-add-brick-dialog-header-text').innerText =
      CatBlocksMsgs.getCurrentLocaleValues()['BRICK_CATEGORIES'];

    document.getElementById('catroid-catblocks-add-brick-dialog-content').scrollTop = 0;

    document.getElementById('catroid-catblocks-add-brick-dialog').style.display = 'block';
    document.getElementById('catroid-catblocks-brick-category-container').style.display = 'block';

    document.getElementById('catroid-catblocks-add-brick-back-container').style.display = 'none';
  }

  listBricksOfSelectedCategory(categoryName) {
    const strBricks = Android.getBricksForCategory(categoryName);
    const bricks = JSON.parse(strBricks);

    document.getElementById('catroid-catblocks-add-brick-back-container').style.display = 'block';

    document.getElementById('catroid-catblocks-brick-category-container').innerHTML = '';
    document.getElementById('catroid-catblocks-brick-category-container').style.display = 'none';

    this.readonlyWorkspace.clear();

    const brickScriptMapping = getBrickScriptMapping();

    for (const brickInfo of bricks) {
      try {
        let brickType = brickInfo.brickType;

        if (brickScriptMapping.has(brickInfo.brickType)) {
          brickType = brickScriptMapping.get(brickInfo.brickType);
        }

        const brick = this.readonlyWorkspace.newBlock(brickType, brickInfo.brickId);
        if (this.config.advancedMode) {
          advancedModeAddParentheses(brick, true);
          advancedModeAddCurlyBrackets(brick);
          advancedModeAddSemicolonsAndClassifyTopBricks(brick);
        }
        brick.initSvg();
      } catch (error) {
        console.log(error);
      }
    }

    this.readonlyWorkspace.render();

    const allBlocksOfCategory = this.readonlyWorkspace.getAllBlocks(false);
    allBlocksOfCategory.sort((a, b) => {
      return a.type > b.type;
    });

    document.getElementById('catroid-catblocks-bricks-container').innerHTML = '';

    const brickContainer = document.getElementById('catroid-catblocks-bricks-container');

    for (const svgBlock of allBlocksOfCategory) {
      const blockHeight = svgBlock.height * this.readonlyWorkspace.scale;
      const blockWidth = svgBlock.width * this.readonlyWorkspace.scale;

      const clonedBrick = svgBlock.svgGroup_.cloneNode(true);
      clonedBrick.setAttribute('transform', `scale(${this.readonlyWorkspace.scale})`);
      const svgContainer = document.createElement('div');
      svgContainer.setAttribute('class', 'catblocks-svg-brick-container zelos-renderer classic-theme');
      svgContainer.setAttribute('style', `height:${blockHeight}px;`);

      svgContainer.setAttribute('class', 'catblocks-brick');
      svgContainer.setAttribute('catroid-category', categoryName);
      svgContainer.setAttribute('catroid-brickType', svgBlock.type);
      svgContainer.setAttribute('id', `brick${svgBlock.type}`);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('style', `width:${blockWidth + 10}px;height:${blockHeight}px;`);

      svgElement.appendChild(clonedBrick);
      svgContainer.appendChild(svgElement);
      brickContainer.appendChild(svgContainer);
    }

    document.getElementById('catroid-catblocks-add-brick-dialog-header-text').innerText = categoryName;

    document.getElementById('catroid-catblocks-add-brick-dialog').style.display = 'block';
    document.getElementById('catroid-catblocks-bricks-container').style.display = 'block';

    document.getElementById('catroid-catblocks-add-brick-dialog-content').scrollTop = 0;
  }

  setAdvancedTheme() {
    const advTheme = Blockly.Theme.defineTheme('advanced', advancedTheme);
    this.workspace.setTheme(advTheme);
    this.readonlyWorkspace.setTheme(advTheme);
    this.workspace.getRenderer().constants_.DUMMY_INPUT_MIN_HEIGHT = 0; // Allows to change size of blocks
    this.workspace.getRenderer().constants_.MEDIUM_PADDING = 5; // Padding of block left & right
    this.workspace.getRenderer().constants_.FIELD_BORDER_RECT_HEIGHT = 14; // Determines height of block with input field
    this.workspace.getRenderer().constants_.FIELD_TEXT_HEIGHT = 14; // Determines height of a block without input field
    this.workspace.getRenderer().constants_.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 14; // Height of bottom part of e.g. 'if' block
    this.workspace.getRenderer().constants_.FIELD_BORDER_RECT_X_PADDING = 0;
    this.workspace.getRenderer().constants_.BETWEEN_STATEMENT_PADDING_Y = 0;
    this.readonlyWorkspace.getRenderer().constants_.BETWEEN_STATEMENT_PADDING_Y = 0;
    this.readonlyWorkspace.getRenderer().constants_.DUMMY_INPUT_MIN_HEIGHT = 0;
    this.readonlyWorkspace.getRenderer().constants_.MEDIUM_PADDING = 5;
    this.readonlyWorkspace.getRenderer().constants_.FIELD_BORDER_RECT_HEIGHT = 30;
    this.readonlyWorkspace.getRenderer().constants_.FIELD_TEXT_HEIGHT = 30;
    this.readonlyWorkspace.getRenderer().constants_.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 30;
    this.readonlyWorkspace.getRenderer().constants_.FIELD_BORDER_RECT_X_PADDING = 0;

    const catBlocksAddBrickDialog = document.getElementById('catroid-catblocks-add-brick-dialog');
    if (catBlocksAddBrickDialog) {
      catBlocksAddBrickDialog.classList.add('advanced-theme');
    }
    const brickContainer = document.getElementById('catroid-catblocks-bricks-container');
    if (brickContainer) {
      brickContainer.setAttribute('class', 'advanced-theme zelos-renderer');
    }
  }

  updateBrickFields(brickFields) {
    const updatedBrick = this.workspace.getBlockById(brickFields.brickId);
    if (updatedBrick) {
      for (const field of brickFields.fields) {
        const updatedField = getFieldByCatroidFieldID(updatedBrick, field.fieldId);
        if (updatedField) {
          updatedField.setValue(field.value);
          if (this.workspace.getTheme().name.toLowerCase() === 'advanced') {
            advancedModeRemoveWhiteSpacesInFormulas(updatedField);
          }
        }
      }
    }
  }

  scrollToInputField(domFieldID) {
    const targetField = document.getElementById(domFieldID);
    if (targetField) {
      const boundingRect = targetField.getBoundingClientRect();
      this.workspace.scroll(this.workspace.scrollX - boundingRect.x, this.workspace.scrollY - boundingRect.y);
    }
  }
}
