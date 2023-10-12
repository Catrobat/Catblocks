/**
 * @description Share test
 */
/* global page, Test */
/* eslint no-global-assign:0 */
'use strict';

beforeEach(async () => {
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
      container: 'catblocks-container',
      renderSize: 0.75,
      shareRoot: '',
      media: 'media/',
      language: 'en',
      rtl: false,
      noImageFound: 'No_Image_Available.jpg',
      advancedMode: false
    });

    const share = Test.CatBlocks.instance.controller;
    Test.Share = share;
  });
});

describe('Share basic tests', () => {
  test('Share renders scene container properly', async () => {
    const nameOfTheScene = 'Name of the scene';
    const sceneID = 'sceneID';
    const accordionID = 'accordionID';
    const accordionObjID = `${sceneID}-accordionObjects`;

    await page.evaluate(
      (pNameOfTheScene, pSceneID, pAccordionID) => {
        Test.Share.addSceneContainer(pAccordionID, pSceneID, document.getElementById('catblocks-container'), {
          real: pNameOfTheScene,
          display: pNameOfTheScene
        });
      },
      nameOfTheScene,
      sceneID,
      accordionID
    );

    const accordionContainerHandle = await page.$(`#${accordionObjID}`);
    const cardBodyHandle = (await accordionContainerHandle.$x('..'))[0];
    const sceneObjContainerHandle = (await cardBodyHandle.$x('..'))[0];
    const sceneContainerHandle = (await sceneObjContainerHandle.$x('..'))[0];

    const realAccordionObjID = await (await accordionContainerHandle.getProperty('id')).jsonValue();
    expect(realAccordionObjID).toEqual(accordionObjID);

    const realSceneID = await (await sceneContainerHandle.getProperty('id')).jsonValue();
    expect(realSceneID).toEqual(sceneID);

    const sceneContainerClass = await (await sceneContainerHandle.getProperty('className')).jsonValue();
    expect(sceneContainerClass).toEqual('catblocks-scene accordion-item');

    const sceneContainerInnerText = await sceneContainerHandle.$eval(`#${sceneID}-header`, x => x.innerText);
    expect(sceneContainerInnerText.startsWith(nameOfTheScene)).toBeTruthy();

    const sceneContainerTarget = await sceneContainerHandle.$eval(`#${sceneID}-header > button`, x =>
      x.getAttribute('data-bs-target')
    );
    expect(sceneContainerTarget).toEqual(`#${sceneID}-collapseOne`);

    const catblocksObjContainerHandle = await sceneContainerHandle.$('.catblocks-object-container');
    expect(catblocksObjContainerHandle).not.toBeNull();

    const sceneObjContainerParentAttr = await sceneContainerHandle.$eval(`#${sceneID}-collapseOne`, x =>
      x.getAttribute('data-bs-parent')
    );
    expect(sceneObjContainerParentAttr).toEqual(`#${accordionID}`);
  });

  test('Share renders object container properly', async () => {
    const containerID = 'container-div';
    const objectCardID = 'tobject';
    const objectName = 'objectName';
    const sceneObjectsID = 'sceneID-accordionObjects';

    await page.evaluate(
      (pContainerID, pObjectCardID, pObjectName, pSceneObjectsID) => {
        const container = document.createElement('div');
        container.setAttribute('id', pContainerID);
        document.getElementById('catblocks-container').append(container);

        Test.Share.renderObjectJSON(pObjectCardID, pSceneObjectsID, container, { name: pObjectName });
      },
      containerID,
      objectCardID,
      objectName,
      sceneObjectsID
    );

    const containerHandle = await page.$(`#${containerID}`);

    const objectCardHandle = await containerHandle.$(`*:first-child`);
    const realObjectCardID = await (await objectCardHandle.getProperty('id')).jsonValue();
    expect(realObjectCardID).toEqual(objectCardID);

    const objectCardClass = await (await objectCardHandle.getProperty('className')).jsonValue();
    expect(objectCardClass).toEqual('catblocks-object accordion-item');

    const objectHeaderText = await containerHandle.$eval(`#${objectCardID}-header`, x => x.innerText);
    expect(objectHeaderText.startsWith(objectName)).toBeTruthy();

    const dataParent = await containerHandle.$eval(`#${objectCardID}-collapseOneScene`, x =>
      x.getAttribute('data-bs-parent')
    );
    expect(dataParent).toEqual(`#${sceneObjectsID}`);

    const tabContent = await containerHandle.$('.tab-content');
    expect(tabContent).not.toBeNull();

    const tabsContainer = await containerHandle.$(`#${objectCardID}-tabs`);
    expect(tabsContainer).not.toBeNull();

    async function checkTabs(id) {
      const target = await containerHandle.$eval(id, x => x.getAttribute('data-bs-target'));
      const anchorItem = await containerHandle.$(target);
      expect(anchorItem).not.toBeNull();
    }

    await checkTabs(`#${objectCardID}-scripts-tab`);
    await checkTabs(`#${objectCardID}-looks-tab`);
    await checkTabs(`#${objectCardID}-sounds-tab`);
  });
});

