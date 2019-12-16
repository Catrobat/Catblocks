/**
 * Jest configuration file
 * @author andreas.karner@student.tugraz.at
 * 
 * @description jest-puppeteer configuration file
 *  as server we use the http-server from npm package manager
 *  executable is defined for docker image catblocks:v1
 *    otherwise we use the default -> undefined
 * 
 *  pass args sandbox params so we can start chome even as root
 */

module.exports = {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    executablePath: (() => {
      switch (process.env.DCONTAINER) {
        case 'catblocks:v1':
          return '/usr/bin/chromium-browser';
        default:
          return undefined
      }
    })()
  },
  server: {
    command: 'cd ./dist/ && http-server',
    port: 8080
  }
}