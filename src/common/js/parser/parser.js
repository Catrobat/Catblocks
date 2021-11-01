import Blockly from 'blockly';
import Formula from './formula';

class Scene {
  constructor(name) {
    this.name = name;
    this.objectList = [];
  }
}

class Object {
  constructor(name) {
    this.name = name;
    this.lookList = [];
    this.soundList = [];
    this.scriptList = [];
    this.userBricks = null;
  }
}

class File {
  constructor(name, fileName) {
    this.name = name;
    this.fileName = fileName;
  }
}

class Script {
  constructor(name, id, posX, posY, commentedOut) {
    this.name = name;
    this.brickList = [];
    this.posX = posX;
    this.posY = posY;
    this.id = id;
    this.commentedOut = commentedOut;
    this.formValues = new Map();
  }
}

class Brick {
  constructor(name, id) {
    this.name = name;
    if (id) {
      this.id = id;
    }
    this.loopOrIfBrickList = [];
    this.elseBrickList = [];
    this.formValues = new Map();
    this.colorVariation = 0;
    this.userBrickId = undefined;
    this.commentedOut = false;
  }
}

class UserBrickDefinition {
  constructor(id) {
    this.id = id;
    this.inputTypes = [];
    this.msg = '';
  }

  getJsonDefinition() {
    const args = [];
    for (let i = 0; i < this.inputTypes.length; ++i) {
      if (this.inputTypes[i].type.toUpperCase() == 'INPUT') {
        args.push({
          type: 'field_input',
          name: this.inputTypes[i].varName,
          text: 'unset'
        });
        args.push({
          type: 'field_image',
          name: `${this.inputTypes[i].varName}_INFO`,
          src: `${document.location.pathname}media/info_icon.svg`,
          height: 24,
          width: 24,
          alt: '(i)',
          flip_rtl: true
        });
      }
    }

    return {
      message0: this.msg,
      args0: args,
      category: 'user',
      colour: '#3556a2',
      extensions: ['shapeBrick']
    };
  }
}

const sceneList = [];
let xmlDoc = undefined;
const supportedAppVersion = 0.9994;

let MESSAGES = {};

// global log enable switch
const DEBUG = false;

/**
 * Catblocks debug function
 * @param {*} msg
 * @param {*} debug
 */
const catLog = (msg, debug = DEBUG) => {
  if (debug) {
    console.log(msg);
  }
};

/**
 * Check if current catroid code version is supported
 * @param {XMLDocument} program to validate
 * @return {boolean} if supported or not
 */
function isSupported(program) {
  const appVersion = program.getElementsByTagName('catrobatLanguageVersion');
  if (appVersion === undefined || appVersion.length < 1) {
    console.warn('Unsupported program version found, please upgrade programm to newer version via reupload.');
    return false;
  }
  if (appVersion[0].innerHTML < supportedAppVersion) {
    console.warn('Unsupported program version found, please upgrade programm to newer version via reupload.');
    return false;
  }
  return true;
}

/**
 * Initialize parser for new conversion
 *  Clean old parsed values and define xmlDoc for xPath
 * @param {XMLDocument} xml
 */
function initParser(xml) {
  xmlDoc = xml;
  sceneList.length = 0;
  MESSAGES = Blockly.CatblocksMsgs.getCurrentLocaleValues();
}

/**
 * Get the xml program as JSON
 * @param {XMLDocument} xml catroid program xml
 * @returns {Object} parsed program
 */
function getCatroidProgramObject(xml) {
  const scenes = xml.getElementsByTagName('scenes')[0].children;
  for (let i = 0; i < scenes.length; i++) {
    sceneList.push(parseScenes(scenes[i]));
  }
  const name = xml.getElementsByTagName('header')[0].getElementsByTagName('programName')[0].innerHTML;
  return { scenes: sceneList, programName: name };
}
/**
 * Flat/dereference xml nodes
 * @param {*} node node
 * @param {*} xml XMLDocument
 */
