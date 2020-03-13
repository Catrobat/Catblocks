/**
 * Jest configuration file
 * 
 * @author andreas.karner@student.tugraz.at
 * 
 * @description jest configuraiton file
 *  use jest-puppeteer for testing
 *  set global SERVER variable, this one is used by the test files
 *    please validate that the port and host match up with the @file{jest-puppeteer.js}
 * 
 *  added jest-junit reporter for jenkins
 */

process.env.JEST_PUPPETEER_CONFIG = './test/jest-puppeteer.config.js';

module.exports = {
  preset: "jest-puppeteer",
  verbose: true,
  globals: {
    SERVER: "http://localhost:8080/"
  },
  "reporters": [
    "default",
    "jest-html-reporters"
  ],
  testMatch: [
    "**/test/**/block.test.js"
  ]
};