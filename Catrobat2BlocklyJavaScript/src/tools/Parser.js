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

class File{
    constructor(name, fileName){
        this.name = name;
        this.fileName = fileName;
    }
}

class Script{
    constructor(name){
        this.name = name;
        this.brickList = [];
        this.formValues = new Map();
    }
}

class Brick{
    constructor(name){
        this.name = name;
        this.loopOrIfBrickList = [];
        this.elseBrickList = [];
        this.formValues = new Map();
    }
}

class Formula{
    constructor() {
        this.value = "";
        this.left = null;
        this.right = null;
    }
    setLeft(leftBlock){
        if(this.left === null){
            this.left = leftBlock;
        }
        else{
            this.left.setLeft(leftBlock);
        }
    }
    setRight(rightBlock){
        if(this.right === null){
            this.right = rightBlock;
        }
        else{
            this.right.setRight(rightBlock);
        }
    }
}

let sceneList = [];

const XML_BEGIN = "<xml xmlns=\"http://www.w3.org/1999/xhtml\">";
const XML_END = "\n</xml>";
const NEXT_BEGIN = "\n<next>";
const NEXT_END = "\n</next>";
const SUB1_BEGIN = "\n<statement name=\"SUBSTACK\">";
const SUB2_BEGIN = "\n<statement name=\"SUBSTACK2\">";
const SUB_END = "\n</statement>";
const FORMULA_DEFINITION = "\n<formula category=";

let XML = XML_BEGIN;

function parseFile(xml) {
    let scenes = xml.getElementsByTagName('scenes')[0].children;
    for(let i = 0; i < scenes.length; i++)
    {
        sceneList.push(parseScenes(scenes[i]));
    }
    //console.log(sceneList);
    writeXML();
}

function parseScenes(scene) {

    let name = (scene.getElementsByTagName("name")[0].childNodes[0].nodeValue);
    let currentScene = new Scene(name);
    let objectList = scene.getElementsByTagName('objectList')[0].children;
    for(let i = 0; i < objectList.length; i++)
    {
        currentScene.objectList.push(parseObjects(objectList[i]));
    }
    return currentScene;
}

function parseObjects(object) {
    let name = object.getAttribute("name");
    if(name !== null){
        let currentObject = new Object(name);
        let lookList = object.getElementsByTagName('lookList')[0].children;
        let soundList = object.getElementsByTagName('soundList')[0].children;
        let scriptList = object.getElementsByTagName('scriptList')[0].children;

        for(let i = 0; i < lookList.length; i++)
        {
            currentObject.lookList.push(new File(lookList[i].getAttribute("name"), lookList[i].getAttribute("fileName")));
        }
        for(let i = 0; i < soundList.length; i++)
        {
            currentObject.soundList.push(new File(soundList[i].getAttribute("name"), soundList[i].getAttribute("fileName")));
        }
        for(let i = 0; i < scriptList.length; i++)
        {
            currentObject.scriptList.push(parseScripts(scriptList[i]));
        }
        return currentObject;
    }
}

function parseScripts(script){
    let name = script.getAttribute("type");
    let currentScript = new Script(name);
    let brickList = script.getElementsByTagName('brickList')[0].children;
    for(let i = 0; i < script.childNodes.length; i++) {
        checkUsage(script.childNodes[i], currentScript);
    }

    for(let i = 0; i < brickList.length; i++)
    {
        currentScript.brickList.push(parseBrick(brickList[i]));
    }
    return currentScript;
}

function parseBrick(brick){
    let name = brick.getAttribute("type");
    let currentBrick = new Brick(name);

    for(let i = 0; i < brick.childNodes.length; i++)
    {
        checkUsage(brick.childNodes[i],currentBrick);
    }
    return currentBrick;
}