function flatReference(node, xml = xmlDoc) {
  const refPath = node.getAttribute('reference');
  if (refPath) {
    return xml.evaluate(refPath, node, null, XPathResult.ANY_TYPE, null).iterateNext();
  }
  return node;
}

/**
 * Escape not allowed characters in names
 * @param {string} name to escape
 * @returns {string} proper value
 */
function escapeName(name) {
  return (name || '').replace(/[&]/, '');
}

function parseScenes(scene) {
  catLog(scene);

  const name = escapeName(scene.getElementsByTagName('name')[0].childNodes[0].nodeValue);
  const currentScene = new Scene(name);
  const objectList = scene.getElementsByTagName('objectList')[0].children;
  for (let i = 0; i < objectList.length; i++) {
    currentScene.objectList.push(parseObjects(objectList[i]));
  }
  return currentScene;
}

function parseObjects(object) {
  object = flatReference(object);
  catLog(object);

  const name = escapeName(object.getAttribute('name'));
  if (name !== null) {
    const currentObject = new Object(name);
    const lookList = object.getElementsByTagName('lookList')[0].children;
    const soundList = object.getElementsByTagName('soundList')[0].children;
    const scriptList = object.getElementsByTagName('scriptList')[0].children;

    const userDefinedBrickList = object.getElementsByTagName('userDefinedBrickList');
    if (userDefinedBrickList && userDefinedBrickList[0]) {
      const userBrickDefinitions = parseUserBrickDefinitions(userDefinedBrickList[0].children);
      currentObject.userBricks = userBrickDefinitions;
    }

    for (let i = 0; i < lookList.length; i++) {
      let name = lookList[i].getAttribute('name');
      if (name == null) {
        const xml = lookList[i].getElementsByTagName('name');
        if (xml.length > 0 && xml[0] !== undefined) {
          name = xml[0].textContent;
        }
      }

      let fileName = lookList[i].getAttribute('fileName');
      if (fileName == null) {
        const xml = lookList[i].getElementsByTagName('fileName');
        if (xml.length > 0 && xml[0] !== undefined) {
          fileName = xml[0].textContent;
        }
      }

      const file = new File(name, fileName);
      currentObject.lookList.push(file);
    }
    for (let i = 0; i < soundList.length; i++) {
      let name = soundList[i].getAttribute('name');
      if (name == null) {
        const xml = soundList[i].getElementsByTagName('name');
        if (xml.length > 0 && xml[0] !== undefined) {
          name = xml[0].textContent;
        }
      }

      let fileName = soundList[i].getAttribute('fileName');
      if (fileName == null) {
        const xml = soundList[i].getElementsByTagName('fileName');
        if (xml.length > 0 && xml[0] !== undefined) {
          fileName = xml[0].textContent;
        }
      }

      const file = new File(name, fileName);
      currentObject.soundList.push(file);
    }
    for (let i = 0; i < scriptList.length; i++) {
      currentObject.scriptList.push(parseScripts(scriptList[i]));
    }
    return currentObject;
  }
}

