/**
 * @description Block tests
 */
/* global $, CatBlocks, page, SERVER */
/* eslint no-global-assign:0 */
'use strict';

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
      return CatBlocks.render('assets', 'share');
    });

    // TODO: rewrite after fixing container height to use page.click
    await page.evaluate(async () => {
      const modalPromise = () => {
        return new Promise(resolve => {
          $('body').one('hidden.bs.modal', () => {
            resolve();
          });
        });
      };

      const $containers = $('.catblocks-scene');
      for (const $container of $containers) {
        $container.click();
        await modalPromise();
      }
    });

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