function checkUsage(list, location){
    if(list.nodeName === "broadcastMessage" || list.nodeName === "spriteToBounceOffName" || list.nodeName === "receivedMessage" || list.nodeName === "sceneToStart" || list.nodeName === "sceneForTransition") {
        location.formValues.set("DROPDOWN", list.childNodes[0].nodeValue)
    }
    if(list.nodeName === "spinnerSelection"){
        location.formValues.set("spinnerSelection", list.childNodes[0].nodeValue);
    }
    if(list.nodeName === "selection"){
        location.formValues.set("selection", list.childNodes[0].nodeValue);
    }
    if(list.nodeName === "type"){
        location.formValues.set("type", list.childNodes[0].nodeValue);
    }
    if(list.nodeName === "alignmentSelection"){
        location.formValues.set("alignmentSelection", list.childNodes[0].nodeValue);
    }
    if(list.nodeName === "spinnerSelectionID"){
        location.formValues.set("spinnerSelectionID", list.childNodes[0].nodeValue);
    }
    if (list.nodeName === "formulaMap" || list.nodeName === "formulaList") {
        let formulaList = list.children;
        for (let j = 0; j < formulaList.length; j++) {
            let formula = new Formula();
            workFormula(formula, formulaList[j]);
            let attribute = formulaList[j].getAttribute("category");
            location.formValues.set(attribute, concatFormula(formula, ""));
        }
    }
    if(list.nodeName === "ifBranchBricks" || list.nodeName === "loopBricks")
    {
        let loopOrIfBrickList = (list.children);
        for(let j = 0; j < loopOrIfBrickList.length; j++)
        {
            location.loopOrIfBrickList.push(parseBrick(loopOrIfBrickList[j]));
        }
    }
    if(list.nodeName === "elseBranchBricks")
    {
        let elseBrickList = (list.children);
        for(let j = 0; j < elseBrickList.length; j++)
        {
            location.elseBrickList.push(parseBrick(elseBrickList[j]));
        }
    }
    if(list.nodeName === "sound")
    {
        let sound = list.getAttribute('reference');
        sound = sound.split("/soundList/sound").pop();
        let soundNR = 1;
        if(sound.length)
        {
            soundNR = sound.slice(1,-1);
        }
        let soundName = findSoundName(list, soundNR);
        location.formValues.set("sound", soundName);
    }
    if(list.nodeName === "look")
    {
        let look = list.getAttribute('reference');
        look = look.split("/lookList/look").pop();
        let lookNR = 1;
        if(look.length)
        {
            lookNR = look.slice(1,-1);
        }
        let lookName = findLookName(list, lookNR);
        location.formValues.set("look", lookName);
    }
}

function findSoundName(currentNode, soundNR){
    if(currentNode.nodeName === "object"){
        let soundList = currentNode.getElementsByTagName("soundList")[0].children;
        return soundList[soundNR - 1].getAttribute("name");
    }
    return findSoundName(currentNode.parentElement, soundNR);
}

function findLookName(currentNode, lookNR){
    if(currentNode.nodeName === "object"){
        let lookList = currentNode.getElementsByTagName("lookList")[0].children;
        return lookList[lookNR - 1].getAttribute("name");
    }
    return findLookName(currentNode.parentElement, lookNR);
}

function workFormula(formula, input) {
    for (let i = 0; i < input.childNodes.length; i++) {
        if (input.childNodes[i].nodeName === "leftChild") {
            let newFormula = new Formula();
            formula.setLeft(newFormula);
            workFormula(newFormula, input.childNodes[i]);
        }
        if(input.childNodes[i].nodeName === "rightChild")
        {
            let newFormula = new Formula();
            formula.setRight(newFormula);
            workFormula(newFormula, input.childNodes[i]);
        }
        if(input.childNodes[i].nodeName === "value"){
            formula.value = input.childNodes[i].childNodes[0].nodeValue;
        }
    }
}

function concatFormula(formula, str){
    if(formula.left !== null){
        str = concatFormula(formula.left, str);
    }
    //Manage Operators & language strings
    str += formula.value;
    str += " ";
    if(formula.right !== null){
        str = concatFormula(formula.right, str);
    }
    return str;
}