function parseUserBrickDefinitions(userBricks) {
  const userDefinedBrickDefinitions = [];

  for (let i = 0; i < userBricks.length; ++i) {
    const brickDefinition = userBricks[i];
    if (!brickDefinition) {
      continue;
    }

    // <brick>
    let msg = '';
    const inputs = [];
    const brickId = brickDefinition.getElementsByTagName('userDefinedBrickID')[0].innerHTML;
    const brickDataDefs = brickDefinition.getElementsByTagName('userDefinedBrickDataList')[0].children;
    if (!brickDataDefs) {
      continue;
    }

    let inputCounter = 1;
    // <userDefinedBrickDataList>
    for (let j = 0; j < brickDataDefs.length; ++j) {
      const dataDef = brickDataDefs[j];
      if (dataDef.nodeName == 'userDefinedBrickLabel') {
        msg += dataDef.getElementsByTagName('label')[0].innerHTML + ' ';
      } else if (dataDef.nodeName == 'userDefinedBrickInput') {
        msg += `%${inputCounter}%${inputCounter + 1} `;

        const inputTag = dataDef.getElementsByTagName('input')[0];
        let varName;
        if (inputTag.hasAttribute('reference')) {
          const inputRef = inputTag.getAttribute('reference');
          varName = xmlDoc.evaluate(inputRef, inputTag).iterateNext().getElementsByTagName('input')[0].innerHTML;
        } else {
          varName = inputTag.getElementsByTagName('input')[0].innerHTML;
        }

        inputs.push({
          type: dataDef.getElementsByTagName('type')[0].innerHTML,
          varName: varName
        });
        inputCounter += 2;
      } else {
        throw `Unknown user brick data definition: ${dataDef.nodeName}`;
      }
    }
    msg = msg.trimRight();
    const userBrick = new UserBrickDefinition(brickId);
    userDefinedBrickDefinitions.push(userBrick);
    userBrick.msg = msg;
    userBrick.inputTypes = inputs;
  }

  return userDefinedBrickDefinitions;
}

function parseScripts(script) {
  catLog(script);

  const name = escapeName(script.getAttribute('type'));
  let posX = undefined;
  let posY = undefined;
  if (script.hasAttribute('posX') && script.hasAttribute('posY')) {
    posX = script.getAttribute('posX');
    posY = script.getAttribute('posY');
  }
  const scriptIdTag = script.getElementsByTagName('scriptId');
  let scriptId = undefined;
  if (scriptIdTag.length > 0) {
    scriptId = scriptIdTag[0].innerHTML;
  }

  let commentedOut = false;
  const commentedOutTag = script.getElementsByTagName('commentedOut');
  if (commentedOutTag.length > 0) {
    commentedOut = commentedOutTag[0].innerHTML == 'true';
  }

  const currentScript = new Script(name, scriptId, posX, posY, commentedOut);
  const brickList = script.getElementsByTagName('brickList')[0].children;
  for (let i = 0; i < script.childNodes.length; i++) {
    checkUsage(script.childNodes[i], currentScript);
  }

  let positionInScriptBrickList = 0;
  for (let i = 0; i < brickList.length; i++) {
    if (brickList[i].attributes[0].value === 'RepeatBrick' && checkIfNewProgram('RepeatBrick', brickList)) {
      const loopFinished = fillLoopControlBrick(
        brickList,
        currentScript,
        'RepeatBrick',
        i,
        positionInScriptBrickList,
        null,
        true
      );
      i = loopFinished + 1;
    } else if (
      brickList[i].attributes[0].value === 'IfThenLogicBeginBrick' &&
      checkIfNewProgram('IfThenLogicBeginBrick', brickList)
    ) {
      const ifFinished = fillLoopControlBrick(
        brickList,
        currentScript,
        'IfThenLogicBeginBrick',
        i,
        positionInScriptBrickList,
        null,
        true
      );
      i = ifFinished + 1;
    } else if (
      brickList[i].attributes[0].value === 'IfLogicBeginBrick' &&
      checkIfNewProgram('IfLogicBeginBrick', brickList)
    ) {
      const ifFinished = fillLoopControlBrick(
        brickList,
        currentScript,
        'IfLogicBeginBrick',
        i,
        positionInScriptBrickList,
        null,
        true
      );
      i = ifFinished + 1;
    } else {
      currentScript.brickList.push(parseBrick(brickList[i]));
      positionInScriptBrickList++;
    }
  }
  return currentScript;
}

function checkIfNewProgram(currentBrick, brickList) {
  let endBrick;
  if (currentBrick === 'RepeatBrick') {
    endBrick = 'LoopEndBrick';
  } else if (currentBrick === 'IfLogicBeginBrick') {
    endBrick = 'IfLogicEndBrick';
  } else if (currentBrick === 'IfThenLogicBeginBrick') {
    endBrick = 'IfThenLogicEndBrick';
  }

  for (let i = 0; i < brickList.length; i++) {
    if (brickList[i].attributes[0].value === endBrick) {
      return true;
    }
  }
  return false;
}

