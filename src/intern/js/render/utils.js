import JSZip from 'jszip';
import { MessageBox } from './message_box';
import { renderAllPrograms } from './render';
import { FileLoader } from './file_loader';
import { FileDropper } from './file_dropper';
import { PasteListener } from './paste_listener';
import { CatBlocks } from '../../../library/js/lib';

/**
 * Gets the requested param from a passed URLSearchParam
 * @param {string} formatted like window.location.search
 * @param {string} key of the requested value to search in search_params
 * @returns {string} value or undefined if it does not exist
 */
export function getSearchParam(search_params, key) {
  if (search_params === undefined || search_params === null || search_params === '') {
    return undefined;
  }
  const urlSearchParams = new URLSearchParams(search_params);
  if (urlSearchParams === undefined || urlSearchParams === null) {
    return undefined;
  }
  if (!urlSearchParams.has(key)) {
    return undefined;
  }
  const value = urlSearchParams.get(key);
  return value ? value : undefined;
}

/**
 * Show or Hide loading overlay.
 * @param {string} event - onDone / onStart
 * @memberof FileDropper
 */
export function updateView(event) {
  switch (event) {
    case 'onStart':
      $('#loading-overlay').show();
      break;

    case 'onDone':
      $('#loading-overlay').hide();
      break;

    default:
      console.warn(`Ignore file dropper event: ${event}`);
  }
}

/**
 * Returns the Base64 Src String for HTML.
 * @param {string} fileName relative Path to File
 * @param {string} fileExt contains either exact file ending or a string which should contain the file ending
 * @param {string} base64 encoded file
 * @memberof FileDropper
 */
export function generateBase64Src(fileName, fileExt, base64) {
  // images
  if (fileExt.toLowerCase() === 'png' || fileExt.toLowerCase().includes('png')) {
    return 'data:image/png;charset=utf-8;base64,' + base64;
  }
  if (fileExt.toLowerCase() === 'jpg' || fileExt.toLowerCase().includes('jpg')) {
    return 'data:image/jpg;charset=utf-8;base64,' + base64;
  }
  if (fileExt.toLowerCase() === 'jpeg' || fileExt.toLowerCase().includes('jpeg')) {
    return 'data:image/jpeg;charset=utf-8;base64,' + base64;
  }

  // sound
  if (fileExt.toLowerCase() === 'wav' || fileExt.toLowerCase().includes('wav')) {
    return 'data:audio/wav;charset=utf-8;base64,' + base64;
  }
  if (fileExt.toLowerCase() === 'mp3' || fileExt.toLowerCase().includes('mp3')) {
    return 'data:audio/mp3;charset=utf-8;base64,' + base64;
  }

  // video
  if (fileExt.toLowerCase() === 'mp4' || fileExt.toLowerCase().includes('mp4')) {
    return 'data:video/mp4;charset=utf-8;base64,' + base64;
  }

  // last try
  if (fileName.includes('/images/')) {
    console.warn('generateBase64Src: guessing Image type for ' + fileName);
    return 'data:image/png;charset=utf-8;base64,' + base64;
  }
  if (fileName.includes('/sounds/')) {
    console.warn('generateBase64Src: guessing Sound type for ' + fileName);
    return 'data:audio/mp3;charset=utf-8;base64,' + base64;
  }

  // ignore the rest
  console.warn('generateBase64Src: Ignoring File ' + fileName);
  return '';
}

/**
 * Load .catrobat / .zip file
 * @param {file} containerfile
 * @param {number} containerCounter
 * @returns {Promise}
 */
export async function loadArchive(containerfile) {
  // open ZIP
  const zip = new JSZip();
  try {
    const element = await zip.loadAsync(containerfile, {
      createFolders: true
    });

    if (element.files['code.xml'] == null) {
      throw new Error('Code.xml not found');
    }

    const fileMap = {};
    let codeXML = '';

    const zipFileKeys = Object.keys(element.files);
    const filePromises = [];

    for (const key of zipFileKeys) {
      const file = element.files[key];

      if (!file.dir) {
        if (file.name.toLowerCase() === 'code.xml') {
          const promise = zip.file(file.name).async('string');
          filePromises.push(promise);

          promise.then(str => {
            codeXML = str;
          });
        } else {
          const promise = zip.file(file.name).async('base64');
          filePromises.push(promise);

          promise.then(base64 => {
            let fileEnding = file.name.split('.');

            if (fileEnding.length > 1) {
              fileEnding = fileEnding[fileEnding.length - 1];
              fileMap[file.name] = generateBase64Src(file.name, fileEnding, base64);
            } else {
              fileMap[file.name] = generateBase64Src(file.name, atob(base64).substr(0, 32), base64);
            }
          });
        }
      }
    }

    const response = await Promise.all(filePromises);
    if (response.length !== Object.keys(fileMap).length + 1) {
      MessageBox.show(
        '<b>' + containerfile.name + ':</b> Number of Files in Archive do not match number of read files.'
      );
      console.error('Number of Files in ZIP do not match number of read files');
    }

    return { fileMap: fileMap, codeXML: codeXML };
  } catch (error) {
    console.error(error);
    MessageBox.show('<b>Error:</b> The file could not be loaded. Maybe you passed an invalid .catrobat/.zip file.');
  }
  return null;
}

/**
 * Tries to render programs and loads URL or FileDropper if failed
 *
 * @param {string} programPath
 * @param {string} language
 */
export async function initShareAndRenderPrograms(programPath, language) {
  const catblocksWorkspaceContainer = 'catblocks-workspace-container';
  const programContainer = document.getElementById('catblocks-programs-container');
  const i18nLocation = window.location.href + 'i18n/';
  CatBlocks.init({
    container: catblocksWorkspaceContainer,
    renderSize: 0.75,
    shareRoot: '',
    media: 'media/',
    language: language,
    i18n: i18nLocation,
    noImageFound: 'No_Image_Available.jpg'
  });

  try {
    await renderAllPrograms(programContainer, programPath);
  } catch (e) {
    console.log(e);
    if (!(await loadProjectByURLParameter(programContainer))) {
      initializeFileDropper(programContainer);
    }
  }
}

/**
 * Tries to get program URL from parameter
 *
 * @param {Element} container
 * @returns {boolean} false if failed
 */
export async function loadProjectByURLParameter(container) {
  const urlToRender = getSearchParam(window.location.search, 'programurl');
  if (urlToRender !== undefined) {
    // if there is a program passed via url: try to parse
    const fl = new FileLoader(urlToRender, container);
    try {
      await fl.loadAndRenderProgram();
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

/**
 * Initialize FileDropper and PasteListener
 *
 * @param {Element} container
 */
export function initializeFileDropper(container) {
  const pasteListener = PasteListener.createInstance(container);
  pasteListener.enablePasteListener();

  const fd = FileDropper.createInstance(container);
  fd.enableDragAndDrop();
}
