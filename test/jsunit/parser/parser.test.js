/**
 * @description Parser test
 *  for the parser we always need the webview
 */
/* global page, SERVER, parser */
/* eslint no-global-assign:0 */
'use strict';

describe('Parser catroid program tests', () => {
  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  });

  test('Recognizes not supported program version', async () => {
    expect(
      await page.evaluate(() => {
        try {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.993</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList></objectList></scene></scenes></program>`;
          parser.convertProgramToJSONDebug(xmlString);
        } catch (e) {
          if (e.message === 'Found program version 0.993, minimum supported is 0.9994') {
            return true;
          }
        }
        return false;
      })
    ).toBeTruthy();
  });

  test('Recognizes supported program version', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.9994</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        return (
          programJSON !== undefined &&
          programJSON.scenes !== undefined &&
          programJSON.scenes[0].name !== undefined &&
          programJSON.scenes[0].objectList !== undefined
        );
      })
    ).toBeTruthy();
  });

  test('Handle empty program properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.9994</catrobatLanguageVersion></header><scenes></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return programJSON.scenes !== undefined;
      })
    ).toBeTruthy();
  });

  test('Handle empty single scene properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.9994</catrobatLanguageVersion></header><scenes><scene><name>tscene</name><objectList></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes !== undefined &&
          programJSON.scenes.length === 1 &&
          programJSON.scenes[0].name === 'tscene' &&
          programJSON.scenes[0].objectList !== undefined
        );
      })
    ).toBeTruthy();
  });

  test('Handle multiple empty scenes properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.9994</catrobatLanguageVersion></header><scenes><scene><name>tscene1</name><objectList></objectList></scene><scene><name>tscene2</name><objectList></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes !== undefined &&
          programJSON.scenes.length === 2 &&
          programJSON.scenes[0].name === 'tscene1' &&
          programJSON.scenes[1].name === 'tscene2' &&
          programJSON.scenes[0].objectList !== undefined &&
          programJSON.scenes[1].objectList !== undefined
        );
      })
    ).toBeTruthy();
  });

  test('Handle single empty object properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList/></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes !== undefined &&
          programJSON.scenes.length === 1 &&
          programJSON.scenes[0].name === 'tscene' &&
          programJSON.scenes[0].objectList !== undefined &&
          programJSON.scenes[0].objectList.length === 1 &&
          programJSON.scenes[0].objectList[0].name === 'tobject'
        );
      })
    ).toBeTruthy();
  });

  test('Handle single empty object in same scene properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject1"><lookList/><soundList/><scriptList/></object><object type="Sprite" name="tobject2"><lookList/><soundList/><scriptList/></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes !== undefined &&
          programJSON.scenes.length === 1 &&
          programJSON.scenes[0].name === 'tscene' &&
          programJSON.scenes[0].objectList !== undefined &&
          programJSON.scenes[0].objectList.length === 2 &&
          programJSON.scenes[0].objectList[0].name === 'tobject1' &&
          programJSON.scenes[0].objectList[1].name === 'tobject2'
        );
      })
    ).toBeTruthy();
  });

  test('Handle single empty object in multiple scenes properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene1</name><objectList><object type="Sprite" name="tobject1"><lookList/><soundList/><scriptList/></object></objectList></scene><scene><name>tscene2</name><objectList><object type="Sprite" name="tobject2"><lookList/><soundList/><scriptList/></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes !== undefined &&
          programJSON.scenes.length === 2 &&
          programJSON.scenes[0].name === 'tscene1' &&
          programJSON.scenes[1].name === 'tscene2' &&
          programJSON.scenes[0].objectList !== undefined &&
          programJSON.scenes[1].objectList !== undefined &&
          programJSON.scenes[0].objectList.length === 1 &&
          programJSON.scenes[1].objectList.length === 1 &&
          programJSON.scenes[0].objectList[0].name === 'tobject1' &&
          programJSON.scenes[1].objectList[0].name === 'tobject2'
        );
      })
    ).toBeTruthy();
  });

  test('Handle single empty script properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList/></script></scriptList></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes !== undefined &&
          programJSON.scenes.length === 1 &&
          programJSON.scenes[0].name === 'tscene' &&
          programJSON.scenes[0].objectList !== undefined &&
          programJSON.scenes[0].objectList.length === 1 &&
          programJSON.scenes[0].objectList[0].name === 'tobject' &&
          programJSON.scenes[0].objectList[0].scriptList !== undefined &&
          programJSON.scenes[0].objectList[0].scriptList.length === 1 &&
          programJSON.scenes[0].objectList[0].scriptList[0].name === 'tscript'
        );
      })
    ).toBeTruthy();
  });
});

describe('Catroid to Catblocks parser tests', () => {
  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  });

  test('Xml Character escaping test', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="цель"><lookList><look fileName="Space-Panda.png" name="цель"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSizeToBrick" id="testBrick"><commentedOut>false</commentedOut><formulaList><formula category="SIZE"><type>NUMBER</type><value id="testValue">60&amp;.0</value></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
        return formulaMap !== undefined && formulaMap.entries().next().value.toString().includes('60&.0');
      })
    ).toBeTruthy();
  });

  test('LookList reference not within the same object', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestLookListObject"><lookList><look fileName="testLook.png" name="testLook"/></lookList><soundList/><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetLookBrick"><commentedOut>false</commentedOut><look reference="../../../../../../object[1]/lookList/look[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        const objectName = programJSON.scenes[0].objectList[0].name;
        const lookName = programJSON.scenes[0].objectList[0].lookList[0].name;
        const lookFileName = programJSON.scenes[0].objectList[0].lookList[0].fileName;
        return objectName === 'TestLookListObject' && lookName === 'testLook' && lookFileName === 'testLook.png';
      })
    ).toBeTruthy();
  });

  test('SoundList reference not within the same object', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList></lookList><soundList><sound fileName="testSound.png" name="testSound"/></soundList><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSoundBrick"><commentedOut>false</commentedOut><sound reference="../../../../../../object[1]/soundList/sound[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        const objectName = programJSON.scenes[0].objectList[0].name;
        const soundName = programJSON.scenes[0].objectList[0].soundList[0].name;
        const soundFileName = programJSON.scenes[0].objectList[0].soundList[0].fileName;
        return objectName === 'TestSoundListObject' && soundName === 'testSound' && soundFileName === 'testSound.png';
      })
    ).toBeTruthy();
  });

  test('Test if no value is used if no nodeValue is given', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList /><soundList><sound fileName="testSound.png" name="testSound" /></soundList><scriptList /></object><object type="Sprite" name="цель"><lookList /><soundList /><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="testFormular"><leftChild><type>NUMBER</type><value>37</value></leftChild><rightChild><type>NUMBER</type><value>58</value></rightChild><type>FUNCTION</type><value /></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        const brickName = programJSON.scenes[0].objectList[1].scriptList[0].brickList[0].name;
        const formulaMap = programJSON.scenes[0].objectList[1].scriptList[0].brickList[0].formValues;
        return brickName === 'WaitBrick' && formulaMap.entries().next().value.toString().includes('37  58');
      })
    ).toBeTruthy();
  });

  test('Test if parser converts catroid script properly', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="BroadcastScript"><brickList><brick type="ForeverBrick"><commentedOut>false</commentedOut><loopBricks><brick type="PlaySoundAndWaitBrick"><commentedOut>false</commentedOut><sound name="soundTest"/></brick></loopBricks></brick></brickList><commentedOut>false</commentedOut><receivedMessage>звуки</receivedMessage></script></scriptList></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes[0].objectList[0].scriptList[0].name === 'BroadcastScript' &&
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name === 'ForeverBrick' &&
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].loopOrIfBrickList[0].name ===
            'PlaySoundAndWaitBrick'
        );
      })
    ).toBeTruthy();
  });

  test('Test to check, if the content in the repeat block is right', async () => {
    expect(
      await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="PlaySoundBrick"><commentedOut>false</commentedOut></brick><brick type="RepeatBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIMES_TO_REPEAT"><type>NUMBER</type><value>1000000000</value></formula></formulaList></brick><brick type="SetBackgroundBrick"></brick><brick type="WaitBrick"></brick><brick type="LoopEndBrick"><commentedOut>false</commentedOut></brick></brickList><commentedOut>false</commentedOut><isUserScript>false</isUserScript></script></scriptList></object></objectList></scene></scenes></program>`;
        const programJSON = parser.convertProgramToJSONDebug(xmlString);
        if (programJSON === undefined) {
          return false;
        }
        return (
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name === 'PlaySoundBrick' &&
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[1].name === 'RepeatBrick' &&
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[1].loopOrIfBrickList[0].name ===
            'SetBackgroundBrick' &&
          programJSON.scenes[0].objectList[0].scriptList[0].brickList[1].loopOrIfBrickList[1].name === 'WaitBrick'
        );
      })
    ).toBeTruthy();
  });

  describe('Spinner parsing test', () => {
    test('Handle correct spinner value', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList><brick type="DronePlayLedAnimationBrick"><commentedOut>false</commentedOut><ledAnimationName>ARDRONE_LED_ANIMATION_BLINK_GREEN_RED</ledAnimationName></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          return (
            programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name === 'DronePlayLedAnimationBrick' &&
            formulaMap.size === 1 &&
            formulaMap.entries().next().value.toString().includes('Blink green red')
          );
        })
      ).toBeTruthy();
    });

    test('Handle invalid spinner value', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList><brick type="DronePlayLedAnimationBrick"><commentedOut>false</commentedOut><ledAnimationName>SOME_VALUE_I_DO_NOT_CARE</ledAnimationName></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          return (
            programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name === 'DronePlayLedAnimationBrick' &&
            formulaMap.size === 1 &&
            formulaMap.entries().next().value.toString().includes('SOME_VALUE_I_DO_NOT_CARE')
          );
        })
      ).toBeTruthy();
    });

    test('Handle non-exiting spinner value', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList><brick type="DronePlayLedAnimationBrick"><commentedOut>false</commentedOut></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          return (
            programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name === 'DronePlayLedAnimationBrick' &&
            formulaMap.entries().next().value === undefined
          );
        })
      ).toBeTruthy();
    });
  });

  describe('UserVariable parsing', () => {
    test('Test of local uservariable parsing', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name>tUserVariable</name></default></userVariable></userVariable></brick></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const mapKeys = [];
          const mapValues = [];
          formulaMap.forEach(function (value, key) {
            mapKeys.push(key);
            mapValues.push(value);
          });
          return (
            mapKeys.length === 2 &&
            mapValues.length === 2 &&
            mapKeys[0] === 'VARIABLE' &&
            mapValues[0] === '0' &&
            mapKeys[1] === 'DROPDOWN' &&
            mapValues[1] === 'tUserVariable' &&
            block === 'SetVariableBrick'
          );
        })
      ).toBeTruthy();
    });

    test('Test of local empty name uservariable parsing', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name></name></default></userVariable></userVariable></brick></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const mapKeys = [];
          const mapValues = [];
          formulaMap.forEach(function (value, key) {
            mapKeys.push(key);
            mapValues.push(value);
          });
          return (
            mapKeys.length === 2 &&
            mapValues.length === 2 &&
            mapKeys[0] === 'VARIABLE' &&
            mapValues[0] === '0' &&
            mapKeys[1] === 'DROPDOWN' &&
            mapValues[1].length === 0 &&
            block === 'SetVariableBrick'
          );
        })
      ).toBeTruthy();
    });

    test('Test of local uservariable parsing without name tag', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name/></default></userVariable></userVariable></brick></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const mapKeys = [];
          const mapValues = [];
          formulaMap.forEach(function (value, key) {
            mapKeys.push(key);
            mapValues.push(value);
          });
          return (
            mapKeys.length === 2 &&
            mapValues.length === 2 &&
            mapKeys[0] === 'VARIABLE' &&
            mapValues[0] === '0' &&
            mapKeys[1] === 'DROPDOWN' &&
            mapValues[1].length === 0 &&
            block === 'SetVariableBrick'
          );
        })
      ).toBeTruthy();
    });

    test('Test of remote uservariable parsing', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name>tUserVariable</name></default></userVariable></userVariable></brick><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable reference="../../brick[1]"/></brick></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const mapKeys = [];
          const mapValues = [];
          formulaMap.forEach(function (value, key) {
            mapKeys.push(key);
            mapValues.push(value);
          });
          return (
            mapKeys.length === 2 &&
            mapValues.length === 2 &&
            mapKeys[0] === 'VARIABLE' &&
            mapValues[0] === '0' &&
            mapKeys[1] === 'DROPDOWN' &&
            mapValues[1] === 'tUserVariable' &&
            block === 'SetVariableBrick'
          );
        })
      ).toBeTruthy();
    });

    test('Test of remote empty name uservariable parsing', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name></name></default></userVariable></userVariable></brick><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable reference="../../brick[1]"/></brick></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const mapKeys = [];
          const mapValues = [];
          formulaMap.forEach(function (value, key) {
            mapKeys.push(key);
            mapValues.push(value);
          });
          return (
            mapKeys.length === 2 &&
            mapValues.length === 2 &&
            mapKeys[0] === 'VARIABLE' &&
            mapValues[0] === '0' &&
            mapKeys[1] === 'DROPDOWN' &&
            mapValues[1].length === 0 &&
            block === 'SetVariableBrick'
          );
        })
      ).toBeTruthy();
    });

    test('Test of remote uservariable parsing without name tag', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name/></default></userVariable></userVariable></brick><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable reference="../../brick[1]"/></brick></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const mapKeys = [];
          const mapValues = [];
          formulaMap.forEach(function (value, key) {
            mapKeys.push(key);
            mapValues.push(value);
          });
          return (
            mapKeys.length === 2 &&
            mapValues.length === 2 &&
            mapKeys[0] === 'VARIABLE' &&
            mapValues[0] === '0' &&
            mapKeys[1] === 'DROPDOWN' &&
            mapValues[1].length === 0 &&
            block === 'SetVariableBrick'
          );
        })
      ).toBeTruthy();
    });

    test('Test if parser handles formula operator properly', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="Y_POSITION"><leftChild><type>NUMBER</type><value>70</value></leftChild><rightChild><type>NUMBER</type><value>90</value></rightChild><type>OPERATOR</type><value>EQUAL</value></formula></formulaList></brick></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'SetVariableBrick' &&
            firstMapKey === 'Y_POSITION' &&
            firstMapValue === '70 = 90'
          );
        })
      ).toBeTruthy();
    });
  });

  describe('Formula brackets tests', () => {
    test('Formula with right sided brackets', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><type>NUMBER</type><value>1</value></leftChild><rightChild><rightChild><leftChild><type>NUMBER</type><value>5</value></leftChild><rightChild><rightChild><leftChild><type>NUMBER</type><value>9</value></leftChild><rightChild><type>NUMBER</type><value>8</value></rightChild><type>OPERATOR</type><value>PLUS</value></rightChild><type>BRACKET</type></rightChild><type>OPERATOR</type><value>DIVIDE</value></rightChild><type>BRACKET</type></rightChild><type>OPERATOR</type><value>MULT</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = '1 × (5 ÷ (9 + 8))'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('Formula with left sided brackets', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><rightChild><leftChild><rightChild><leftChild><type>NUMBER</type><value>1</value></leftChild><rightChild><type>NUMBER</type><value>2</value></rightChild><type>OPERATOR</type><value>PLUS</value></rightChild><type>BRACKET</type></leftChild><rightChild><type>NUMBER</type><value>8</value></rightChild><type>OPERATOR</type><value>MULT</value></rightChild><type>BRACKET</type></leftChild><rightChild><type>NUMBER</type><value>8</value></rightChild><type>OPERATOR</type><value>DIVIDE</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = '((1 + 2) × 8) ÷ 8'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('Formula with both sided brackets', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><rightChild><leftChild><type>NUMBER</type><value>1</value></leftChild><rightChild><type>NUMBER</type><value>5</value></rightChild><type>OPERATOR</type><value>MULT</value></rightChild><type>BRACKET</type></leftChild><rightChild><rightChild><leftChild><type>NUMBER</type><value>5</value></leftChild><rightChild><type>NUMBER</type><value>6</value></rightChild><type>OPERATOR</type><value>MULT</value></rightChild><type>BRACKET</type></rightChild><type>OPERATOR</type><value>PLUS</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = '(1 × 5) + (5 × 6)'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });
  });

  describe('Formula function tests', () => {
    test('Single value like sqrt function with arithmetic', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><leftChild><type>NUMBER</type><value>89</value></leftChild><type>FUNCTION</type><value>SQRT</value></leftChild><rightChild><type>NUMBER</type><value>5</value></rightChild><type>OPERATOR</type><value>MULT</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = 'square root(89) × 5'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('Single value like sin function with logic', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><leftChild><type>NUMBER</type><value>98</value></leftChild><type>FUNCTION</type><value>SIN</value></leftChild><rightChild><type>NUMBER</type><value>32</value></rightChild><type>OPERATOR</type><value>GREATER_THAN</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = 'sine(98) > 32'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('Two single values like sin plus cos', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><leftChild><type>NUMBER</type><value>360</value></leftChild><type>FUNCTION</type><value>COS</value></leftChild><rightChild><leftChild><type>NUMBER</type><value>90</value></leftChild><type>FUNCTION</type><value>SIN</value></rightChild><type>OPERATOR</type><value>PLUS</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = 'cosine(360) + sine(90)'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('Double value like contains', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetXBrick"><commentedOut>false</commentedOut><formulaList><formula category="X_POSITION"><leftChild><type>NUMBER</type><value>3</value></leftChild><rightChild><type>NUMBER</type><value>1</value></rightChild><type>FUNCTION</type><value>CONTAINS</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = 'contains(3, 1)'.trim();
          const splitIndex = formulaMap.entries().next().value.toString().indexOf(',');
          const firstMapKey = formulaMap.entries().next().value.toString().slice(0, splitIndex).trim();
          const firstMapValue = formulaMap
            .entries()
            .next()
            .value.toString()
            .slice(splitIndex + 1)
            .trim();
          return (
            formulaMap.size === 1 &&
            block === 'SetXBrick' &&
            firstMapKey === 'X_POSITION' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('Sensor action in formula', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><type>SENSOR</type><value>COLLIDES_WITH_FINGER</value></leftChild><rightChild><type>FUNCTION</type><value>TRUE</value></rightChild><type>OPERATOR</type><value>PLUS</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = 'touches finger + true'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('UserList in formula', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><type>USER_LIST</type><value>tvariable</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = '*tvariable*'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('UserVariable in formula', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><type>USER_VARIABLE</type><value>tvariable</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = '"tvariable"'.trim();
          const firstMapKey = formulaMap.entries().next().value.toString().split(',')[0].trim();
          const firstMapValue = formulaMap.entries().next().value.toString().split(',')[1].trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });

    test('String in formula', async () => {
      expect(
        await page.evaluate(() => {
          const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>TestScene</name><objectList><object type="Sprite" name="TestObject"><lookList><look fileName="Space-Panda.png" name="Space-Panda"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><type>STRING</type><value>hello</value></leftChild><rightChild><type>STRING</type><value> world</value></rightChild><type>FUNCTION</type><value>JOIN</value></formula></formulaList></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
          const programJSON = parser.convertProgramToJSONDebug(xmlString);
          if (programJSON === undefined) {
            return false;
          }
          const block = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].name;
          const formulaMap = programJSON.scenes[0].objectList[0].scriptList[0].brickList[0].formValues;
          const refString = "join('hello', 'world')".trim();
          const splitIndex = formulaMap.entries().next().value.toString().indexOf(',');
          const firstMapKey = formulaMap.entries().next().value.toString().slice(0, splitIndex).trim();
          const firstMapValue = formulaMap
            .entries()
            .next()
            .value.toString()
            .slice(splitIndex + 1)
            .trim();
          return (
            formulaMap.size === 1 &&
            block === 'WaitBrick' &&
            firstMapKey === 'TIME_TO_WAIT_IN_SECONDS' &&
            firstMapValue === refString
          );
        })
      ).toBeTruthy();
    });
  });
});
