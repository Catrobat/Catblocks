/**
 * @description Block tests
 */
/* global page, Test */
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
      document.body.addEventListener(pEventName, resolve, { once: true });
    });
  }, eventName);
}

describe('Performance tests', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });

    page.on('console', message => {
      if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
        console.log(message.text());
      }
    });

    await page.evaluate(async () => {
      await Test.CatBlocks.init({
        container: 'share',
        renderSize: 0.75,
        shareRoot: '',
        media: 'media/',
        language: 'en',
        rtl: false,
        noImageFound: 'No_Image_Available.jpg',
        advancedMode: false
      });
    });
  });

  beforeEach(async () => {
    await page.waitForNetworkIdle();
  });

  beforeEach(async () => {
    await page.waitForNetworkIdle();
  });

  test('Rendering test program takes less than 30 seconds', async () => {
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
  }, 40000);

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
