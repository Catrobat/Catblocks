/**
 * @description Parser test
 */

'use strict'



describe('Catroid to Catblocks parser tests', () => {



  beforeEach(async () => {
    await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
  });

  /**
   * Test if xml character like &amp; get properly handeled by catblocks parser
   */
  test('Xml Character escaping test', async () => {
    const res = await page.evaluate(() => {
      // verify if <value>60&amp;.0</value> get parsed properly into a catblocks xml
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="цель"><lookList><look fileName="Space-Panda.png" name="цель"/></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSizeToBrick" id="testBrick"><commentedOut>false</commentedOut><formulaList><formula category="SIZE"><type>NUMBER</type><value id="testValue">60&amp;.0</value></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      try {
        const catXml = Catblocks.Parser.parseXml(xmlString);
        if (catXml.getElementsByTagName('parsererror').length > 0) {
          return false;
        }
        const testValue = catXml.evaluate(`//field[@name='SIZE']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (testValue === undefined) {
          return false;
        }
        return testValue.innerHTML.includes('60&amp;.0');
      } catch (e) {
        return false;
      }
    });

    expect(res).toBeTruthy();
  });

  /** 
   * Test if parser is able to follow references which are outside of the object
   * Test for looklist
   */
  test('LookList reference not within the same object', async () => {
    const res = await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestLookListObject"><lookList><look fileName="testLook.png" name="testLook"/></lookList><soundList/><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetLookBrick"><commentedOut>false</commentedOut><look reference="../../../../../../object[1]/lookList/look[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      try {
        const catXml = Catblocks.Parser.parseXml(xmlString);
        if (catXml.getElementsByTagName('parsererror').length > 0) {
          return false;
        }
        const testValue = catXml.evaluate(`//field[@name='look']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (testValue === undefined) {
          return false;
        }
        return testValue.innerHTML.includes('testLook');
      } catch (e) {
        return false;
      }
    });

    expect(res).toBeTruthy();
  });

  /** 
   * Test if parser is able to follow references which are outside of the object
   * Test for soundlist
   */
  test('SountList reference not within the same object', async () => {
    const res = await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList></lookList><soundList><sound fileName="testSound.png" name="testSound"/></soundList><scriptList/></object><object type="Sprite" name="цель"><lookList></lookList><soundList/><scriptList><script type="StartScript"><brickList><brick type="SetSoundBrick"><commentedOut>false</commentedOut><sound reference="../../../../../../object[1]/soundList/sound[1]"/></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      try {
        const catXml = Catblocks.Parser.parseXml(xmlString);
        if (catXml.getElementsByTagName('parsererror').length > 0) {
          return false;
        }
        const testValue = catXml.evaluate(`//field[@name='sound']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (testValue === undefined) {
          return false;
        }
        return testValue.innerHTML.includes('testSound');
      } catch (e) {
        return false;
      }
    });

    expect(res).toBeTruthy();
  });

  /** 
   * Test if default value "---" is used if no nodeValue exists in script
   */
  test('Test if default value "---" is used if no nodeValue is given', async () => {
    const res = await page.evaluate(() => {
      const xmlString = `<?xml version="1.0" encoding="UTF-8"?><program><header><catrobatLanguageVersion>0.99997</catrobatLanguageVersion></header><scenes><scene><name>игра</name><objectList><object type="Sprite" name="TestSoundListObject"><lookList /><soundList><sound fileName="testSound.png" name="testSound" /></soundList><scriptList /></object><object type="Sprite" name="цель"><lookList /><soundList /><scriptList><script type="StartScript"><brickList><brick type="WaitBrick"><commentedOut>false</commentedOut><formulaList><formula category="testFormular"><leftChild><type>NUMBER</type><value>37</value></leftChild><rightChild><type>NUMBER</type><value>58</value></rightChild><type>FUNCTION</type><value /></formula></formulaList></brick></brickList><commentedOut>false</commentedOut></script></scriptList></object></objectList></scene></scenes></program>`;
      try {
        const catXml = Catblocks.Parser.parseXml(xmlString);
        if (catXml.getElementsByTagName('parsererror').length > 0) {
          return false;
        }
        const testValue = catXml.evaluate(`//field[@name='testFormular']`, catXml, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (testValue === undefined) {
          return false;
        }
        return testValue.innerHTML.includes('37 --- 58');
      } catch (e) {
        return false;
      }
    });

    expect(res).toBeTruthy();
  });

});