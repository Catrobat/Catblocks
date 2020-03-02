/**
 * Fetch random test programs from catrobat share
 * 
 * @author andreas.karner@student.tugraz.at
 * @description this script will download some random test
 *  programms from catrobat share and store them locally
 *  It uses chromium headless interface [puppeteer](https://github.com/puppeteer/puppeteer/)
 * 
 */



const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Please change as needed
const OUTPUT_DIR = path.join(__dirname, 'fetchedPrograms');
const SHARE_URL = 'https://share.catrob.at/app/';
const PROG_COUNT = 200;

/**
 * Fetch programs via puppeteer
 * @return {Object} progIds
 */
const fetchProgIds = async () => {
  // please change headless to false, this will make the browser visible
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(SHARE_URL);

  // get all available programs
  const progIds = await page.evaluate(async (progCount) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const maxTry = 100;
    let curtry = 0;

    const progContainer = document.querySelector('#newest .programs');
    const loadMore = document.querySelector('#newest .button-show-more');
    while (curtry <= maxTry) {
      if (progContainer.childElementCount >= progCount) {
        console.log('Found enought programs, parse and return them');
        return Array.from(progContainer.children).map(prog => prog.id.replace('program-', '')).slice(0, progCount);
      }

      console.log('Fetch more programs and wait 5 seconds for page');
      loadMore.children[0].click();
      await delay(10000);

      // avoid infinity loooping
      curtry++;
    }
  }, PROG_COUNT);
  await browser.close();

  return progIds;
};


/**
 * Download all programms locally into OUTPUT_DIR
 */
(() => {
  fetchProgIds().then(progIds => {
    for (const progId of progIds) {
      const progName = `${progId}.catrobat`;
      console.log(`Download started for: ${progName}`);

      const progFile = fs.createWriteStream(path.join(OUTPUT_DIR, progName));
      https.get(`${SHARE_URL}download/${progName}`, res => {
        res.pipe(progFile);
        progFile.on('finish', () => {
          progFile.close(((progName) => {
            console.log(`Download complete for: ${progName}`);
          })(progName));
        });
      });
    }
  });
})();
