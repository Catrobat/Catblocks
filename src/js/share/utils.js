/**
 * @fileoverview Catblocks integrationt into Web utilities
 * @author andreas.karner@student.tugraz.at (Andreas Karner)
 */

import $ from 'jquery';


/**
 * Default options defined here
 * @enum {object}
 */
export const defaultOptions = {
	render: {
		container: 'body',
		language: 'en_GB',
		renderSize: 0.75,
		shareRoot: '/public/',
		shareimages: 'images/catblocks/',
		noImageFound: 'No_Image_Available.jpg',
	},
	scene: {
		writeHeader: true,
		expandable: true
	},
	object: {
		writeHeader: true,
		writeStats: true,
		writeLook: false,
		expandable: true
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
 * Transform dom xml, execute actions define in options
 * @param {Element} xml to transform
 * @param {object} tagActions to map against tag elements
 */
export const transformXml = (xmlDom, tagActions) => {

	const tagNames = Object.keys(tagActions);
	for (let itag = 0; itag < tagNames.length; itag++) {
		const tagName = tagNames[itag];
		const nodes = xmlDom.getElementsByTagName(tagName);
		for (let inodes = 0; inodes < nodes.length; inodes++) {
			const actions = tagActions[tagName];
			for (let iaction = 0; iaction < actions.length; iaction++) {
				const actionType = actions[iaction].split('-')[0];
				const actionValue = actions[iaction].split('-')[1];
				switch (actionType) {
				case 'remAttr': {
					nodes[inodes].removeAttribute(actionValue);
					break;
				}
				default: {
					console.warn("Ignore undefined XML transformation.");
				}
				}
			}
		}
	}
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
	if (typeof container === 'string') {
		document.getElementById(container).appendChild(subContainer);
	}
	else {
		container.appendChild(subContainer);
	}
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
	parent.appendChild(element);

	return parent;
};

/**
 * Remove all children from node
 * @param {Element} node 
 */
export const removeAllChildren = (node) => {
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
			return ancestor.getElementsByClassName(name)[0];
		}
		return document.getElementById(name) ||
				document.querySelector(name)[0];
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
export const hasChildren = (element) => {
	switch (element.toString()) {
	case '[object HTMLDivElement]': {
		return (element.children !== undefined && element.children.length > 0);
	}
	case '[object HTMLCollection]': {
		return element.length;
	}
	default: {
		return element.children.length || element.hasChildNodes() || element.firstChild;
	}
	}
};

/**
 * Enable expandable
 * @param {*} node node to expand on trigger click
 * @param {*} trigger trigger to expand node
 */
export const enableExpandable = (node, trigger) => {
	$(node).addClass('container-closed');
	$(trigger).click(() => {
		$(node).toggleClass('container-open');
	});
};