function fillLoopControlBrick(
  brickList,
  currentScript,
  currentBrick,
  counter,
  positionInScriptBrickList,
  currentListToFill = null,
  firstCall = false
) {
  let i = counter;
  let endBrick;
  let elseBrick;
  if (currentBrick === 'RepeatBrick') {
    endBrick = 'LoopEndBrick';
    elseBrick = null;
  } else if (currentBrick === 'IfLogicBeginBrick') {
    endBrick = 'IfLogicEndBrick';
    elseBrick = 'IfLogicElseBrick';
  } else if (currentBrick === 'IfThenLogicBeginBrick') {
    endBrick = 'IfThenLogicEndBrick';
    elseBrick = 'IfThenLogicElseBrick';
  }
  if (firstCall) {
    currentScript.brickList.push(parseBrick(brickList[i]));
  }

  positionInScriptBrickList++;
  let position = 0;
  if (positionInScriptBrickList !== 0) {
    position = positionInScriptBrickList - 1;
  }
  i++;
  let list;
  if (currentListToFill === null) {
    list = currentScript.brickList[position];
  } else {
    list = currentListToFill;
  }

  let lastIndex = 0;
  let listToFill = null;

  while (brickList[i].attributes[0].value !== endBrick) {
    if (brickList[i].attributes[0].value === elseBrick && elseBrick !== null) {
      i++;
      break;
    }
    if (brickList[i].attributes[0].value === 'IfLogicBeginBrick') {
      list.loopOrIfBrickList.push(parseBrick(brickList[i]));
      lastIndex = list.loopOrIfBrickList.length - 1;
      listToFill = list.loopOrIfBrickList[lastIndex];
      const ifFinished = fillLoopControlBrick(
        brickList,
        currentScript,
        'IfLogicBeginBrick',
        i,
        positionInScriptBrickList,
        listToFill
      );
      i = ifFinished + 1;
    } else if (brickList[i].attributes[0].value === 'IfThenLogicBeginBrick') {
      list.loopOrIfBrickList.push(parseBrick(brickList[i]));
      lastIndex = list.loopOrIfBrickList.length - 1;
      listToFill = list.loopOrIfBrickList[lastIndex];
      const ifFinished = fillLoopControlBrick(
        brickList,
        currentScript,
        'IfThenLogicBeginBrick',
        i,
        positionInScriptBrickList,
        listToFill
      );
      i = ifFinished + 1;
    } else if (brickList[i].attributes[0].value === 'RepeatBrick') {
      list.loopOrIfBrickList.push(parseBrick(brickList[i]));
      lastIndex = list.loopOrIfBrickList.length - 1;
      listToFill = list.loopOrIfBrickList[lastIndex];
      const loopFinished = fillLoopControlBrick(
        brickList,
        currentScript,
        'RepeatBrick',
        i,
        positionInScriptBrickList,
        listToFill
      );
      i = loopFinished + 1;
    } else {
      list.loopOrIfBrickList.push(parseBrick(brickList[i]));
      i++;
    }
  }

  if (elseBrick !== null) {
    while (brickList[i].attributes[0].value !== endBrick) {
      if (brickList[i].attributes[0].value === 'IfLogicBeginBrick') {
        list.elseBrickList.push(parseBrick(brickList[i]));
        lastIndex = list.elseBrickList.length - 1;
        listToFill = list.elseBrickList[lastIndex];
        const ifFinished = fillLoopControlBrick(
          brickList,
          currentScript,
          'IfLogicBeginBrick',
          i,
          positionInScriptBrickList,
          listToFill
        );
        i = ifFinished + 1;
      } else if (brickList[i].attributes[0].value === 'IfThenLogicBeginBrick') {
        list.elseBrickList.push(parseBrick(brickList[i]));
        lastIndex = list.elseBrickList.length - 1;
        listToFill = list.elseBrickList[lastIndex];
        const ifFinished = fillLoopControlBrick(
          brickList,
          currentScript,
          'IfThenLogicBeginBrick',
          i,
          positionInScriptBrickList,
          listToFill
        );
        i = ifFinished + 1;
      } else if (brickList[i].attributes[0].value === 'RepeatBrick') {
        list.elseBrickList.push(parseBrick(brickList[i]));
        lastIndex = list.elseBrickList.length - 1;
        listToFill = list.elseBrickList[lastIndex];
        const loopFinished = fillLoopControlBrick(
          brickList,
          currentScript,
          'RepeatBrick',
          i,
          positionInScriptBrickList,
          listToFill
        );
        i = loopFinished + 1;
      } else {
        list.elseBrickList.push(parseBrick(brickList[i]));
        i++;
      }
    }
  }
  return i;
}

