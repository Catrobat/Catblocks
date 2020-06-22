import { FileDropper } from './file_dropper';
import { getSearchParam } from './utils';
import { FileLoader } from './file_loader';
import { PasteListener } from './paste_listener';

/**
 * Render all programs into one page
 * This code is only for testing purpose
 *
 * @author andreas.karner@student.tugraz.at
 *
 */

/**
 * Render all programs into page
 * @param {Share} share instance of share
 * @param {Element} container parent container for structure
 * @param {string} path path where the file is
 * @returns {Promise}
 */
export const renderAllPrograms = (share, container, path) => {
  // inject very program from ${path} into ${container} dom

  return fetch(path)
    .then(res => res.text())
    .then(text => {
      const page = new DOMParser().parseFromString(text, 'text/html');
      if (page === undefined) {
        const urlToRender = getSearchParam(window.location.search, 'programurl');
        if (urlToRender !== undefined) {
          // if there is a program passed via url: try to parse
          const fl = new FileLoader(urlToRender, share, container, renderProgramByLocalFile);
          fl.loadAndRenderProgram().then(success => {
            if (!success) {
              const pasteListener = PasteListener.createInstance(share, container, renderProgramByLocalFile);
              pasteListener.enablePasteListener();

              const fd = FileDropper.createInstance(share, container, renderProgramByLocalFile);
              fd.enableDragAndDrop();
            }
          });
          return;
        }
        const pasteListener = PasteListener.createInstance(share, container, renderProgramByLocalFile);
        pasteListener.enablePasteListener();

        const fd = FileDropper.createInstance(share, container, renderProgramByLocalFile);
        fd.enableDragAndDrop();
        return;
      }

      const files = page.getElementsByTagName('ul')[0] || undefined;
      if (files === undefined || files.childElementCount === 0) {
        const urlToRender = getSearchParam(window.location.search, 'programurl');
        if (urlToRender !== undefined) {
          // if there is a program passed via url: try to parse
          const fl = new FileLoader(urlToRender, share, container, renderProgramByLocalFile);
          fl.loadAndRenderProgram().then(success => {
            if (!success) {
              const pasteListener = PasteListener.createInstance(share, container, renderProgramByLocalFile);
              pasteListener.enablePasteListener();

              const fd = FileDropper.createInstance(share, container, renderProgramByLocalFile);
              fd.enableDragAndDrop();
            }
          });
          return;
        }
        const pasteListener = PasteListener.createInstance(share, container, renderProgramByLocalFile);
        pasteListener.enablePasteListener();

        const fd = FileDropper.createInstance(share, container, renderProgramByLocalFile);
        fd.enableDragAndDrop();
        return;
      }

      for (let idx = 0; idx < files.childElementCount; idx++) {
        const fileli = files.children[idx];
        const filea = fileli.getElementsByTagName('a')[0];

        const name = filea.title !== '' ? filea.title : filea.innerText;
        if (name === '..' || name === '.') {
          continue;
        }

        renderProgram(share, container, path, name, idx);
      }
    });
};

/**
 * Render a program from filesystem, used on share.
 * Does not catch any errors.
 * @param {Share} share instance of share
 * @param {Element} container parent container for structure
 * @param {string} path path of the folder containing the program
 * @param {string} name name of the program file
 * @param {number} counter number added to ID to be unique
 * @returns {Promise}
 */
export const renderProgram = (share, container, path, name, counter = -1) => {
  // be sure that path has a trailing slash
  path = path.replace(/\/$/, '') + '/';

  // remove the leading slash
  name = name.replace(/^\//, '');

  return fetch(`${path}${name}/code.xml`)
    .then(res => res.text())
    .then(codeXML => {
      const programJSON = share.parser.convertProgramToJSONDebug(codeXML);

      // prepare container for program injection
      const programContainer = createProgramContainer(container);

      let programID = `catblocks-program-${name}`;
      if (counter >= 0) {
        programID = `catblocks-program-${name}-${counter}`;
      }

      share.renderProgramJSON(programID, programContainer, programJSON, {
        object: {
          programRoot: `${path}${name}/`
        }
      });
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
  // inject code
  const programJSON = share.parser.convertProgramToJSONDebug(codeXML);

  // prepare container for program injection
  const programContainer = createProgramContainer(container);

  const programID = `catblocks-program-${name}-${counter}`;
  share.renderProgramJSON(programID, programContainer, programJSON, {
    object: {
      fileMap: fileMap
    }
  });
};

/**
 * Create container for the program.
 * @param {Element} container Parent container for structure
 * @returns {Element} container for injecting scenes
 */
const createProgramContainer = container => {
  const $programContainer = $('<div/>', {
    class: 'catblocks-container text-dark'
  });
  $(container).append($programContainer);
  return $programContainer[0];
};
