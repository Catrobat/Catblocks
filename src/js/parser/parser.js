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
  }
}

class File {
  constructor(name, fileName) {
    this.name = name;
    this.fileName = fileName;
  }
}

class Script {
  constructor(name) {
    this.name = name;
    this.brickList = [];
    this.formValues = new Map();
  }
}

class Brick {
  constructor(name) {
    this.name = name;
    this.loopOrIfBrickList = [];
    this.elseBrickList = [];
    this.formValues = new Map();
    this.colorVariation = 0;
  }
}

const sceneList = [];
let xmlDoc = undefined;
const supportedAppVersion = 0.994;

const XML_BEGIN = "<xml>";
const XML_END = "\n</xml>";
const NEXT_BEGIN = "\n<next>";
const NEXT_END = "\n</next>";
const SUB1_BEGIN = "\n<statement name=\"SUBSTACK\">";
const SUB2_BEGIN = "\n<statement name=\"SUBSTACK2\">";
const SUB_END = "\n</statement>";

let MESSAGES = {};
let XML = "";

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
 * Escape script values in case unsafe characters are included
 * @param {*} unsafe 
 */
const escapeXml = (unsafe) => {
  if (unsafe === undefined || unsafe === null || unsafe.length === 0) {
    return unsafe;
  } else {
    return unsafe.replace(/[<>&'"]/g, function(c) {
      switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      }
    });
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
  XML = '';
  MESSAGES = Blockly.CatblocksMsgs.getCurrentLocaleValues();
}

/**
 * Parse catroid Program into catblocks program
 * @param {XMLDocument} xml catroid program xml
 * @return {XMLDocument} catblocks format
 */
function parseCatroidProgram(xml) {
  const scenes = xml.getElementsByTagName('scenes')[0].children;
  for (let i = 0; i < scenes.length; i++) {
    sceneList.push(parseScenes(scenes[i]));
  }
  catLog(sceneList);
  const xmlStream = generateShareXml();
  catLog(xmlStream);
  try {
    return (new DOMParser()).parseFromString(xmlStream, 'text/xml');
  } catch (e) {
    console.error(`Failed to parse generated catblocks string into a XMLDocument, please verify you input`);
    return undefined;
  }
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

  const name = escapeName(scene.getElementsByTagName("name")[0].childNodes[0].nodeValue);
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

  const name = escapeName(object.getAttribute("name"));
  if (name !== null) {
    const currentObject = new Object(name);
    const lookList = object.getElementsByTagName('lookList')[0].children;
    const soundList = object.getElementsByTagName('soundList')[0].children;
    const scriptList = object.getElementsByTagName('scriptList')[0].children;

    for (let i = 0; i < lookList.length; i++) {
      currentObject.lookList.push(new File(lookList[i].getAttribute("name"), lookList[i].getAttribute("fileName")));
    }
    for (let i = 0; i < soundList.length; i++) {
      currentObject.soundList.push(new File(soundList[i].getAttribute("name"), soundList[i].getAttribute("fileName")));
    }
    for (let i = 0; i < scriptList.length; i++) {
      currentObject.scriptList.push(parseScripts(scriptList[i]));
    }
    return currentObject;
  }
}

function parseScripts(script) {
  catLog(script);

  const name = escapeName(script.getAttribute("type"));
  const currentScript = new Script(name);
  const brickList = script.getElementsByTagName('brickList')[0].children;
  for (let i = 0; i < script.childNodes.length; i++) {
    checkUsage(script.childNodes[i], currentScript);
  }

  for (let i = 0; i < brickList.length; i++) {
    if (brickList[i].attributes[0].value === "RepeatBrick") {
      currentScript.brickList.push(parseBrick(brickList[i]));
      const position = i;
      i++;
      while (brickList[i].attributes[0].value !== "LoopEndBrick") {
        currentScript.brickList[position].loopOrIfBrickList.push(parseBrick(brickList[i]));
        i++;
      }
    }
    else {
      currentScript.brickList.push(parseBrick(brickList[i]));
    }
  }
  return currentScript;
}

