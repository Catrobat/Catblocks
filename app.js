const API_URL = 'https://api.github.com/repos/Catrobat/Catblocks/contents/reports?ref=gh-pages'

/**
 * Load all values from github io folder via github api v3
 * @param {string} url 
 */
const getFiles = async (url=API_URL) => {
  const res = await fetch(API_URL);
  const json = await res.json();
  console.log(json);
  return json.map(file => Object.assign({}, {
    'name': file['name'],
    'path': file['path'],
    'sha': file['sha']
  }));
};

const newRow = (name, url) => {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  const link = document.createElement('a');
  link.href = url;
  link.innerText = name;
  row.appendChild(link);
  return row;
};

const injectFiles = async (files) => {
  const exporer = document.getElementById('explorer');
  for (const file of await files) {
    console.log(file);
    exporer.appendChild(newRow(file.name, file.path));
  }  
};