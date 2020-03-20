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
        container.innerText = 'No programs found, please pass some';
        return;
      }

      const files = page.getElementsByTagName('ul')[0] || undefined;
      if (files === undefined) {
        container.innerText = 'No programs found, please pass some';
        return;
      }

      // never trust a user :p
      let counter = 0;
      for (let idx = 0; idx < files.childElementCount; idx++) {
        const fileli = files.children[idx];
        const filea = fileli.getElementsByTagName('a')[0];

        const name = (filea.title !== '') ? filea.title : filea.innerText;
        if (name === '..' || name === '.') continue;

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
      }
    });
};
