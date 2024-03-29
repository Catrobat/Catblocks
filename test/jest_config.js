/**
 * Jest configuration file
 * 
 *  use jest-puppeteer for testing
 *    please validate that the port and host match up with the @file{jest-puppeteer.js}
 * 
 *  added jest-junit reporter for jenkins
 */

 process.env.JEST_PUPPETEER_CONFIG = './test/jest-puppeteer.config.js';

module.exports = {
  preset: "jest-puppeteer",
  verbose: true,
  reporters: [
    "default",
    "jest-html-reporters"
  ],
  testMatch: [
    "**/test/**/*.test.js"
  ],
  testTimeout: 10000
};
