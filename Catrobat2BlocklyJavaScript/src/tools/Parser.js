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
    }
}

class Brick{
    constructor(name){
        this.name = name;
        this.loopOrIfBrickList = [];
        this.elseBrickList = [];
        this.formula = "";
    }
}


function parseFile(xml) {
    let scenes = xml.getElementsByTagName('scene');
    for(let i = 0; i < scenes.length; i++)
    {
        parseScenes(scenes[i]);
    }
}

function parseScenes(scene) {

    let name = (scene.getElementsByTagName("name")[0].childNodes[0].nodeValue);
    let currentScene = new Scene(name);
    let objectList = scene.getElementsByTagName('object');

    for(let i = 0; i < objectList.length; i++)
    {
        currentScene.objectList.push(parseObjects(objectList[i]));
    }
    console.log(currentScene);
}

function parseObjects(object) {
    let name = object.getAttribute("name");
    let currentObject = new Object(name);
    let lookList = object.getElementsByTagName('look');
    let soundList = object.getElementsByTagName('sound');
    let scriptList = object.getElementsByTagName('script');

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

function parseScripts(script){
    let name = script.getAttribute("type");
    let currentScript = new Script(name);
    let brickList = script.getElementsByTagName('brickList')[0].children;

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
        if(brick.childNodes[i].nodeName == "ifBranchBricks" || brick.childNodes[i].nodeName == "loopBricks")
        {
            let loopOrIfBrickList = (brick.childNodes[i].children);
            for(let j = 0; j < loopOrIfBrickList.length; j++)
            {
                currentBrick.loopOrIfBrickList.push(parseBrick(loopOrIfBrickList[j]));
            }
        }
        if(brick.childNodes[i].nodeName == "elseBranchBricks")
        {
            let elseBrickList = (brick.childNodes[i].children);
            for(let j = 0; j < elseBrickList.length; j++)
            {
                currentBrick.elseBrickList.push(parseBrick(elseBrickList[j]));
            }
        }
    }
    return currentBrick;
}