function parseBrick(brick) {
  catLog(brick);

  const name = (brick.getAttribute("type") || 'emptyBlockName').match(/[a-zA-Z]+/)[0];
  const currentBrick = new Brick(name);

  for (let i = 0; i < brick.childNodes.length; i++) {
    checkUsage(brick.childNodes[i], currentBrick);
  }
  return currentBrick;
}

/**
 * Return crowdin value or default
 * @param {*} key 
 * @param {*} def 
 */
const getMsgValueOrDefault = (key, def = "---") => {
  if (key === undefined) return def;
  const msgValue = MESSAGES[key];
  return msgValue ? msgValue : def;
};

/**
 * Return node value or default
 * @param {*} node 
 * @param {*} def 
 */
const getNodeValueOrDefault = (node, def = "---") => {
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
    location.formValues.set("DROPDOWN", getNodeValueOrDefault(list.childNodes[0]));
    break;
  }

  case 'spinnerSelectionID': {
    const brickName = list.parentElement.getAttribute('type');
    const key = getNodeValueOrDefault(list.childNodes[0]);
    if (brickName === 'CameraBrick') {
      location.formValues.set("SPINNER", getMsgValueOrDefault(`CAMSPINNER_${key}`, key));
    } else if (brickName === 'ChooseCameraBrick') {
      location.formValues.set("SPINNER", getMsgValueOrDefault(`CAMCHOOSESPINNER_${key}`, key));
    } else {
      location.formValues.set("SPINNER", getMsgValueOrDefault(`FLASHSPINNER_${key}`, key));
    }
    break;
  }

  case 'type': {
    const key = getNodeValueOrDefault(list.childNodes[0]);
    location.formValues.set("DROPDOWN", getMsgValueOrDefault(`GRAVITY_${key}`, key));
    break;
  }

  case 'spinnerSelection': {
    const key = getNodeValueOrDefault(list.childNodes[0]);
    location.formValues.set("SPINNER", getMsgValueOrDefault(`SPINNER_${key}`, key));
    break;
  }

  case 'alignmentSelection': {
    const key = getNodeValueOrDefault(list.childNodes[0]);
    location.formValues.set("ALIGNMENT", getMsgValueOrDefault(`ALIGNMENTS_${key}`, key));
    break;
  }

  case 'ledAnimationName': {
    const key = getNodeValueOrDefault(list.childNodes[0]);
    location.formValues.set("ADRONEANIMATION", getMsgValueOrDefault(key, key));
    break;
  }

  case 'animationName': {
    const key = getNodeValueOrDefault(list.childNodes[0]);
    location.formValues.set("ANIMATION", getMsgValueOrDefault(`ANIMATION_${key}`, key));
    break;
  }

  case 'selection': {
    const key = getNodeValueOrDefault(list.childNodes[0]);
    location.formValues.set("SPINNER", getMsgValueOrDefault(`POINTTO_${key}`, key));
    break;
  }

  case 'formulaMap':
  case 'formulaList': {
    const formulaList = list.children;
    for (let j = 0; j < formulaList.length; j++) {
      const formula = new Formula();
      workFormula(formula, formulaList[j]);
      const attribute = formulaList[j].getAttribute("category");
      location.formValues.set(attribute, Formula.stringify(formula));
    }
    break;
  }

  case 'ifBranchBricks':
  case 'loopBricks': {
    const loopOrIfBrickList = (list.children);
    for (let j = 0; j < loopOrIfBrickList.length; j++) {
      location.loopOrIfBrickList.push(parseBrick(loopOrIfBrickList[j]));
      if (location.name === loopOrIfBrickList[j].name) {
        if (loopOrIfBrickList[j].colorVariation === 0) {
          location.colorVariation = 1;
        } else {
          location.colorVariation = 0;
        }
      }
    }
    break;
  }

  case 'elseBranchBricks': {
    const elseBrickList = (list.children);
    for (let j = 0; j < elseBrickList.length; j++) {
      location.elseBrickList.push(parseBrick(elseBrickList[j]));
      if (location.name === elseBrickList[j].name) {
        if (elseBrickList[j].colorVariation === 0) {
          location.colorVariation = 1;
        } else {
          location.colorVariation = 0;
        }
      }
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
    const nodeName = (node.querySelector(`${list.nodeName} name`)) ?
      node.querySelector(`${list.nodeName} name`).textContent : 'node';
    location.formValues.set('DROPDOWN', nodeName);
    break;
  }

  default:
  }
}

