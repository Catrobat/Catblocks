/**
 * @description Share test
 */
/* global page, SERVER, Test, shareTestContainer */
/* eslint no-global-assign:0 */
'use strict';

beforeEach(async () => {
  await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  page.on('console', message => {
    if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
      console.log(message.text());
    }
  });
  await page.evaluate(() => {
    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
    shareTestContainer = document.getElementById('shareprogs');
    removeAllChildNodes(shareTestContainer);
    shareTestContainer.innerHTML = '';
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
        Test.Share.addSceneContainer(pAccordionID, pSceneID, shareTestContainer, {
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
    expect(sceneContainerClass).toEqual('catblocks-scene card');

    const sceneContainerInnerText = await sceneContainerHandle.$eval(`#${sceneID}-header`, x => x.innerText);
    expect(sceneContainerInnerText.startsWith(nameOfTheScene)).toBeTruthy();

    const sceneContainerTarget = await sceneContainerHandle.$eval(`#${sceneID}-header`, x =>
      x.getAttribute('data-target')
    );
    expect(sceneContainerTarget).toEqual(`#${sceneID}-collapseOne`);

    const catblocksObjContainerHandle = sceneContainerHandle.$('.catblocks-object-container');
    expect(catblocksObjContainerHandle).not.toBeNull();

    const sceneObjContainerParentAttr = await sceneContainerHandle.$eval(`#${sceneID}-collapseOne`, x =>
      x.getAttribute('data-parent')
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
        shareTestContainer.append(container);

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
    expect(objectCardClass).toEqual('catblocks-object card');

    const objectHeaderText = await containerHandle.$eval(`#${objectCardID}-header`, x => x.innerText);
    expect(objectHeaderText.startsWith(objectName)).toBeTruthy();

    const dataParent = await containerHandle.$eval(`#${objectCardID}-collapseOneScene`, x =>
      x.getAttribute('data-parent')
    );
    expect(dataParent).toEqual(`#${sceneObjectsID}`);

    const tabContent = await containerHandle.$('.tab-content');
    expect(tabContent).not.toBeNull();

    const tabsContainer = await containerHandle.$(`#${objectCardID}-tabs`);
    expect(tabsContainer).not.toBeNull();

    async function checkTabs(id) {
      const container = await containerHandle.$(id);
      expect(container).not.toBeNull();

      const href = await (await container.getProperty('href')).jsonValue();
      const anchor = href.split('/').pop();
      const anchorItem = await containerHandle.$(anchor);
      expect(anchorItem).not.toBeNull();
    }

    await checkTabs(`#${objectCardID}-scripts-tab`);
    await checkTabs(`#${objectCardID}-looks-tab`);
    await checkTabs(`#${objectCardID}-sounds-tab`);
  });
});

describe('Share catroid program rendering tests', () => {
  test('Share render unsupported version properly', async () => {
    const catObj = undefined;

    const errorMessage = await page.evaluate(pCatObj => {
      try {
        Test.Share.renderProgramJSON('programID', shareTestContainer, pCatObj);
      } catch (e) {
        return e.message;
      }
    }, catObj);

    expect(errorMessage).toEqual('Empty program found');

    const shareTestContainerHandle = await page.$('#shareprogs');
    const cardHeaderText = await shareTestContainerHandle.$eval('.card-header', x => x.innerText);
    expect(cardHeaderText).toEqual('Empty program found');
  });

  test('Share render an empty program properly', async () => {
    const catObj = {};

    const errorMessage = await page.evaluate(pCatObj => {
      try {
        Test.Share.renderProgramJSON('programID', shareTestContainer, pCatObj);
      } catch (e) {
        return e.message;
      }
    }, catObj);

    expect(errorMessage).toEqual('Empty program found');

    const cardHeaderText = await page.$eval('.card-header', x => x.innerText);
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
      Test.Share.renderProgramJSON('programID', shareTestContainer, pCatObj);
    }, catObj);

    const catSceneHandle = await page.$('.catblocks-scene');
    expect(catSceneHandle).not.toBeNull();

    const sceneHeaderText = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(sceneHeaderText.length).toBeGreaterThan(0);

    const catObjectContainer = await page.$('.catblocks-object-container');
    expect(catObjectContainer).not.toBeNull();

    const accordion = await page.$('.accordion');
    expect(accordion).not.toBeNull();

    const cardHeaderText = await page.$eval('.catblocks-object .card-header', x => x.innerHTML);
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
      Test.Share.renderProgramJSON('programID', shareTestContainer, pCatObj);
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

    const cardHeaderText = await page.$eval('.catblocks-object .card-header', x => x.innerHTML);
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
      Test.Share.renderProgramJSON('programID', shareTestContainer, pCatObj);
    }, catObj);

    const cardHeaderText = await page.$eval('.catblocks-object .card-header', x => x.innerHTML);
    expect(cardHeaderText.startsWith('<div class="header-title">tobject</div>')).toBeTruthy();

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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
    await page.click('.catblocks-object .card-header');

    const tabID = '#' + objID + '-looks-tab';
    await page.waitForSelector(tabID, { visible: true });

    // fix problem for somehow opening scene2
    await page.waitForTimeout(500);

    await page.click(tabID);

    const searchID = '#' + objID + ' #' + objID + '-looks .search';
    await page.waitForSelector(searchID, { visible: true });
    await page.click(searchID);

    const itemContainerID = await page.$eval(
      '#' + objID + ' #' + objID + '-looks .catblocks-object-look-item',
      node => node.id
    );
    expect(itemContainerID).toBe(expectedID);

    const searchContainerInnerHTML = await page.$eval(
      '#' + objID + ' #' + objID + '-looks .search',
      node => node.innerHTML
    );
    expect(searchContainerInnerHTML).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>'
    );

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
        Test.Share.renderProgramJSON('programID', shareTestContainer, pCatObj, {
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
    await page.waitForSelector(`#${sceneID}-collapseOne.show`);

    const cbSceneHandle = await page.$('.catblocks-scene');
    expect(cbSceneHandle).not.toBeNull();

    const cbSceneHeaderHTML = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(cbSceneHeaderHTML).not.toHaveLength(0);

    const cbObjContainerHandle = await page.$('.catblocks-object-container');
    expect(cbObjContainerHandle).not.toBeNull();

    const accordionHandle = await page.$('.accordion');
    expect(accordionHandle).not.toBeNull();

    const cbCardHeaderHTML = await page.$eval('.catblocks-object .card-header', x => x.innerHTML);
    expect(cbCardHeaderHTML).toContain(
      '<div class="header-title">Background</div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>'
    );
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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

    const identifier = '.catblocks-scene .card-header .header-title';
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
    const expectedSceneHeaderText =
      '<div class="header-title">testscene1</div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>';
    const expectedCardHeaderText =
      '<div class="header-title">Background</div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>';

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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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

    const sceneHeaderInitialText = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(sceneHeaderInitialText).toContain(expectedSceneHeaderText);

    const cardHeaderInitialText = await page.$eval('.catblocks-object .card-header', x => x.innerHTML);
    expect(cardHeaderInitialText).toContain(expectedCardHeaderText);

    // open object
    await page.click('.catblocks-object .card-header');
    // wait for it
    await page.waitForSelector(`#${obj1ID}-collapseOneScene.show`);

    const sceneHeaderTextExpanded = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(sceneHeaderTextExpanded).toContain(expectedSceneHeaderText);

    const cardHeaderTextExpanded = await page.$eval('.catblocks-object .card-header', x => x.innerHTML);
    expect(cardHeaderTextExpanded).toContain(expectedCardHeaderText);

    // close object
    await page.click('.catblocks-object .card-header');
    // wait for it
    await page.waitForSelector(`#${obj1ID}-collapseOneScene:not(.show)`);

    // close scene
    await page.click('.catblocks-scene-header');
    // wait for it to show
    await page.waitForSelector(`#${scene1ID}-collapseOne:not(.show)`);

    const sceneHeaderTextCollapsed = await page.$eval('.catblocks-scene-header', x => x.innerHTML);
    expect(sceneHeaderTextCollapsed).toContain(expectedSceneHeaderText);

    const cardHeaderTextCollapsed = await page.$eval('.catblocks-object .card-header', x => x.innerHTML);
    expect(cardHeaderTextCollapsed).toContain(expectedCardHeaderText);
  });

  test('scrolling bricks on x axis on mobile share page is working', async () => {
    await page.setViewport({
      width: 200,
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
        Test.Share.renderProgramJSON(pProgramID, shareTestContainer, pCatObj);
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
    await page.click('.catblocks-object .card-header');
    // wait for it
    await page.waitForSelector(`#${obj1ID}-collapseOneScene.show`);

    const initialXPosition = await page.$eval('.catblocks-script', x => x.scrollLeft);

    await page.evaluate(() => {
      const brickContainer = shareTestContainer.querySelector('.catblocks-script');
      brickContainer.scrollBy(1, 0);
    });

    const scrolledXPosition = await page.$eval('.catblocks-script', x => x.scrollLeft);
    expect(scrolledXPosition).not.toBe(initialXPosition);

    const overflowX = await page.$eval('.catblocks-script', x => x.style.overflowX);
    expect(overflowX).toBe('auto');
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
      Test.Share.renderProgramJSON('programID', shareTestContainer, pCatObj);
      Test.Share.config.renderLooks = true;
    }, catObj);

    const tabs = await page.$$('.catro-tabs .nav-item');
    expect(tabs).toHaveLength(2);
  });
});
