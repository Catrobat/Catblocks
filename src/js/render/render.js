import { FileDropper } from "./file_dropper";

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

const renderProgram = (share, container, path, name, counter) => {
  // prepare container for program injection
  const containerId = `catblocks-program-${name}-${counter++}`;
  console.log(`Render program: ${name} with id: ${containerId}`);
  const programContainer = document.createElement('div');
  programContainer.id = containerId;
  const programHeader = document.createElement('h1');
  programHeader.innerText = `Program: ${name} -> RenderId: ${counter}`;
  programHeader.setAttribute('style', 'background-color: lawngreen;');
  programContainer.appendChild(programHeader);
  container.appendChild(programContainer);

  // inject code
  share.parser.convertProgramUri(`${path}${name}/code.xml`)
    .then(xmlDoc => {
      console.log(xmlDoc);
      const div = document.getElementById(containerId);
      share.injectAllScenes(div, xmlDoc, {
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

const renderProgramByLocalFile = (share, container, codeXML, name, counter, fileMap) => {
  try {
    // inject code
    const xmlDoc = share.parser.convertProgramStringDebug(codeXML);
    console.log(xmlDoc);

    // prepare container for program injection
    const containerId = `catblocks-program-${name}-${counter++}`;
    console.log(`Render program: ${name} with id: ${containerId}`);
    const programContainer = document.createElement('div');
    programContainer.id = containerId;
    const programHeader = document.createElement('h1');
    programHeader.innerText = `Program: ${name} -> RenderId: ${counter}`;
    programHeader.setAttribute('style', 'background-color: lawngreen;');
    programContainer.appendChild(programHeader);
    container.appendChild(programContainer);
    const div = document.getElementById(containerId);

    return share.injectAllScenes(div, xmlDoc, {
      object: {
        fileMap: fileMap
      } 
    });
  } catch (error) {
    return Promise.reject(error);
  }
};