function workFormula(formula, input) {
  for (let i = 0; i < input.childNodes.length; i++) {
    if (input.childNodes[i].nodeName === "leftChild") {
      const newFormula = new Formula();
      formula.setLeft(newFormula);
      workFormula(newFormula, input.childNodes[i]);
    }
    if (input.childNodes[i].nodeName === "rightChild") {
      const newFormula = new Formula();
      formula.setRight(newFormula);
      workFormula(newFormula, input.childNodes[i]);
    }

    if (input.childNodes[i].nodeName === 'type') {
      const typeValue = input.childNodes[i].innerHTML;
      if (typeValue === 'BRACKET' || typeValue === 'USER_LIST' || typeValue === 'STRING' || typeValue === 'NUMBER' || typeValue === 'USER_VARIABLE') formula.operator = typeValue;
    }
    if (input.childNodes[i].nodeName === "value") {
      const operatorKey = getNodeValueOrDefault(input.childNodes[i].childNodes[0]);
      if (formula.operator !== 'USER_LIST' && formula.operator !== 'STRING' && formula.operator !== 'NUMBER' && formula.operator !== 'USER_VARIABLE') formula.operator = operatorKey;
      formula.value = getMsgValueOrDefault(operatorKey, operatorKey);
    }
  }
}

function generateShareXml() {
  XML = XML_BEGIN;
  for (let i = 0; i < sceneList.length; i++) {
    XML = XML.concat(`<scene type="${escapeXml(sceneList[i].name)}">`);
    const currObjectList = sceneList[i].objectList;
    for (let j = 0; j < currObjectList.length; j++) {
      if (currObjectList[j].lookList.length > 0) {
        const objectImage = currObjectList[j].lookList[0].fileName;
        XML = XML.concat(`<object type="${escapeXml(currObjectList[j].name)}" look="${escapeXml(objectImage)}">`);
      } else {
        XML = XML.concat(`<object type="${escapeXml(currObjectList[j].name)}">`);
      }
      const currScriptList = currObjectList[j].scriptList;
      for (let k = 0; k < currScriptList.length; k++) {
        XML = XML.concat(`<script type="${escapeXml(currScriptList[k].name)}">`);
        writeScriptsToXML(currScriptList[k]);
        XML = XML.concat(`</script>`);
      }
      XML = XML.concat(`</object>`);
    }
    XML = XML.concat(`</scene>`);
  }
  XML = XML.concat(XML_END);
  return XML;
}

function writeScriptsToXML(currScript) {
  XML = XML.concat("\n<block type=\"" + escapeXml(currScript.name) + "\">");
  for (const [key, value] of currScript.formValues) {
    XML = XML.concat("\n<field name=\"" + escapeXml(key) + "\">" + escapeXml(value) + "</field>");
  }
  if (currScript.brickList.length !== 0) {
    writeBrickToXML(currScript, 0, true, 0);
  }
  XML = XML.concat("\n</block>");
}


function writeBrickToXML(currBrick, index, nextBrick, subBlock) {
  if (nextBrick === true) {
    XML = XML.concat(NEXT_BEGIN);
  }
  let currSubBrick;
  if (subBlock === 0) {
    currSubBrick = currBrick.brickList[index];
  }
  if (subBlock === 1) {
    currSubBrick = currBrick.loopOrIfBrickList[index];
  }
  if (subBlock === 2) {
    currSubBrick = currBrick.elseBrickList[index];
  }
  XML = XML.concat("\n<block type=\"" + escapeXml(currSubBrick.name) + "\">");

  for (const [key, value] of currSubBrick.formValues) {
    XML = XML.concat("\n<field name=\"" + escapeXml(key) + "\">" + escapeXml(value) + "</field>");
  }
  if (currSubBrick.loopOrIfBrickList.length !== 0) {
    XML = XML.concat(SUB1_BEGIN);
    writeBrickToXML(currSubBrick, 0, false, 1);
    XML = XML.concat(SUB_END);
  }
  if (currSubBrick.elseBrickList.length !== 0) {
    XML = XML.concat(SUB2_BEGIN);
    writeBrickToXML(currSubBrick, 0, false, 2);
    XML = XML.concat(SUB_END);
  }
  if (subBlock === 0 && (currBrick.brickList.length > index + 1)) {
    writeBrickToXML(currBrick, index + 1, true, 0);
  }
  if (subBlock === 1 && (currBrick.loopOrIfBrickList.length > index + 1)) {
    writeBrickToXML(currBrick, index + 1, true, 1);
  }
  if (subBlock === 2 && (currBrick.elseBrickList.length > index + 1)) {
    writeBrickToXML(currBrick, index + 1, true, 2);
  }
  XML = XML.concat("\n</block>");
  if (nextBrick === true) {
    XML = XML.concat(NEXT_END);
  }
}