function writeXML() {
    console.log(sceneList);

    for(let i = 0; i < sceneList.length; i++){
        //XML = XML.concat("\n<scene type=\"" + sceneList[i].name + "\">");
        let currObjectList = sceneList[i].objectList;
        for(let j = 0; j < currObjectList.length; j++){
            if(currObjectList[j].lookList.length === 0)
            {
                //XML = XML.concat("\n<object type=\"" + currObjectList[j].name + "\" look=\"\">")
            }
            else
            {
               //XML = XML.concat("\n<object type=\"" + currObjectList[j].name + "\" look=\"" + currObjectList[j].lookList[0].name + "\">")
            }
            let currScriptList = currObjectList[j].scriptList;
            for(let k = 0; k < currScriptList.length; k++){
                //XML = XML.concat("\n<script type=\"" + currScriptList[k].name + "\">");

                writeScriptsToXML(currScriptList[k]);

                //XML = XML.concat("\n</script>");
            }
            //XML = XML.concat("\n</object>");
        }
        //XML = XML.concat("\n</scene>");
    }

    XML = XML.concat(XML_END);
    console.log(XML);

}

function writeScriptsToXML(currScript) {
    XML = XML.concat("\n<block type=\"" + currScript.name + "\" id=\"\" x=\"\" y=\"\">");

    let i = 1;
    for(var value of currScript.formValues.values()){
        XML = XML.concat("\n<field name=\"ARG" + i + "\">" + value + "</field>");
        i = i+1;
    }
    if(currScript.brickList.length !== 0)
    {
        writeBricksToXML(currScript, 0, true);
    }
    XML = XML.concat("\n</block>");
}

function writeBricksToXML(currScript, index, nextBrick) {
    if(nextBrick === true)
    {
        XML = XML.concat(NEXT_BEGIN);
    }
    let currBrick = currScript.brickList[index];
    //console.log(currBlock);
    XML = XML.concat("\n<block type=\"" + currBrick.name + "\" id=\"\" x=\"\" y=\"\">");

    let i = 1;
    for(var value of currBrick.formValues.values()){
        XML = XML.concat("\n<field name=\"ARG" + i + "\">" + value + "</field>");
        i = i+1;
    }

    if(currBrick.loopOrIfBrickList.length !== 0)
    {
        XML = XML.concat(SUB1_BEGIN);

        writeSubBlockToXML(currBrick, 0, false, 1);

        XML = XML.concat(SUB_END);
    }
    if(currBrick.elseBrickList.length !== 0)
    {
        XML = XML.concat(SUB2_BEGIN);

        writeSubBlockToXML(currBrick, 0, false, 2);

        XML = XML.concat(SUB_END);
    }

    if(currScript.brickList.length > index + 1)
    {
        writeBricksToXML(currScript, index + 1, true);
    }
    XML = XML.concat("\n</block>");
    if(nextBrick === true)
    {
        XML = XML.concat(NEXT_END);
    }
}

function writeSubBlockToXML(currBrick, index, nextBrick, subBlock) {
    if(nextBrick === true)
    {
        XML = XML.concat(NEXT_BEGIN);
    }
    let currSubBrick = currBrick.loopOrIfBrickList[index];
    if(subBlock === 2)
    {
        currSubBrick = currBrick.elseBrickList[index];
    }

    XML = XML.concat("\n<block type=\"" + currSubBrick.name + "\" id=\"\" x=\"\" y=\"\">");

    let i = 1;
    for(var value of currSubBrick.formValues.values()){
        XML = XML.concat("\n<field name=\"ARG" + i + "\">" + value + "</field>");
        i = i+1;
    }

    if(currSubBrick.loopOrIfBrickList.length !== 0)
    {
        XML = XML.concat(SUB1_BEGIN);

        writeSubBlockToXML(currSubBrick, 0, false, 1);

        XML = XML.concat(SUB_END);
    }
    if(currSubBrick.elseBrickList.length !== 0)
    {
        XML = XML.concat(SUB2_BEGIN);

        writeSubBlockToXML(currSubBrick, 0, false, 2);

        XML = XML.concat(SUB_END);
    }

    if((currBrick.loopOrIfBrickList.length > index + 1) && subBlock === 1)
    {
        writeSubBlockToXML(currBrick, index + 1, true, 1);
    }
    if((currBrick.elseBrickList.length > index + 1) && subBlock === 2)
    {
        writeSubBlockToXML(currBrick, index + 1, true, 2);
    }
    XML = XML.concat("\n</block>");
    if(nextBrick === true)
    {
        XML = XML.concat(NEXT_END);
    }

}
