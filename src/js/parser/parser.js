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
	}
}

class Formula {
	constructor() {
		this.value = "";
		this.left = null;
		this.right = null;
	}
	setLeft(leftBlock) {
		if (this.left === null) {
			this.left = leftBlock;
		}
		else {
			this.left.setLeft(leftBlock);
		}
	}
	setRight(rightBlock) {
		if (this.right === null) {
			this.right = rightBlock;
		}
		else {
			this.right.setRight(rightBlock);
		}
	}
}

function loadFile(uri) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open("GET", uri, true);
		request.onload = () => {
			if (request.readyState == 4 && request.status == 200) {
				resolve(request.responseXML);
			} else {
				reject(request.status);
			}
		};
		request.onerror = () => {
			reject(request.status);
		};
		request.send();
	});
}
function parseXML(xml) {
	const sceneList = [];
	const scenes = xml.getElementsByTagName('scenes')[0].children;
	for (let i = 0; i < scenes.length; i++) {
		sceneList.push(parseScenes(scenes[i]));
	}
	console.log(sceneList);
}
function parseScenes(scene) {
	const name = (scene.getElementsByTagName("name")[0].childNodes[0].nodeValue);
	const currentScene = new Scene(name);
	const objectList = scene.getElementsByTagName('objectList')[0].children;
	for (let i = 0; i < objectList.length; i++) {
		currentScene.objectList.push(parseObjects(objectList[i]));
	}
	return currentScene;
}
function parseObjects(object) {
	const name = object.getAttribute("name");
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
	const name = script.getAttribute("type");
	const currentScript = new Script(name);
	const brickList = script.getElementsByTagName('brickList')[0].children;
	for (let i = 0; i < script.childNodes.length; i++) {
		checkUsage(script.childNodes[i], currentScript);
	}

	for (let i = 0; i < brickList.length; i++) {
		currentScript.brickList.push(parseBrick(brickList[i]));
	}
	return currentScript;
}
function parseBrick(brick) {
	const name = brick.getAttribute("type");
	const currentBrick = new Brick(name);

	for (let i = 0; i < brick.childNodes.length; i++) {
		checkUsage(brick.childNodes[i], currentBrick);
	}
	return currentBrick;
}
function checkUsage(list, location) {
	if (list.nodeName === "broadcastMessage" || list.nodeName === "spriteToBounceOffName" || list.nodeName === "receivedMessage" || list.nodeName === "sceneToStart" || list.nodeName === "sceneForTransition") {
		location.formValues.set("DROPDOWN", list.childNodes[0].nodeValue);
	}
	if (list.nodeName === "spinnerSelection") {
		location.formValues.set("spinnerSelection", list.childNodes[0].nodeValue);
	}
	if (list.nodeName === "selection") {
		location.formValues.set("selection", list.childNodes[0].nodeValue);
	}
	if (list.nodeName === "type") {
		location.formValues.set("type", list.childNodes[0].nodeValue);
	}
	if (list.nodeName === "alignmentSelection") {
		location.formValues.set("alignmentSelection", list.childNodes[0].nodeValue);
	}
	if (list.nodeName === "spinnerSelectionID") {
		location.formValues.set("spinnerSelectionID", list.childNodes[0].nodeValue);
	}
	if (list.nodeName === "formulaMap" || list.nodeName === "formulaList") {
		const formulaList = list.children;
		for (let j = 0; j < formulaList.length; j++) {
			const formula = new Formula();
			workFormula(formula, formulaList[j]);
			const attribute = formulaList[j].getAttribute("category");
			location.formValues.set(attribute, concatFormula(formula, ""));
		}
	}
	if (list.nodeName === "ifBranchBricks" || list.nodeName === "loopBricks") {
		const loopOrIfBrickList = (list.children);
		for (let j = 0; j < loopOrIfBrickList.length; j++) {
			location.loopOrIfBrickList.push(parseBrick(loopOrIfBrickList[j]));
		}
	}
	if (list.nodeName === "elseBranchBricks") {
		const elseBrickList = (list.children);
		for (let j = 0; j < elseBrickList.length; j++) {
			location.elseBrickList.push(parseBrick(elseBrickList[j]));
		}
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
		if (input.childNodes[i].nodeName === "value") {
			formula.value = input.childNodes[i].childNodes[0].nodeValue;
		}
	}
}
function concatFormula(formula, str) {
	if (formula.left !== null) {
		str = concatFormula(formula.left, str);
	}
	//Manage Operators & language strings
	str += formula.value;
	str += " ";
	if (formula.right !== null) {
		str = concatFormula(formula.right, str);
	}
	return str;
}

export default class Parser {
	static parseText(xmlString) {
		return parseXML(new window.DOMParser().parseFromString(xmlString, "text/xml"));
	}
	static parseFile(xmlFile) {
		loadFile(xmlFile).then(xml => {
			return parseXML(xml);
		}).catch(error => {
			console.error(error);
		});
	}
}