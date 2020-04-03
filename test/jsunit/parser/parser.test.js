/**
 * @description Parser test
 *  for the parser we always need the webview
 */
/* global page, SERVER, parser */
/* eslint no-global-assign:0 */
'use strict';

describe('Parser catroid program tests', () => {

  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
  });

  test('Recognizes not supported program version', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.993</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml === undefined);
    })).toBeTruthy();
  });

  test('Recognizes supported program version', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.994</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument);
    })).toBeTruthy();
  });

  test('Handle empty program properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.994</catrobatLanguageVersion></header><scenes></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument
        && catXml.firstChild.tagName === 'xml'
        && catXml.firstChild.childElementCount === 0);
    })).toBeTruthy();
  });

  test('Handle empty single scene properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.994</catrobatLanguageVersion></header><scenes><scene><name>tscene</name><objectList></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument
        && catXml.firstChild.tagName === 'xml'
        && catXml.getElementsByTagName('scene').length === 1
        && catXml.getElementsByTagName('scene')[0].getAttribute('type') === 'tscene');
    })).toBeTruthy();
  });

  test('Handle multiple empty scenes properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.994</catrobatLanguageVersion></header><scenes><scene><name>tscene1</name><objectList></objectList></scene><scene><name>tscene2</name><objectList></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument
        && catXml.firstChild.tagName === 'xml'
        && catXml.getElementsByTagName('scene').length === 2
        && catXml.getElementsByTagName('scene')[0].getAttribute('type') === 'tscene1'
        && catXml.getElementsByTagName('scene')[1].getAttribute('type') === 'tscene2');
    })).toBeTruthy();
  });

  test('Hanlde single empty object properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList/></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument
        && catXml.firstChild.tagName === 'xml'
        && catXml.getElementsByTagName('object').length === 1
        && catXml.getElementsByTagName('object')[0].getAttribute('type') === 'tobject');
    })).toBeTruthy();
  });

  test('Hanlde single empty object in same scene properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject1"><lookList/><soundList/><scriptList/></object><object type="Sprite" name="tobject2"><lookList/><soundList/><scriptList/></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument
        && catXml.firstChild.tagName === 'xml'
        && catXml.getElementsByTagName('scene').length === 1
        && catXml.getElementsByTagName('scene')[0].childElementCount === 2
        && catXml.getElementsByTagName('object').length === 2
        && catXml.getElementsByTagName('object')[0].getAttribute('type') === 'tobject1'
        && catXml.getElementsByTagName('object')[1].getAttribute('type') === 'tobject2');
    })).toBeTruthy();
  });

  test('Hanlde single empty object in multiple scenes properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene1</name><objectList><object type="Sprite" name="tobject1"><lookList/><soundList/><scriptList/></object></objectList></scene><scene><name>tscene2</name><objectList><object type="Sprite" name="tobject2"><lookList/><soundList/><scriptList/></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument
        && catXml.firstChild.tagName === 'xml'
        && catXml.getElementsByTagName('scene').length === 2
        && catXml.getElementsByTagName('scene')[0].getAttribute('type') === 'tscene1'
        && catXml.getElementsByTagName('scene')[1].getAttribute('type') === 'tscene2'
        && catXml.getElementsByTagName('scene')[0].childElementCount === 1
        && catXml.getElementsByTagName('scene')[0].firstChild.getAttribute('type') === 'tobject1'
        && catXml.getElementsByTagName('scene')[0].firstChild.childElementCount === 0
        && catXml.getElementsByTagName('scene')[1].childElementCount === 1
        && catXml.getElementsByTagName('scene')[1].firstChild.getAttribute('type') === 'tobject2'
        && catXml.getElementsByTagName('scene')[1].firstChild.childElementCount === 0);
    })).toBeTruthy();
  });

  test('Handle single empty script properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList/></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return catXml.evaluate(`//scene[@type='tscene']/object[@type='tobject']/script[@type='tscript']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
    })).toBeTruthy();
  });
});


