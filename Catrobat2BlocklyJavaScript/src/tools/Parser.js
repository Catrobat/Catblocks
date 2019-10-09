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
        this.subBlock1 = [];
        this.subBlock2 = [];
        this.formula = "";
        this.formValues = [];
    }
}


function parseFile(xml) {
    //console.log("in parse file");
    //console.log(xml.responseText);
    var scenes = xml.getElementsByTagName('scene');
    //console.log(scenes.length);

    for(sceneIT = 0; sceneIT < scenes.length; sceneIT++)
    {
        parseScenes(scenes[sceneIT]);
    }




}

function parseScenes(scene) {
    var name = (scene.getElementsByTagName("name")[0].childNodes[0].nodeValue);
    var currScene = new Scene(name);
    var objects = scene.getElementsByTagName('object');


    //console.log(objects.length);

    for(objectIT = 0; objectIT < objects.length; objectIT++)
    {
        currScene.objectList.push(parseObjects(objects[objectIT]));

    }
    console.log(currScene);
}

function parseObjects(object) {
    //console.log(object.getAttribute("name"));
    var name = object.getAttribute("name");
    var currObject = new Object(name);
    var looks = object.getElementsByTagName('look');
    var sounds = object.getElementsByTagName('sound');
    var scripts = object.getElementsByTagName('script');

    for(lookIT = 0; lookIT < looks.length; lookIT++)
    {
        currObject.lookList.push(new File(looks[lookIT].getAttribute("name"), looks[lookIT].getAttribute("fileName")));
        //console.log("here");
    }
    //console.log(currObject.lookList);
    for(soundIT = 0; soundIT < sounds.length; soundIT++)
    {
        currObject.soundList.push(new File(sounds[soundIT].getAttribute("name"), sounds[soundIT].getAttribute("fileName")));
    }

    for(scriptIT = 0; scriptIT < scripts.length; scriptIT++)
    {
        currObject.scriptList.push(parseScripts(scripts[scriptIT]));
    }


    return currObject;

}

function parseScripts(script){
    var name  = script.getAttribute("type");
    var currScript = new Script(name);

    var bricks = script.getElementsByTagName('brickList')[0].children;


    //console.log("------------------------");
    //console.log(bricks);
    //console.log("------------------------");

    for(brickIT = 0; brickIT < bricks.length; brickIT++)
    {
        currScript.brickList.push(parseBrick(bricks[brickIT]));
    }
    return currScript;
}

function parseBrick(brick){
    var name = brick.getAttribute("type");
    console.log(name);
    var currBrick = new Brick(name);
    var brickList = [];
    var brickList2 = [];


    if(brick.children.getElementsByTagName("ifBranchBricks").length != 0 || brick.getElementsByTagName("loopBricks").length != 0)
    {

        if(brick.getElementsByTagName("loopBricks").length != 0)
        {
            brickList = (brick.getElementsByTagName("loopBricks")[0].children);

        }
        else
        {
            brickList = (brick.getElementsByTagName("ifBranchBricks")[0].children);

        }

        console.log("-----------if-----------");
        //console.log(brickList);
        //console.log(currBrick);
        //console.log("------------------------");

        for(subBrickIT = 0; subBrickIT < brickList.length; subBrickIT++)
        {
            currBrick.subBlock1.push(parseBrick(brickList[subBrickIT]));
        }
    }
    if(brick.getElementsByTagName("elseBranchBricks").length != 0)
    {
        brickList2 = brick.getElementsByTagName("elseBranchBricks")[0].children;

        console.log("---------else-----------");
        //console.log(brickList);
        //console.log(currBrick);
        //console.log("------------------------");

        for(subBrickIT2 = 0; subBrickIT2 < brickList2.length; subBrickIT2++)
        {
            currBrick.subBlock2.push(parseBrick(brickList2[subBrickIT2]));
        }
    }

    console.log("------------------------");
    console.log(currBrick);
    console.log("------------------------");
    return currBrick;
}