/**
 * Download n freshest programs from share
 * 
 * @author andreas.karner@student.tugraz.at
 * @description download n freshest programs from share
 */

'use strict';

const path = require('path');
const async = require('async');
const catUtils = require('./catTools');
const ArgumentParser = require('argparse').ArgumentParser;

const DEF_PROGCOUNT = 200;
const DEF_WORKERCOUNT = 5;
const DEF_SHAREURL = 'https://share.catrob.at/app/';
const DEF_OUTPUTDIR = path.join(__dirname, 'fetchedPrograms');

/**
 * Init arguments for script
 * @returns {Object} parsed arguments
 */
const parseArgs = () => {
  var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Fetching share programs'
  });
  parser.addArgument(['-c', '--count'], { help: 'Programs count', defaultValue: DEF_PROGCOUNT, type: Number, required: true, dest: 'count' });
  parser.addArgument(['-o', '--output-dir'], { help: 'Output directory', defaultValue: DEF_OUTPUTDIR, type: String, dest: 'outputdir' });
  parser.addArgument(['-s', '--share-url'], { help: 'Share rooturl', defaultValue: DEF_SHAREURL, type: String, dest: 'shareurl' });
  parser.addArgument(['-w', '--worker'], { help: 'Worker count for downloading', defaultValue: DEF_WORKERCOUNT, type: Number, dest: 'workercount' });
  return parser.parseArgs();;
};

/**
 * Main function
 */
(() => {
  const args = parseArgs();
  console.info(`Started to downoad ${args['count']} programs from ${args['shareurl']} into ${args['outputdir']}`);
  catUtils.createDirectory(args['outputdir']);

  catUtils.fetchProgIds(args['count'], args['shareurl'])
    .then(progIds => {
      async.eachLimit(progIds, args['workercount'], (item, callback) => {
        const progName = `${item}.catrobat`;
        const shareUrl = `${args['shareurl']}download/${progName}`;
        const destFile = path.join(args['outputdir'], progName);
        catUtils.downloadFile(shareUrl, destFile).then(destFile => {
          console.log(`Finished downloding ${destFile}`);
          callback();
        });
      }, (err) => {
        if (err) {
          console.error('Failed to download all programs properly');
          console.error(err);
          process.exit(-1);
        }
        console.log('Downloaded all programs properly');
      });
    });
})();