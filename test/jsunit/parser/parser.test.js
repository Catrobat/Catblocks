/**
 * @description Parser test
 *  for the parser we always need the webview
 */

'use strict'

describe('Parser catroid program tests', () => {

  beforeAll(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
  });

  /**
   * Test if parsing a not support version works properly
   */
  test('Recognizes not supported program version', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.993</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml === undefined);
    })).toBeTruthy();
  });

  /**
  * Test if rendering a support version works properly
  */
  test('Recognizes supported program version', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.994</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument);
    })).toBeTruthy();
  });

  /**
   * Test if parser is able to parse an empty catroid program properly
   */
  test('Handle empty program properly', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.994</catrobatLanguageVersion></header><scenes></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      return (catXml instanceof XMLDocument
        && catXml.firstChild.tagName === 'xml'
        && catXml.firstChild.childElementCount === 0);
    })).toBeTruthy();
  });

  /**
   * Test if parser is able to parse a single empty scene program properly
   */
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

  /**
   * Test if parser is able to parse multiple empty scenes from a program properly
   */
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

  /**
   * Test if parser is able to parse single empty object properly
   */
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

  /**
   * Test if parser is able to parse multiple empty objects properly
   */
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

  /**
    * Test if parser is able to parse multiple empty scence with one object properly
  */
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

  /**
   * Test if parser is able to parse single empty script from object properly
   */
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

  /**
   * Test if xml character like &amp; get properly handeled by catblocks parser
   */
  test('Xml Character escaping test', async () => {
    expect(await page.evaluate(() => {
      // verify if <value>60&amp;.0</value> get parsed properly into a catblocks xml
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="цель"><lookList><look fileName="Space-Panda.png" name="цель"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSizeToBrick" id="testBrick"><commentedOut>false</commentedOut><formulaList><formula category="SIZE"><type>NUMBER</type><value id="testValue">60&amp;.0</value></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='SIZE']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('60&amp;.0'));
    })).toBeTruthy();
  });

  /**
   * Test if parser is able to follow references which are outside of the object
   * Test for looklist
   */
  test('LookList reference not within the same object', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestLookListObject"><lookList><look fileName="testLook.png" name="testLook"/></lookList><soundList/><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetLookBrick"><commentedOut>false</commentedOut><look reference="../../../../../../object[1]/lookList/look[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='look']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('testLook'));
    })).toBeTruthy();
  });

  /**
   * Test if parser is able to follow references which are outside of the object
   * Test for soundlist
   */
  test('SountList reference not within the same object', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList></lookList><soundList><sound fileName="testSound.png" name="testSound"/></soundList><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSoundBrick"><commentedOut>false</commentedOut><sound reference="../../../../../../object[1]/soundList/sound[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='sound']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('testSound'));
    })).toBeTruthy();
  });

  /**
   * Test if default value "---" is used if no nodeValue exists in script
   */
  test('Test if default value "---" is used if no nodeValue is given', async () => {
    expect(await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList /><soundList><sound fileName="testSound.png" name="testSound" /></soundList><scriptList /></object><object type="Sprite" name="цель"><lookList /><soundList /><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="testFormular"><leftChild><type>NUMBER</type><value>37</value></leftChild><rightChild><type>NUMBER</type><value>58</value></rightChild><type>FUNCTION</type><value /></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      const catXml = parser.convertProgramString(xmlString);

      if (catXml.getElementsByTagName('parsererror').length > 0) return false;
      const testValue = catXml.evaluate(`//field[@name='testFormular']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
      return (testValue !== undefined && testValue.innerHTML.includes('37 --- 58'));
    })).toBeTruthy();
  });

  /**
   * Test if parser properly converts script string into XMLDocument
   */
  test('Test if parser converts catroid script properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<script type="BroadcastScript"><brickList><brick type="ForeverBrick"><commentedOut>false</commentedOut><loopBricks><brick type="PlaySoundAndWaitBrick"><commentedOut>false</commentedOut><sound name="soundTest"/></brick></loopBricks></brick></brickList><commentedOut>false</commentedOut><receivedMessage>звуки</receivedMessage></script>`;
      const catXml = parser.convertScriptString(scriptString);
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 3
        && catXml.getElementsByTagName('block')[0].getAttribute('type') === 'BroadcastScript'
        && catXml.getElementsByTagName('block')[1].getAttribute('type') === 'ForeverBrick'
        && catXml.getElementsByTagName('block')[2].getAttribute('type') === 'PlaySoundAndWaitBrick')
    })).toBeTruthy();
  });
});