function parseBrick(brick) {
  catLog(brick);

  const name = (brick.getAttribute('type') || 'emptyBlockName').match(/[a-zA-Z]+/)[0];

  let brickId = null;
  const idTag = brick.getElementsByTagName('brickId');
  if (idTag && idTag.length >= 1) {
    brickId = idTag[0].innerHTML;
    if (brickId) {
      brickId = brickId.trim();
    }
  }

  const currentBrick = new Brick(name, brickId);

  for (let i = 0; i < brick.childNodes.length; i++) {
    checkUsage(brick.childNodes[i], currentBrick);
  }

  if (currentBrick.userBrickId) {
    currentBrick.name = currentBrick.userBrickId;
  }

  return currentBrick;
}

/**
 * Return crowdin value or default
 * @param {*} key
 * @param {*} def
 */
const getMsgValueOrDefault = (key, def = '') => {
  if (key === undefined) {
    return def;
  }
  const msgValue = MESSAGES[key];
  return msgValue ? msgValue : def;
};

/**
 * Return node value or default
 * @param {*} node
 * @param {*} def
 */
const getNodeValueOrDefault = (node, def = '') => {
  if (node === undefined || node.nodeValue === undefined) {
    return def;
  }
  return node.nodeValue;
};

function checkUsage(list, location) {
  switch (list.nodeName) {
    case 'broadcastMessage':
    case 'spriteToBounceOffName':
    case 'receivedMessage':
    case 'sceneToStart':
    case 'objectToClone':
    case 'soundName':
    case 'motor':
    case 'tone':
    case 'eye':
    case 'pointedObject':
    case 'ledStatus':
    case 'sceneForTransition': {
      location.formValues.set('DROPDOWN', getNodeValueOrDefault(list.childNodes[0]));
      break;
    }

    case 'spinnerSelectionID': {
      const brickName = list.parentElement.getAttribute('type');
      const key = getNodeValueOrDefault(list.childNodes[0]);
      if (brickName === 'CameraBrick') {
        location.formValues.set('SPINNER', getMsgValueOrDefault(`CAMSPINNER_${key}`, key));
      } else if (brickName === 'ChooseCameraBrick') {
        location.formValues.set('SPINNER', getMsgValueOrDefault(`CAMCHOOSESPINNER_${key}`, key));
      } else {
        location.formValues.set('SPINNER', getMsgValueOrDefault(`FLASHSPINNER_${key}`, key));
      }
      break;
    }

    case 'fadeSpinnerSelectionId': {
      const brickName = list.parentElement.getAttribute('type');
      const key = getNodeValueOrDefault(list.childNodes[0]);

      if (brickName === 'FadeParticleEffectBrick') {
        location.formValues.set('brick_fade_particle_effect_spinner', getMsgValueOrDefault(`FADESPINNER_${key}`, key));
      } else if (brickName === 'ParticleEffectAdditivityBrick') {
        location.formValues.set(
          'brick_additive_particle_effect_spinner',
          getMsgValueOrDefault(`PARTICLESPINNER_${key}`, key)
        );
      }
      break;
    }

    case 'type': {
      const key = getNodeValueOrDefault(list.childNodes[0]);
      location.formValues.set('DROPDOWN', getMsgValueOrDefault(`GRAVITY_${key}`, key));
      break;
    }

    case 'spinnerSelection': {
      const key = getNodeValueOrDefault(list.childNodes[0]);
      location.formValues.set('SPINNER', getMsgValueOrDefault(`SPINNER_${key}`, key));
      break;
    }

    case 'alignmentSelection': {
      const key = getNodeValueOrDefault(list.childNodes[0]);
      location.formValues.set('ALIGNMENT', getMsgValueOrDefault(`ALIGNMENTS_${key}`, key));
      break;
    }

    case 'ledAnimationName': {
      const key = getNodeValueOrDefault(list.childNodes[0]);
      location.formValues.set('ADRONEANIMATION', getMsgValueOrDefault(key, key));
      break;
    }

    case 'animationName': {
      const key = getNodeValueOrDefault(list.childNodes[0]);
      location.formValues.set('ANIMATION', getMsgValueOrDefault(`ANIMATION_${key}`, key));
      break;
    }

    case 'selection': {
      const key = getNodeValueOrDefault(list.childNodes[0]);
      location.formValues.set('SPINNER', getMsgValueOrDefault(`POINTTO_${key}`, key));
      break;
    }

    case 'formulaMap':
    case 'formulaList': {
      const formulaList = list.children;
      for (let j = 0; j < formulaList.length; j++) {
        const formula = new Formula();
        workFormula(formula, formulaList[j]);
        let attribute;
        if (formulaList[j].hasAttribute('input')) {
          attribute = formulaList[j].getAttribute('input');
        } else {
          attribute = formulaList[j].getAttribute('category');
        }
        location.formValues.set(attribute, Formula.stringify(formula));
      }
      break;
    }

    case 'ifBranchBricks':
    case 'loopBricks': {
      const loopOrIfBrickList = list.children;
      for (let j = 0; j < loopOrIfBrickList.length; j++) {
        location.loopOrIfBrickList.push(parseBrick(loopOrIfBrickList[j]));
      }
      break;
    }

    case 'elseBranchBricks': {
      const elseBrickList = list.children;
      for (let j = 0; j < elseBrickList.length; j++) {
        location.elseBrickList.push(parseBrick(elseBrickList[j]));
      }
      break;
    }

    case 'sound':
    case 'look': {
      const node = flatReference(list);
      const name = node.getAttribute('name');
      location.formValues.set(list.nodeName, name);
      break;
    }

    case 'userVariable':
    case 'userList': {
      const node = flatReference(list);
      const nodeName = node.querySelector(`${list.nodeName} name`)
        ? node.querySelector(`${list.nodeName} name`).textContent
        : 'node';
      location.formValues.set('DROPDOWN', nodeName);
      break;
    }

    case 'userDataList': {
      const userDataList = list.children;
      for (let j = 0; j < userDataList.length; j++) {
        const userDataElement = flatReference(userDataList[j]);
        const userDataCategory = userDataElement.getAttribute('category');
        const userDataName = userDataElement.getElementsByTagName('name')[0].innerHTML;
        location.formValues.set(userDataCategory, userDataName);
      }
      break;
    }

    case 'userDefinedBrickID': {
      location.userBrickId = list.innerHTML;
      break;
    }

    case 'commentedOut': {
      location.commentedOut = list.innerHTML == 'true';
      break;
    }

    default:
  }
}

