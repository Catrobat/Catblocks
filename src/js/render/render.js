import { FileDropper } from "./file_dropper";
import $ from "jquery";

/**
 * Render all programs into one page
 * This code is only for testing purpose
 * 
 * @author andreas.karner@student.tugraz.at
 * 
 */


/**
 * Render all programs into page
 * @param {*} share 
 */
export const renderAllPrograms = (share, container, path) => {

  // inject very program from ${path} into ${container} dom

  fetch(path)
    .then(res => res.text())
    .then(text => {
      const page = (new DOMParser()).parseFromString(text, 'text/html');
      if (page === undefined) {
        const fd = FileDropper.createInstance(share, container, renderProgramByLocalFile);
        fd.enableDragAndDrop();
        return;
      }

      const files = page.getElementsByTagName('ul')[0] || undefined;
      if (files === undefined) {
        const fd = FileDropper.createInstance(share, container, renderProgramByLocalFile);
        fd.enableDragAndDrop();
        return;
      }

      // never trust a user :p
      const counter = 0;
      for (let idx = 0; idx < files.childElementCount; idx++) {
        const fileli = files.children[idx];
        const filea = fileli.getElementsByTagName('a')[0];

        const name = (filea.title !== '') ? filea.title : filea.innerText;
        if (name === '..' || name === '.') continue;

        renderProgram(share, container, path, name, counter);
      }
    });
};

/**
 * Render a program from filesystem
 * @param {Share} share instance of share
 * @param {Element} container parent container for structure
 * @param {string} path path of the folder containing the program
 * @param {string} name name of the program file
 * @param {number} counter number added to ID to be unique
 */
const renderProgram = (share, container, path, name, counter) => {
  // prepare container for program injection
  const programContainer = createProgramContainer(container);
  const programID = `catblocks-program-${name}-${counter++}`;

  // inject code
  share.parser.convertProgramUri(`${path}${name}/code.xml`)
    .then(xmlDoc => {
      console.log(xmlDoc);
      share.injectAllScenes(programID, programContainer, xmlDoc, {
        object: {
          programRoot: `${path}${name}/`
        }
      });
    })
    .catch(err => {
      console.error(`Failed to parse catroid file.`);
      console.error(`${path}${name}/code.xml failed`);
      console.error(err);
    });
};

/**
 * Render a local program (only on JS, not uploaded anywhere)
 * @param {Share} share instance of share
 * @param {Element} container parent container for strcuture
 * @param {string} codeXML XML content of code.xml in program
 * @param {string} name name of the program
 * @param {number} counter number added to ID to be unique
 * @param {Object} fileMap contains [path => base64_of_file]
 */
const renderProgramByLocalFile = (share, container, codeXML, name, counter, fileMap) => {
  try {
    // inject code
    const xmlDoc = share.parser.convertProgramStringDebug(codeXML);
    const programJSON = share.parser.convertProgramToJSONDebug(codeXML);

    // prepare container for program injection
    const programContainer = createProgramContainer(container);

    const programID = `catblocks-program-${name}-${counter++}`;
    return share.renderProgramJSON(programID, programContainer, programJSON, xmlDoc, {
      object: {
        fileMap: fileMap
      }
    });
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

/**
 * Create container for the program.
 * @param {Element} container Parent container for structure
 * @returns {Element} container for injecting scenes
 */
const createProgramContainer = (container) => {
  const $programContainer = $('<div/>', {
    class: 'container text-dark'
  });
  $(container).append($programContainer);
  return $programContainer[0];
};