/**
 * @description Share test
 */

describe('Basic share test', () => {

  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      shareTestContainer = document.getElementById('shareprogs');
    })
  });

  /**
   * Test if rendering a not support version works properly
   */
  test('Share render unsupported version properly', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const catXml = undefined;
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('.catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering a support version works properly
   */
  test('Share render supported version properly', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('.catblocks-scene-container .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering of an empty program works properly
   */
  test('Share render an empty program properly', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('.catblocks-scene-container .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering of an empty scene works properly
   */
  test('Share render a single empty scene properly', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml><scene type="tscene"></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene') !== undefined
        && shareTestContainer.querySelector('#tscene .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering of multiple empty scenes works properly
   */
  test('Share render multiple empty scenes properly', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml><scene type="tscene1"></scene><scene type="tscene2"></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene1') !== undefined
        && shareTestContainer.querySelector('#tscene2') !== undefined
        && shareTestContainer.querySelector('#tscene1 .catblocks-empty-text').innerHTML.length > 0
        && shareTestContainer.querySelector('#tscene2 .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering of a single empty object works properly
   */
  test('Share render a single empty object properly', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml><scene type="tscene"><object type="tobject"></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene #tobject .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene #tobject .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering of multiple empty objects in same scene works properly
   */
  test('Share render multiple empty objects in same scene', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml><scene type="tscene"><object type="tobject1"></object><object type="tobject2"></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene #tobject1 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene #tobject1 .catblocks-empty-text').innerHTML.length > 0
        && shareTestContainer.querySelector('#tscene #tobject2 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene #tobject2 .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering of multiple empty objects in different scenes works properly
   */
  test('Share render empty objects in different scenes', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml><scene type="tscene1"><object type="tobject1"></object></scene><scene type="tscene2"><object type="tobject2"></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene1 #tobject1 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene1 #tobject1 .catblocks-empty-text').innerHTML.length > 0
        && shareTestContainer.querySelector('#tscene2 #tobject2 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene2 #tobject2 .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  /**
   * Test if rendering of single empty scriptlist works properly
   */
  test('Share render single empty scriptlist properly', async () => {
    expect(await page.evaluate(() => {
      // shareTestContainer = document.getElementById('shareprogs');
      const xmlString = `<xml><scene type="tscene"><object type="tobject"><script type="tscript"><block type="PreviousLookBrick"></block></script></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return shareTestContainer.querySelector('#tscene #tobject .catblocks-script svg.catblocks-svg')
    })).toBeTruthy();
  });
});