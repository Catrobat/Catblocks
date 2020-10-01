/**
 * @description Share test
 */
/* global page, SERVER, share, shareTestContainer, shareUtils */
/* eslint no-global-assign:0 */
'use strict';

beforeEach(async () => {
  await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  page.on('console', message => console.log(message.text()));
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

        share.renderObjectJSON('tobject', 'sceneID-accordionObjects', container, { name: 'objectName' });

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
        const catObj = undefined;

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj);
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
        const catObj = {};

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj);
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
        const catObj = {
          scenes: [
            {
              name: 'testscene'
            },
            {
              name: 'testscene2'
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj);

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
        const catObj = {
          scenes: [
            {
              name: 'testscene1'
            },
            {
              name: 'testscene2'
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj);

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
        const catObj = {
          scenes: [
            {
              name: 'testscene',
              objectList: [
                {
                  name: 'tobject'
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj);

        return (
          shareTestContainer.querySelector('.catblocks-object .card-header') !== null &&
          shareTestContainer
            .querySelector('.catblocks-object .card-header')
            .innerHTML.startsWith('<div class="header-title">tobject</div>') &&
          shareTestContainer.querySelector('.tab-pane') !== null &&
          shareTestContainer.querySelector('.catblocks-script') === null
        );
      })
    ).toBeTruthy();
  });

  test('Share render multiple empty objects in same scene', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'testscene',
              objectList: [
                {
                  name: 'tobject1'
                },
                {
                  name: 'tobject2'
                }
              ]
            },
            {
              name: 'testscene2'
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj);
        const sceneHeader = shareTestContainer.querySelector('.catblocks-scene-header');
        sceneHeader.click();

        const sceneID = shareUtils.generateID('programID-testscene');
        const obj1ID = shareUtils.generateID('programID-testscene-tobject1');
        const obj2ID = shareUtils.generateID('programID-testscene-tobject2');

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
        const catObj = {
          scenes: [
            {
              name: 'testscene1',
              objectList: [
                {
                  name: 'tobject1'
                }
              ]
            },
            {
              name: 'testscene2',
              objectList: [
                {
                  name: 'tobject2'
                }
              ]
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj);
        const scene1ID = shareUtils.generateID('programID-testscene1');
        const scene2ID = shareUtils.generateID('programID-testscene2');
        shareTestContainer.querySelector('#' + scene1ID).click();
        shareTestContainer.querySelector('#' + scene2ID).click();
        const obj1ID = shareUtils.generateID('programID-testscene1-tobject1');
        const obj2ID = shareUtils.generateID('programID-testscene2-tobject2');

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
        const scriptJSON = {
          name: 'StartScript',
          brickList: [
            {
              name: 'SetXBrick',
              loopOrIfBrickList: [],
              elseBrickList: [],
              formValues: {},
              colorVariation: 0
            }
          ],
          formValues: {}
        };
        const svg = share.domToSvg(scriptJSON);
        return (
          svg.textContent.replace(/\s/g, ' ').includes('When scene starts') &&
          svg.textContent.replace(/\s/g, ' ').includes('Set x to') &&
          svg.textContent.replace(/\s/g, ' ').includes('unset')
        );
      })
    ).toBeTruthy();
  });

  test('Share render svg script box properly', async () => {
    expect(
      await page.evaluate(() => {
        const scriptJSON = {
          name: 'StartScript',
          brickList: [
            {
              name: 'SetXBrick',
              loopOrIfBrickList: [],
              elseBrickList: [],
              formValues: {},
              colorVariation: 0
            }
          ],
          formValues: {}
        };
        const svg = share.domToSvg(scriptJSON);
        return (
          svg !== null &&
          svg.textContent.replace(/\s/g, ' ').includes('When scene starts') &&
          svg.textContent.replace(/\s/g, ' ').includes('Set x to') &&
          svg.textContent.replace(/\s/g, ' ').includes('unset') &&
          svg.getAttribute('width').replace('px', '') > 0 &&
          svg.getAttribute('height').replace('px', '') > 0
        );
      })
    ).toBeTruthy();
  });

  test('Share render single empty scriptlist properly', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'testscene',
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
        share.renderProgramJSON('programID', shareTestContainer, catObj);
        const objID = shareUtils.generateID('programID-testscene-tobject');
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
        const catObj = {
          scenes: [
            {
              name: 'testscene',
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

        share.renderProgramJSON('programID', shareTestContainer, catObj);

        const objID = shareUtils.generateID('programID-testscene-tobject');
        return (
          shareTestContainer.querySelector('#' + objID + ' #' + objID + '-sounds .catblocks-object-sound-name') !=
            null &&
          shareTestContainer.querySelector('#' + objID + ' #' + objID + '-sounds .catblocks-object-sound-name')
            .innerHTML === testDisplayName
        );
      })
    ).toBeTruthy();
  });

  test('JSON object has a script', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'testscene',
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
        share.renderProgramJSON('programID', shareTestContainer, catObj);
        const objID = shareUtils.generateID('programID-testscene-tobject');
        const executeQuery = shareTestContainer.querySelector(
          '#' + objID + ' #' + objID + '-scripts .catblocks-script svg.catblocks-svg'
        );
        return Object.keys(executeQuery).length === 0;
      })
    ).toBeTruthy();
  });

  test('Share render object with magnifying glass in look tab and simulate click to popup image', async () => {
    expect(
      await page.evaluate(() => {
        const testDisplayName = 'My actor';
        const catObj = {
          scenes: [
            {
              name: 'testscene',
              objectList: [
                {
                  name: 'tobject',
                  lookList: [
                    {
                      name: testDisplayName,
                      fileName: 'My actor or object.png'
                    }
                  ]
                }
              ]
            },
            {
              name: 'testscene2'
            }
          ]
        };
        share.renderProgramJSON('programID', shareTestContainer, catObj);
        const sceneHeader = shareTestContainer.querySelector('.catblocks-scene-header');
        sceneHeader.click();

        const objID = shareUtils.generateID('programID-testscene-tobject');
        const expectedID = shareUtils.generateID(`${objID}-${testDisplayName}`) + '-imgID';
        const expectedSrc = shareTestContainer.querySelector(
          '#' + objID + ' #' + objID + '-looks .catblocks-object-look-item'
        ).src;

        shareTestContainer.querySelector('.catblocks-scene-header').click();
        shareTestContainer.querySelector('.catblocks-object .card-header').click();
        shareTestContainer.querySelector('#' + objID + '-looks-tab').click();
        shareTestContainer.querySelector('#' + objID + ' #' + objID + '-looks .search').click();

        return (
          shareTestContainer.querySelector('#' + objID + ' #' + objID + '-looks .catblocks-object-look-item') !==
            null &&
          shareTestContainer.querySelector('#' + objID + ' #' + objID + '-looks .search').innerHTML ===
            '<i class="material-icons">search</i>' &&
          shareTestContainer.querySelector('#' + objID + ' #' + objID + '-looks .catblocks-object-look-item').id ===
            expectedID &&
          shareTestContainer.querySelector('.imagepreview').src === expectedSrc
        );
      })
    ).toBeTruthy();
  });

  test('JSON with one scene', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'testscene1'
            }
          ]
        };

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj);
        } catch (e) {
          return false;
        }
      })
    ).toBeFalsy();
  });

  test('JSON with two objects in scene rendered properly', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'testscene',
              objectList: [
                {
                  name: 'Background'
                },
                {
                  name: 'tobject2'
                }
              ]
            },
            {
              name: 'testscene2'
            }
          ]
        };

        share.renderProgramJSON('programID', shareTestContainer, catObj);
        const sceneHeader = shareTestContainer.querySelector('.catblocks-scene-header');
        sceneHeader.click();
        return (
          shareTestContainer.querySelector('.catblocks-scene') !== null &&
          shareTestContainer.querySelector('.catblocks-scene-header').innerHTML.length > 0 &&
          shareTestContainer.querySelector('.catblocks-object-container') !== null &&
          shareTestContainer.querySelector('.accordion') !== null &&
          shareTestContainer.querySelector('.catblocks-object .card-header') !== null &&
          shareTestContainer.querySelector('.catblocks-object .card-header').innerHTML ===
            '<div class="header-title">Background</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>'
        );
      })
    ).toBeTruthy();
  });

  test('JSON empty but XML given', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {};

        try {
          share.renderProgramJSON('programID', shareTestContainer, catObj);
        } catch (e) {
          return false;
        }
      })
    ).toBeFalsy();
  });

  test('Share renders scene and card headers for one scene properly', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'testscene',
              objectList: [
                {
                  name: 'Background'
                }
              ]
            }
          ]
        };
        share.renderProgramJSON('programID', shareTestContainer, catObj);

        const expectedCardHeaderText =
          '<div class="header-title">Background</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>';
        const cardHeader = shareTestContainer.querySelector('.catblocks-object .card-header');
        const cardHeaderInitialText = cardHeader.innerHTML;
        cardHeader.click();
        cardHeader.setAttribute('aria-expanded', 'true');
        const cardHeaderTextExpanded = cardHeader.innerHTML;
        cardHeader.click();
        cardHeader.setAttribute('aria-expanded', 'false');
        const cardHeaderTextCollapsed = cardHeader.innerHTML;
        return (
          cardHeaderInitialText === expectedCardHeaderText &&
          cardHeaderTextExpanded === expectedCardHeaderText &&
          cardHeaderTextCollapsed === expectedCardHeaderText
        );
      })
    ).toBeTruthy();
    await page.waitForSelector('.catblocks-object .card-header', {
      visible: true
    });
  });

  test('Share renders scene and card headers for multiple scenes properly', async () => {
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'testscene1',
              objectList: [
                {
                  name: 'Background'
                }
              ]
            },
            {
              name: 'testscene2',
              objectList: [
                {
                  name: 'tobject2'
                }
              ]
            },
            {
              name: 'testscene3',
              objectList: [
                {
                  name: 'tobject3'
                }
              ]
            }
          ]
        };
        share.renderProgramJSON('programID', shareTestContainer, catObj);

        const expectedSceneHeaderText =
          '<div class="header-title">testscene1</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>';
        const expectedCardHeaderText =
          '<div class="header-title">Background</div><i id="code-view-toggler" class="material-icons rotate-left">chevron_left</i>';
        const sceneHeader = shareTestContainer.querySelector('.catblocks-scene-header');
        sceneHeader.click();
        const cardHeader = shareTestContainer.querySelector('.catblocks-object .card-header');
        const sceneHeaderInitialText = sceneHeader.innerHTML;
        const cardHeaderInitialText = cardHeader.innerHTML;
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
          sceneHeaderInitialText === expectedSceneHeaderText &&
          cardHeaderInitialText === expectedCardHeaderText &&
          sceneHeaderTextExpanded === expectedSceneHeaderText &&
          cardHeaderTextExpanded === expectedCardHeaderText &&
          sceneHeaderTextCollapsed === expectedSceneHeaderText &&
          cardHeaderTextCollapsed === expectedCardHeaderText
        );
      })
    ).toBeTruthy();
    await page.waitForSelector('.catblocks-object .card-header', {
      visible: true
    });
  });

  test('scrolling bricks on x axis on mobile share page is working', async () => {
    await page.setViewport({
      width: 200,
      height: 1000
    });
    expect(
      await page.evaluate(() => {
        const catObj = {
          scenes: [
            {
              name: 'Testscene',
              objectList: [
                {
                  name: 'TestObject',
                  lookList: [],
                  soundList: [],
                  scriptList: [
                    {
                      name: 'StartScript',
                      brickList: [
                        {
                          name: 'PlaySoundBrick',
                          loopOrIfBrickList: [],
                          elseBrickList: [],
                          formValues: {},
                          colorVariation: 0
                        }
                      ],
                      formValues: {}
                    }
                  ]
                }
              ]
            },
            {
              name: 'testscene2'
            }
          ]
        };
        share.renderProgramJSON('programID', shareTestContainer, catObj);
        const sceneHeader = shareTestContainer.querySelector('.catblocks-scene-header');
        sceneHeader.click();
        const cardHeader = shareTestContainer.querySelector('.catblocks-object .card-header');
        const brickContainer = shareTestContainer.querySelector('.catblocks-script');
        cardHeader.click();
        const initialXPosition = brickContainer.scrollLeft;
        brickContainer.scrollBy(1, 0);
        const scrolledXPosition = brickContainer.scrollLeft;
        return initialXPosition !== scrolledXPosition && brickContainer.style.overflowX === 'auto';
      })
    ).toBeTruthy();
  });

  test('Images not rendered when disabled', async () => {
    const numTabs = await page.evaluate(() => {
      share.config.renderLooks = false;

      const catObj = {
        scenes: [
          {
            name: 'Testscene',
            objectList: [
              {
                name: 'TestObject',
                lookList: [],
                soundList: [],
                scriptList: [
                  {
                    name: 'StartScript',
                    brickList: [
                      {
                        name: 'PlaySoundBrick',
                        loopOrIfBrickList: [],
                        elseBrickList: [],
                        formValues: {},
                        colorVariation: 0
                      }
                    ],
                    formValues: {}
                  }
                ]
              }
            ]
          },
          {
            name: 'testscene2'
          }
        ]
      };
      share.renderProgramJSON('programID', shareTestContainer, catObj);
      const tabs = $('.catro-tabs .nav-item');
      share.config.renderLooks = true;
      return tabs.length;
    });
    expect(numTabs).toBe(2);
  });
});
