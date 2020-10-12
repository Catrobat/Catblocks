/**
 * Jest configuration file
 * 
 * jest-puppeteer configuration file
 * pass args sandbox params so we can start chome even as root
 */

module.exports = {
  launch: {
    headless: false,
    devtools: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  },
  server: {
    command: 'cd ./dist/ && python3 -m http.server 8080',
    port: 8080
  }
};