function workFormula(formula, input) {
  for (let i = 0; i < input.childNodes.length; i++) {
    if (input.childNodes[i].nodeName === 'leftChild') {
      const newFormula = new Formula();
      formula.setLeft(newFormula);
      workFormula(newFormula, input.childNodes[i]);
    }
    if (input.childNodes[i].nodeName === 'rightChild') {
      const newFormula = new Formula();
      formula.setRight(newFormula);
      workFormula(newFormula, input.childNodes[i]);
    }

    if (input.childNodes[i].nodeName === 'type') {
      const typeValue = input.childNodes[i].innerHTML;
      if (
        typeValue === 'BRACKET' ||
        typeValue === 'USER_LIST' ||
        typeValue === 'STRING' ||
        typeValue === 'NUMBER' ||
        typeValue === 'USER_VARIABLE' ||
        typeValue === 'USER_DEFINED_BRICK_INPUT'
      ) {
        formula.operator = typeValue;
      }
    }
    if (input.childNodes[i].nodeName === 'value') {
      const operatorKey = getNodeValueOrDefault(input.childNodes[i].childNodes[0]);
      if (
        formula.operator !== 'USER_LIST' &&
        formula.operator !== 'STRING' &&
        formula.operator !== 'NUMBER' &&
        formula.operator !== 'USER_VARIABLE' &&
        formula.operator !== 'USER_DEFINED_BRICK_INPUT'
      ) {
        formula.operator = operatorKey;
      }
      formula.value = getMsgValueOrDefault(operatorKey, operatorKey);
    }
  }
}

