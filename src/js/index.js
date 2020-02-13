/**
 * @author andreas.karner@student.tugraz.at
 * @copyright Catrobat
 * @description Catrobat report page builder
 */

import './../css/style.scss';


// please keep those links up to date
const REPO_OWNER = 'Catrobat';
const REPO_NAME = 'Catblocks';
const REPO_BRANCH = 'gh-pages';
const REPO_FOLDER = 'reports';

// dom node ids
const TABLE_ID = 'test-run-table';


/**
 * Validate if html is rendered proplery
 * 
 * @method validateHtml
 */
const validateHtml = () => {
  const resultTable = document.getElementById(TABLE_ID);
  if (resultTable === undefined) {
    return false;
  }
  if (resultTable.tHead === undefined) {
    resultTable.appendChild(document.createElement('thead'));
  }
  if (resultTable.tBodies.length === 0) {
    resultTable.appendChild(document.createElement('tbody'));
  }

  // TODO: please extend this section here

  return true;
};

/**
 * return api request url for github api (https://developer.github.com/v3/)
 * 
 * @method prepareGithubApi
 * @param {string} owner 
 * @param {string} name 
 * @param {string} branch 
 * @param {string} folder 
 * @returns {string}
 */
const prepareGithubApi = (owner = REPO_OWNER, name = REPO_NAME, branch = REPO_BRANCH, folder = REPO_FOLDER) => {
  return `https://api.github.com/repos/${owner}/${name}/contents/${folder}?ref=${branch}`;
};

/**
 * Fetch all reports via github api (https://developer.github.com/v3/)
 * 
 * @method fetchReports
 * @param {string} url 
 * @returns {object}
 */
const fetchReports = async (url) => {
  if (url === undefined || url === "") {
    throw Error('No url defined for fetching reports.');
  }

  const res = await fetch(url);
  const json = await res.json();
  return json.map(file => {
    const props = file['name'].split('.')[0].split('_');
    return Object.assign({}, {
      'commit': file['sha'],
      'branch': props[1],
      'datetime': props[4],
      'author': props[3],
      'report': file['path'],
    })
  });
};


/**
 * Return new DOM row element filled with column values
 * 
 * @method newDOMRow
 * @param {Object} colValues
 * @param {String} colType
 * @returns {Element}
 */
const newDOMRow = (colValues = {}, colType = 'td') => {
  const colElement = (colType === 'td' || colType === 'th') ? colType : 'td';
  const row = document.createElement('tr');

  for (const colValue of colValues) {
    const col = document.createElement(colValue['type'] ? colValue['type'] : colElement);
    row.appendChild(col);

    Object.keys(colValue).forEach(key => {
      switch (key) {
        case 'value':
          col.innerText = colValue[key];
          break;
        case 'link':
          const link = document.createElement('a');
          link.innerText = colValue[key]['value'];
          link.href = colValue[key]['href'];
          link.setAttribute('class', 'btn btn-primary');
          col.appendChild(link);
          break;
        default:
          col.setAttribute(key, colValue[key]);
      }
    });
  }
  return row;
}

/**
 * Return new DOM thead row
 * 
 * @method newDOMTHead
 * @param {Object} colValues
 * @returns {Element}
 */
const newDOMTHead = (colValues) => {
  return newDOMRow(colValues, 'th');
}
/**
 * Write empty reports header if no reports exists
 * 
 * @method writeEmptyHeader
 */
const writeEmptyHeader = () => {
  const thead = document.getElementById(TABLE_ID).tHead;
  thead.appendChild(newDOMTHead([{ 'scope': 'col', 'value': 'No reports found, please trigger some Catblocks tests' }]));
};

/**
 * Inject all reports into your report table
 * 
 * @method reports
 * @param {Promise} files 
 */
const injectReportRows = async (reports) => {
  const table = document.getElementById(TABLE_ID);
  const thead = table.tHead;
  const tbody = table.tBodies[0];
  const reportValues = await reports;

  // write theader
  const headerRow = newDOMTHead(Object.keys(reportValues[0]).map(colName => Object.assign({}, { 'scope': 'col', 'value': colName })));
  thead.appendChild(headerRow);

  // write test rows
  for (const value of reportValues) {
    const colValue = Object.keys(value).map(colName => {
      switch (colName) {
        case 'id': return { 'type': 'th', 'scope': 'row', 'value': value[colName] };
        case 'report': return { 'link': { 'href': value[colName], 'value': 'Open Report' } };
        default: return { 'value': value[colName] }
      }
    });
    tbody.appendChild(newDOMRow(colValue));
  }
};


/**
 * webpage entry function
 * fetch all reports and inject to the webpage
 */
(async () => {

  if (!validateHtml()) {
    console.error('Valid to validiate all components of the page, please contact some developer.');
    return;
  }
  console.log(prepareGithubApi());

  const requestUrl = prepareGithubApi();
  var reports = fetchReports(requestUrl);

  if (reports.length === 0) {
    console.warn('No reports found, please verify if this is possible');
    writeEmptyHeader();
    return;
  }

  injectReportRows(reports);
})();