describe('Share catroid program rendering tests', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });
    await page.evaluate(async () => {
      await Test.CatBlocks.init({
        container: 'catblocks-container',
        renderSize: 0.75,
        shareRoot: '',
        media: 'media/',
        language: 'en',
        rtl: false,
        noImageFound: 'No_Image_Available.jpg',
        advancedMode: false
      });

      const share = Test.CatBlocks.instance.controller;
      Test.Share = share;
    });
  });

  test('Share render unsupported version properly', async () => {
    const catObj = undefined;

    const errorMessage = await page.evaluate(pCatObj => {
      try {
        Test.Share.renderProgramJSON('programID', document.getElementById('catblocks-container'), pCatObj);
      } catch (e) {
        return e.message;
      }
    }, catObj);

    expect(errorMessage).toEqual('Empty program found');

    const shareTestContainerHandle = await page.$('#catblocks-container');
    const cardHeaderText = await shareTestContainerHandle.$eval('.accordion-header', x => x.innerText);
    expect(cardHeaderText).toEqual('Empty program found');
  });

  test('Share render an empty program properly', async () => {
    const catObj = {};

    const errorMessage = await page.evaluate(pCatObj => {
      try {
        Test.Share.renderProgramJSON('programID', document.getElementById('catblocks-container'), pCatObj);
      } catch (e) {
        return e.message;
      }
    }, catObj);

    expect(errorMessage).toEqual('Empty program found');

    const cardHeaderText = await page.$eval('.accordion-header', x => x.innerText);
    expect(cardHeaderText).toEqual('Empty program found');
  });

  test('Share render a single empty scene properly', async () => {
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

    await page.evaluate(pCatObj => {
      Test.Share.renderProgramJSON('programID', document.getElementById('catblocks-container'), pCatObj);
    }, catObj);

    const catSceneHandle = await page.$('.catblocks-scene');
    expect(catSceneHandle).not.toBeNull();

    const sceneHeaderText = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(sceneHeaderText.length).toBeGreaterThan(0);

    const catObjectContainer = await page.$('.catblocks-object-container');
    expect(catObjectContainer).not.toBeNull();

    const accordion = await page.$('.accordion');
    expect(accordion).not.toBeNull();

    const cardHeaderText = await page.$eval('.catblocks-object .accordion-header', x => x.innerHTML);
    expect(cardHeaderText.startsWith('No objects found')).toBeTruthy();
  });

  test('Share render multiple empty scenes properly', async () => {
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

    await page.evaluate(pCatObj => {
      Test.Share.renderProgramJSON('programID', document.getElementById('catblocks-container'), pCatObj);
    }, catObj);

    const catSceneHandle = await page.$('.catblocks-scene');
    expect(catSceneHandle).not.toBeNull();

    const sceneHeaderText = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(sceneHeaderText).not.toHaveLength(0);

    const catObjectContainer = await page.$('.catblocks-object-container');
    expect(catObjectContainer).not.toBeNull();

    const accordion = await page.$('.accordion');
    expect(accordion).not.toBeNull();

    const catblocksHandle = await page.$$('.catblocks-object');
    expect(catblocksHandle).toHaveLength(2);

    const cardHeaderText = await page.$eval('.catblocks-object .accordion-header', x => x.innerHTML);
    expect(cardHeaderText.startsWith('No objects found')).toBeTruthy();
  });

  test('Share render a single empty object properly', async () => {
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

    await page.evaluate(pCatObj => {
      Test.Share.renderProgramJSON('programID', document.getElementById('catblocks-container'), pCatObj);
    }, catObj);

    const cardHeaderText = await page.$eval('.catblocks-object .accordion-header', x => x.innerText);
    expect(cardHeaderText).toBe('tobject');

    const tabContainer = await page.$('.tab-pane');
    expect(tabContainer).not.toBeNull();

    const scriptContainer = await page.$('.catblocks-script');
    expect(scriptContainer).toBeNull();
  });

  test('Share render multiple empty objects in same scene', async () => {
    const programID = 'programID';
    const sceneName = 'testscene';
    const obj1Name = 'tobject1';
    const obj2Name = 'tobject2';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: obj1Name
            },
            {
              name: obj2Name
            }
          ]
        },
        {
          name: 'testscene2'
        }
      ]
    };

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [generatedProgramID, sceneID, obj1ID, obj2ID] = await page.evaluate(
      (pProgramID, pSceneName, pObjectName1, pObjectName2) => {
        return [
          Test.ShareUtils.generateID(pProgramID),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName1}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName2}`)
        ];
      },
      programID,
      sceneName,
      obj1Name,
      obj2Name
    );

    const headers = await page.$$('.catblocks-scene-header');
    // open first scene
    await headers[0].click();
    // wait for it to show
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);
    // open second scene
    await headers[1].click();

    const programContainer = await page.$(`#${generatedProgramID}`);
    expect(programContainer).not.toBeNull();

    const sceneContainer = await page.$(`#${sceneID}`);
    expect(sceneContainer).not.toBeNull();

    const obj1scriptsTab = await page.$(`#${obj1ID}-scripts-tab`);
    expect(obj1scriptsTab).not.toBeNull();

    const obj1looksTab = await page.$(`#${obj1ID}-looks`);
    expect(obj1looksTab).not.toBeNull();

    const obj1emptySounds = await page.$(`#${obj1ID}-sounds .catblocks-empty-text`);
    expect(obj1emptySounds).not.toBeNull();

    const obj2scriptsTab = await page.$(`#${obj2ID}-scripts-tab`);
    expect(obj2scriptsTab).not.toBeNull();

    const obj2looksTab = await page.$(`#${obj2ID}-looks`);
    expect(obj2looksTab).not.toBeNull();

    const obj2emptySounds = await page.$(`#${obj2ID}-sounds .catblocks-empty-text`);
    expect(obj2emptySounds).not.toBeNull();
  });

  test('Share render empty objects in different scenes', async () => {
    const programID = 'programID';
    const scene1Name = 'testscene1';
    const obj1Name = 'tobject1';
    const scene2Name = 'testscene2';
    const obj2Name = 'tobject2';

    const catObj = {
      scenes: [
        {
          name: scene1Name,
          objectList: [
            {
              name: obj1Name
            }
          ]
        },
        {
          name: scene2Name,
          objectList: [
            {
              name: obj2Name
            }
          ]
        }
      ]
    };

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [generatedProgramID, scene1ID, scene2ID, obj1ID, obj2ID] = await page.evaluate(
      (pProgramID, pSceneName1, pObjectName1, pSceneName2, pObjectName2) => {
        return [
          Test.ShareUtils.generateID(pProgramID),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName1}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName2}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName1}-${pObjectName1}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName2}-${pObjectName2}`)
        ];
      },
      programID,
      scene1Name,
      obj1Name,
      scene2Name,
      obj2Name
    );

    await page.click(`#${scene1ID}`);
    await page.click(`#${scene2ID}`);

    const programContainer = await page.$(`#${generatedProgramID}`);
    expect(programContainer).not.toBeNull();

    const scene1Container = await page.$(`#${scene1ID}`);
    expect(scene1Container).not.toBeNull();

    const scene2Container = await page.$(`#${scene2ID}`);
    expect(scene2Container).not.toBeNull();

    const obj1scriptsTab = await page.$(`#${obj1ID}-scripts-tab`);
    expect(obj1scriptsTab).not.toBeNull();

    const obj1looksTab = await page.$(`#${obj1ID}-looks`);
    expect(obj1looksTab).not.toBeNull();

    const obj1emptySounds = await page.$(`#${obj1ID}-sounds .catblocks-empty-text`);
    expect(obj1emptySounds).not.toBeNull();

    const obj2scriptsTab = await page.$(`#${obj2ID}-scripts-tab`);
    expect(obj2scriptsTab).not.toBeNull();

    const obj2looksTab = await page.$(`#${obj2ID}-looks`);
    expect(obj2looksTab).not.toBeNull();

    const obj2emptySounds = await page.$(`#${obj2ID}-sounds .catblocks-empty-text`);
    expect(obj2emptySounds).not.toBeNull();
  });

  test('Share render script svg', async () => {
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

    const textContent = await page.evaluate(pScriptJSON => {
      const svg = Test.Share.domToSvg(pScriptJSON);
      return svg.textContent;
    }, scriptJSON);

    expect(textContent.replace(/\s/g, ' ').includes('When scene starts')).toBeTruthy();
    expect(textContent.replace(/\s/g, ' ').includes('Set x to')).toBeTruthy();
    expect(textContent.replace(/\s/g, ' ').includes('unset')).toBeTruthy();
  });

  test('Share render svg script box properly', async () => {
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

    const [width, height] = await page.evaluate(pScriptJSON => {
      const svg = Test.Share.domToSvg(pScriptJSON);
      return [svg.getAttribute('width'), svg.getAttribute('height')];
    }, scriptJSON);

    const widthValue = parseFloat(width.replace('px', ''));
    const heightValue = parseFloat(height.replace('px', ''));

    expect(widthValue).toBeGreaterThan(0);
    expect(heightValue).toBeGreaterThan(0);
  });

  test('Share render single empty scriptlist properly', async () => {
    const programID = 'programID';
    const sceneName = 'testscene';
    const objectName = 'tobject';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: objectName,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const objID = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        return Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`);
      },
      programID,
      sceneName,
      objectName
    );

    const container = await page.$(`#${objID} #${objID}-scripts .catblocks-script svg.catblocks-svg`);
    expect(container).not.toBeNull();
  });

  test('Share render object with sound', async () => {
    const testDisplayName = 'Silence Sound';
    const programID = 'programID';
    const sceneName = 'testscene';
    const objectName = 'tobject';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: objectName,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const objID = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        return Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`);
      },
      programID,
      sceneName,
      objectName
    );

    const soundNameHTML = await page.$eval(`#${objID} #${objID}-sounds .catblocks-object-sound-name`, x => x.innerHTML);
    expect(soundNameHTML).toBe(testDisplayName);
  });

  test('JSON object has a script', async () => {
    const programID = 'programID';
    const sceneName = 'testscene';
    const objectName = 'tobject';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: objectName,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const objID = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        return Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`);
      },
      programID,
      sceneName,
      objectName
    );

    const scriptContainer = await page.$(`#${objID} #${objID}-scripts .catblocks-script svg.catblocks-svg`);
    expect(scriptContainer).not.toBeNull();
  });

  test('Share test lazy loading of images', async () => {
    const testDisplayName = 'My actor';
    const programID = 'programID';
    const sceneName = 'testscene';
    const objectName = 'tobject';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: objectName,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [objID, sceneID] = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        return [
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`)
        ];
      },
      programID,
      sceneName,
      objectName
    );

    // open scene (clicks first element with class)
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);

    const dataSrc = await page.$eval(`#${objID} #${objID}-looks .catblocks-object-look-item`, x =>
      x.getAttribute('data-src')
    );
    const beforeClickSrc = await page.$eval(`#${objID} #${objID}-looks .catblocks-object-look-item`, x =>
      x.getAttribute('src')
    );
    expect(beforeClickSrc).toBeNull();

    // open object
    await page.click(`#${objID}-header`);
    // wait for tabs to be visible
    await page.waitForSelector(`#${objID}-tabs`);

    // fix problem for somehow opening scene2
    await page.waitForTimeout(500);

    // open looks tab
    await page.click(`#${objID}-looks-tab`);
    // wait for content to be visible
    await page.waitForSelector(`#${objID}-looks.show`);

    const afterClickSrc = await page.$eval(`#${objID} #${objID}-looks .catblocks-object-look-item`, x =>
      x.getAttribute('src')
    );
    expect(afterClickSrc).toBe(dataSrc);
  });

  test('Share test lazy loading of images by clicking on sub elements', async () => {
    const testDisplayName = 'My actor';
    const programID = 'programID';
    const sceneName = 'testscene';
    const objectName = 'tobject';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: 'First Object',
              lookList: [
                {
                  name: testDisplayName,
                  fileName: 'My actor or object.png'
                }
              ]
            },
            {
              name: `${objectName}`,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [objID, sceneID] = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        return [
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`)
        ];
      },
      programID,
      sceneName,
      objectName
    );

    // open scene (clicks first element with class)
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);

    const dataSrc = await page.$eval(`#${objID} #${objID}-looks .catblocks-object-look-item`, x =>
      x.getAttribute('data-src')
    );
    const beforeClickSrc = await page.$eval(`#${objID} #${objID}-looks .catblocks-object-look-item`, x =>
      x.getAttribute('src')
    );
    expect(beforeClickSrc).toBeNull();

    // open object
    await page.click(`#${objID}-header .accordion-button`);
    // wait for tabs to be visible
    await page.waitForSelector(`#${objID}-tabs`);

    // fix problem for somehow opening scene2
    await page.waitForTimeout(500);

    // open looks tab
    await page.click(`#${objID}-looks-tab`);
    // wait for content to be visible
    await page.waitForSelector(`#${objID}-looks.show`);

    const afterClickSrc = await page.$eval(`#${objID} #${objID}-looks .catblocks-object-look-item`, x =>
      x.getAttribute('src')
    );
    expect(afterClickSrc).toBe(dataSrc);
  });

  test('Share render object with magnifying glass in look tab and simulate click to popup image', async () => {
    const testDisplayName = 'My actor';
    const programID = 'magnifyMe';
    const sceneName = 'testscene';
    const objectName = 'testobj';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: objectName,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [objID, sceneID, expectedID] = await page.evaluate(
      (pProgramID, pSceneName, pObjectName, pTestDisplayName) => {
        const objID = Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`);
        return [
          objID,
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`),
          Test.ShareUtils.generateID(`${objID}-${pTestDisplayName}`) + '-imgID'
        ];
      },
      programID,
      sceneName,
      objectName,
      testDisplayName
    );

    // open scene (clicks first element with class)
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);

    const expectedSrc = await page.$eval('#' + objID + ' #' + objID + '-looks .catblocks-object-look-item', node =>
      node.getAttribute('data-src')
    );
    await page.waitForSelector('.catblocks-object-container', { visible: true });

    // open modal
    await page.click('.catblocks-object .accordion-header');

    const tabID = '#' + objID + '-looks-tab';
    await page.waitForSelector(tabID, { visible: true });

    // fix problem for somehow opening scene2
    await page.waitForTimeout(500);

    await page.click(tabID);

    const searchID = '#' + objID + ' #' + objID + '-looks .catblocks-search';
    await page.waitForSelector(searchID, { visible: true });
    await page.click(searchID);

    const itemContainerID = await page.$eval(
      '#' + objID + ' #' + objID + '-looks .catblocks-object-look-item',
      node => node.id
    );
    expect(itemContainerID).toBe(expectedID);

    const searchContainerInnerHTML = await page.$eval(
      '#' + objID + ' #' + objID + '-looks .catblocks-search',
      node => node.innerHTML
    );
    const origin = await page.evaluate(() => {
      return window.location.origin;
    });

    expect(searchContainerInnerHTML).toBe(`<img src="${origin}/media/search_black_24dp.svg">`);

    const previewSrc = await page.$eval('.imagepreview', node => node.getAttribute('src'));
    expect(previewSrc).toBe(expectedSrc);
  });

  test('JSON with one scene', async () => {
    const sceneName = 'testscene1';

    const catObj = {
      scenes: [
        {
          name: sceneName
        }
      ]
    };

    const result = await page.evaluate(pCatObj => {
      try {
        // option to render the scene directly
        Test.Share.renderProgramJSON('programID', document.getElementById('catblocks-container'), pCatObj, {
          scene: {
            renderNow: {
              scene: sceneName
            }
          }
        });
        return true;
      } catch (e) {
        return false;
      }
    }, catObj);

    expect(result).toBeFalsy();
  });

  test('JSON with two objects in scene rendered properly', async () => {
    const sceneName = 'testscene';
    const programID = 'programID';

    const catObj = {
      scenes: [
        {
          name: sceneName,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const sceneID = await page.evaluate(
      (pProgramID, pSceneName) => {
        return Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`);
      },
      programID,
      sceneName
    );

    // open scene (clicks first element with class)
    await page.click('.catblocks-scene-header');
    // wait for it to show
    // FIXME: endlos warten hier
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);

    const cbSceneHandle = await page.$('.catblocks-scene');
    expect(cbSceneHandle).not.toBeNull();

    const cbSceneHeaderHTML = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(cbSceneHeaderHTML).not.toHaveLength(0);

    const cbObjContainerHandle = await page.$('.catblocks-object-container');
    expect(cbObjContainerHandle).not.toBeNull();

    const accordionHandle = await page.$('.accordion');
    expect(accordionHandle).not.toBeNull();

    const cbCardHeaderText = await page.$eval('.catblocks-object .accordion-header', x => x.innerText);

    expect(cbCardHeaderText).toBe('Background');
  });

  test('Share renders scene and card headers for one scene properly', async () => {
    const programID = 'testname';
    const sceneName = 'testscene';

    const catObj = {
      programName: programID,
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: 'Background'
            }
          ]
        }
      ]
    };

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const sceneID = await page.evaluate(
      (pProgramID, pSceneName) => {
        return Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`);
      },
      programID,
      sceneName
    );

    const identifier = '.catblocks-scene .accordion-header .accordion-button';
    const cardHeaderInitialText = await page.$eval(identifier, x => x.innerHTML);
    expect(cardHeaderInitialText).toBe(programID);

    await page.click(identifier);
    // wait for it to show
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);

    const cardHeaderTextExpanded = await page.$eval(identifier, x => x.innerHTML);
    expect(cardHeaderTextExpanded).toBe(programID);

    await page.click(identifier);
    // wait for it to hide
    await page.waitForSelector(`#${sceneID}-collapseOne:not(.show)`);

    const cardHeaderTextCollapsed = await page.$eval(identifier, x => x.innerHTML);
    expect(cardHeaderTextCollapsed).toBe(programID);
  });

  test('Share renders scene and card headers for multiple scenes properly', async () => {
    const programID = 'testname';
    const sceneName1 = 'testscene1';
    const objName1 = 'Background';

    const catObj = {
      scenes: [
        {
          name: sceneName1,
          objectList: [
            {
              name: objName1
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [scene1ID, obj1ID] = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        return [
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`)
        ];
      },
      programID,
      sceneName1,
      objName1
    );

    // open scene
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${scene1ID}-collapseOne.show`);

    const sceneHeaderInitialText = await page.$eval('.catblocks-scene-header', x => x.innerText);
    expect(sceneHeaderInitialText).toBe(sceneName1);

    const cardHeaderInitialText = await page.$eval('.catblocks-object .accordion-header', x => x.innerText);
    expect(cardHeaderInitialText).toBe(objName1);

    // accordion transition time...
    await page.waitForTimeout(500);
    const scriptsVisible = await page.$eval(`#${obj1ID}-scripts`, x => x.offsetParent !== null);
    expect(scriptsVisible).toBe(false);

    // open object
    await page.click('.catblocks-object .accordion-header');
    // wait for it
    await page.waitForSelector(`#${obj1ID}-collapseOneScene.show`);

    // accordion transition time...
    await page.waitForTimeout(500);
    const scriptsVisibleAfterOpen = await page.$eval(`#${obj1ID}-scripts`, x => x.offsetParent !== null);
    expect(scriptsVisibleAfterOpen).toBe(true);

    // close object
    await page.click('.catblocks-object .accordion-header');
    // wait for it
    await page.waitForSelector(`#${obj1ID}-collapseOneScene:not(.show)`);

    // accordion transition time...
    await page.waitForTimeout(500);
    const scriptsVisibleAfterClose = await page.$eval(`#${obj1ID}-scripts`, x => x.offsetParent !== null);
    expect(scriptsVisibleAfterClose).toBe(false);

    // close scene
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${scene1ID}-collapseOne:not(.show)`);

    // accordion transition time...
    await page.waitForTimeout(500);
    const objectVisible = await page.$eval(`#${obj1ID}-header`, x => x.offsetParent !== null);
    expect(objectVisible).toBe(false);
  });

  test('scrolling bricks on x axis on mobile share page is working', async () => {
    const oldViewPort = await page.viewport();
    await page.setViewport({
      width: 100,
      height: 1000
    });

    const programID = 'testProgram';
    const sceneName1 = 'Testscene';
    const objName1 = 'TestObject';

    const catObj = {
      scenes: [
        {
          name: sceneName1,
          objectList: [
            {
              name: objName1,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [scene1ID, obj1ID] = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        return [
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`),
          Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`)
        ];
      },
      programID,
      sceneName1,
      objName1
    );

    // open scene
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${scene1ID}-collapseOne.show`);

    // close object
    await page.click('.catblocks-object .accordion-header');
    // wait for it
    await page.waitForSelector(`#${obj1ID}-collapseOneScene.show`);

    const initialXPosition = await page.$eval('.catblocks-script', x => x.scrollLeft);

    await page.evaluate(() => {
      const brickContainer = document.getElementById('catblocks-container').querySelector('.catblocks-script');
      brickContainer.scrollBy(1, 0);
    });

    const scrolledXPosition = await page.$eval('.catblocks-script', x => x.scrollLeft);
    expect(scrolledXPosition).not.toBe(initialXPosition);

    const overflowX = await page.$eval('.catblocks-script', x => x.style.overflowX);
    expect(overflowX).toBe('auto');
    await page.setViewport(oldViewPort);
  });

  test('Images not rendered when disabled', async () => {
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

    await page.evaluate(pCatObj => {
      Test.Share.config.renderLooks = false;
      Test.Share.renderProgramJSON('programID', document.getElementById('catblocks-container'), pCatObj);
      Test.Share.config.renderLooks = true;
    }, catObj);

    const tabs = await page.$$('.catblocks-tabs .nav-item');
    expect(tabs).toHaveLength(2);
  });

  test('Check for magnifying glass visible on share', async () => {
    const shareCSS = `img {
        max-width: 100%!important;
        page-break-inside: avoid;
        vertical-align: middle;
    }`;
    await page.addStyleTag({ content: shareCSS });

    const testDisplayName = 'My actor';
    const programID = 'magnifyMe';
    const sceneName = 'testscene';
    const objectName = 'testobj';

    const catObj = {
      scenes: [
        {
          name: sceneName,
          objectList: [
            {
              name: objectName,
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

    await page.evaluate(
      (pCatObj, pProgramID) => {
        Test.Share.renderProgramJSON(pProgramID, document.getElementById('catblocks-container'), pCatObj);
      },
      catObj,
      programID
    );

    const [objID, sceneID] = await page.evaluate(
      (pProgramID, pSceneName, pObjectName) => {
        const objID = Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}-${pObjectName}`);
        return [objID, Test.ShareUtils.generateID(`${pProgramID}-${pSceneName}`)];
      },
      programID,
      sceneName,
      objectName
    );

    // open scene (clicks first element with class)
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);
    await page.waitForSelector('.catblocks-object-container', { visible: true });

    // open modal
    await page.click('.catblocks-object .accordion-header');

    const tabID = '#' + objID + '-looks-tab';
    await page.waitForSelector(tabID, { visible: true });

    // fix problem for somehow opening scene2
    await page.waitForTimeout(500);

    await page.click(tabID);

    const searchID = '#' + objID + ' #' + objID + '-looks .catblocks-search';
    await page.waitForSelector(searchID, { visible: true });
    const [magnifyingGlassWidth, magnifyingGlassHeight] = await page.$eval(`${searchID} img`, img => [
      img.clientWidth,
      img.clientHeight
    ]);

    const magnifyingGlassPixelSize = 22;
    expect(magnifyingGlassWidth).toBeGreaterThanOrEqual(magnifyingGlassPixelSize);
    expect(magnifyingGlassHeight).toBeGreaterThanOrEqual(magnifyingGlassPixelSize);

    const [magnifyingButtonWidth, magnifyingButtonHeight] = await page.$eval(searchID, btn => [
      btn.offsetWidth,
      btn.offsetWidth
    ]);

    expect(magnifyingButtonWidth).toBeGreaterThanOrEqual(2 * magnifyingGlassPixelSize);
    expect(magnifyingButtonHeight).toBeGreaterThanOrEqual(2 * magnifyingGlassPixelSize);
  }, 99999);
});
