/**
 * @description Share test
 */
/* global page, SERVER, share, shareTestContainer, shareUtils */
/* eslint no-global-assign:0 */
'use strict';

beforeEach(async () => {
  await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    shareTestContainer = document.getElementById('shareprogs');
  });
});

describe('Share basic tests', () => {
  test('Share renders scene container properly', async () => {
    expect(
      await page.evaluate(() => {
        const accordionContainer = share.addSceneContainer(
          'accordionID',
          'sceneID',
          shareTestContainer,
          'Name of the scene'
        );
        const cardBody = accordionContainer.parentNode;
        const sceneObjContainer = cardBody.parentNode;
        const sceneContainer = sceneObjContainer.parentNode;

        return (
          accordionContainer.id === 'sceneID-accordionObjects' &&
          sceneContainer.id === 'sceneID' &&
          sceneContainer.querySelector('#sceneID-header') !== null &&
          sceneContainer.querySelector('#sceneID-header').innerText.startsWith('Name of the scene') &&
          sceneContainer.querySelector('#sceneID-header').getAttribute('data-target') === '#sceneID-collapseOne' &&
          sceneContainer.getAttribute('class') === 'catblocks-scene card' &&
          sceneContainer.querySelector('.catblocks-object-container') !== null &&
          sceneObjContainer.getAttribute('data-parent') === '#accordionID'
        );
      })
    ).toBeTruthy();
  });

  test('Share renders object container properly', async () => {
    expect(
      await page.evaluate(() => {
        const container = document.createElement('div');
        shareTestContainer.append(container);

        share.renderObjectJSON('tobject', 'sceneID-accordionObjects', container, undefined, { name: 'objectName' });

        const objectCard = container.firstChild;

        return (
          objectCard.id === 'tobject' &&
          objectCard.getAttribute('class') === 'catblocks-object card' &&
          container.querySelector('#tobject-header') !== null &&
          container.querySelector('#tobject-header').innerText.startsWith('objectName') &&
          container.querySelector('#tobject-collapseOneScene') !== null &&
          container.querySelector('#tobject-collapseOneScene').getAttribute('data-parent') ===
            '#sceneID-accordionObjects' &&
          container.querySelector('.tab-content') !== null &&
          container.querySelector('#tobject-tabs') !== null &&
          container.querySelector('#tobject-scripts-tab') !== null &&
          container.querySelector('#tobject-looks-tab') !== null &&
          container.querySelector('#tobject-sounds-tab') !== null &&
          container.querySelector(container.querySelector('#tobject-scripts-tab').getAttribute('href')) !== null &&
          container.querySelector(container.querySelector('#tobject-looks-tab').getAttribute('href')) !== null &&
          container.querySelector(container.querySelector('#tobject-sounds-tab').getAttribute('href')) !== null
        );
      })
    ).toBeTruthy();
  });
});

