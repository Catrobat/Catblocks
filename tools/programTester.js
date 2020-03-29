/**
 * Render automatically programs from share and report errors and warnings into log file
 * 
 * @author andreas.karner@student.tugraz.at
 * @description script downlods several programs and renders
 *  each via puppeteer and fetches console events
 * 
 */

'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');
var Promise = require('promise');
var extract = require('extract-zip');
const catUtils = require('./catTools');
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const ArgumentParser = require('argparse').ArgumentParser;

const REPOHOME = path.join(__dirname, '../');
const DEF_SHAREURL = 'https://share.catrob.at/app/';
const DEF_PROGCOUNT = 10;
const DEF_RENDERDIR = path.join(REPOHOME, 'dist/assets/programs/');
const DEF_OUTPUT = path.join(REPOHOME, 'tools/output.log');

/**
 * Init arguments for script
 * @returns {object} parsed arguments
 */
const parseArgs = () => {
  var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Fetching share programs'
  });
  parser.addArgument(['-c', '--count'], { help: 'Import count', defaultValue: DEF_PROGCOUNT, type: Number, dest: 'count' });
  parser.addArgument(['-o', '--output'], { help: 'Output file', defaultValue: DEF_OUTPUT, type: String, dest: 'outputfile' });
  parser.addArgument(['-d', '--daemon'], { help: 'Run as daemon', defaultValue: false, type: Boolean, dest: 'daemon', action: 'storeTrue' });
  parser.addArgument(['-r', '--render-dir'], { help: 'Share dist direcotry', defaultValue: DEF_RENDERDIR, type: String, dest: 'renderdist' });
  parser.addArgument(['-s', '--share-url'], { help: 'Share rooturl', defaultValue: DEF_SHAREURL, type: String, dest: 'shareurl' });
  return parser.parseArgs();;
};

/**
 * Build Catblocks project
 * @param {Object} 
 */
const buildProject = async (args) => {
  await catUtils.runYarn('clean');
  await catUtils.runYarn('render:build');
  catUtils.createDirectory(args['renderdist']);
}

/**
 * Spawn web server for rendering
 */
const spawnWebServer = () => {
  const webServer = spawn('python', ['-m', 'http.server', '8080'], {
    cwd: path.join(REPOHOME, 'dist')
  });
  webServer.on('error', (err) => { console.error(`Webserver received error event, will shutdown certainly.`); console.error(err); });
  webServer.on('exit', (code, signal) => console.info(`WebServer exit by signal ${signal} with exit code ${code}`));
  return webServer;
}

/**
 * Render program and fetch browser console logs
 * @param {String} progPath 
 * @param {Number} outputFd
 */
const getRenderLog = async (progPath) => {
  console.info(`Start rendering program ${progPath}`);

  const logMsg = {}
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 800 });

  page.on('console', message => {
    switch (message.type()) {
      case 'error':
      case 'warning':
        if (!logMsg[message.type()]) logMsg[message.type()] = new Set();
        logMsg[message.type()].add(message.text());
        break;
    }
  });

  await page.goto('http://127.0.0.1:8080', { waitUntil: "networkidle2", timeout: 30000 })
    .catch(async err => {
      console.error('Failed to load http://127.0.0.1:8080');
      console.log(err);
      for (const prop of Object.keys(logMsg)) {
        delete logMsg[prop];
      }
      await page.reload({ waitUntil: "networkidle2", timeout: 30000 })
        .catch(err => {
          console.log('failed to reload either');
          console.error(err);
        });
    });

  await page.evaluate(() => {
    const wrongAssigned = Array.from(document.querySelectorAll('.blocklyText')).filter(txt => txt.innerHTML === 'DEFAULT_VALUE');
    if (wrongAssigned.length > 0) {
      console.error('Some values assigned wrong');
    }
  });
  await page.close();
  await browser.close();
  console.info(`Finished rendering program ${progPath}`);

  Object.keys(logMsg).map(key => logMsg[key] = Array.from(logMsg[key]));
  return JSON.stringify(logMsg);
};

// /**
//  * Program worker, download extract and render
//  * @param {*} task 
//  * @param {*} callback 
//  */
const progWorker = (task, callback) => {
  const progName = `${task['progHash']}.catrobat`;
  const shareUrl = `${task['shareurl']}download/${progName}`;
  const destFile = path.join(task['renderdist'], progName);

  catUtils.downloadFile(shareUrl, destFile)
    .then(filePath => {
      console.log(`Finished downloding ${destFile}`);
      const progFolder = filePath.replace('.catrobat', '');

      console.info(`Start extracting program ${filePath}`);
      extract(filePath, { dir: progFolder }, async (err) => {
        catUtils.removeFile(filePath);

        if (err) {
          console.error(`Failed to extract ${filePath}`);
          console.error(err);
          fs.writeSync(task['outputFd'], `${task['progHash']}: Failed to extract ${filePath}\n`);
        } else {
          console.info(`Successfully extracted ${filePath}`);
          const renderMsgs = await getRenderLog(progFolder);
          fs.writeSync(task['outputFd'], `${task['progHash']}: ${renderMsgs}\n`);
          catUtils.removeDirectory(progFolder);
        }
        callback();
      });
    })
    .catch(err => {
      console.error(`Failed to download ${shareUrl}`);
      fs.writeSync(task['outputFd'], `${task['progHash']}: Failed to download\n`);
      callback();
    });
}

/**
 * Start share watcher and push new progIds into queue
 * @param {*} queue 
 */
const startShareWatcher = async (args, queue, outputFd) => {
  let lastProgId = 'undefined';
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(args['shareurl'], { waitUntil: "networkidle0" });

  while (1) {
    console.log(`Check share for newer programs than ${lastProgId}`);
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('div#newest div.programs div.program');

    const newProgIds = await page.evaluate(async (lastProgId) => {
      const newProgs = Array.from(document.querySelectorAll('div#newest div.programs div.program'))
        .map(prog => prog.id.replace('program-', ''));

      return newProgs.slice(0, newProgs.indexOf(lastProgId));
    }, lastProgId);

    newProgIds.reverse().forEach(progId => {
      console.log(`Push new progId ${progId} into queue`);
      queue.push(Object.assign({}, args, { progHash: progId, outputFd: outputFd }));
      lastProgId = progId;
    });
    console.log(`Wait for ${10000}ms`);
    await catUtils.delay(10000);
  }
}

/**
 * Main function
 */
(async () => {
  const args = parseArgs();
  console.info(`Started to render share programs automatically`);

  await buildProject(args);
  const server = spawnWebServer();
  const outputFd = fs.openSync(args['outputfile'], 'a');

  var queue = async.queue(progWorker, 1);

  if (args['daemon']) {
    console.info(`Start daemon and watch share programs`);
    await startShareWatcher(args, queue, outputFd);

  } else {
    catUtils.fetchProgIds(args['count'], args['shareurl']).then(progIds => {
      progIds.forEach(progId => {
        queue.push(Object.assign({}, args, { progHash: progId, outputFd: outputFd }));
      });
    });
  }
  queue.drain(function() {
    console.info('Processed all queue entries');
    server.kill('SIGINT');
    fs.closeSync(outputFd);
  });
})();