/**
 * Export Parser class
 * Only those methods are visible outside this module
 */
export class Parser {
  /**
   * For performance reasons only the requested object is parsed.
   * The xml is filtered the the selected object is parsed.
   *
   * @static
   * @param {string] xmlString code.xml as string
   * @param {*} sceneName name of the scene containing the object to render
   * @param {*} objectName name of the object to render
   * @memberof Parser
   */
  static convertObjectToJSON(xmlString, sceneName, objectName) {
    if (typeof xmlString === 'string') {
      try {
        const xml = new window.DOMParser().parseFromString(xmlString, 'text/xml');
        if (!isSupported(xml)) {
          return undefined;
        }

        const xpath = `/program/scenes/scene[name='${sceneName}']/objectList/object[@name='${objectName}']`;
        const xpathResult = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null);
        if (!xpathResult) {
          return undefined;
        }

        const objectTag = xpathResult.iterateNext();
        if (!objectTag) {
          return undefined;
        }

        initParser(xml);
        return parseObjects(objectTag);
      } catch (e) {
        catLog(e);
        console.error(
          `Failed to convert catroid program given as string into a XMLDocument, please verify that the string is a valid program`
        );
        return undefined;
      }
    }
  }

  /**
   * Convert given XML to JSON object
   * @static
   * @param {Element} xmlString code.xml file
   * @returns {Object}
   */
  static convertProgramToJSON(xmlString) {
    if (typeof xmlString === 'string') {
      try {
        const xml = new window.DOMParser().parseFromString(xmlString, 'text/xml');
        if (!isSupported(xml)) {
          return undefined;
        }

        initParser(xml);
        return getCatroidProgramObject(xml);
      } catch (e) {
        catLog(e);
        console.error(
          `Failed to convert catroid program given as string into a XMLDocument, please verify that the string is a valid program`
        );
        return undefined;
      }
    }
    return getCatroidProgramObject(xmlString);
  }

  /**
   * Convert given XML to JSON object and return every error
   * @static
   * @param {Element} xmlString code.xml file
   * @returns {Object}
   */
  static convertProgramToJSONDebug(xmlString) {
    const obj = Parser.convertProgramToJSON(xmlString);

    if (obj === undefined) {
      const xml = new window.DOMParser().parseFromString(xmlString, 'text/xml');

      const appVersion = xml.getElementsByTagName('catrobatLanguageVersion');
      if (appVersion === undefined || appVersion.length < 1) {
        throw new Error(`Found program version "${appVersion}", minimum supported is ${supportedAppVersion}`);
      } else if (appVersion[0].innerHTML < supportedAppVersion) {
        throw new Error(
          `Found program version ${appVersion[0].innerHTML}, minimum supported is ${supportedAppVersion}`
        );
      }

      initParser(xml);
      return getCatroidProgramObject(xml);
    }

    return obj;
  }
}
