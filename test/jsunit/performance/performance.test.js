/**
 * @description Block tests
 */
/* global CatBlocks, page, SERVER */
/* eslint no-global-assign:0 */
'use strict';

describe('Performance tests', () => {
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
    page.on('console', message => console.log(message.text()));
  });

  test('Rendering test program takes less than 30 seconds', async () => {
    jest.setTimeout(40000);
    expect(
      await page.evaluate(() => {
        const startTime = performance.now();
        return CatBlocks.render('assets', 'share').then(() => {
          const endTime = performance.now();
          const durationInSeconds = (endTime - startTime) / 1000;
          return durationInSeconds;
        });
      })
    ).toBeLessThan(30);
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
