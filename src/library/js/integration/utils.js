/**
 * Catblocks integrationt into Web utilities
 */

import md5 from 'js-md5';
import Blockly from 'blockly';
import $ from 'jquery';
import { CatblocksMsgs } from '../catblocks_msgs';
import pluralBricks from '../plural_bricks.json';
import { BrickIDGenerator } from './brick_id_generator';
import { getScriptToBrickMapping } from '../blocks/bricks';
import { getColourCodesForCategories } from '../blocks/colours';

/**
 * all list types in json object
 * @enum {object}
 */
export const brickListTypes = Object.freeze({
  noBrickList: 0,
  brickList: 1,
  elseBrickList: 2,
  loopOrIfBrickList: 3,
  userBrickList: 4,
  userBrickDefinition: 5
});

/**
 * Default options defined here
 * @enum {object}
 */
export const defaultOptions = {
  render: {
    container: 'body',
    renderSize: 0.75,
    shareRoot: '',
    media: 'media/',
    language: 'en',
    rtl: false,
    i18n: 'i18n/',
    noImageFound: 'No_Image_Available.jpg', // TODO: never used anywhere,
    renderScripts: true,
    renderLooks: true,
    renderSounds: true
  },
  scene: {
    writeHeader: true,
    expandable: true,
    renderNow: {
      scene: null
    }
  },
  object: {
    writeHeader: true,
    writeStats: true,
    writeLook: true,
    expandable: true,
    programRoot: 'assets/extracted/dc7fb2eb-1733-11ea-8f2b-000c292a0f49/',
    fileMap: undefined,
    renderNow: {
      object: null,
      script: null
    }
  }
};

/**
 * Parse options, if value exists in inputValues use this one
 * Otherwise go with the value from defaultValues
 * @param {Object} inputValues to use if exists
 * @param {Object} defaultValues to parse down
 * @return {Object} either input or default value
 */
export const parseOptions = (inputValues, defaultValues) => {
  return Object.assign({}, defaultValues, inputValues);
};

/**
 * Inject new dom into container with provided attributes and textContent is present
 * @param {Element} container dom where to injectAllScenes the new scene
 * @param {Object} tagName to injectAllScenes into container
 * @param {?Object<string, string>|?string} attributes attribute object or just class name
 * @param {?string} textContent to set for new dom element
 * @return {Element} new created subcontainer
 */
export const injectNewDom = (container, tagName, attributes, textContent) => {
  const subContainer = document.createElement(tagName);
  Object.keys(attributes).forEach(attrKey => {
    subContainer.setAttribute(attrKey, attributes[attrKey]);
  });
  if (typeof textContent !== 'undefined') {
    subContainer.innerHTML = textContent;
  }
  getDomElement(container).appendChild(subContainer);

  return subContainer;
};

export const generateNewDOM = (container, tagName, attrs, textContent) => {
  const newElement = document.createElement(tagName);
  for (const attrKey in attrs) {
    newElement.setAttribute(attrKey, attrs[attrKey]);
  }

  if (textContent) {
    newElement.innerHTML = textContent;
  }

  if (container) {
    container.appendChild(newElement);
  }

  return newElement;
};

/**
 * Wrap element into new element, type defined via wrapTag
 * Map all attributes to wrap element
 * @param {Element|string} element to wrap
 * @param {Object} wrapTag to wrap element into
 * @param {?Object} attributes map to wrapTag element
 * @return {Element} wrapped element and mapped attributes
 */
export const wrapElement = (element, wrapTag, attributes) => {
  const parent = document.createElement(wrapTag);
  if (attributes) {
    Object.keys(attributes).forEach(attrKey => {
      parent.setAttribute(attrKey, attributes[attrKey]);
    });
  }
  parent.appendChild(element.cloneNode(true));

  return parent;
};

/**
 * Remove all children from node
 * @param {Element} node
 */