describe('Catroid to Catblocks parser tests', () => {

  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
  });

  test('Xml Character escaping test', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="цель"><lookList><look fileName="Space-Panda.png" name="цель"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSizeToBrick" id="testBrick"><commentedOut>false</commentedOut><formulaList><formula category="SIZE"><type>NUMBER</type><value id="testValue">60&amp;.0</value></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='SIZE']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('60&amp;.0'));
    })).toBeTruthy();
  });

  test('LookList reference not within the same object', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestLookListObject"><lookList><look fileName="testLook.png" name="testLook"/></lookList><soundList/><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetLookBrick"><commentedOut>false</commentedOut><look reference="../../../../../../object[1]/lookList/look[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='look']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('testLook'));
    })).toBeTruthy();
  });

  test('SountList reference not within the same object', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList></lookList><soundList><sound fileName="testSound.png" name="testSound"/></soundList><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSoundBrick"><commentedOut>false</commentedOut><sound reference="../../../../../../object[1]/soundList/sound[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='sound']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('testSound'));
    })).toBeTruthy();
  });

  test('Test if default value "---" is used if no nodeValue is given', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList /><soundList><sound fileName="testSound.png" name="testSound" /></soundList><scriptList /></object><object type="Sprite" name="цель"><lookList /><soundList /><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="testFormular"><leftChild><type>NUMBER</type><value>37</value></leftChild><rightChild><type>NUMBER</type><value>58</value></rightChild><type>FUNCTION</type><value /></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='testFormular']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('37 --- 58'));
    })).toBeTruthy();
  });

  test('Test if parser converts catroid script properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<script type="BroadcastScript"><brickList><brick type="ForeverBrick"><commentedOut>false</commentedOut><loopBricks><brick type="PlaySoundAndWaitBrick"><commentedOut>false</commentedOut><sound name="soundTest"/></brick></loopBricks></brick></brickList><commentedOut>false</commentedOut><receivedMessage>звуки</receivedMessage></script>`;
      const catXml = parser.convertScriptString(scriptString);
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 3
        && catXml.getElementsByTagName('block')[0].getAttribute('type') === 'BroadcastScript'
        && catXml.getElementsByTagName('block')[1].getAttribute('type') === 'ForeverBrick'
        && catXml.getElementsByTagName('block')[2].getAttribute('type') === 'PlaySoundAndWaitBrick');
    })).toBeTruthy();
  });

  test('Test to check, if the content in the repeat block is right', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<script type="StartScript"><brickList><brick type="PlaySoundBrick"><commentedOut>false</commentedOut></brick><brick type="RepeatBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIMES_TO_REPEAT"><type>NUMBER</type><value>1000000000</value></formula></formulaList></brick><brick type="SetBackgroundBrick"></brick><brick type="WaitBrick"></brick><brick type="LoopEndBrick"><commentedOut>false</commentedOut></brick></brickList><commentedOut>false</commentedOut><isUserScript>false</isUserScript></script>`;
      const catXml = parser.convertScriptString(xmlString);
      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 5
        && catXml.getElementsByTagName('block')[2].getAttribute('type') === 'RepeatBrick'
        && catXml.getElementsByTagName('block')[2].lastElementChild.children[0].getAttribute('type') === 'SetBackgroundBrick'
        && catXml.getElementsByTagName('block')[2].lastElementChild.children[0].firstElementChild.children[0].getAttribute('type') === 'WaitBrick');
    })).toBeTruthy();
  });


  describe('Spinner parsing test', () => {
    test('Handle correct spinner value', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList><brick type="DronePlayLedAnimationBrick"><commentedOut>false</commentedOut><ledAnimationName>ARDRONE_LED_ANIMATION_BLINK_GREEN_RED</ledAnimationName></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
        const catXml = parser.convertProgramString(xmlString);
        const blockValue = catXml.evaluate(`//scene[@type='tscene']/object[@type='tobject']/script[@type='tscript']//block[@type='DronePlayLedAnimationBrick']/field[@name='ADRONEANIMATION']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();

        return (blockValue !== undefined && blockValue.innerHTML === 'Blink green red');
      })).toBeTruthy();
    });

    test('Handle invalid spinner value', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList><brick type="DronePlayLedAnimationBrick"><commentedOut>false</commentedOut><ledAnimationName>SOME_VALUE_I_DO_NOT_CARE</ledAnimationName></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
        const catXml = parser.convertProgramString(xmlString);
        const blockValue = catXml.evaluate(`//scene[@type='tscene']/object[@type='tobject']/script[@type='tscript']//block[@type='DronePlayLedAnimationBrick']/field[@name='ADRONEANIMATION']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();

        return (blockValue !== undefined && blockValue.innerHTML === 'SOME_VALUE_I_DO_NOT_CARE');
      })).toBeTruthy();
    });

    test('Handle non-exiting spinner value', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99995</catrobatLanguageVersion></header><settings/><scenes><scene><name>tscene</name><objectList><object type="Sprite" name="tobject"><lookList/><soundList/><scriptList><script type="tscript"><brickList><brick type="DronePlayLedAnimationBrick"><commentedOut>false</commentedOut></brick></brickList></script></scriptList></object></objectList></scene></scenes></program>`;
        const catXml = parser.convertProgramString(xmlString);
        const blockValue = catXml.evaluate(`//scene[@type='tscene']/object[@type='tobject']/script[@type='tscript']//block[@type='DronePlayLedAnimationBrick']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();

        return (blockValue !== undefined && blockValue.childElementCount === 0);
      })).toBeTruthy();
    });
  });

  describe('UserVariable parsing', () => {
    test('Test of local uservariable parsing', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name>tUserVariable</name></default></userVariable></userVariable></brick></script>`;
        const catXml = parser.convertScriptString(xmlString);

        if (catXml.getElementsByTagName('parsererror').length > 0) return false;
        const testValue = catXml.evaluate(`//field[@name='DROPDOWN']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        return (testValue !== undefined && testValue.innerHTML.includes('tUserVariable'));
      })).toBeTruthy();
    });

    test('Test of local empty name uservariable parsing', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name></name></default></userVariable></userVariable></brick></script>`;
        const catXml = parser.convertScriptString(xmlString);

        if (catXml.getElementsByTagName('parsererror').length > 0) return false;
        const testValue = catXml.evaluate(`//field[@name='DROPDOWN']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        return (testValue !== undefined && testValue.innerHTML.length === 0);
      })).toBeTruthy();
    });

    test('Test of local uservariable parsing without name tag', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name/></default></userVariable></userVariable></brick></script>`;
        const catXml = parser.convertScriptString(xmlString);

        if (catXml.getElementsByTagName('parsererror').length > 0) return false;
        const testValue = catXml.evaluate(`//field[@name='DROPDOWN']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        return (testValue !== undefined && testValue.innerHTML.length === 0);
      })).toBeTruthy();
    });

    test('Test of remote uservariable parsing', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name>tUserVariable</name></default></userVariable></userVariable></brick><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable reference="../../brick[1]"/></brick></script>`;
        const catXml = parser.convertScriptString(xmlString);

        if (catXml.getElementsByTagName('parsererror').length > 0) return false;
        const testValue = catXml.evaluate(`//field[@name='DROPDOWN']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        return (testValue !== undefined && testValue.innerHTML.includes('tUserVariable'));
      })).toBeTruthy();
    });

    test('Test of remote empty name uservariable parsing', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name></name></default></userVariable></userVariable></brick><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable reference="../../brick[1]"/></brick></script>`;
        const catXml = parser.convertScriptString(xmlString);

        if (catXml.getElementsByTagName('parsererror').length > 0) return false;
        const testValue = catXml.evaluate(`//field[@name='DROPDOWN']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        return (testValue !== undefined && testValue.innerHTML.length === 0);
      })).toBeTruthy();
    });

    test('Test of remote uservariable parsing without name tag', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable type="UserVariable" serialization="custom"><userVariable><default><deviceValueKey>dcfdd34b-47fb-4fcc-a1cc-97495abf2563</deviceValueKey><name/></default></userVariable></userVariable></brick><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="VARIABLE"><type>NUMBER</type><value>0</value></formula></formulaList><userVariable reference="../../brick[1]"/></brick></script>`;
        const catXml = parser.convertScriptString(xmlString);

        if (catXml.getElementsByTagName('parsererror').length > 0) return false;
        const testValue = catXml.evaluate(`//field[@name='DROPDOWN']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        return (testValue !== undefined && testValue.innerHTML.length === 0);
      })).toBeTruthy();
    });

    test('Test if parser handels formular operator properly', async () => {
      expect(await page.evaluate(() => {
        const xmlString = `<script type="StartScript"><brickList><brick type="SetVariableBrick"><commentedOut>false</commentedOut><formulaList><formula category="Y_POSITION"><leftChild><type>NUMBER</type><value>70</value></leftChild><rightChild><type>NUMBER</type><value>90</value></rightChild><type>OPERATOR</type><value>EQUAL</value></formula></formulaList></brick></script>`;
        const catXml = parser.convertScriptString(xmlString);

        if (catXml.getElementsByTagName('parsererror').length > 0) return false;
        const testValue = catXml.evaluate(`//field[@name='Y_POSITION']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        const refOperator = '=';
        return (testValue !== undefined && testValue.innerHTML.trim() === `70 ${refOperator} 90`);
      })).toBeTruthy();
    });
  });

  describe('Formula brackets tests', () => {
    test('Formular with right sided brackets', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><type>NUMBER</type><value>1</value></leftChild><rightChild><rightChild><leftChild><type>NUMBER</type><value>5</value></leftChild><rightChild><rightChild><leftChild><type>NUMBER</type><value>9</value></leftChild><rightChild><type>NUMBER</type><value>8</value></rightChild><type>OPERATOR</type><value>PLUS</value></rightChild><type>BRACKET</type></rightChild><type>OPERATOR</type><value>DIVIDE</value></rightChild><type>BRACKET</type></rightChild><type>OPERATOR</type><value>MULT</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = '1 × (5 ÷ (9 + 8))'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('Formular with left sided brackets', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><rightChild><leftChild><rightChild><leftChild><type>NUMBER</type><value>1</value></leftChild><rightChild><type>NUMBER</type><value>2</value></rightChild><type>OPERATOR</type><value>PLUS</value></rightChild><type>BRACKET</type></leftChild><rightChild><type>NUMBER</type><value>8</value></rightChild><type>OPERATOR</type><value>MULT</value></rightChild><type>BRACKET</type></leftChild><rightChild><type>NUMBER</type><value>8</value></rightChild><type>OPERATOR</type><value>DIVIDE</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = '((1 + 2) × 8) ÷ 8'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('Formular with both sided brackets', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><rightChild><leftChild><type>NUMBER</type><value>1</value></leftChild><rightChild><type>NUMBER</type><value>5</value></rightChild><type>OPERATOR</type><value>MULT</value></rightChild><type>BRACKET</type></leftChild><rightChild><rightChild><leftChild><type>NUMBER</type><value>5</value></leftChild><rightChild><type>NUMBER</type><value>6</value></rightChild><type>OPERATOR</type><value>MULT</value></rightChild><type>BRACKET</type></rightChild><type>OPERATOR</type><value>PLUS</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = '(1 × 5) + (5 × 6)'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });
  });

  describe('Formula function tests', () => {

    test('Single value like sqrt function with arithmetic', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><leftChild><type>NUMBER</type><value>89</value></leftChild><type>FUNCTION</type><value>SQRT</value></leftChild><rightChild><type>NUMBER</type><value>5</value></rightChild><type>OPERATOR</type><value>MULT</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = 'square root(89) × 5'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('Single value like sin function with logic', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><leftChild><type>NUMBER</type><value>98</value></leftChild><type>FUNCTION</type><value>SIN</value></leftChild><rightChild><type>NUMBER</type><value>32</value></rightChild><type>OPERATOR</type><value>GREATER_THAN</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = 'sine(98) &gt; 32'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('Two single values like sin plus cos', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><leftChild><type>NUMBER</type><value>360</value></leftChild><type>FUNCTION</type><value>COS</value></leftChild><rightChild><leftChild><type>NUMBER</type><value>90</value></leftChild><type>FUNCTION</type><value>SIN</value></rightChild><type>OPERATOR</type><value>PLUS</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = 'cosine(360) + sine(90)'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('Double value like contains', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="SetXBrick"><commentedOut>false</commentedOut><formulaList><formula category="X_POSITION"><leftChild><type>NUMBER</type><value>3</value></leftChild><rightChild><type>NUMBER</type><value>1</value></rightChild><type>FUNCTION</type><value>CONTAINS</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = 'contains(3, 1)'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='X_POSITION']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('Sensor action in formular', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><type>SENSOR</type><value>COLLIDES_WITH_FINGER</value></leftChild><rightChild><type>FUNCTION</type><value>TRUE</value></rightChild><type>OPERATOR</type><value>PLUS</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = 'touches finger + true'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('UserList in formular', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><type>USER_LIST</type><value>tvariable</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = '*tvariable*'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('UserVariable in formular', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><type>USER_VARIABLE</type><value>tvariable</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = '"tvariable"'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

    test('String in formular', async () => {
      expect(await page.evaluate(() => {
        const scriptString = `<script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><type>STRING</type><value>hello</value></leftChild><rightChild><type>STRING</type><value> world</value></rightChild><type>FUNCTION</type><value>JOIN</value></formula></formulaList></brick></brickList></script>`;
        const scriptXml = parser.convertScriptString(scriptString);
        const refString = 'join(\'hello\', \'world\')'.trim();

        return (scriptXml instanceof XMLDocument
          && scriptXml.querySelector(`field[name='TIME_TO_WAIT_IN_SECONDS']`).innerHTML.trim() === refString);
      })).toBeTruthy();
    });

  });
});
