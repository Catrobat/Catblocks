// eslint-disable-next-line no-undef
var webdriverio = require('webdriverio');
var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

// Parse jsunit html report, exit(1) if there are any failures.
var testHtml = function(htmlString) {
  var regex = /[\d]+\spassed,\s([\d]+)\sfailed./i;
  var numOfFailure = regex.exec(htmlString)[1];
  var regex2 = /Unit Tests for .*]/;
  var testStatus = regex2.exec(htmlString)[0];
  console.log("============Unit Test Summary=================");
  console.log(testStatus);
  var regex3 = /\d+ passed,\s\d+ failed/;
  var detail = regex3.exec(htmlString)[0];
  console.log(detail);
  console.log("============Unit Test Summary=================");
  if (parseInt(numOfFailure) !== 0) {
    console.log(htmlString);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

// eslint-disable-next-line no-undef
var path = process.cwd();
var browser = webdriverio
    .remote(options)
    .init();

browser.url("file://" + path + "/tests/catblock-tests/index.html").pause(5000)
    .getHTML("#closureTestRunnerLog")
    .then(testHtml)
    .catch(function(err) {
      console.log(err);
      browser.end();
      // eslint-disable-next-line no-undef
      process.exit(1);
    });
