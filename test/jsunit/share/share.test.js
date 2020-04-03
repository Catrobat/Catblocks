/**
 * @description Share test
 */
/* global page, SERVER, share, shareTestContainer */
/* eslint no-global-assign:0 */
'use strict';

beforeEach(async () => {
  await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    shareTestContainer = document.getElementById('shareprogs');
  });
});

describe('Share basic tests', () => {

  test('Share renders scene container properly', async () => {
    expect(await page.evaluate(() => {
      const container = share.addSceneContainer(shareTestContainer, 'tscene');

      return (container.id === 'tscene'
        && container.getAttribute('class') === 'catblocks-scene'
        && container.querySelector('#tscene-header') !== undefined
        && container.querySelector('#tscene-header').innerText === 'Scene: tscene'
        && container.querySelector('.catblocks-object-container') !== undefined);
    })).toBeTruthy();
  });

  test('Share renders object container properly', async () => {
    expect(await page.evaluate(() => {
      const container = share.addObjectContainer(shareTestContainer, 'tobject');

      return (container.id === 'tobject'
        && container.getAttribute('class') === 'catblocks-object'
        && container.querySelector('#tobject-header') !== undefined
        && container.querySelector('#tobject-header').innerText === 'Object: tobject'
        && container.querySelector('.catblocks-script-container') !== undefined
        && container.querySelector('.catblocks-object-props-container .catblocks-object-stats-container .catblocks-object-stats-label-container') !== undefined
        && container.querySelector('.catblocks-object-props-container .catblocks-object-stats-container .catblocks-object-stats-value-container') !== undefined);
    })).toBeTruthy();
  });
});

describe('Share catroid program rendering tests', () => {

  test('Share render unsupported version properly', async () => {
    expect(await page.evaluate(() => {
      const catXml = undefined;
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('.catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render supported version properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('.catblocks-scene-container .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render an empty program properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('.catblocks-scene-container .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render a single empty scene properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml><scene type="tscene"></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene') !== undefined
        && shareTestContainer.querySelector('#tscene .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render multiple empty scenes properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml><scene type="tscene1"></scene><scene type="tscene2"></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene1') !== undefined
        && shareTestContainer.querySelector('#tscene2') !== undefined
        && shareTestContainer.querySelector('#tscene1 .catblocks-empty-text').innerHTML.length > 0
        && shareTestContainer.querySelector('#tscene2 .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render a single empty object properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml><scene type="tscene"><object type="tobject"></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene #tobject .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene #tobject .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render multiple empty objects in same scene', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml><scene type="tscene"><object type="tobject1"></object><object type="tobject2"></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene #tobject1 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene #tobject1 .catblocks-empty-text').innerHTML.length > 0
        && shareTestContainer.querySelector('#tscene #tobject2 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene #tobject2 .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render empty objects in different scenes', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml><scene type="tscene1"><object type="tobject1"></object></scene><scene type="tscene2"><object type="tobject2"></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return (shareTestContainer.querySelector('#tscene1 #tobject1 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene1 #tobject1 .catblocks-empty-text').innerHTML.length > 0
        && shareTestContainer.querySelector('#tscene2 #tobject2 .catblocks-empty-text') !== undefined
        && shareTestContainer.querySelector('#tscene2 #tobject2 .catblocks-empty-text').innerHTML.length > 0);
    })).toBeTruthy();
  });

  test('Share render script svg', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<block type="PreviousLookBrick"></block>`;
      const scriptXml = (new DOMParser).parseFromString(scriptString, 'text/xml');
      const svg = share.domToSvg(scriptXml);

      return (svg !== undefined
        && svg.getAttribute('class') === 'catblocks-svg'
        && svg.querySelector('path.blocklyPath') !== undefined);
    })).toBeTruthy();
  });

  test('Share render svg script bbox properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<block type="PreviousLookBrick"></block>`;
      const scriptXml = (new DOMParser).parseFromString(scriptString, 'text/xml');
      const svg = share.domToSvg(scriptXml);

      return (svg !== undefined
        && svg.getAttribute('width').replace('px', '') > 50
        && svg.getAttribute('height').replace('px', '') > 50);
    })).toBeTruthy();
  });

  test('Share render single empty scriptlist properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<xml><scene type="tscene"><object type="tobject"><script type="tscript"><block type="PreviousLookBrick"></block></script></object></scene></xml>`;
      const catXml = (new DOMParser).parseFromString(xmlString, 'text/xml');
      share.injectAllScenes(shareTestContainer, catXml);

      return shareTestContainer.querySelector('#tscene #tobject .catblocks-script svg.catblocks-svg');
    })).toBeTruthy();
  });
});

