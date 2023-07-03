/**
 * Catblocks integrationt into Web utilities
 */

import md5 from 'js-md5';
import Blockly from 'blockly';
import { CatBlocksMsgs } from '../../ts/i18n/CatBlocksMsgs';
import pluralBricks from '../plural_bricks.json';
import { BrickIDGenerator } from '../../ts/BrickIDGenerator';
import { Modal } from 'bootstrap';
import { getScriptToBrickMapping, scriptBricks } from '../blocks/bricks';
import { getColourCodesForCategories } from '../blocks/colours';
import { CatblocksSpinner } from '../blocks/custom_fields/CatblocksSpinner';
import { CatblocksTextField } from '../blocks/custom_fields/CatblocksTextField';

export const RenderSource_Share = 0;
export const RenderSource_Catroid = 1;

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
    const childList = array[i].getChildren();
    if (childList.length > 0) {
      for (let j = 0; j < childList.length; j++) {
        if (array[i].colour_ === childList[j].colour_) {
          const colorPrimaryTemporary = childList[j].style.colourPrimary;
          const colorTertiaryTemporary = childList[j].style.colourTertiary;

          childList[j].colour_ = childList[j].style.colourTertiary;
          childList[j].style.colourPrimary = childList[j].style.colourTertiary;
          childList[j].style.colourTertiary = colorPrimaryTemporary;

          childList[j].initSvg();

          childList[j].style.colourPrimary = colorPrimaryTemporary;
          childList[j].style.colourTertiary = colorTertiaryTemporary;
        }
      }
      checkNextBlock(childList);
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
export const jsonDomToWorkspace = (jsonObject, workspace, renderSource) => {
  const brickList = [];
  brickList.push(jsonObject);
  renderAndConnectBlocksInList(null, brickList, brickListTypes.noBrickList, workspace, renderSource);
  workspace.render(false);
  let sceneWidth = 0;
  const allBricks = workspace.getAllBlocks();
  allBricks.forEach(brick => {
    const brickWidth = brick.getSvgRoot().getBBox().width;
    if (brickWidth > sceneWidth) {
      sceneWidth = brickWidth;
    }
  });
  if (workspace.RTL && workspace.options.readOnly) {
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
export const renderAndConnectBlocksInList = (parentBrick, brickList, brickListType, workspace, renderSource) => {
  for (let i = 0; i < brickList.length; i++) {
    const childBrick = renderBrick(parentBrick, brickList[i], brickListType, workspace, renderSource);

    if (workspace.getTheme().name.toLowerCase() === 'advanced') {
      if (childBrick.getStyleName() === 'disabled' || childBrick.type === 'NoteBrick') {
        advancedModeCommentOutBricks(childBrick);
      }
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
        formValues: definitionBrick.formValueMap,
        colorVariation: 0
      };
      renderBrick(childBrick, definitionBrickToRender, brickListTypes.userBrickDefinition, workspace, renderSource);
    }

    if (brickList[i].brickList !== undefined && brickList[i].brickList.length > 0) {
      if (brickList[i].userBrickId !== undefined) {
        // if there are bricks in the brickList and the userBrickId is set, it is a UserDefinedScript
        renderAndConnectBlocksInList(
          childBrick,
          brickList[i].brickList.reverse(),
          brickListTypes.userBrickList,
          workspace,
          renderSource
        );
      } else {
        renderAndConnectBlocksInList(
          childBrick,
          brickList[i].brickList.reverse(),
          brickListTypes.brickList,
          workspace,
          renderSource
        );
      }
    }
    if (brickList[i].elseBrickList !== undefined && brickList[i].elseBrickList.length > 0) {
      renderAndConnectBlocksInList(
        childBrick,
        brickList[i].elseBrickList.reverse(),
        brickListTypes.elseBrickList,
        workspace,
        renderSource
      );
    }
    if (brickList[i].loopOrIfBrickList !== undefined && brickList[i].loopOrIfBrickList.length > 0) {
      renderAndConnectBlocksInList(
        childBrick,
        brickList[i].loopOrIfBrickList.reverse(),
        brickListTypes.loopOrIfBrickList,
        workspace,
        renderSource
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
export const renderBrick = (parentBrick, jsonBrick, brickListType, workspace, renderSource) => {
  let childBrick;
  if (jsonBrick.id) {
    childBrick = workspace.newBlock(jsonBrick.name, jsonBrick.id);
  } else {
    childBrick = workspace.newBlock(jsonBrick.name);
  }

  let catblocksDomBrickID;
  const brickIDGenerator = new BrickIDGenerator();
  if (childBrick.type === 'UserDefinedScript') {
    catblocksDomBrickID = brickIDGenerator.createBrickIDForUserDefinedScript(childBrick, jsonBrick.userBrickId);
  } else if (childBrick.type !== 'UserDefinedScript' && jsonBrick.userBrickId) {
    catblocksDomBrickID = brickIDGenerator.createBrickIDForUserDefinedScriptCall(childBrick, jsonBrick.userBrickId);
  } else {
    catblocksDomBrickID = brickIDGenerator.createBrickID(childBrick);
  }
  childBrick.domBrickID = catblocksDomBrickID;

  if (renderSource === RenderSource_Catroid) {
    setFieldValuesForCatroid(jsonBrick, childBrick, catblocksDomBrickID);
  } else {
    setFieldValuesForShare(jsonBrick, childBrick);
  }

  if (childBrick && childBrick.inputList && childBrick.inputList[0] && childBrick.inputList[0].fieldRow) {
    if (workspace.getTheme().name.toLowerCase() === 'advanced') {
      advancedModeAddParentheses(childBrick);
      advancedModeAddCurlyBrackets(childBrick);
      advancedModeAddSemicolonsAndClassifyTopBricks(childBrick);
    }
    for (let i = 0; i < childBrick.inputList.length; i++) {
      for (let j = 0; j < childBrick.inputList[i].fieldRow.length; j++) {
        if (childBrick.inputList[i].fieldRow[j].name && childBrick.inputList[i].fieldRow[j].name.endsWith('_INFO')) {
          if (j > 0) {
            const val = childBrick.inputList[i].fieldRow[j - 1].getText();
            if (val && val.length < childBrick.inputList[i].fieldRow[j - 1].maxDisplayLength) {
              childBrick.inputList[i].fieldRow[j].setVisible(false);
            } else {
              childBrick.inputList[0].fieldRow[j].setOnClickHandler(() => {
                showFormulaPopup(val);
              });
            }
          }
        }
        if (
          childBrick.inputList[i].fieldRow[j].name &&
          childBrick.inputList[i].fieldRow[j].name === 'ADVANCED_MODE_PLACEHOLDER'
        ) {
          childBrick.inputList[i].fieldRow[j].setVisible(false);
        }
      }
    }
  }

  childBrick.initSvg();
  brickIDGenerator.setBrickID(childBrick, catblocksDomBrickID);

  if (childBrick.type === 'UserDefinedScript') {
    childBrick.setDeletable(false);
  }

  if (childBrick.pathObject && childBrick.pathObject.svgRoot) {
    if (jsonBrick.name == 'EmptyScript') {
      Blockly.utils.dom.addClass(childBrick.pathObject.svgRoot, 'catblockls-blockly-invisible');
    } else if (jsonBrick.commentedOut) {
      Blockly.utils.dom.addClass(childBrick.pathObject.svgRoot, 'catblocks-blockly-disabled');
      if (workspace.getTheme().name.toLowerCase() === 'advanced') {
        childBrick.setStyle('disabled');
      }
    }
  }

  if (brickListType === brickListTypes.brickList || brickListType === brickListTypes.userBrickList) {
    if (brickListType === brickListTypes.userBrickList) {
      parentBrick.inputList[3].connection.connect(childBrick.previousConnection);
    } else {
      if (parentBrick.domBrickID.includes('EmptyScript')) {
        parentBrick.setNextStatement(true);
        parentBrick.nextConnection.connect(childBrick.previousConnection);
      } else {
        parentBrick.inputList[1].connection.connect(childBrick.previousConnection);
        parentBrick.setNextStatement(false);
      }
    }
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

function setFieldValuesForCatroid(jsonBrick, childBrick, catblocksDomBrickID) {
  for (let i = 0; i < childBrick.inputList.length; i++) {
    for (let j = 0; j < childBrick.inputList[i].fieldRow.length; j++) {
      const inputField = childBrick.inputList[i].fieldRow[j];

      if (inputField instanceof CatblocksTextField) {
        const domID = `${catblocksDomBrickID}-field`;
        inputField.setDomIdPrefix(domID);
      } else if (inputField instanceof CatblocksSpinner) {
        const domID = `${catblocksDomBrickID}-spinner`;
        inputField.setDomIdPrefix(domID);
      }
      let spinnerValues = null;
      if (inputField instanceof CatblocksSpinner) {
        const catroidBrickType = getMappedBrickNameIfExists(childBrick.type);
        try {
          spinnerValues = JSON.parse(Android.getSelectionValuesForBrick(catroidBrickType, inputField.catroid_field_id));
          inputField.updateSpinnerValues(spinnerValues);
        } catch (ex) {
          console.error(
            `Error loading available spinner items for brick ${catroidBrickType} field ${inputField.catroid_field_id}`
          );
        }
      }

      if (jsonBrick.formValues && jsonBrick.formValues.has(inputField.name)) {
        const currentValue = jsonBrick.formValues.get(inputField.name);
        if (inputField instanceof CatblocksSpinner) {
          if (!spinnerValues) {
            spinnerValues = [currentValue];
            inputField.updateSpinnerValues(spinnerValues);
          }
          inputField.setValue(spinnerValues.indexOf(currentValue));
        } else {
          inputField.setValue(currentValue);
        }
      } else if (spinnerValues !== null) {
        inputField.setValue(0);
      }
    }
  }

  if (jsonBrick.formValues !== undefined && jsonBrick.formValues.size !== undefined && jsonBrick.formValues.size > 0) {
    if (childBrick.type in pluralBricks) {
      try {
        const currentBrick = pluralBricks[childBrick.type];
        const value = parseFloat(childBrick.inputList[0].fieldRow[currentBrick.number_field].getValue());

        if (value !== 1) {
          if (currentBrick.string_value.length === 1) {
            childBrick.inputList[0].fieldRow[currentBrick.string_field].setValue(
              CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[0]]
            );
          } else {
            childBrick.inputList[0].fieldRow[currentBrick.string_field].setValue(
              CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[0]] +
                ' ' +
                CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[1]]
            );
          }
          if (childBrick.type === 'ParameterizedBrick') {
            childBrick.inputList[0].fieldRow[0].setValue(
              CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value_additional]
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

function setFieldValuesForShare(jsonBrick, childBrick) {
  if (jsonBrick.formValues !== undefined && jsonBrick.formValues.size !== undefined && jsonBrick.formValues.size > 0) {
    for (let i = 0; i < childBrick.inputList.length; i++) {
      for (let j = 0; j < childBrick.inputList[i].fieldRow.length; j++) {
        const inputField = childBrick.inputList[i].fieldRow[j];
        if (jsonBrick.formValues && jsonBrick.formValues.has(inputField.name)) {
          const currentValue = jsonBrick.formValues.get(inputField.name);
          if (inputField instanceof CatblocksSpinner) {
            inputField.updateSpinnerValues([currentValue]);
            inputField.setValue(0);
          } else {
            inputField.setValue(currentValue);
          }
        }
      }
    }

    if (childBrick.type in pluralBricks) {
      try {
        const currentBrick = pluralBricks[childBrick.type];
        const value = parseFloat(childBrick.inputList[0].fieldRow[currentBrick.number_field].getValue());

        if (value !== 1) {
          if (currentBrick.string_value.length === 1) {
            childBrick.inputList[0].fieldRow[currentBrick.string_field].setValue(
              CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[0]]
            );
          } else {
            childBrick.inputList[0].fieldRow[currentBrick.string_field].setValue(
              CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[0]] +
                ' ' +
                CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value[1]]
            );
          }
          if (childBrick.type === 'ParameterizedBrick') {
            childBrick.inputList[0].fieldRow[0].setValue(
              CatBlocksMsgs.getCurrentLocaleValues()[currentBrick.string_value_additional]
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

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
export const lazyLoadImage = (event, eventRoot, callback) => {
  const target = eventRoot;
  target.removeEventListener('click', callback);

  const contentContainer = target.nextElementSibling;
  if (contentContainer.className.includes('catblocks-script-container')) {
    for (const imgElement of contentContainer.querySelectorAll('img')) {
      if (!imgElement.getAttribute('data-src')) {
        continue;
      }
      imgElement.setAttribute('src', imgElement.getAttribute('data-src'));
    }
  }
};

export const buildUserDefinedBrick = (object, advancedMode = false) => {
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
        if (advancedMode) {
          this.setStyle('user');
        }
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
        if (advancedMode) {
          this.setStyle('user');
        }
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
  <div class="modal fade" id="formulaPopup" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="formulaPopupHeader"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="formulaPopupContent">
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="formulaPopupClose">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  document.querySelector('body').insertAdjacentHTML('beforeend', formulaModal);
};

export const generateModalMagnifyingGlass = () => {
  const modal = `
  <div class="modal fade" id="modalForImg" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalHeader"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="" id="modalImg" class="imagepreview" style="max-width: 100%; max-height: 100%; margin: auto; display: block" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="imgPopupClose">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  document.querySelector('body').insertAdjacentHTML('beforeend', modal);
};

export const createLoadingAnimation = () => {
  const loadingAnimation = `
    <div class="modal fade" id="spinnerModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>`;
  document.querySelector('body').insertAdjacentHTML('beforeend', loadingAnimation);
};

export const showFormulaPopup = formula => {
  if (formula.length >= Blockly.Tooltip.LIMIT) {
    document.getElementById('formulaPopupClose').innerText = CatBlocksMsgs.getCurrentLocaleValues()['CLOSE'];
    const html_formula = formula.replaceAll('\n', '<br />');
    document.getElementById('formulaPopupContent').innerHTML = html_formula;

    const popup = document.getElementById('formulaPopup');
    const popupModal = new Modal(popup);
    popupModal.show();
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

  const locales = CatBlocksMsgs.getCurrentLocaleValues();

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

export function advancedModeAddParentheses(childBrick, addBrickDialog = false) {
  if (childBrick.type === 'UserDefinedScript' && !addBrickDialog) {
    return;
  }
  for (const input of childBrick.inputList) {
    for (let field = 1; field < input.fieldRow.length; field++) {
      if (input.fieldRow[field].EDITABLE) {
        if (addBrickDialog) {
          input.fieldRow[field].setValue('...');
        }

        if (input.fieldRow[field + 1].name && input.fieldRow[field + 1].name.endsWith('_INFO')) {
          const sourceBlock = input.fieldRow[field + 1].getSourceBlock();
          const labelField = new Blockly.FieldLabel('');
          labelField.setSourceBlock(sourceBlock);
          input.fieldRow[field + 1] = labelField;
          input.fieldRow[field + 1].setValue(')');

          if (childBrick.type === 'NoteBrick') {
            input.fieldRow[field + 1].setValue('');
            return;
          }
        }
        advancedModeRemoveWhiteSpacesInFormulas(input.fieldRow[field]);
        const newVal = input.fieldRow[field - 1].getValue() + ' (';
        input.fieldRow[field - 1].setValue(newVal);
      }
    }
  }
}

export function advancedModeAddCurlyBrackets(childBrick) {
  if (childBrick.inputList.some(field => field.name === 'SUBSTACK')) {
    const sourceBlock = childBrick.inputList[0].getSourceBlock();
    const labelField = new Blockly.FieldLabel('}');
    labelField.setSourceBlock(sourceBlock);
    const firstRow = childBrick.inputList[0].fieldRow;
    const newVal = firstRow[firstRow.length - 1].getValue() + ' {';
    firstRow[firstRow.length - 1].setValue(newVal);
    if (
      childBrick.type === 'IfLogicBeginBrick' ||
      childBrick.type === 'PhiroIfLogicBeginBrick' ||
      childBrick.type === 'RaspiIfLogicBeginBrick'
    ) {
      const newVal = '} ' + childBrick.inputList[2].fieldRow[0].getValue() + ' {';
      childBrick.inputList[2].fieldRow[0].setValue(newVal);
      childBrick.inputList[4].fieldRow[0] = labelField;
      childBrick.inputList[4].fieldRow[0].setValue('}');
    }
    if (childBrick.inputList.length === 3 && childBrick.type !== 'ParameterizedBrick') {
      childBrick.inputList[2].setAlign(Blockly.ALIGN_LEFT);
      childBrick.inputList[2].fieldRow[0] = labelField;
    }
    if (childBrick.type === 'ParameterizedBrick') {
      const newVal = childBrick.inputList[2].fieldRow[5].getValue() + ' }';
      childBrick.inputList[2].fieldRow[5].setValue(newVal);
    }
  } else if (childBrick.type === 'UserDefinedScript') {
    const newVal = childBrick.inputList[0].fieldRow[0].getValue() + ' {';
    childBrick.inputList[0].fieldRow[0].setValue(newVal);
    const sourceBlock = childBrick.inputList[0].getSourceBlock();
    const labelField = new Blockly.FieldLabel('}');
    labelField.setSourceBlock(sourceBlock);
    childBrick.inputList[2].setAlign(Blockly.ALIGN_LEFT);
    childBrick.inputList[2].fieldRow[0] = labelField;
  }
}

export function advancedModeAddSemicolonsAndClassifyTopBricks(childBrick) {
  if (
    childBrick.type === 'NoteBrick' ||
    childBrick.type === 'UserDefinedScript' ||
    childBrick.getStyleName() === 'user'
  ) {
    return;
  }
  if (scriptBricks.includes(childBrick.type)) {
    childBrick.hat = 'top';
    return;
  }
  if (childBrick.inputList.length === 1) {
    const fieldRow = childBrick.inputList[0].fieldRow;
    const newVal = fieldRow[fieldRow.length - 1].getValue() + ';';
    fieldRow[fieldRow.length - 1].setValue(newVal);
  }
}

export function advancedModeRemoveWhiteSpacesInFormulas(field) {
  if (!(field instanceof CatblocksSpinner)) {
    let cleanFieldValue = field.getValue().trim();
    if (!cleanFieldValue.startsWith("'") && !cleanFieldValue.endsWith("'")) {
      const replaceDict = {
        '( ': '(',
        ' )': ')',
        ' ,': ',',
        '  ': ' '
      };
      for (const key in replaceDict) {
        cleanFieldValue = cleanFieldValue.replaceAll(key, replaceDict[key]);
      }
    }
    field.setValue(cleanFieldValue);
  }
}

function advancedModeCommentOutBricks(childBrick) {
  childBrick.inputList[0].fieldRow[0].setValue('// ' + childBrick.inputList[0].fieldRow[0].getValue());
  if (
    childBrick.type === 'IfLogicBeginBrick' ||
    childBrick.type === 'PhiroIfLogicBeginBrick' ||
    childBrick.type === 'RaspiIfLogicBeginBrick'
  ) {
    childBrick.inputList[2].fieldRow[0].setValue('// ' + childBrick.inputList[2].fieldRow[0].getValue());
    childBrick.inputList[4].fieldRow[0].setValue('// ' + childBrick.inputList[4].fieldRow[0].getValue());
  }
  if (childBrick.inputList.length === 3) {
    childBrick.inputList[2].fieldRow[0].setValue('// ' + childBrick.inputList[2].fieldRow[0].getValue());
  }
  if (childBrick.type === 'NoteBrick') {
    Blockly.utils.dom.addClass(childBrick.pathObject.svgRoot, 'catblocks-blockly-disabled');
    childBrick.inputList[0].fieldRow[0].setValue('//');
    childBrick.inputList[0].fieldRow[1].setValue(childBrick.inputList[0].fieldRow[1].getValue().slice(1, -1));
  }

  const brickElements = document.getElementById(childBrick.pathObject.svgRoot.id).childNodes;
  let count = 1;
  while (count < brickElements.length && !brickElements[count].id) {
    if (
      brickElements[count].classList[0] !== 'blocklyNonEditableText' &&
      brickElements[count].classList[0] !== 'blocklyEditableText'
    ) {
      brickElements[count].style.opacity = 0.5;
    }
    count++;
  }
}

export const getFieldByCatroidFieldID = (brick, fieldID) => {
  for (const input of brick.inputList) {
    for (const field of input.fieldRow) {
      if (Object.prototype.hasOwnProperty.call(field, 'catroid_field_id')) {
        if (field.catroid_field_id === fieldID) {
          return field;
        }
      }
    }
  }
  return null;
};
