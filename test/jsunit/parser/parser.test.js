/**
 * @description Parser test
 *  for the parser we always need the webview
 */
/* global page, SERVER, Test */
/* eslint no-global-assign:0 */
'use strict';

const utils = require('../commonUtils');

describe('Parser catroid program tests', () => {
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
    page.on('console', message => {
      if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
        console.log(message.text());
      }
    });
  });

  test('Recognizes not supported program version', async () => {
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <catrobatLanguageVersion>0.993</catrobatLanguageVersion>
        <programName>Test Program</programName>
      </header>
      <scenes>
        <scene>
          <name>игра</name>
          <objectList></objectList>
        </scene>
      </scenes>
    </program>`;

    const result = await page.evaluate(pXML => {
      try {
        Test.Parser.convertProgramToJSONDebug(pXML);
      } catch (e) {
        return e.message;
      }
    }, xmlString);

    expect(result).toBe('Found program version 0.993, minimum supported is 0.9994');
  });

  test('Recognizes supported program version', async () => {
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <catrobatLanguageVersion>0.9994</catrobatLanguageVersion>
        <programName>Test Program</programName>
      </header>
      <scenes>
        <scene>
          <name>игра</name>
          <objectList></objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            name: expect.anything(),
            objectList: expect.anything()
          })
        ])
      })
    );
  });

  test('Handle empty program properly', async () => {
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <catrobatLanguageVersion>0.9994</catrobatLanguageVersion>
        <programName>Test Program</programName>
      </header>
      <scenes></scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.anything()
      })
    );
  });

  test('Handle empty single scene properly', async () => {
    const sceneName = 'tscene';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.9994</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>${sceneName}</name>
          <objectList></objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            name: sceneName,
            objectList: expect.anything()
          })
        ])
      })
    );
  });

  test('Handle multiple empty scenes properly', async () => {
    const sceneName1 = 'tscene1';
    const sceneName2 = 'tscene2';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.9994</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>${sceneName1}</name>
          <objectList></objectList>
        </scene>
        <scene>
          <name>${sceneName2}</name>
          <objectList></objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            name: sceneName1,
            objectList: expect.anything()
          }),
          expect.objectContaining({
            name: sceneName2,
            objectList: expect.anything()
          })
        ])
      })
    );
  });

  test('Handle single empty object properly', async () => {
    const sceneName = 'tscene';
    const objectName = 'tobject';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99995</catrobatLanguageVersion>
      </header>
      <settings />
      <scenes>
        <scene>
          <name>${sceneName}</name>
          <objectList>
            <object type="Sprite" name="${objectName}">
              <lookList />
              <soundList />
              <scriptList />
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            name: sceneName,
            objectList: expect.arrayContaining([
              expect.objectContaining({
                name: objectName
              })
            ])
          })
        ])
      })
    );
  });

  test('Handle single empty object in same scene properly', async () => {
    const sceneName = 'tscene';
    const objectName1 = 'tobject1';
    const objectName2 = 'tobject2';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99995</catrobatLanguageVersion>
      </header>
      <settings />
      <scenes>
        <scene>
          <name>tscene</name>
          <objectList>
            <object type="Sprite" name="tobject1">
              <lookList />
              <soundList />
              <scriptList />
            </object>
            <object type="Sprite" name="tobject2">
              <lookList />
              <soundList />
              <scriptList />
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            name: sceneName,
            objectList: expect.arrayContaining([
              expect.objectContaining({
                name: objectName1
              }),
              expect.objectContaining({
                name: objectName2
              })
            ])
          })
        ])
      })
    );
  });

  test('Handle single empty object in multiple scenes properly', async () => {
    const sceneName1 = 'tscene1';
    const sceneName2 = 'tscene2';
    const objectName1 = 'tobject1';
    const objectName2 = 'tobject2';

    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99995</catrobatLanguageVersion>
      </header>
      <settings />
      <scenes>
        <scene>
          <name>${sceneName1}</name>
          <objectList>
            <object type="Sprite" name="${objectName1}">
              <lookList />
              <soundList />
              <scriptList />
            </object>
          </objectList>
        </scene>
        <scene>
          <name>${sceneName2}</name>
          <objectList>
            <object type="Sprite" name="${objectName2}">
              <lookList />
              <soundList />
              <scriptList />
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            name: sceneName1,
            objectList: expect.arrayContaining([
              expect.objectContaining({
                name: objectName1
              })
            ])
          }),
          expect.objectContaining({
            name: sceneName2,
            objectList: expect.arrayContaining([
              expect.objectContaining({
                name: objectName2
              })
            ])
          })
        ])
      })
    );
  });

  test('Handle single empty script properly', async () => {
    const sceneName = 'tscene';
    const objectName = 'tobject';
    const scriptName = 'tscript';

    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99995</catrobatLanguageVersion>
      </header>
      <settings />
      <scenes>
        <scene>
          <name>${sceneName}</name>
          <objectList>
            <object type="Sprite" name="${objectName}">
              <lookList />
              <soundList />
              <scriptList>
                <script type="${scriptName}">
                  <brickList />
                </script>
              </scriptList>
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            name: sceneName,
            objectList: expect.arrayContaining([
              expect.objectContaining({
                name: objectName,
                scriptList: expect.arrayContaining([
                  expect.objectContaining({
                    name: scriptName
                  })
                ])
              })
            ])
          })
        ])
      })
    );
  });
});

describe('Catroid to Catblocks parser tests', () => {
  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  });

  test('Xml Character escaping test', async () => {
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>игра</name>
          <objectList>
            <object type="Sprite" name="цель">
              <lookList>
                <look fileName="Space-Panda.png" name="цель" />
              </lookList>
              <soundList />
              <scriptList>
                <script type="StartScript">
                  <brickList>
                    <brick type="SetSizeToBrick" id="testBrick">
                      <commentedOut>false</commentedOut>
                      <formulaList>
                        <formula category="SIZE">
                          <type>NUMBER</type>
                          <value id="testValue">60&amp;.0</value>
                        </formula>
                      </formulaList>
                    </brick>
                  </brickList>
                  <commentedOut>false</commentedOut>
                </script>
              </scriptList>
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const formula = await page.evaluate(pXML => {
      const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);
      const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
      return formulaMap.entries().next().value.toString();
    }, xmlString);

    expect(formula).toMatch('SIZE, 60& ');
  });

  test('LookList reference not within the same object', async () => {
    const objectName = 'TestLookListObject';
    const lookName = 'testLook';
    const lookFileName = 'testLook.png';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>игра</name>
          <objectList>
            <object type="Sprite" name="${objectName}">
              <lookList>
                <look fileName="${lookFileName}" name="${lookName}" />
              </lookList>
              <soundList />
              <scriptList />
            </object>
            <object type="Sprite" name="цель">
              <lookList></lookList>
              <soundList />
              <scriptList>
                <script type="StartScript">
                  <brickList>
                    <brick type="SetLookBrick">
                      <commentedOut>false</commentedOut>
                      <look reference="../../../../../../object[1]/lookList/look[1]" />
                    </brick>
                  </brickList>
                  <commentedOut>false</commentedOut>
                </script>
              </scriptList>
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            objectList: expect.arrayContaining([
              expect.objectContaining({
                lookList: expect.arrayContaining([
                  expect.objectContaining({
                    name: lookName,
                    fileName: lookFileName
                  })
                ])
              })
            ])
          })
        ])
      })
    );
  });

  test('SoundList reference not within the same object', async () => {
    const objectName = 'TestSoundListObject';
    const soundName = 'testSound';
    const soundFileName = 'testSound.png';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>игра</name>
          <objectList>
            <object type="Sprite" name="${objectName}">
              <lookList></lookList>
              <soundList>
                <sound fileName="${soundFileName}" name="${soundName}" />
              </soundList>
              <scriptList />
            </object>
            <object type="Sprite" name="цель">
              <lookList></lookList>
              <soundList />
              <scriptList>
                <script type="StartScript">
                  <brickList>
                    <brick type="SetSoundBrick">
                      <commentedOut>false</commentedOut>
                      <sound reference="../../../../../../object[1]/soundList/sound[1]" />
                    </brick>
                  </brickList>
                  <commentedOut>false</commentedOut>
                </script>
              </scriptList>
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            objectList: expect.arrayContaining([
              expect.objectContaining({
                name: objectName,
                soundList: expect.arrayContaining([
                  expect.objectContaining({
                    name: soundName,
                    fileName: soundFileName
                  })
                ])
              })
            ])
          })
        ])
      })
    );
  });

  test('no value is used if no nodeValue is given', async () => {
    const brickName = 'WaitBrick';
    const val1 = 37;
    const val2 = 58;
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>игра</name>
          <objectList>
            <object type="Sprite" name="TestSoundListObject">
              <lookList />
              <soundList>
                <sound fileName="testSound.png" name="testSound" />
              </soundList>
              <scriptList />
            </object>
            <object type="Sprite" name="цель">
              <lookList />
              <soundList />
              <scriptList>
                <script type="StartScript">
                  <brickList>
                    <brick type="${brickName}">
                      <commentedOut>false</commentedOut>
                      <formulaList>
                        <formula category="testFormula">
                          <leftChild>
                            <type>NUMBER</type>
                            <value>${val1}</value>
                          </leftChild>
                          <rightChild>
                            <type>NUMBER</type>
                            <value>${val2}</value>
                          </rightChild>
                          <type>FUNCTION</type>
                          <value />
                        </formula>
                      </formulaList>
                    </brick>
                  </brickList>
                  <commentedOut>false</commentedOut>
                </script>
              </scriptList>
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const [programJSON, formulaString] = await page.evaluate(pXML => {
      const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);
      return [
        programJSON,
        programJSON.scenes[0].objectList[1].scriptList[0].brickList[0].formValues.entries().next().value.toString()
      ];
    }, xmlString);

    expect(programJSON.scenes[0].objectList[1].scriptList[0].brickList[0].name).toBe(brickName);
    expect(formulaString).toMatch(`${val1}    ${val2}`);
  });

  test('parser converts catroid script properly', async () => {
    const scriptName = 'BroadcastScript';
    const brick1 = 'ForeverBrick';
    const brick2 = 'PlaySoundAndWaitBrick';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>TestScene</name>
          <objectList>
            <object type="Sprite" name="TestObject">
              <lookList>
                <look fileName="Space-Panda.png" name="Space-Panda" />
              </lookList>
              <soundList />
              <scriptList>
                <script type="${scriptName}">
                  <brickList>
                    <brick type="${brick1}">
                      <commentedOut>false</commentedOut>
                      <loopBricks>
                        <brick type="${brick2}">
                          <commentedOut>false</commentedOut>
                          <sound name="soundTest" />
                        </brick>
                      </loopBricks>
                    </brick>
                  </brickList>
                  <commentedOut>false</commentedOut>
                  <receivedMessage>звуки</receivedMessage>
                </script>
              </scriptList>
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            objectList: expect.arrayContaining([
              expect.objectContaining({
                scriptList: expect.arrayContaining([
                  expect.objectContaining({
                    name: scriptName,
                    brickList: expect.arrayContaining([
                      expect.objectContaining({
                        name: brick1,
                        loopOrIfBrickList: expect.arrayContaining([
                          expect.objectContaining({
                            name: brick2
                          })
                        ])
                      })
                    ])
                  })
                ])
              })
            ])
          })
        ])
      })
    );
  });

  test('check, if the content in the repeat block is right', async () => {
    const playsoundBrick = 'PlaySoundBrick';
    const repeatBrick = 'RepeatBrick';
    const setBackgroundBrick = 'SetBackgroundBrick';
    const waitBrick = 'WaitBrick';
    const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <program>
      <header>
        <programName>Test Program</programName>
        <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
      </header>
      <scenes>
        <scene>
          <name>TestScene</name>
          <objectList>
            <object type="Sprite" name="TestObject">
              <lookList>
                <look fileName="Space-Panda.png" name="Space-Panda" />
              </lookList>
              <soundList />
              <scriptList>
                <script type="StartScript">
                  <brickList>
                    <brick type="${playsoundBrick}">
                      <commentedOut>false</commentedOut>
                    </brick>
                    <brick type="${repeatBrick}">
                      <commentedOut>false</commentedOut>
                      <formulaList>
                        <formula category="TIMES_TO_REPEAT">
                          <type>NUMBER</type>
                          <value>1000000000</value>
                        </formula>
                      </formulaList>
                    </brick>
                    <brick type="${setBackgroundBrick}"></brick>
                    <brick type="${waitBrick}"></brick>
                    <brick type="LoopEndBrick">
                      <commentedOut>false</commentedOut>
                    </brick>
                  </brickList>
                  <commentedOut>false</commentedOut>
                  <isUserScript>false</isUserScript>
                </script>
              </scriptList>
            </object>
          </objectList>
        </scene>
      </scenes>
    </program>`;

    const programJSON = await page.evaluate(pXML => {
      return Test.Parser.convertProgramToJSONDebug(pXML);
    }, xmlString);

    expect(programJSON).toEqual(
      expect.objectContaining({
        scenes: expect.arrayContaining([
          expect.objectContaining({
            objectList: expect.arrayContaining([
              expect.objectContaining({
                scriptList: expect.arrayContaining([
                  expect.objectContaining({
                    brickList: expect.arrayContaining([
                      expect.objectContaining({
                        name: playsoundBrick
                      }),
                      expect.objectContaining({
                        name: repeatBrick,
                        loopOrIfBrickList: expect.arrayContaining([
                          expect.objectContaining({
                            name: setBackgroundBrick
                          }),
                          expect.objectContaining({
                            name: waitBrick
                          })
                        ])
                      })
                    ])
                  })
                ])
              })
            ])
          })
        ])
      })
    );
  });

  describe('Spinner parsing test', () => {
    test('Handle correct spinner value', async () => {
      const droneBrick = 'DronePlayLedAnimationBrick';
      const i18nCode = 'ARDRONE_LED_ANIMATION_BLINK_GREEN_RED';
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99995</catrobatLanguageVersion>
        </header>
        <settings />
        <scenes>
          <scene>
            <name>tscene</name>
            <objectList>
              <object type="Sprite" name="tobject">
                <lookList />
                <soundList />
                <scriptList>
                  <script type="tscript">
                    <brickList>
                      <brick type="${droneBrick}">
                        <commentedOut>false</commentedOut>
                        <ledAnimationName>${i18nCode}</ledAnimationName>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const lang = 'en';
      const langObj = JSON.parse(utils.readFileSync(`${utils.PATHS.CATBLOCKS_MSGS}${lang}.json`));

      const [programJSON, formulaString] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);
        return [
          programJSON,
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues.entries().next().value.toString()
        ];
      }, xmlString);

      const result =
        programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name === droneBrick &&
        formulaString.includes(langObj[i18nCode]);

      expect(result).toBeTruthy();
    });

    test('Handle invalid spinner value', async () => {
      const droneBrick = 'DronePlayLedAnimationBrick';
      const invalidI18N = 'SOME_VALUE_I_DO_NOT_CARE';
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99995</catrobatLanguageVersion>
        </header>
        <settings />
        <scenes>
          <scene>
            <name>tscene</name>
            <objectList>
              <object type="Sprite" name="tobject">
                <lookList />
                <soundList />
                <scriptList>
                  <script type="tscript">
                    <brickList>
                      <brick type="${droneBrick}">
                        <commentedOut>false</commentedOut>
                        <ledAnimationName>${invalidI18N}</ledAnimationName>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, formulaSize, formulaString] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);
        return [
          programJSON,
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues.size,
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues.entries().next().value.toString()
        ];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: droneBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(formulaSize).toBe(1);
      expect(formulaString).toMatch(invalidI18N);
    });

    test('Handle non-exiting spinner value', async () => {
      const droneBrick = 'DronePlayLedAnimationBrick';
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99995</catrobatLanguageVersion>
        </header>
        <settings />
        <scenes>
          <scene>
            <name>tscene</name>
            <objectList>
              <object type="Sprite" name="tobject">
                <lookList />
                <soundList />
                <scriptList>
                  <script type="tscript">
                    <brickList>
                      <brick type="${droneBrick}">
                        <commentedOut>false</commentedOut>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, formula] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);
        return [
          programJSON,
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues.entries().next().value
        ];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: droneBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(formula).toBeNull();
    });
  });

  describe('UserVariable parsing', () => {
    test('of local uservariable parsing', async () => {
      const variableBrick = 'SetVariableBrick';
      const variableName = 'VARIABLE';
      const firstValue = '0';
      const userVarialbe = 'tUserVariable';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${variableBrick}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${variableName}">
                            <type>NUMBER</type>
                            <value>${firstValue}</value>
                          </formula>
                        </formulaList>
                        <userVariable type="UserVariable" serialization="custom">
                          <userVariable>
                            <default>
                              <deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey>
                              <name>${userVarialbe}</name>
                            </default>
                          </userVariable>
                        </userVariable>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: variableBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([variableName, 'DROPDOWN']);
      expect(mapValues).toEqual([' ' + firstValue + ' ', userVarialbe]);
    });

    test('local empty name uservariable parsing', async () => {
      const variableBrick = 'SetVariableBrick';
      const variableName = 'VARIABLE';
      const firstValue = '0';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${variableBrick}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${variableName}">
                            <type>NUMBER</type>
                            <value>${firstValue}</value>
                          </formula>
                        </formulaList>
                        <userVariable type="UserVariable" serialization="custom">
                          <userVariable>
                            <default>
                              <deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey>
                              <name></name>
                            </default>
                          </userVariable>
                        </userVariable>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: variableBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([variableName, 'DROPDOWN']);
      expect(mapValues).toEqual([' ' + firstValue + ' ', '']);
    });

    test('local uservariable parsing without name tag', async () => {
      const variableBrick = 'SetVariableBrick';
      const variableName = 'VARIABLE';
      const firstValue = '0';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${variableBrick}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${variableName}">
                            <type>NUMBER</type>
                            <value>${firstValue}</value>
                          </formula>
                        </formulaList>
                        <userVariable type="UserVariable" serialization="custom">
                          <userVariable>
                            <default>
                              <deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey>
                              <name />
                            </default>
                          </userVariable>
                        </userVariable>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: variableBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([variableName, 'DROPDOWN']);
      expect(mapValues).toEqual([' ' + firstValue + ' ', '']);
    });

    test('remote uservariable parsing', async () => {
      const variableBrick = 'SetVariableBrick';
      const variableName = 'VARIABLE';
      const firstValue = '0';
      const userVariable = 'tUserVariable';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${variableBrick}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${variableName}">
                            <type>NUMBER</type>
                            <value>${firstValue}</value>
                          </formula>
                        </formulaList>
                        <userVariable type="UserVariable" serialization="custom">
                          <userVariable>
                            <default>
                              <deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey>
                              <name>${userVariable}</name>
                            </default>
                          </userVariable>
                        </userVariable>
                      </brick>
                      <brick type="SetVariableBrick">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="VARIABLE">
                            <type>NUMBER</type>
                            <value>0</value>
                          </formula>
                        </formulaList>
                        <userVariable reference="../../brick[1]" />
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: variableBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([variableName, 'DROPDOWN']);
      expect(mapValues).toEqual([' ' + firstValue + ' ', userVariable]);
    });

    test('remote empty name uservariable parsing', async () => {
      const variableBrick = 'SetVariableBrick';
      const variableName = 'VARIABLE';
      const firstValue = '0';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${variableBrick}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${variableName}">
                            <type>NUMBER</type>
                            <value>${firstValue}</value>
                          </formula>
                        </formulaList>
                        <userVariable type="UserVariable" serialization="custom">
                          <userVariable>
                            <default>
                              <deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey>
                              <name></name>
                            </default>
                          </userVariable>
                        </userVariable>
                      </brick>
                      <brick type="SetVariableBrick">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="VARIABLE">
                            <type>NUMBER</type>
                            <value>0</value>
                          </formula>
                        </formulaList>
                        <userVariable reference="../../brick[1]" />
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: variableBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([variableName, 'DROPDOWN']);
      expect(mapValues).toEqual([' ' + firstValue + ' ', '']);
    });

    test('remote uservariable parsing without name tag', async () => {
      const variableBrick = 'SetVariableBrick';
      const variableName = 'VARIABLE';
      const firstValue = '0';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${variableBrick}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${variableName}">
                            <type>NUMBER</type>
                            <value>${firstValue}</value>
                          </formula>
                        </formulaList>
                        <userVariable type="UserVariable" serialization="custom">
                          <userVariable>
                            <default>
                              <deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey>
                              <name />
                            </default>
                          </userVariable>
                        </userVariable>
                      </brick>
                      <brick type="SetVariableBrick">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="VARIABLE">
                            <type>NUMBER</type>
                            <value>0</value>
                          </formula>
                        </formulaList>
                        <userVariable reference="../../brick[1]" />
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: variableBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([variableName, 'DROPDOWN']);
      expect(mapValues).toEqual([' ' + firstValue + ' ', '']);
    });

    test('parser handles formula operator properly', async () => {
      const variableBrick = 'SetVariableBrick';
      const variableName = 'Y_POSITION';
      const firstValue = 70;
      const secondValue = 90;

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${variableBrick}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${variableName}">
                            <leftChild>
                              <type>NUMBER</type>
                              <value>${firstValue}</value>
                            </leftChild>
                            <rightChild>
                              <type>NUMBER</type>
                              <value>${secondValue}</value>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>EQUAL</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: variableBrick
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([variableName]);
      expect(mapValues).toEqual([` ${firstValue}  =  ${secondValue} `]);
    });
  });

  describe('Formula brackets tests', () => {
    test('Formula with right sided brackets', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = '1';
      const second = '5';
      const third = '9';
      const fourth = '8';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <type>NUMBER</type>
                              <value>${first}</value>
                            </leftChild>
                            <rightChild>
                              <rightChild>
                                <leftChild>
                                  <type>NUMBER</type>
                                  <value>${second}</value>
                                </leftChild>
                                <rightChild>
                                  <rightChild>
                                    <leftChild>
                                      <type>NUMBER</type>
                                      <value>${third}</value>
                                    </leftChild>
                                    <rightChild>
                                      <type>NUMBER</type>
                                      <value>${fourth}</value>
                                    </rightChild>
                                    <type>OPERATOR</type>
                                    <value>PLUS</value>
                                  </rightChild>
                                  <type>BRACKET</type>
                                </rightChild>
                                <type>OPERATOR</type>
                                <value>DIVIDE</value>
                              </rightChild>
                              <type>BRACKET</type>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>MULT</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([` ${first}  × ( ${second}  ÷ ( ${third}  +  ${fourth} ))`]);
    });

    test('Formula with left sided brackets', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = '1';
      const second = '5';
      const third = '9';
      const fourth = '8';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <rightChild>
                                <leftChild>
                                  <rightChild>
                                    <leftChild>
                                      <type>NUMBER</type>
                                      <value>${first}</value>
                                    </leftChild>
                                    <rightChild>
                                      <type>NUMBER</type>
                                      <value>${second}</value>
                                    </rightChild>
                                    <type>OPERATOR</type>
                                    <value>PLUS</value>
                                  </rightChild>
                                  <type>BRACKET</type>
                                </leftChild>
                                <rightChild>
                                  <type>NUMBER</type>
                                  <value>${third}</value>
                                </rightChild>
                                <type>OPERATOR</type>
                                <value>MULT</value>
                              </rightChild>
                              <type>BRACKET</type>
                            </leftChild>
                            <rightChild>
                              <type>NUMBER</type>
                              <value>${fourth}</value>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>DIVIDE</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`(( ${first}  +  ${second} ) ×  ${third} ) ÷  ${fourth} `]);
    });

    test('Formula with both sided brackets', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = '1';
      const second = '5';
      const third = '5';
      const fourth = '6';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <rightChild>
                                <leftChild>
                                  <type>NUMBER</type>
                                  <value>${first}</value>
                                </leftChild>
                                <rightChild>
                                  <type>NUMBER</type>
                                  <value>${second}</value>
                                </rightChild>
                                <type>OPERATOR</type>
                                <value>MULT</value>
                              </rightChild>
                              <type>BRACKET</type>
                            </leftChild>
                            <rightChild>
                              <rightChild>
                                <leftChild>
                                  <type>NUMBER</type>
                                  <value>${third}</value>
                                </leftChild>
                                <rightChild>
                                  <type>NUMBER</type>
                                  <value>${fourth}</value>
                                </rightChild>
                                <type>OPERATOR</type>
                                <value>MULT</value>
                              </rightChild>
                              <type>BRACKET</type>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>PLUS</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`( ${first}  ×  ${second} ) + ( ${third}  ×  ${fourth} )`]);
    });
  });

  describe('Formula function tests', () => {
    test('Single value like sqrt function with arithmetic', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = '89';
      const second = '5';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <leftChild>
                                <type>NUMBER</type>
                                <value>${first}</value>
                              </leftChild>
                              <type>FUNCTION</type>
                              <value>SQRT</value>
                            </leftChild>
                            <rightChild>
                              <type>NUMBER</type>
                              <value>${second}</value>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>MULT</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`square root( ${first} ) ×  ${second} `]);
    });

    test('Single value like sin function with logic', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = '98';
      const second = '32';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <leftChild>
                                <type>NUMBER</type>
                                <value>${first}</value>
                              </leftChild>
                              <type>FUNCTION</type>
                              <value>SIN</value>
                            </leftChild>
                            <rightChild>
                              <type>NUMBER</type>
                              <value>${second}</value>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>GREATER_THAN</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`sine( ${first} ) >  ${second} `]);
    });

    test('Two single values like sin plus cos', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = '360';
      const second = '90';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <leftChild>
                                <type>NUMBER</type>
                                <value>${first}</value>
                              </leftChild>
                              <type>FUNCTION</type>
                              <value>COS</value>
                            </leftChild>
                            <rightChild>
                              <leftChild>
                                <type>NUMBER</type>
                                <value>${second}</value>
                              </leftChild>
                              <type>FUNCTION</type>
                              <value>SIN</value>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>PLUS</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`cosine( ${first} ) + sine( ${second} )`]);
    });

    test('Double value like contains', async () => {
      const blockName = 'SetXBrick';
      const categoryName = 'X_POSITION';
      const first = '3';
      const second = '1';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <type>NUMBER</type>
                              <value>${first}</value>
                            </leftChild>
                            <rightChild>
                              <type>NUMBER</type>
                              <value>${second}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>CONTAINS</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`contains( ${first} ,  ${second} )`]);
    });

    test('Sensor action in formula', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <type>SENSOR</type>
                              <value>COLLIDES_WITH_FINGER</value>
                            </leftChild>
                            <rightChild>
                              <type>FUNCTION</type>
                              <value>TRUE</value>
                            </rightChild>
                            <type>OPERATOR</type>
                            <value>PLUS</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([` touches finger  +  true `]);
    });

    test('UserList in formula', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = 'tvariable';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <formulaList>
                          <formula category="${categoryName}">
                            <type>USER_LIST</type>
                            <value>${first}</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`*${first}*`]);
    });

    test('UserVariable in formula', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = 'tvariable';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <formulaList>
                          <formula category="${categoryName}">
                            <type>USER_VARIABLE</type>
                            <value>${first}</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`"${first}"`]);
    });

    test('String in formula', async () => {
      const blockName = 'WaitBrick';
      const categoryName = 'TIME_TO_WAIT_IN_SECONDS';
      const first = 'hello';
      const second = 'world';

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <leftChild>
                              <type>STRING</type>
                              <value>${first}</value>
                            </leftChild>
                            <rightChild>
                              <type>STRING</type>
                              <value>${second}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>JOIN</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`join('${first}', '${second}')`]);
    });

    test('No new lines from strings to json mapping', async () => {
      const blockName = 'SetXBrick';
      const categoryName = 'X_POSITION';
      const first = 'ff0000';
      const second = 'fe0000';
      const third = '1';
      const expectedOutput = `color equals color with % tolerance('#${first}', '#${second}')`;

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                    <brick type="SetXBrick">
                      <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="X_POSITION">
                            <additionalChildren>
                              <org.catrobat.catroid.formulaeditor.FormulaElement>
                                <additionalChildren/>
                                <type>NUMBER</type>
                                <value>${third}</value>
                              </org.catrobat.catroid.formulaeditor.FormulaElement>
                            </additionalChildren>
                            <leftChild>
                              <additionalChildren/>
                              <type>STRING</type>
                              <value>#${first}</value>
                            </leftChild>
                            <rightChild>
                              <additionalChildren/>
                              <type>STRING</type>
                              <value>#${second}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>COLOR_EQUALS_COLOR</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([expectedOutput]);
    });

    test('formula with 3 arguments', async () => {
      const blockName = 'SetXBrick';
      const categoryName = 'X_POSITION';
      const first = 1;
      const second = 2;
      const third = 3;

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName}">
                            <additionalChildren>
                              <org.catrobat.catroid.formulaeditor.FormulaElement>
                                <additionalChildren/>
                                  <type>NUMBER</type>
                                  <value>${third}</value>
                              </org.catrobat.catroid.formulaeditor.FormulaElement>
                            </additionalChildren>
                            <leftChild>
                              <additionalChildren/>
                              <type>NUMBER</type>
                              <value>${first}</value>
                            </leftChild>
                            <rightChild>
                              <additionalChildren/>
                              <type>NUMBER</type>
                              <value>${second}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>JOIN3</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);
        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([`join( ${first} , ${second} , ${third} )`]);
    });

    test('multiple formula', async () => {
      const blockName = 'SetXBrick';
      const categoryName = [
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION',
        'X_POSITION'
      ];
      const first = [
        'FALSE',
        'hello world',
        'hello',
        'List (1)',
        '1',
        'LOOK_DIRECTION',
        'OBJECT_NUMBER_OF_LOOKS',
        'MOTION_DIRECTION',
        'USER_LANGUAGE',
        'NUMBER_CURRENT_TOUCHES',
        '1',
        'TIMER'
      ];
      const second = ['2', ' world', 'flatten', 'INDEX_CURRENT_TOUCH'];
      const third = ['3', '!', 'INDEX_OF_ITEM'];
      const output = [
        `if then else( ${first[0].toLowerCase()} , ${second[0]} , ${third[0]} )`,
        `length('${first[1]}')`,
        `join('${first[2]}','${second[1]}','${third[1]}')`,
        `flatten(*${first[3]}*)`,
        `item's index( ${first[4]} , *${second[2]}*)`,
        ` ${first[5].toLowerCase().replaceAll('_', ' ')} `,
        ` number of looks `,
        ` ${first[7].toLowerCase().replaceAll('_', ' ')} `,
        ` ${first[8].toLowerCase().replaceAll('_', ' ')} `,
        ` number of current touches `,
        `index of current touch( ${first[10]} )`,
        ` ${first[11].toLowerCase()} `
      ];
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>formulas</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <settings/>
        <scenes>
          <scene>
            <name>Scene (1)</name>
            <objectList>
              <object type="Sprite" name="Background">
                <lookList/>
                <soundList/>
                <scriptList>
                  <script type="StartScript" posX="0.0" posY="0.0">
                    <brickList>
                      <brick type="${blockName}">
                        <brickId>09574906-0fa9-48d8-aeb5-67dd3539b373</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[0]}">
                            <additionalChildren>
                              <org.catrobat.catroid.formulaeditor.FormulaElement>
                                <additionalChildren/>
                                <type>NUMBER</type>
                                <value>${third[0]}</value>
                              </org.catrobat.catroid.formulaeditor.FormulaElement>
                            </additionalChildren>
                            <leftChild>
                              <additionalChildren/>
                              <type>FUNCTION</type>
                              <value>${first[0]}</value>
                            </leftChild>
                            <rightChild>
                              <additionalChildren/>
                              <type>NUMBER</type>
                              <value>${second[0]}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>IF_THEN_ELSE</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>4545a504-2634-40a4-9361-37fae7dffbb9</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[1]}">
                            <additionalChildren/>
                            <leftChild>
                              <additionalChildren/>
                              <type>STRING</type>
                              <value>${first[1]}</value>
                            </leftChild>
                            <type>FUNCTION</type>
                            <value>LENGTH</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>e0fc278b-bdc7-4967-ab43-3faf902116d0</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[2]}">
                            <additionalChildren>
                              <org.catrobat.catroid.formulaeditor.FormulaElement>
                                <additionalChildren/>
                                <type>STRING</type>
                                <value>${third[1]}</value>
                              </org.catrobat.catroid.formulaeditor.FormulaElement>
                            </additionalChildren>
                            <leftChild>
                              <additionalChildren/>
                              <type>STRING</type>
                              <value>${first[2]}</value>
                            </leftChild>
                            <rightChild>
                              <additionalChildren/>
                              <type>STRING</type>
                              <value>${second[1]}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>JOIN3</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>0918faba-f054-47fb-a5ca-9d0c1246fcd2</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[3]}">
                            <additionalChildren/>
                            <leftChild>
                              <additionalChildren/>
                              <type>USER_LIST</type>
                              <value>${first[3]}</value>
                            </leftChild>
                            <type>FUNCTION</type>
                            <value>FLATTEN</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>49625787-2c64-4aa1-8ed6-9b0f0381394c</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[4]}">
                            <additionalChildren/>
                            <leftChild>
                              <additionalChildren/>
                              <type>NUMBER</type>
                              <value>${first[4]}</value>
                            </leftChild>
                            <rightChild>
                              <additionalChildren/>
                              <type>USER_LIST</type>
                              <value>FLATTEN</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>${third[2]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>c682f1bd-d685-414c-bca4-0b2ee26fed4b</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[5]}">
                            <additionalChildren/>
                            <type>SENSOR</type>
                            <value>${first[5]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>dbae57e9-7f69-49ca-9b25-37b207794f22</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[6]}">
                            <additionalChildren/>
                            <type>SENSOR</type>
                            <value>${first[6]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>4f118fec-5472-4dfa-86ae-fd5346c98e8d</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[7]}">
                            <additionalChildren/>
                            <type>SENSOR</type>
                            <value>${first[7]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>b4a8174b-86fc-40c3-810d-db32be511935</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[8]}">
                            <additionalChildren/>
                            <type>SENSOR</type>
                            <value>${first[8]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>15ba190f-381c-428d-86c5-6bdd116e0f59</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[9]}">
                            <additionalChildren/>
                            <type>SENSOR</type>
                            <value>${first[9]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>5d677f8c-b263-43be-9aef-4eba51421548</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[10]}">
                            <additionalChildren/>
                            <leftChild>
                              <additionalChildren/>
                              <type>NUMBER</type>
                              <value>${first[10]}</value>
                            </leftChild>
                            <type>FUNCTION</type>
                            <value>${second[3]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                      <brick type="${blockName}">
                        <brickId>75490d9d-d27e-4ca7-ac94-d7b17488f048</brickId>
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[11]}">
                            <additionalChildren/>
                            <type>SENSOR</type>
                            <value>${first[11]}</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                    <commentedOut>false</commentedOut>
                    <scriptId>4dd9f80f-5ed6-4668-bb4a-51711d95da03</scriptId>
                  </script>
                </scriptList>
                <nfcTagList/>
                <userVariables/>
                <userLists/>
                <userDefinedBrickList/>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);
        const formulaMap = [];
        const mapKeys = [];
        const mapValues = [];
        for (let index = 0; index < 12; index++) {
          formulaMap.push(programJSON.scenes[0].objectList[0].scriptList[0].brickList[index].formValues);
          formulaMap[index].forEach(function (value, key) {
            mapKeys.push(key);
            mapValues.push(value);
          });
        }
        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual(categoryName);
      expect(mapValues).toEqual(output);
    });

    test('No unnecessary backslash in formula', async () => {
      const blockName = 'SetRotationStyleBrick';
      const categoryName = 'SPINNER';
      const first = '2';
      const expectedOutput = "don't rotate";

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <selection>${first}</selection>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual([categoryName]);
      expect(mapValues).toEqual([expectedOutput]);
    });

    test('Color formula tests', async () => {
      const blockName = 'AssertEqualsBrick';
      const categoryName = ['ASSERT_EQUALS_ACTUAL', 'ASSERT_EQUALS_EXPECTED'];
      const first = ['200', '#ff0000'];
      const second = ['600', '#fe0000'];
      const third = '1';
      const expectedOutput = [
        'color at x y( 200 ,  600 )',
        "color equals color with % tolerance('#ff0000', '#fe0000')"
      ];

      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <program>
        <header>
          <programName>Test Program</programName>
          <catrobatLanguageVersion>0.99997</catrobatLanguageVersion>
        </header>
        <scenes>
          <scene>
            <name>TestScene</name>
            <objectList>
              <object type="Sprite" name="TestObject">
                <lookList>
                  <look fileName="Space-Panda.png" name="Space-Panda" />
                </lookList>
                <soundList />
                <scriptList>
                  <script type="StartScript">
                    <brickList>
                      <brick type="${blockName}">
                        <commentedOut>false</commentedOut>
                        <formulaList>
                          <formula category="${categoryName[0]}">
                            <additionalChildren/>
                            <leftChild>
                              <additionalChildren/>
                              <type>NUMBER</type>
                              <value>${first[0]}</value>
                            </leftChild>
                            <rightChild>
                              <additionalChildren/>
                              <type>NUMBER</type>
                              <value>${second[0]}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>COLOR_AT_XY</value>
                          </formula>
                          <formula category="${categoryName[1]}">
                            <additionalChildren>
                              <org.catrobat.catroid.formulaeditor.FormulaElement>
                                <additionalChildren/>
                                <type>NUMBER</type>
                                <value>${third}</value>
                              </org.catrobat.catroid.formulaeditor.FormulaElement>
                            </additionalChildren>
                            <leftChild>
                              <additionalChildren/>
                              <type>STRING</type>
                              <value>${first[1]}</value>
                            </leftChild>
                            <rightChild>
                              <additionalChildren/>
                              <type>STRING</type>
                              <value>${second[1]}</value>
                            </rightChild>
                            <type>FUNCTION</type>
                            <value>COLOR_EQUALS_COLOR</value>
                          </formula>
                        </formulaList>
                      </brick>
                    </brickList>
                  </script>
                </scriptList>
              </object>
            </objectList>
          </scene>
        </scenes>
      </program>`;

      const [programJSON, mapKeys, mapValues] = await page.evaluate(pXML => {
        const programJSON = Test.Parser.convertProgramToJSONDebug(pXML);

        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;

        const mapKeys = [];
        const mapValues = [];
        formulaMap.forEach(function (value, key) {
          mapKeys.push(key);
          mapValues.push(value);
        });

        return [programJSON, mapKeys, mapValues];
      }, xmlString);

      expect(programJSON).toEqual(
        expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
              objectList: expect.arrayContaining([
                expect.objectContaining({
                  scriptList: expect.arrayContaining([
                    expect.objectContaining({
                      brickList: expect.arrayContaining([
                        expect.objectContaining({
                          name: blockName
                        })
                      ])
                    })
                  ])
                })
              ])
            })
          ])
        })
      );

      expect(mapKeys).toEqual(categoryName);
      expect(mapValues).toEqual(expectedOutput);
    });
  });
});
