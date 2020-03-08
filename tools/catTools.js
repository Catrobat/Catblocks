/**
 * Catblocks utilities
 * 
 * @author andreas.karner@student.tugraz.at
 * @description utilities for tool scripts
 */

const fs = require('fs');
const util = require('util');
const https = require('https');
var Promise = require('promise');
const puppeteer = require('puppeteer');
const exec = util.promisify(require('child_process').exec);

/**
 * Create directory recursive
 * @param {String} dir 
 */
const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    console.info(`Create new output direcotry ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Remove directory recursive
 * @param {String} dir 
 */
const removeDirectory = (dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Remove directory ${dir}`);
    fs.rmdirSync(dir, { recursive: true });
  }
}

/**
 * Remove file
 * @param {String} path 
 */
const removeFile = (path) => {
  if (fs.existsSync(path)) {
    console.log(`Remove file ${path}`);
    fs.unlinkSync(path);
  }
}

/**
 * Wait milliseconds
 * @param {*} ms 
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Fetch program ids from share via puppeteer
 * @param {Number} count program count to fetch from share 
 * @param {String} shareurl share root url to fetch programs from
 * @returns {array}
 */
const fetchProgIds = async (count, shareurl) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.info(`Fetch share page: ${shareurl} and fetch first ${count} freshes programs`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(shareurl, { waitUntil: "networkidle0" });
  await page.waitForSelector('div#newest div.programs div.program');

  const progIds = await page.evaluate(async (progCount) => {

    const maxTry = 1000;
    let curtry = 0;

    const progContainer = document.querySelector('#newest .programs');
    const loadMore = document.querySelector('#newest .button-show-more');
    while (curtry <= maxTry) {
      if (progContainer.childElementCount >= progCount) {
        console.log('Found enought programs, parse and return them');
        return Array.from(progContainer.children).map(prog => prog.id.replace('program-', '')).slice(0, progCount);
      }
      console.log('Fetch more programs and wait 1 seconds for page');
      loadMore.children[0].click();
      await delay(1000);

      curtry++;
    }
  }, count);
  await browser.close();
  console.log(`Fetched first ${count} freshes programs`);
  return progIds;
};

/**
 * Download remote file and store it into dest
 * @param {*} url 
 * @param {*} dest 
 */
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    console.log(`Start downloading: ${url} into: ${dest}`);
    const progFile = fs.createWriteStream(dest);
    https.get(url, res => res.pipe(progFile))
      .on('error', (err) => {
        progFile.close();
        reject(err);
      });

    progFile.on('finish', () => {
      progFile.close();
      resolve(dest);
    });
  });
}

/**
 * Run yarn action
 * @param {string} argument to run with yarn
 */
const runYarn = async (argument) => {
  const command = `yarn run ${argument}`;
  console.info(`Run command: ${command}`);
  return exec(command);
}

module.exports = {
  createDirectory,
  removeDirectory,
  removeFile,
  fetchProgIds,
  downloadFile,
  runYarn,
  delay
}