describe('Parser catroid program tests', () => {

  beforeEach(async () => {
    await page.goto(`${SERVER}`, {waitUntil: 'domcontentloaded'});
  });

  /**
   * Test if parser properly converts script string with empty formula into XMLDocument
   */
  test('test if parser converts empty formula without any child in script properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<script type="BroadcastScript"><brickList><brick type="ForeverBrick"><commentedOut>false</commentedOut><loopBricks><brick type="ChangeBrightnessByNBrick"><commentedOut>false</commentedOut><formulaList><formula category="BRIGHTNESS_CHANGE"></formula></formulaList></brick></loopBricks></brick></brickList><commentedOut>false</commentedOut><receivedMessage></receivedMessage></script>`;
      const catXml = parser.convertScriptString(scriptString);
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 3
        && catXml.getElementsByTagName('block')[0].getAttribute('type') === 'BroadcastScript'
        && catXml.getElementsByTagName('block')[1].getAttribute('type') === 'ForeverBrick'
        && catXml.getElementsByTagName('block')[2].getAttribute('type') === 'ChangeBrightnessByNBrick'
        && catXml.getElementsByTagName('block')[2].childNodes[1].getAttribute('name') === 'BRIGHTNESS_CHANGE'
        && catXml.getElementsByTagName('block')[2].childNodes[1].textContent.trim() === '')
    })).toBeTruthy();
  });

  /**
   * Test if parser properly converts script string with non-empty formula into XMLDocument
   */
  test('test if parser converts non-empty formula without any child in script properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<script type="BroadcastScript"><brickList><brick type="ForeverBrick"><commentedOut>false</commentedOut><loopBricks><brick type="ChangeBrightnessByNBrick"><commentedOut>false</commentedOut><formulaList><formula category="BRIGHTNESS_CHANGE"><type>NUMBER</type><value>100</value></formula></formulaList></brick></loopBricks></brick></brickList><commentedOut>false</commentedOut><receivedMessage></receivedMessage></script>`;
      const catXml = parser.convertScriptString(scriptString);
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 3
        && catXml.getElementsByTagName('block')[0].getAttribute('type') === 'BroadcastScript'
        && catXml.getElementsByTagName('block')[1].getAttribute('type') === 'ForeverBrick'
        && catXml.getElementsByTagName('block')[2].getAttribute('type') === 'ChangeBrightnessByNBrick'
        && catXml.getElementsByTagName('block')[2].childNodes[1].getAttribute('name') === 'BRIGHTNESS_CHANGE'
        && catXml.getElementsByTagName('block')[2].childNodes[1].textContent.trim() === '100')
    })).toBeTruthy();
  });

  /**
   * Test if parser properly converts script string with invalid formula into XMLDocument
   */
  test('test if parser converts invalid formula in script properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<script type="BroadcastScript"><brickList><brick type="ForeverBrick"><commentedOut>false</commentedOut><loopBricks><brick type="ChangeBrightnessByNBrick"><commentedOut>false</commentedOut><formulaList><formula category="unknown_category"><type>NUMBER</type><value>100</value></formula></formulaList></brick></loopBricks></brick></brickList><commentedOut>false</commentedOut><receivedMessage></receivedMessage></script>`;
      const catXml = parser.convertScriptString(scriptString);
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 3
        && catXml.getElementsByTagName('block')[0].getAttribute('type') === 'BroadcastScript'
        && catXml.getElementsByTagName('block')[1].getAttribute('type') === 'ForeverBrick'
        && catXml.getElementsByTagName('block')[2].getAttribute('type') === 'ChangeBrightnessByNBrick'
        && catXml.getElementsByTagName('block')[2].childNodes[1].getAttribute('name') === 'unknown_category'
        //ToDo: rendering sets value to 50 when formula category is invalid!?
        && catXml.getElementsByTagName('block')[2].childNodes[1].textContent.trim() === '100')
    })).toBeTruthy();
  });

  /**
   * Test if parser properly converts script string with valid formula (value and right child) into XMLDocument
   */
  test('test if parser converts valid formula (value and right child) in script properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<script type="BroadcastScript"><brickList><brick type="ForeverBrick"><loopBricks><brick type="ChangeBrightnessByNBrick"><formulaList><formula category="BRIGHTNESS_CHANGE"><rightChild><type>NUMBER</type><value>1</value></rightChild><type>OPERATOR</type><value>MINUS</value></formula></formulaList></brick></loopBricks></brick></brickList></script>`;
      const catXml = parser.convertScriptString(scriptString);
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 3
        && catXml.getElementsByTagName('block')[0].getAttribute('type') === 'BroadcastScript'
        && catXml.getElementsByTagName('block')[1].getAttribute('type') === 'ForeverBrick'
        && catXml.getElementsByTagName('block')[2].getAttribute('type') === 'ChangeBrightnessByNBrick'
        && catXml.getElementsByTagName('block')[2].childNodes[1].getAttribute('name') === 'BRIGHTNESS_CHANGE'
        && catXml.getElementsByTagName('block')[2].childNodes[1].textContent.trim() === 'MINUS 1')
    })).toBeTruthy();
  });

  /**
   * Test if parser properly converts script string with valid formula (left child, value and right child) into XMLDocument
   */
  test('test if parser converts valid formula (left child, value and right child) in script properly', async () => {
    expect(await page.evaluate(() => {
      const scriptString = `<script type="BroadcastScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="TIME_TO_WAIT_IN_SECONDS"><leftChild><type>NUMBER</type><value>37</value></leftChild><rightChild><type>NUMBER</type><value>58</value></rightChild><type>FUNCTION</type><value>RAND</value></formula></formulaList></brick></brickList></script>`;
      const catXml = parser.convertScriptString(scriptString);
      return (catXml instanceof XMLDocument
        && catXml.getElementsByTagName('block').length === 2
        && catXml.getElementsByTagName('block')[0].getAttribute('type') === 'BroadcastScript'
        && catXml.getElementsByTagName('block')[1].getAttribute('type') === 'WaitBrick'
        && catXml.getElementsByTagName('block')[1].childNodes[1].getAttribute('name') === 'TIME_TO_WAIT_IN_SECONDS'
        //ToDo: determine if numbers are actually Numbers?
        && catXml.getElementsByTagName('block')[1].childNodes[1].textContent.trim() === '37 RAND 58')
    })).toBeTruthy();
  });
});