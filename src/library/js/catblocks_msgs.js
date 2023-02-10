import Blockly from 'blockly';
import locales from './locales.json';

export class CatblocksMsgs {
  static msgs = {};
  static currentLocale = 'en';
  static fallbackLocale = 'en';

  static getLocales() {
    return locales;
  }

  static hasLocale(locale) {
    return Object.keys(CatblocksMsgs.getLocales()).includes(locale);
  }

  static async setLocale(locale, filesLocation = undefined) {
    if (CatblocksMsgs.hasLocale(locale)) {
      if (Object.keys(CatblocksMsgs.getLocales()[locale]).length === 1) {
        await CatblocksMsgs.loadNewLocale(locale, filesLocation);
        CatblocksMsgs.currentLocale = locale;
        Blockly.setLocale(CatblocksMsgs.getLocales()[locale]);
      } else {
        CatblocksMsgs.currentLocale = locale;
        Blockly.setLocale(CatblocksMsgs.getLocales()[locale]);
      }
    } else {
      const localeWithoutSuffix = locale.substring(0, locale.indexOf('_'));
      if (locale !== localeWithoutSuffix) {
        return CatblocksMsgs.setLocale(localeWithoutSuffix, filesLocation);
      } else {
        console.log('Fallback to default language and ignoring unrecognized locale: ' + locale);
        return CatblocksMsgs.setLocale(CatblocksMsgs.fallbackLocale, filesLocation);
      }
    }
  }

  static reloadCurrentLocale() {
    return CatblocksMsgs.setLocale(CatblocksMsgs.currentLocale);
  }

  static getCurrentLocale() {
    return CatblocksMsgs.currentLocale;
  }

  static getCurrentLocaleValues() {
    return CatblocksMsgs.getLocales()[CatblocksMsgs.getCurrentLocale()];
  }

  static async loadNewLocale(locale, filesLocation) {
    let json_object = [];
    let url = window.location.origin + '/i18n/' + locale + '.json';

    if (filesLocation != null) {
      url = filesLocation + locale + '.json';
    }
    if (window.CatBlocks && window.CatBlocks.config && window.CatBlocks.config.i18n) {
      url = window.CatBlocks.config.i18n + locale + '.json';
    }

    const result = await fetch(url);
    if (result.status !== 200) {
      console.log('Error while loading locale: ' + locale);
      return;
    }
    json_object = await result.json();
    for (const key in json_object) {
      if (Object.hasOwnProperty.call(json_object, key)) {
        if (key !== 'DROPDOWN_NAME') {
          const lang = json_object[key];
          CatblocksMsgs.getLocales()[locale][key] = lang;
        }
      }
    }
  }
}
