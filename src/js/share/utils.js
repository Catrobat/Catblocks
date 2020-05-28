/**
 * @fileoverview Catblocks integrationt into Web utilities
 * @author andreas.karner@student.tugraz.at (Andreas Karner)
 */

import md5 from 'js-md5';

/**
 * all list types in json object
 * @enum {object}
 */
export const brickListTypes = Object.freeze({
  noBrickList: 0,
  brickList: 1,
  elseBrickList: 2,
  loopOrIfBrickList: 3
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
    i18n: 'i18n/',
    noImageFound: 'No_Image_Available.jpg' // TODO: never used anywhere
  },
  scene: {
    writeHeader: true,
    expandable: true
  },
  object: {
    writeHeader: true,
    writeStats: true,
    writeLook: true,
    expandable: true,
    programRoot: 'assets/extracted/dc7fb2eb-1733-11ea-8f2b-000c292a0f49/',
    fileMap: undefined
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
    subContainer.textContent = textContent;
  }
  getDomElement(container).appendChild(subContainer);

  return subContainer;
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
 * @param {string|Element} idName
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

export const resetColorBlock = array => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].style.colour_ === array[i].style.colourPrimary) {
      const colorPrimaryTemporary = array[i].style.colourPrimary;
      array[i].style.colourPrimary = array[i].style.colourTertiary;
      array[i].style.colourTertiary = colorPrimaryTemporary;
    }
    if (array[i].childBlocks_.length > 0) {
      for (let j = 0; j < array[i].childBlocks_.length; j++) {
        if (array[i].childBlocks_[j].style.colour_ === array[i].childBlocks_[j].style.colourPrimary) {
          const colorPrimaryTemporary = array[i].childBlocks_[j].style.colourPrimary;
          array[i].childBlocks_[j].style.colourPrimary = array[i].childBlocks_[j].style.colourTertiary;
          array[i].childBlocks_[j].style.colourTertiary = colorPrimaryTemporary;
        }
      }
      resetColorBlock(array[i].childBlocks_);
    }
  }
};

/**
 * zebra effect -> color next block from same group slightly differently
 * @param {*} array
 */
export const checkNextBlock = (array, firstCall = false) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].childBlocks_.length > 0) {
      for (let j = 0; j < array[i].childBlocks_.length; j++) {
        if (array[i].style.colourPrimary === array[i].childBlocks_[j].style.colourPrimary) {
          const colorPrimaryTemporary = array[i].childBlocks_[j].style.colourPrimary;
          const colorTertiaryTemporary = array[i].childBlocks_[j].style.colourTertiary;

          array[i].childBlocks_[j].style.colour_ = colorTertiaryTemporary;
          array[i].childBlocks_[j].style.colourPrimary = colorTertiaryTemporary;
          array[i].childBlocks_[j].style.colourTertiary = colorPrimaryTemporary;

          array[i].childBlocks_[j].initSvg();

          if (
            firstCall &&
            array[i].childBlocks_[j].childBlocks_.length > 0 &&
            colorPrimaryTemporary !== array[i].childBlocks_[j].childBlocks_[0].style.colourTertiary
          ) {
            array[i].childBlocks_[j].style.colourPrimary = colorPrimaryTemporary;
            array[i].childBlocks_[j].style.colourTertiary = colorTertiaryTemporary;
          }
        }
      }
      checkNextBlock(array[i].childBlocks_);
    }
  }
};

export const zebraChangeColor = array => {
  checkNextBlock(array, true);
  resetColorBlock(array);
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
 * @param {object} workspace where blocks are rendered
 */
export const jsonDomToWorkspace = (jsonObject, workspace) => {
  const blockList = [];
  blockList.push(jsonObject);
  renderAndConnectBlocksInList(null, blockList, brickListTypes.noBrickList, workspace);
};

/**
 * Renders and connects all blocks in a brickList, elseBrickList and loopOrIfBrickList.
 * Function is calling itself if a *brickList is in a *brickList.
 * @param {Object} parentBlock parent block to connect
 * @param {Object} brickList, elseBrickList or loopOrIfBrickList
 * @param {object} brickListType of list
 * @param {object} workspace where blocks are rendered
 */
export const renderAndConnectBlocksInList = (parentBlock, brickList, brickListType, workspace) => {
  for (let i = 0; i < brickList.length; i++) {
    const childBlock = workspace.newBlock(brickList[i].name);
    if (
      brickList[i].formValues !== undefined &&
      brickList[i].formValues.size !== undefined &&
      brickList[i].formValues.size > 0
    ) {
      brickList[i].formValues.forEach(function (value, key) {
        for (let j = 0; j < childBlock.inputList[0].fieldRow.length; j++) {
          if (childBlock.inputList[0].fieldRow[j].name === key) {
            childBlock.inputList[0].fieldRow[j].setValue(value);
          }
        }
      });
    }
    childBlock.initSvg();
    childBlock.render(false);
    if (brickListType === brickListTypes.brickList) {
      parentBlock.nextConnection.connect(childBlock.previousConnection);
    }
    if (brickListType === brickListTypes.elseBrickList) {
      parentBlock.inputList[3].connection.connect(childBlock.previousConnection);
    }
    if (brickListType === brickListTypes.loopOrIfBrickList) {
      parentBlock.inputList[1].connection.connect(childBlock.previousConnection);
    }
    if (brickList[i].brickList !== undefined && brickList[i].brickList.length > 0) {
      renderAndConnectBlocksInList(childBlock, brickList[i].brickList.reverse(), brickListTypes.brickList, workspace);
    }
    if (brickList[i].elseBrickList !== undefined && brickList[i].elseBrickList.length > 0) {
      renderAndConnectBlocksInList(
        childBlock,
        brickList[i].elseBrickList.reverse(),
        brickListTypes.elseBrickList,
        workspace
      );
    }
    if (brickList[i].loopOrIfBrickList !== undefined && brickList[i].loopOrIfBrickList.length > 0) {
      renderAndConnectBlocksInList(
        childBlock,
        brickList[i].loopOrIfBrickList.reverse(),
        brickListTypes.loopOrIfBrickList,
        workspace
      );
    }
  }
};
