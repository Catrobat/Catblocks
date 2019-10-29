const puppeteer = require('puppeteer');

(async () => {
  puppeteer.launch({ headless: true }).then(async browser => {
    browser.newPage().then(async page => {
      await page.goto('http://localhost:8080/tests/vertical_playground_webpack.html', { waitUntil: 'domcontentloaded' });


      const workspaceBlocks = await page.evaluate(() => {
        return Object.keys(Blockly.Workspace.WorkspaceDB_).map(id => {
          return { [id] : Object.keys(Blockly.Workspace.WorkspaceDB_[id].blockDB_) }
        });
      });

      console.log(workspaceBlocks);
    });
  });
})()