describe('Share catroid program rendering tests', () => {
  test('Share render unsupported version properly', async () => {
    expect(
      await page.evaluate(() => {
        const catXml = undefined;
        const catObj = undefined;

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);
          return false;
        } catch (e) {
          return (
            e.message === 'Empty program found' &&
            shareTestContainer.querySelector('.card-header').innerText === 'Empty program found'
          );
        }
      })
    ).toBeTruthy();
  });

  test('Share render an empty program properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {};

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);
          return false;
        } catch (e) {
          return (
            e.message === 'Empty program found' &&
            shareTestContainer.querySelector('.card-header').innerText === 'Empty program found'
          );
        }
      })
    ).toBeTruthy();
  });

  test('Share render a single empty scene properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene'
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        return (
          shareTestContainer.querySelector('.catblocks-scene') !== null &&
          shareTestContainer.querySelector('.catblocks-scene-header').innerHTML.length > 0 &&
          shareTestContainer.querySelector('.catblocks-object-container') !== null &&
          shareTestContainer.querySelector('.accordion') !== null &&
          shareTestContainer.querySelector('.catblocks-object .card-header') !== null &&
          shareTestContainer.querySelector('.catblocks-object .card-header').innerHTML.startsWith('No objects found')
        );
      })
    ).toBeTruthy();
  });

  test('Share render multiple empty scenes properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene1"></scene><scene type="tscene2"></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene1'
            },
            {
              name: 'tscene2'
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        return (
          shareTestContainer.querySelector('.catblocks-scene') !== null &&
          shareTestContainer.querySelector('.catblocks-scene-header').innerHTML.length > 0 &&
          shareTestContainer.querySelector('.catblocks-object-container') !== null &&
          shareTestContainer.querySelector('.accordion') !== null &&
          shareTestContainer.getElementsByClassName('catblocks-object').length === 2 &&
          shareTestContainer.querySelector('.catblocks-object .card-header').innerHTML.startsWith('No objects found')
        );
      })
    ).toBeTruthy();
  });

  test('Share render a single empty object properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"><object type="tobject"></object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene',
              objectList: [
                {
                  name: 'tobject'
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        return (
          shareTestContainer.querySelector('.catblocks-object .card-header') !== null &&
          shareTestContainer
            .querySelector('.catblocks-object .card-header')
            .innerHTML.startsWith('<div style="font-weight: normal;">tobject</div>') &&
          shareTestContainer.querySelector('.tab-pane') !== null &&
          shareTestContainer.querySelector('.catblocks-script') === null
        );
      })
    ).toBeTruthy();
  });

  test('Share render multiple empty objects in same scene', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"><object type="tobject1"></object><object type="tobject2"></object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene',
              objectList: [
                {
                  name: 'tobject1'
                },
                {
                  name: 'tobject2'
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        const sceneID = shareUtils.generateID('programID-tscene');
        const obj1ID = shareUtils.generateID('programID-tscene-tobject1');
        const obj2ID = shareUtils.generateID('programID-tscene-tobject2');

        return (
          shareTestContainer.querySelector('#' + shareUtils.generateID('programID')) !== null &&
          shareTestContainer.querySelector('#' + sceneID) !== null &&
          shareTestContainer.querySelector('#' + obj1ID + '-scripts-tab') !== null &&
          shareTestContainer.querySelector('#' + obj1ID + '-looks') !== null &&
          shareTestContainer.querySelector('#' + obj1ID + '-sounds .catblocks-empty-text') !== null &&
          shareTestContainer.querySelector('#' + obj2ID + '-scripts-tab') !== null &&
          shareTestContainer.querySelector('#' + obj2ID + '-looks') !== null &&
          shareTestContainer.querySelector('#' + obj2ID + '-sounds .catblocks-empty-text') !== null
        );
      })
    ).toBeTruthy();
  });

  test('Share render empty objects in different scenes', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene1"><object type="tobject1"></object></scene><scene type="tscene2"><object type="tobject2"></object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene1',
              objectList: [
                {
                  name: 'tobject1'
                }
              ]
            },
            {
              name: 'tscene2',
              objectList: [
                {
                  name: 'tobject2'
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        const scene1ID = shareUtils.generateID('programID-tscene1');
        const scene2ID = shareUtils.generateID('programID-tscene2');
        const obj1ID = shareUtils.generateID('programID-tscene1-tobject1');
        const obj2ID = shareUtils.generateID('programID-tscene2-tobject2');

        return (
          shareTestContainer.querySelector('#' + shareUtils.generateID('programID')) !== null &&
          shareTestContainer.querySelector('#' + scene1ID) !== null &&
          shareTestContainer.querySelector('#' + scene2ID) !== null &&
          shareTestContainer.querySelector('#' + obj1ID + '-scripts-tab') !== null &&
          shareTestContainer.querySelector('#' + obj1ID + '-looks') !== null &&
          shareTestContainer.querySelector('#' + obj1ID + '-sounds') !== null &&
          shareTestContainer.querySelector('#' + obj1ID + '-sounds .catblocks-empty-text') !== null &&
          shareTestContainer.querySelector('#' + obj2ID + '-scripts-tab') !== null &&
          shareTestContainer.querySelector('#' + obj2ID + '-looks') !== null &&
          shareTestContainer.querySelector('#' + obj2ID + '-sounds') !== null &&
          shareTestContainer.querySelector('#' + obj2ID + '-sounds .catblocks-empty-text') !== null
        );
      })
    ).toBeTruthy();
  });

  test('Share render script svg', async () => {
    expect(
      await page.evaluate(() => {
        const scriptString = `<block type="PreviousLookBrick"></block>`;
        const scriptXml = new DOMParser().parseFromString(scriptString, 'text/xml');
        const svg = share.domToSvg(scriptXml);

        return (
          svg !== null &&
          svg.getAttribute('class') === 'catblocks-svg' &&
          svg.querySelector('path.blocklyPath') !== null
        );
      })
    ).toBeTruthy();
  });

  test('Share render svg script box properly', async () => {
    expect(
      await page.evaluate(() => {
        const scriptString = `<block type="PreviousLookBrick"></block>`;
        const scriptXml = new DOMParser().parseFromString(scriptString, 'text/xml');
        const svg = share.domToSvg(scriptXml);

        return (
          svg !== null &&
          svg.getAttribute('width').replace('px', '') > 0 &&
          svg.getAttribute('height').replace('px', '') > 0
        );
      })
    ).toBeTruthy();
  });

  test('Share render single empty scriptlist properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"><object type="tobject"><script type="tscript"><block type="PreviousLookBrick"></block></script></object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene',
              objectList: [
                {
                  name: 'tobject',
                  scriptList: [
                    {
                      'not-supported': 'yet (takes script from XML)'
                    }
                  ]
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        const objID = shareUtils.generateID('programID-tscene-tobject');
        return (
          shareTestContainer.querySelector(
            '#' + objID + ' #' + objID + '-scripts .catblocks-script svg.catblocks-svg'
          ) !== null
        );
      })
    ).toBeTruthy();
  });

  test('Share render object with sound', async () => {
    expect(
      await page.evaluate(() => {
        const testDisplayName = 'Silence Sound';
        const xmlString = `
      <xml>
        <scene type="tscene">
          <object type="tobject">
          </object>
        </scene>
      </xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene',
              objectList: [
                {
                  name: 'tobject',
                  soundList: [
                    {
                      name: testDisplayName,
                      fileName: 'silence.mp3'
                    }
                  ]
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        const objID = shareUtils.generateID('programID-tscene-tobject');
        return (
          shareTestContainer.querySelector('#' + objID + ' #' + objID + '-sounds .catblocks-object-sound-name') !=
            null &&
          shareTestContainer.querySelector('#' + objID + ' #' + objID + '-sounds .catblocks-object-sound-name')
            .innerHTML == testDisplayName
        );
      })
    ).toBeTruthy();
  });

  test('JSON object has a script, but XML not', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"><object type="tobject">/object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene',
              objectList: [
                {
                  name: 'tobject',
                  scriptList: [
                    {
                      'not-supported': 'yet (takes script from XML)'
                    }
                  ]
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        const objID = shareUtils.generateID('programID-tscene-tobject');
        return (
          shareTestContainer.querySelector(
            '#' + objID + ' #' + objID + '-scripts .catblocks-script svg.catblocks-svg'
          ) == null
        );
      })
    ).toBeTruthy();
  });

  test('JSON and XML have unqual number of scenes', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene1"></scene><scene type="tscene2"></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene1'
            }
          ]
        };

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);
        } catch (e) {
          return false;
        }
      })
    ).toBeFalsy();
  });

  test('JSON and XML have unqual number of objects in scene', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"><object type="tobject1"></object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene',
              objectList: [
                {
                  name: 'tobject1'
                },
                {
                  name: 'tobject2'
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        return (
          shareTestContainer.querySelector('.catblocks-scene') !== null &&
          shareTestContainer.querySelector('.catblocks-scene-header').innerHTML.length > 0 &&
          shareTestContainer.querySelector('.catblocks-object-container') !== null &&
          shareTestContainer.querySelector('.accordion') !== null &&
          shareTestContainer.querySelector('.catblocks-object .card-header') !== null &&
          shareTestContainer.querySelector('.catblocks-object .card-header').innerHTML.startsWith('No objects found')
        );
      })
    ).toBeTruthy();
  });

  test('JSON empty but XML given', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"><object type="tobject1"></object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {};

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);
        } catch (e) {
          return false;
        }
      })
    ).toBeFalsy();
  });

  test('Share renders scene and card headers properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<xml><scene type="tscene"><object type="tobject"></object></scene></xml>`;
        const catXml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const catObj = {
          scenes: [
            {
              name: 'tscene',
              objectList: [
                {
                  name: 'tobject'
                }
              ]
            }
          ]
        };
        share.renderProgramJSON('programID', shareTestContainer, catObj, catXml);

        const expectedSceneHeaderTextCollapsed =
          '<div style="font-weight: normal;">tscene</div><i class="material-icons">chevron_left</i>';
        const expectedCardHeaderTextCollapsed =
          '<div style="font-weight: normal;">tobject</div><i class="material-icons">chevron_left</i>';
        const expectedSceneHeaderTextExpanded =
          '<div style="font-weight: bold;">tscene</div><i class="material-icons">expand_more</i>';
        const expectedCardHeaderTextExpanded =
          '<div style="font-weight: bold;">tobject</div><i class="material-icons">expand_more</i>';
        const sceneHeader = shareTestContainer.querySelector('.catblocks-scene-header');
        const cardHeader = shareTestContainer.querySelector('.catblocks-object .card-header');
        const sceneHeaderInitialText = sceneHeader.innerHTML;
        const cardHeaderInitialText = cardHeader.innerHTML;
        sceneHeader.click();
        cardHeader.click();
        sceneHeader.setAttribute('aria-expanded', 'true');
        cardHeader.setAttribute('aria-expanded', 'true');
        const sceneHeaderTextExpanded = sceneHeader.innerHTML;
        const cardHeaderTextExpanded = cardHeader.innerHTML;
        cardHeader.click();
        sceneHeader.click();
        sceneHeader.setAttribute('aria-expanded', 'false');
        cardHeader.setAttribute('aria-expanded', 'false');
        const sceneHeaderTextCollapsed = sceneHeader.innerHTML;
        const cardHeaderTextCollapsed = cardHeader.innerHTML;
        return (
          sceneHeaderInitialText === expectedSceneHeaderTextCollapsed &&
          cardHeaderInitialText === expectedCardHeaderTextCollapsed &&
          sceneHeaderTextExpanded === expectedSceneHeaderTextExpanded &&
          cardHeaderTextExpanded === expectedCardHeaderTextExpanded &&
          sceneHeaderTextCollapsed === expectedSceneHeaderTextCollapsed &&
          cardHeaderTextCollapsed === expectedCardHeaderTextCollapsed
        );
      })
    ).toBeTruthy();
  });
});