export const removeAllChildren = node => {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

/**
 * Retrieve dom from document by id or class name
 * returns undefined in neither string or dom element
 * @param {string|Element} name
 * @param {Element?} ancestor to search from
 * @return {Element} dom element for name
 */
export const getDomElement = (name, ancestor) => {
  switch (typeof name) {
    case 'object': {
      return name;
    }
    case 'string': {
      if (typeof ancestor !== 'undefined') {
        return ancestor.querySelector(name);
      }
      return document.getElementById(name) || document.querySelector(name);
    }
    default: {
      return undefined;
    }
  }
};

/**
 * Check if dom has children
 * @param {Element} element to check if has children
 * @return {Boolean} if has children
 */
export const hasChildren = element => {
  switch (element.toString()) {
    case '[object HTMLDivElement]': {
      return element.children !== undefined && element.children.length > 0;
    }
    case '[object HTMLCollection]': {
      return element.length;
    }
    case '[object XMLDocument]': {
      return element.childElementCount;
    }
    default: {
      return element.children.length || element.hasChildNodes() || element.firstChild;
    }
  }
};

/**
 * Trim string is longer than length and add ...
 * @param {*} str to trim
 * @param {*} length if longer than
 * @return {string} prepared string
 */
export const trimString = (str, length = 15) => {
  if (typeof str === 'string') {
    if (str.length > length) {
      return `${str.slice(0, length)}...`;
    }
    return str;
  }
  return undefined;
};

/**
 * zebra effect -> color next block from same group slightly differently
 * @param {*} array
 */
export const zebraChangeColor = array => {
  checkNextBlock(array);
};

/**
 * zebra effect helper function
 * @param {*} array
 */
export const checkNextBlock = array => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].childBlocks_.length > 0) {
      for (let j = 0; j < array[i].childBlocks_.length; j++) {
        if (array[i].colour_ === array[i].childBlocks_[j].colour_) {
          const colorPrimaryTemporary = array[i].childBlocks_[j].style.colourPrimary;
          const colorTertiaryTemporary = array[i].childBlocks_[j].style.colourTertiary;

          array[i].childBlocks_[j].colour_ = array[i].childBlocks_[j].style.colourTertiary;
          array[i].childBlocks_[j].style.colourPrimary = array[i].childBlocks_[j].style.colourTertiary;
          array[i].childBlocks_[j].style.colourTertiary = colorPrimaryTemporary;

          array[i].childBlocks_[j].initSvg();

          array[i].childBlocks_[j].style.colourPrimary = colorPrimaryTemporary;
          array[i].childBlocks_[j].style.colourTertiary = colorTertiaryTemporary;
        }
      }
      checkNextBlock(array[i].childBlocks_);
    }
  }
};

/**
 * Generate HTML safe ID
 * @param {string} string unique name to identify this item
 * @returns {string} md5 encoded with catblocks- prefix
 */
export const generateID = string => {
  return 'catblocks-' + md5(string);
};

/**
 * Get URL escaped resource path
 * @param {string} string path to resource
 * @returns {string} encoded URI
 */
export const escapeURI = string => {
  return encodeURI(string).replace('#', '%23');
};

/**
 * render json object to workspace
 * @param {object} jsonObject current scriptList as object
 * @param {object} workspace where bricks are rendered
 * @return {number} sceneWidth width of current scene
 */
export const jsonDomToWorkspace = (jsonObject, workspace) => {
  const brickList = [];
  brickList.push(jsonObject);
  renderAndConnectBlocksInList(null, brickList, brickListTypes.noBrickList, workspace);
  workspace.render(false);
  let sceneWidth = 0;
  const allBricks = workspace.getAllBlocks();
  allBricks.forEach(brick => {
    const brickWidth = brick.getSvgRoot().getBBox().width;
    if (brickWidth > sceneWidth) {
      sceneWidth = brickWidth;
    }
  });
  if (workspace.RTL) {
    changeSceneToRtl(allBricks[0], workspace, sceneWidth);
  }
  return sceneWidth;
};

/**
 * Renders and connects all bricks in a brickList, elseBrickList and loopOrIfBrickList.
 * Function is calling itself if a *brickList is in a *brickList.
 * @param {Object} parentBrick parent brick to connect
 * @param {Object} brickList, elseBrickList or loopOrIfBrickList
 * @param {object} brickListType of list
 * @param {object} workspace where bricks are rendered
 */
