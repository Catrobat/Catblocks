import { CatBlocks, renderProgram } from '../../../library/js/lib_share';
import { Parser } from '../../../common/js/parser/parser';
import $ from 'jquery';

/**
 * Render all programs into one page
 * This code is only for testing purpose
 */

/**
 * Render all programs into page
 * @param {Element} container parent container for structure
 * @param {string} path path where the file is
 * @returns {Promise}
 */
export async function renderAllPrograms(container, path) {
  // inject very program from ${path} into ${container} dom

  const file = await fetch(path);
  const text = await file.text();

  const page = new DOMParser().parseFromString(text, 'text/html');
  if (page === undefined) {
    throw new Error('Page is undefined');
  }

  if (file.statusText === 'Not Found') {
    throw new Error('INFO: Found no Programs');
  }

  const files = page.getElementsByTagName('ul')[0] || undefined;

  if (files === undefined || files.childElementCount === 0) {
    throw new Error('No Files in List');
  }

  for (let idx = 0; idx < files.childElementCount; idx++) {
    const fileli = files.children[idx];
    const filea = fileli.getElementsByTagName('a')[0];

    const name = filea.title !== '' ? filea.title : filea.innerText;
    if (name === '..' || name === '.') {
      continue;
    }

    renderProgram(container, path, name, idx);
  }
}

/**
 * Render a local program (only on JS, not uploaded anywhere)
 * @param {Element} container parent container for strcuture
 * @param {string} codeXML XML content of code.xml in program
 * @param {string} name name of the program
 * @param {number} counter number added to ID to be unique
 * @param {Object} fileMap contains [path => base64_of_file]
 */
export function renderProgramByLocalFile(container, codeXML, name, counter, fileMap) {
  // inject code
  const programJSON = Parser.convertProgramToJSONDebug(codeXML);

  // prepare container for program injection
  const programContainer = createProgramContainer(container, name, counter);

  const programID = `catblocks-program-${name}-${counter}`;
  CatBlocks.getInstance().share.renderProgramJSON(
    programID,
    programContainer,
    programJSON,
    {
      object: {
        fileMap: fileMap
      }
    },
    true
  );
}

/**
 * Create container for the program.
 * @param {Element} container Parent container for structure
 * @param programName contains name of the file
 * @param programCounter the current number of program rendered
 * @returns {Element} container for injecting scenes
 */
function createProgramContainer(container, programName, programCounter) {
  const $programContainer = $('<div/>', {
    class: 'catblocks-container text-dark catblocks-scene-header card-header collapsed',
    text: 'Program ' + programCounter + ' / ' + programName
  });
  $(container).append($programContainer);
  console.log(programName);
  console.log(container);
  console.log($programContainer);
  return $programContainer[0];
}
