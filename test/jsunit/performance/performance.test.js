/**
 * @description Block tests
 */
/* global page, SERVER, Test */
/* eslint no-global-assign:0 */
'use strict';

/**
 * Wait for the browser to fire an event (including custom events)
 * @param {string} eventName - Event name
 * @returns {Promise} resolves when event fires or timeout is reached
 */
async function waitForEvent(eventName) {
  return page.evaluate(pEventName => {
    return new Promise(resolve => {
      $('body').one(pEventName, resolve);
    });
  }, eventName);
}

describe('Performance tests', () => {
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
    page.on('console', message => console.log(message.text()));
  });

  test('Rendering test program takes less than 30 seconds', async () => {
    jest.setTimeout(40000);

    const startTime = await page.evaluate(() => {
      return performance.now();
    });

    await page.evaluate(() => {
      return Test.CatBlocks.render('assets', 'share');
    });

    const headerHandles = await page.$$('.catblocks-scene');
    for (const handle of headerHandles) {
      await handle.click();
      await waitForEvent('hidden.bs.modal');
    }

    const endTime = await page.evaluate(() => {
      return performance.now();
    });

    const durationInSeconds = (endTime - startTime) / 1000;
    expect(durationInSeconds).toBeLessThan(30);
  });

  test('Sample Debuggable Test', async () => {
    const result = await page.evaluate(() => {
      // you can set "debugger;" anywhere here, to check values in the browser console
      const now = new Date();
      // debugger;

      // you can also print console.log
      console.log(now);

      return true;
    });

    // here you can directly set an breakpoint inside VSCode
    expect(result).toBeTruthy();
  });
});