export const renderAndConnectBlocksInList = (parentBrick, brickList, brickListType, workspace) => {
  for (let i = 0; i < brickList.length; i++) {
    const childBrick = renderBrick(parentBrick, brickList[i], brickListType, workspace);

    const brickIDGenerator = new BrickIDGenerator();
    if (childBrick.type === 'UserDefinedScript') {
      brickIDGenerator.createBrickIDForUserDefinedScript(childBrick, brickList[i].userBrickId);
    } else if (childBrick.type !== 'UserDefinedScript' && brickList[i].userBrickId) {
      brickIDGenerator.createBrickIDForUserDefinedScriptCall(childBrick, brickList[i].userBrickId);
    } else {
      brickIDGenerator.createBrickID(childBrick);
    }

    if (parentBrick === null && brickList[i].userBrickId !== undefined) {
      // When there is no parentBrick but the userBrickId is set
      // ChildBrick is a UserDefinedScript and we need to add the UserDefinedBrick definition
      const definitionBrickName = brickList[i].userBrickId + '_UDB_CATBLOCKS_DEF';
      const definitionBrick = Blockly.Bricks[definitionBrickName];
      const definitionBrickToRender = {
        name: definitionBrickName,
        loopOrIfBrickList: [],
        elseBrickList: [],
        formValues: definitionBrick.args0,
        colorVariation: 0
      };
      renderBrick(childBrick, definitionBrickToRender, brickListTypes.userBrickDefinition, workspace);
    }

    if (brickList[i].brickList !== undefined && brickList[i].brickList.length > 0) {
      if (brickList[i].userBrickId !== undefined) {
        // if there are bricks in the brickList and the userBrickId is set, it is a UserDefinedScript
        renderAndConnectBlocksInList(
          childBrick,
          brickList[i].brickList.reverse(),
          brickListTypes.userBrickList,
          workspace
        );
      } else {
        renderAndConnectBlocksInList(childBrick, brickList[i].brickList.reverse(), brickListTypes.brickList, workspace);
      }
    }
    if (brickList[i].elseBrickList !== undefined && brickList[i].elseBrickList.length > 0) {
      renderAndConnectBlocksInList(
        childBrick,
        brickList[i].elseBrickList.reverse(),
        brickListTypes.elseBrickList,
        workspace
      );
    }
    if (brickList[i].loopOrIfBrickList !== undefined && brickList[i].loopOrIfBrickList.length > 0) {
      renderAndConnectBlocksInList(
        childBrick,
        brickList[i].loopOrIfBrickList.reverse(),
        brickListTypes.loopOrIfBrickList,
        workspace
      );
    }
  }
};

/**
 * Render specific brick with its input values and connect with previous brick.
 * @param {object} parentBrick parent brick to connect
 * @param {object} jsonBrick brick as json object
 * @param {object} brickListType of list
 * @param {object} workspace where bricks are rendered
 * @return {object} childBrick
 */