/**
 * Default export Parser class
 * Only those methodes are visible outside this module
 */
export default class Parser {

  /**
   * Parse catroid script into catblocks 
   * @param {XMLDocument} scriptDoc to parse
   * @returns {XMLDocument} catblocks script
   */
  static convertScript(scriptDoc) {
    // scriptDoc = (new DOMParser()).parseFromString(document.getElementById('importExport').value, 'text/xml');
    initParser(scriptDoc);
    const catScript = parseScripts(scriptDoc.firstChild);
    writeScriptsToXML(catScript);
    try {
      return (new DOMParser()).parseFromString(XML, 'text/xml');
    } catch (e) {
      catLog(e);
      console.error('Failed to convert catblocks script into XMLDocument, verify input');
      return;
    }
  }

  /**
   * Parse catroid script into catblocks
   * @param {string} scriptString to parse
   * @returns {XMLDocument} catblocks script
   */
  static convertScriptString(scriptString) {
    if (typeof scriptString === 'string') {
      try {
        const xml = (new window.DOMParser()).parseFromString(scriptString, 'text/xml');
        return Parser.convertScript(xml);
      } catch (e) {
        catLog(e);
        console.error(`Failed to convert catroid script given as string into a XMLDocument, please verify that the string is a valid program`);
        return undefined;
      }
    }
    return Parser.convertScript(scriptString);
  }

  /**
	 * Parse xmlString from catroid to catblocks format
	 * @param {string|Element} xmlString catroid string or XMLDocument 
	 * @returns {XMLDocument} catblock XMLDocument
	 */
  static convertProgramString(xmlString) {
    if (typeof xmlString === 'string') {
      try {
        const xml = (new window.DOMParser()).parseFromString(xmlString, 'text/xml');
        if (!isSupported(xml)) return undefined;

        initParser(xml);
        return parseCatroidProgram(xml);
      } catch (e) {
        catLog(e);
        console.error(`Failed to convert catroid program given as string into a XMLDocument, please verify that the string is a valid program`);
        return undefined;
      }
    }
    return parseCatroidProgram(xmlString);
  }

  /**
	 * Parse xmlString from catroid to catblocks format and return every error
	 * @param {string|Element} xmlString catroid string or XMLDocument
	 * @returns {XMLDocument} catblock XMLDocument
	 */
  static convertProgramStringDebug(xmlString) {
    const retVal = Parser.convertProgramString(xmlString);

    if (retVal === undefined) {
      const xml = (new window.DOMParser()).parseFromString(xmlString, 'text/xml');

      const appVersion = xml.getElementsByTagName('catrobatLanguageVersion');
      if (appVersion === undefined || appVersion.length < 1) {
        throw new Error(`Found program version "${appVersion}", minimum supported is ${supportedAppVersion}`);
      } else if (appVersion[0].innerHTML < supportedAppVersion) {
        throw new Error(`Found program version ${appVersion[0].innerHTML}, minimum supported is ${supportedAppVersion}`);
      }

      initParser(xml);
      return parseCatroidProgram(xml);
    }

    return retVal;
  }

  /**
	 * Fetch and parse xml file defined via uri
	 * @param {*} xmlFile uri to catroid file
	 * @returns {Promise} catblock XMLDocument
	 */
  static convertProgramUri(uri) {
    return fetch(uri)
      .then(res => res.text())
      .then(str => {
        return Parser.convertProgramString(str);
      })
      .catch(err => {
        console.error(`Failed to fetch uri: ${uri}`);
        catLog(err);
        return undefined;
      });
  }
}