describe('Share statistic tests', () => {

  describe('Update objects statistic tests', () => {
    test('Check update status function against undefined and null', async () => {
      expect(await page.evaluate(() => {
        const objectStats = {
          'name': 'tobject',
          'scripts': 0
        };
        const addNull = share.updateObjectStats(objectStats, null);
        const addUndefined = share.updateObjectStats(objectStats, undefined);

        return (JSON.stringify(addNull) === JSON.stringify(objectStats)
          && JSON.stringify(addUndefined) === JSON.stringify(objectStats));
      })).toBeTruthy();
    });

    test('Add empty script to existing object statistic', async () => {
      expect(await page.evaluate(() => {
        const objectStats = {
          'name': 'tobject',
          'scripts': 1,
          'look': 1
        };
        const updatedStats = share.updateObjectStats(objectStats, {});

        return (JSON.stringify(updatedStats) === JSON.stringify({
          'name': 'tobject',
          'scripts': 2,
          'look': 1
        }));
      })).toBeTruthy();
    });

    test('Add script to existing object statistic', async () => {
      expect(await page.evaluate(() => {
        const objectStats = {
          'name': 'tobject',
          'scripts': 1,
          'sound': 1,
          'pen': 2,
          'control': 5
        };
        const updatedStats = share.updateObjectStats(objectStats, { looks: 1, sound: 2, control: 0 });

        return (JSON.stringify(updatedStats) === JSON.stringify({
          'name': 'tobject',
          'scripts': 2,
          'sound': 3,
          'pen': 2,
          'control': 5,
          'looks': 1
        }));
      })).toBeTruthy();
    });
  });

  describe('Fetch script statistic tests', () => {

    test('Check get script stats function against undefined and null', async () => {
      expect(await page.evaluate(() => {
        const nullScriptStats = share.getScriptStats(null);
        const undefinedScriptStats = share.getScriptStats(undefined);

        return (JSON.stringify(nullScriptStats) === JSON.stringify({})
          && JSON.stringify(undefinedScriptStats) === JSON.stringify({}));
      })).toBeTruthy();
    });

    test('Share fetches properly stats from empty script', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="tscript"></script>`;
        const scriptXml = (new DOMParser).parseFromString(scriptString, 'text/xml');
        const scriptStats = share.getScriptStats(scriptXml);

        return (JSON.stringify(scriptStats) === JSON.stringify({}));
      })).toBeTruthy();
    });

    test('Share fetches properly stats from script with one block', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="tscript"><block type="PreviousLookBrick"></block></script>`;
        const scriptXml = (new DOMParser).parseFromString(scriptString, 'text/xml');
        const scriptStats = share.getScriptStats(scriptXml);

        return (JSON.stringify(scriptStats) === JSON.stringify({ looks: 1 }));
      })).toBeTruthy();
    });

    test('Share fetches properly stats from unknown script', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="tscript"><block type="unknownBrick"></block></script>`;
        const scriptXml = (new DOMParser).parseFromString(scriptString, 'text/xml');
        const scriptStats = share.getScriptStats(scriptXml);

        return (JSON.stringify(scriptStats) === JSON.stringify({ unknown: 1 }));
      })).toBeTruthy();
    });
  });

  describe('Share statistic rendering tests', () => {

    test('Share render object status properly', async () => {
      expect(await page.evaluate(() => {
        const stats = {
          'name': 'tobject',
          'scripts': 1,
          'sound': 1,
          'pen': 2,
          'control': 5
        };
        const objectContainer = share.addObjectContainer(shareTestContainer, 'tobject');
        share.writeObjectStats(objectContainer, stats);
        const statsValues = shareTestContainer.querySelector('.catblocks-object-stats-value-list');

        return Array.from(statsValues.children)
          .map(value => {
            const catClassName = value.getAttribute('class').match(/catblocks-category-[a-z]+/);
            if (catClassName && catClassName.length === 1) {
              const catName = catClassName[0].split('-')[2];
              return (typeof stats[catName] === 'string')
                ? stats[catName] === value.innerHTML
                : stats[catName] === parseInt(value.innerHTML, 10);
            } else {
              return false;
            }
          }).includes(false);
      })).toBeFalsy();
    });
  });
});