export const renderBrick = (parentBrick, jsonBrick, brickListType, workspace) => {
  let childBrick;
  if (jsonBrick.id) {
    childBrick = workspace.newBlock(jsonBrick.name, jsonBrick.id);
  } else {
    childBrick = workspace.newBlock(jsonBrick.name);
  }
  if (jsonBrick.formValues !== undefined && jsonBrick.formValues.size !== undefined && jsonBrick.formValues.size > 0) {
    jsonBrick.formValues.forEach(function (value, key) {
      for (let i = 0; i < childBrick.inputList.length; i++) {
        for (let j = 0; j < childBrick.inputList[i].fieldRow.length; j++) {
          if (childBrick.inputList[i].fieldRow[j].name === key) {
            childBrick.inputList[i].fieldRow[j].setValue(value);
          }
        }
      }
    });

    if (childBrick.type in pluralBricks) {
      try {
        const currentBrick = pluralBricks[childBrick.type];
        const value = parseFloat(childBrick.inputList[0].fieldRow[currentBrick.number_field].value_);

        if (value !== 1) {
          if (currentBrick.string_value.length === 1) {
            childBrick.inputList[0].fieldRow[currentBrick.string_field].value_ =
              CatblocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[0]];
          } else {
            childBrick.inputList[0].fieldRow[currentBrick.string_field].value_ =
              CatblocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[0]] +
              ' ' +
              CatblocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[1]];
          }
          if (childBrick.type === 'ParameterizedBrick') {
            childBrick.inputList[0].fieldRow[0].value_ =
              CatblocksMsgs.getCurrentLocaleValues()[currentBrick.string_value_additional];
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (childBrick && childBrick.inputList && childBrick.inputList[0] && childBrick.inputList[0].fieldRow) {
    for (let i = 0; i < childBrick.inputList.length; i++) {
      for (let j = 0; j < childBrick.inputList[i].fieldRow.length; j++) {
        if (childBrick.inputList[i].fieldRow[j].name && childBrick.inputList[i].fieldRow[j].name.endsWith('_INFO')) {
          if (j > 0) {
            const val = childBrick.inputList[i].fieldRow[j - 1].getValue();
            if (val && val.length < childBrick.inputList[i].fieldRow[j - 1].maxDisplayLength) {
              childBrick.inputList[i].fieldRow[j].visible_ = false;
            } else {
              childBrick.inputList[0].fieldRow[j].setOnClickHandler(() => {
                showFormulaPopup(val);
              });
            }
          }
        }
      }
    }
  }

  childBrick.initSvg();

  if (childBrick.type === 'UserDefinedScript') {
    childBrick.setDeletable(false);
  }

  if (childBrick.pathObject && childBrick.pathObject.svgRoot) {
    if (jsonBrick.name == 'EmptyScript') {
      Blockly.utils.dom.addClass(childBrick.pathObject.svgRoot, 'catblockls-blockly-invisible');
    } else if (jsonBrick.commentedOut) {
      Blockly.utils.dom.addClass(childBrick.pathObject.svgRoot, 'catblocks-blockly-disabled');
    }
  }

  if (brickListType === brickListTypes.brickList || brickListType === brickListTypes.userBrickList) {
    parentBrick.nextConnection.connect(childBrick.previousConnection);
  } else if (brickListType === brickListTypes.elseBrickList) {
    parentBrick.inputList[3].connection.connect(childBrick.previousConnection);
  } else if (
    brickListType === brickListTypes.loopOrIfBrickList ||
    brickListType == brickListTypes.userBrickDefinition
  ) {
    if (brickListType == brickListTypes.userBrickDefinition) {
      childBrick.setMovable(false);
      childBrick.setDeletable(false);
    }
    parentBrick.inputList[1].connection.connect(childBrick.previousConnection);
  }
  return childBrick;
};

/**
 * Change scene to RTL layout by changing x coordinates of first brick in scene
 * @param {object} brick to change to RTL
 * @param {object} workspace where bricks are rendered
 * @param {number} sceneWidth width of largest brick in current scene
 * @return {object} brick
 */
export const changeSceneToRtl = (brick, workspace, sceneWidth) => {
  brick.svgGroup_.querySelectorAll('.blocklyText').forEach(brickSvg => {
    const previousWidth = parseFloat(brickSvg.getAttribute('x')) * workspace.scale;
    const currentWidth = brickSvg.getBoundingClientRect()['width'] / workspace.scale;
    const sumWidth = currentWidth + previousWidth;
    brickSvg.setAttribute('x', sumWidth.toString());
  });
  const x = sceneWidth;
  let y = 0;
  if (brick.nextConnection !== null) {
    y = brick.nextConnection.y - brick.nextConnection.offsetInBlock_.y;
  }
  brick.moveBy(x, y);
  return brick;
};

/**
 * Handler for loading images when Object is opened
 * @param {*} event
 */
export const lazyLoadImage = event => {
  const $objectHeader = $(event.target);
  $objectHeader.off('click', lazyLoadImage);

  const $contentContainer = $objectHeader.next();
  $contentContainer.find('img').each(function () {
    $(this).attr('src', $(this).data('src'));
  });
};

export const buildUserDefinedBrick = object => {
  const createdBricks = [];

  if (!object.userBricks) {
    return createdBricks;
  }

  for (let i = 0; i < object.userBricks.length; ++i) {
    const jsonDef = object.userBricks[i].getJsonDefinition();
    const brickName = object.userBricks[i].id;
    Blockly.Bricks[brickName] = jsonDef;
    Blockly.Blocks[brickName] = {
      init: function () {
        this.jsonInit(Blockly.Bricks[brickName]);
        this.setNextStatement(true, 'CatBlocksBrick');
        this.setPreviousStatement(true, 'CatBlocksBrick');
      }
    };
    createdBricks.push(brickName);

    const definitionJsonDef = object.userBricks[i].getDefinitionJsonDefinition();
    const definitionBrickName = object.userBricks[i].id + '_UDB_CATBLOCKS_DEF';
    Blockly.Bricks[definitionBrickName] = definitionJsonDef;
    Blockly.Blocks[definitionBrickName] = {
      init: function () {
        this.jsonInit(Blockly.Bricks[definitionBrickName]);
        this.setPreviousStatement(true, 'UserDefinedReadOnly');
        this.setNextStatement(false, null);
      }
    };
    createdBricks.push(definitionBrickName);
  }

  return createdBricks;
};

export const generateFormulaModal = () => {
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
};

export const generateModalMagnifyingGlass = () => {
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
};

export const createLoadingAnimation = () => {
  const loadingAnimation = `
  <div class="modal fade" tabindex="-1" role="dialog" id="spinnerModal">
      <div class="modal-dialog modal-dialog-centered justify-content-center" role="document">
          <span class="spinner-border" data-dismiss='modal'></span>
      </div>
  </div>`;
  $('body').append(loadingAnimation);
};

export const showFormulaPopup = formula => {
  if (formula.length >= Blockly.Tooltip.LIMIT) {
    $('#formulaPopupClose').text(CatblocksMsgs.getCurrentLocaleValues()['CLOSE']);
    const html_formula = formula.replaceAll('\n', '<br />');
    $('#formulaPopupContent').html(html_formula);
    $('#formulaPopup').modal('show');
  }
};

export const getMappedBrickNameIfExists = brickName => {
  const scriptToBrickMapping = getScriptToBrickMapping();

  if (scriptToBrickMapping.has(brickName)) {
    return scriptToBrickMapping.get(brickName);
  }

  return brickName;
};

export const getColorForBrickCategory = categoryName => {
  const categoryColors = getColourCodesForCategories();

  const locales = CatblocksMsgs.getCurrentLocaleValues();

  const categoryNameToColor = new Map()
    .set(locales['CATEGORY_RECENTLY_USED'], '#aaaaaa')
    .set(locales['CATEGORY_EMBROIDERY'], categoryColors.embroidery.colourPrimary)
    .set(locales['CATEGORY_DUMMY'], categoryColors.dummy.colourPrimary)
    .set(locales['CATEGORY_MOTION'], categoryColors.motion.colourPrimary)
    .set(locales['CATEGORY_LOOK'], categoryColors.look.colourPrimary)
    .set(locales['CATEGORY_PEN'], categoryColors.pen.colourPrimary)
    .set(locales['CATEGORY_SOUND'], categoryColors.sound.colourPrimary)
    .set(locales['CATEGORY_EVENT'], categoryColors.event.colourPrimary)
    .set(locales['CATEGORY_CONTROL'], categoryColors.control.colourPrimary)
    .set(locales['CATEGORY_USERLIST'], categoryColors.userlist.colourPrimary)
    .set(locales['CATEGORY_USERVARIABLES'], categoryColors.uservariables.colourPrimary)
    .set(locales['CATEGORY_DEVICE'], categoryColors.device.colourPrimary)
    .set(locales['CATEGORY_USER'], '#000000')
    .set(locales['CATEGORY_LEGO_NXT'], categoryColors.lego.colourPrimary)
    .set(locales['CATEGORY_LEGO_EV3'], categoryColors.lego.colourPrimary)
    .set(locales['CATEGORY_DRONE'], '#aea626')
    .set(locales['CATEGORY_JUMPINGSUMO'], '#aea626')
    .set(locales['CATEGORY_PHIRO'], categoryColors.phiro.colourPrimary)
    .set(locales['CATEGORY_ARDUINO'], categoryColors.phiro.colourPrimary)
    .set(locales['CATEGORY_CAST'], categoryColors.phiro.colourPrimary)
    .set(locales['CATEGORY_RASPI'], categoryColors.phiro.colourPrimary)
    .set(locales['CATEGORY_TEST'], categoryColors.test.colourPrimary)
    .set(locales['CATEGORY_USER'], categoryColors.user.colourPrimary)
    .set(locales['CATEGORY_REPORT'], categoryColors.report.colourPrimary)
    .set(locales['CATEGORY_SCRIPT'], categoryColors.script.colourPrimary)
    .set(locales['CATEGORY_DATA'], categoryColors.userlist.colourPrimary);

  if (categoryNameToColor.has(categoryName)) {
    return categoryNameToColor.get(categoryName);
  }

  return '#aaaaaa';
};
