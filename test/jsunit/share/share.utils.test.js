
/**
 * @description Share utils tests
 */

'use strict';

/**
 * BeforeAll open the browser and load testing page
 */
beforeEach(async () => {
  await page.goto(`${SERVER}`, { waitUntil: 'domcontentloaded' });
});

describe('Share utilities testing', () => {

  /**
   * Test if parsing share options works properly
   */
  test('Parsing share options performs properly', async () => {
    expect(await page.evaluate(() => {
      const o1 = {
        'a': 1,
        'b': 'bb',
        'c': {
          'c.a': 'ccaa'
        }
      };
      const o2 = {
        'b': 'bbb',
        'c': {
          'c.a': 'ccaaa',
          'c.b': 'ccbb'
        },
        'd': 'd',
        'e': {
          'e.a': 'eeaa'
        }
      };

      return JSON.stringify(shareUtils.parseOptions(o1, o2)) === JSON.stringify({ 'b': 'bb', 'c': { 'c.a': 'ccaa' }, 'd': 'd', 'e': { 'e.a': 'eeaa' }, 'a': 1 });
    })).toBeTruthy();
  });

  /**
   * Test if transform xml works as expected
   */
  test('Transform xml performs properly', async () => {
    expect(await page.evaluate(() => {
      const xmlDoc = (new DOMParser()).parseFromString('<xml><scene id="tscene" class="value"><block class="tclass">innerValue</block></scene></xml>', 'text/xml');
      shareUtils.transformXml(xmlDoc, {
        'block': ['remAttr-class'],
        'scene': ['remAttr-class', 'remAttr-x']
      });

      return '<xml><scene id="tscene"><block>innerValue</block></scene></xml>' === (new XMLSerializer()).serializeToString(xmlDoc);
    })).toBeTruthy();
  });

  /**
   * Test if inject new dom works as expected
   */
  test('Inject dom node performs properly', async () => {
    expect(await page.evaluate(() => {
      const shareTestContainer = document.getElementById('shareprogs');
      const newDom = shareUtils.injectNewDom(shareTestContainer, 'P', { 'id': 'tid', 'class': 'tclass1 tclass2' }, "tinnerText");
      return (newDom !== undefined
        && newDom.tagName.toLowerCase() === 'p'
        && newDom.id === 'tid'
        && newDom.className === 'tclass1 tclass2'
        && newDom.innerText === 'tinnerText'
        && newDom.parentNode === shareTestContainer);
    })).toBeTruthy();
  });

  /**
   * Test if wrapping xml into element works as expected
   */
  test('Wrapping xml performs properly', async () => {
    expect(await page.evaluate(() => {
      const xmlDoc = (new DOMParser()).parseFromString('<scene id="tscene" class="value"><block class="tclass">innerValue</block></scene>', 'text/xml');
      const wrappedDoc = shareUtils.wrapElement(xmlDoc.firstChild, 'twrapper', { 'tattr': 'tvalue' });

      return (wrappedDoc !== undefined
        && wrappedDoc.tagName.toLowerCase() === 'twrapper'
        && wrappedDoc.getAttribute('tattr') === 'tvalue'
        && wrappedDoc.firstChild.tagName.toLowerCase() === 'scene');
    })).toBeTruthy();
  });

  /**
   * Test if remove all children from node works as expected
   */
  test('Remove all children performs properly', async () => {
    expect(await page.evaluate(() => {
      const xmlDoc = (new DOMParser()).parseFromString('<scene id="tscene" class="value"><block class="tclass">innerValue</block></scene>', 'text/xml');
      shareUtils.removeAllChildren(xmlDoc);

      return xmlDoc.childElementCount === 0;
    })).toBeTruthy();
  });

  /**
   * Test if get dom element works as expected
   */
  test('Get dom element performs properly', async () => {
    expect(await page.evaluate(() => {
      return (shareUtils.getDomElement('shareprogs') === document.getElementById('shareprogs')
        && shareUtils.getDomElement('#share .injectionDiv') === shareWS.injectionDiv_);
    })).toBeTruthy();
  });

  /**
   * Test if children count feching works as expected
   */
  test('Has children function performs properly', async () => {
    expect(await page.evaluate(() => {
      const xmlDoc = (new DOMParser()).parseFromString('<scene id="tscene" class="value"><block class="tclass">innerValue1</block><block class="tclass">innerValue2</block></scene>', 'text/xml');

      return (shareUtils.hasChildren(xmlDoc)
        && shareUtils.hasChildren(xmlDoc.firstChild)
        && shareUtils.hasChildren(xmlDoc.firstChild.firstChild));
    })).toBeTruthy();
  });

  /**
   * Test if triming string works as expected
   */
  test('Trimming string performs properly', async () => {
    expect(await page.evaluate(() => {
      return (shareUtils.trimString('A very long string, which will get trimmed trimString') === 'A very long str...'
        && shareUtils.trimString('Another long string', 5) === 'Anoth...');
    })).toBeTruthy();
  });
});
