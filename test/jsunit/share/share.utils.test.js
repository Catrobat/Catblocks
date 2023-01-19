/**
 * @description Share utils tests
 */
/* global page, SERVER, Test */
/* eslint no-global-assign:0 */
'use strict';

beforeEach(async () => {
  await page.goto(`${SERVER}`, { waitUntil: 'networkidle0' });
  page.on('console', message => {
    if (!message.text().includes('Failed to load resource: the server responded with a status of')) {
      console.log(message.text());
    }
  });

  await page.evaluate(async () => {
    await Test.CatBlocks.init({
      container: 'share',
      renderSize: 0.75,
      shareRoot: '',
      media: 'media/',
      language: 'en',
      rtl: false,
      noImageFound: 'No_Image_Available.jpg',
      advancedMode: false
    });

    const share = Test.CatBlocks.getInstance().share;
    Test.Share = share;
  });
});

describe('Share utilities testing', () => {
  test('Parsing share options performs properly', async () => {
    const object1 = {
      a: 1,
      b: 'bb',
      c: {
        'c.a': 'ccaa'
      }
    };
    const object2 = {
      b: 'bbb',
      c: {
        'c.a': 'ccaaa',
        'c.b': 'ccbb'
      },
      d: 'd',
      e: {
        'e.a': 'eeaa'
      }
    };

    const options = await page.evaluate(
      (pObject1, pObject2) => {
        return Test.ShareUtils.parseOptions(pObject1, pObject2);
      },
      object1,
      object2
    );

    expect(options).toEqual({
      a: 1,
      b: 'bb',
      c: {
        'c.a': 'ccaa'
      },
      d: 'd',
      e: {
        'e.a': 'eeaa'
      }
    });
  });

  test('Inject dom node performs properly', async () => {
    const parentID = 'shareprogs';
    const tag = 'p';
    const id = 'tid';
    const classes = 'tclass1 tclass2';
    const innerText = 'tinnerText';

    await page.evaluate(
      (pParentID, pTag, pID, pClass, pText) => {
        const shareTestContainer = document.getElementById(pParentID);
        Test.ShareUtils.injectNewDom(shareTestContainer, pTag, { id: pID, class: pClass }, pText);
      },
      parentID,
      tag,
      id,
      classes,
      innerText
    );

    const parentHandle = await page.$(`#${parentID}`);
    const realID = await parentHandle.$eval(tag, x => x.id);
    expect(realID).toBe(id);

    const realClass = await parentHandle.$eval(tag, x => x.className);
    expect(realClass).toBe(classes);

    const reallInnerText = await parentHandle.$eval(tag, x => x.innerText);
    expect(reallInnerText).toBe(innerText);
  });

  test('Wrapping xml performs properly', async () => {
    const xmlString = '<scene id="tscene" class="value"><block class="tclass">innerValue</block></scene>';
    const tag = 'twrapper';
    const attr = 'tvalue';

    const [realTag, realAttr, realChild] = await page.evaluate(
      (pXML, pTag, pAttr) => {
        const xmlDoc = new DOMParser().parseFromString(pXML, 'text/xml');

        const wrappedDoc = Test.ShareUtils.wrapElement(xmlDoc.firstChild, pTag, { tattr: pAttr });

        return [
          wrappedDoc.tagName.toLowerCase(),
          wrappedDoc.getAttribute('tattr'),
          wrappedDoc.firstChild.tagName.toLowerCase()
        ];
      },
      xmlString,
      tag,
      attr
    );

    expect(realTag).toBe(tag);
    expect(realAttr).toBe(attr);
    expect(realChild).toBe('scene');
  });

  test('Remove all children performs properly', async () => {
    const xmlString = '<scene id="tscene" class="value"><block class="tclass">innerValue</block></scene>';

    const count = await page.evaluate(pXML => {
      const xmlDoc = new DOMParser().parseFromString(pXML, 'text/xml');
      Test.ShareUtils.removeAllChildren(xmlDoc);

      return xmlDoc.childElementCount;
    }, xmlString);

    expect(count).toBe(0);
  });

  test('Get dom element performs properly', async () => {
    const [result1, result2] = await page.evaluate(() => {
      return [
        Test.ShareUtils.getDomElement('shareprogs') === document.getElementById('shareprogs'),
        Test.ShareUtils.getDomElement('#share .injectionDiv') === Test.Share.workspace.injectionDiv_
      ];
    });
    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
  });

  test('Has children function performs properly', async () => {
    const xmlString =
      '<scene id="tscene" class="value"><block class="tclass">innerValue1</block><block class="tclass">innerValue2</block></scene>';

    const [result1, result2, result3] = await page.evaluate(pXML => {
      const xmlDoc = new DOMParser().parseFromString(pXML, 'text/xml');

      return [
        Test.ShareUtils.hasChildren(xmlDoc),
        Test.ShareUtils.hasChildren(xmlDoc.firstChild),
        Test.ShareUtils.hasChildren(xmlDoc.firstChild.firstChild)
      ];
    }, xmlString);

    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
    expect(result3).toBeTruthy();
  });

  test('Trimming string performs properly', async () => {
    const string1 = 'A very long string, which will get trimmed trimString';
    const string2 = 'Another long string';
    const countFor2 = 5;

    const [trim1, trim2] = await page.evaluate(
      (pString1, pString2, pCount) => {
        return [Test.ShareUtils.trimString(pString1), Test.ShareUtils.trimString(pString2, pCount)];
      },
      string1,
      string2,
      countFor2
    );

    expect(trim1).toBe(string1.substr(0, 15) + '...');
    expect(trim2).toBe(string2.substr(0, countFor2) + '...');
  });
});