describe('Share statistic tests', () => {
  describe('Update objects statistic tests', () => {
    test('Check update status function against undefined and null', async () => {
      expect(
        await page.evaluate(() => {
          const objectStats = {
            name: 'tobject',
            scripts: 0
          };
          const addNull = share.updateObjectStats(objectStats, null);
          const addUndefined = share.updateObjectStats(objectStats, undefined);

          return (
            JSON.stringify(addNull) === JSON.stringify(objectStats) &&
            JSON.stringify(addUndefined) === JSON.stringify(objectStats)
          );
        })
      ).toBeTruthy();
    });

    test('Add empty script to existing object statistic', async () => {
      expect(
        await page.evaluate(() => {
          const objectStats = {
            name: 'tobject',
            scripts: 1,
            look: 1
          };
          const updatedStats = share.updateObjectStats(objectStats, {});

          return (
            JSON.stringify(updatedStats) ===
            JSON.stringify({
              name: 'tobject',
              scripts: 2,
              look: 1
            })
          );
        })
      ).toBeTruthy();
    });

    test('Add script to existing object statistic', async () => {
      expect(
        await page.evaluate(() => {
          const objectStats = {
            name: 'tobject',
            scripts: 1,
            sound: 1,
            pen: 2,
            control: 5
          };
          const updatedStats = share.updateObjectStats(objectStats, { looks: 1, sound: 2, control: 0 });

          return (
            JSON.stringify(updatedStats) ===
            JSON.stringify({
              name: 'tobject',
              scripts: 2,
              sound: 3,
              pen: 2,
              control: 5,
              looks: 1
            })
          );
        })
      ).toBeTruthy();
    });
  });

  describe('Fetch script statistic tests', () => {
    test('Check get script stats function against undefined and null', async () => {
      expect(
        await page.evaluate(() => {
          const nullScriptStats = share.getScriptStats(null);
          const undefinedScriptStats = share.getScriptStats(undefined);

          return (
            JSON.stringify(nullScriptStats) === JSON.stringify({}) &&
            JSON.stringify(undefinedScriptStats) === JSON.stringify({})
          );
        })
      ).toBeTruthy();
    });

    test('Share fetches properly stats from empty script', async () => {
      expect(
        await page.evaluate(() => {
          const scriptString = `<script type="tscript"></script>`;
          const scriptXml = new DOMParser().parseFromString(scriptString, 'text/xml');
          const scriptStats = share.getScriptStats(scriptXml);

          return JSON.stringify(scriptStats) === JSON.stringify({});
        })
      ).toBeTruthy();
    });

    test('Share fetches properly stats from script with one block', async () => {
      expect(
        await page.evaluate(() => {
          const scriptString = `<script type="tscript"><block type="PreviousLookBrick"></block></script>`;
          const scriptXml = new DOMParser().parseFromString(scriptString, 'text/xml');
          const scriptStats = share.getScriptStats(scriptXml);

          return JSON.stringify(scriptStats) === JSON.stringify({ looks: 1 });
        })
      ).toBeTruthy();
    });

    test('Share fetches properly stats from unknown script', async () => {
      expect(
        await page.evaluate(() => {
          const scriptString = `<script type="tscript"><block type="unknownBrick"></block></script>`;
          const scriptXml = new DOMParser().parseFromString(scriptString, 'text/xml');
          const scriptStats = share.getScriptStats(scriptXml);

          return JSON.stringify(scriptStats) === JSON.stringify({ unknown: 1 });
        })
      ).toBeTruthy();
    });
  });
});
