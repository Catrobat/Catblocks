/**
 * Jest configuration file
 * Ref: https://itnext.io/testing-your-javascript-in-a-browser-with-jest-puppeteer-express-and-webpack-c998a37ef887
 */

module.exports = {
  preset: "jest-puppeteer",
  globals: {
    PATH: "http://localhost:8080/tests/vertical_playground_webpack.html"
  },
  testMatch: [
    "**/tests/**/*.test.js"
  ]
}