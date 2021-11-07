import Blockly from 'blockly';
import locales from './locales.json';
import $ from 'jquery';

Blockly.CatblocksMsgs = {};

Blockly.CatblocksMsgs.currentLocale_ = 'en';

Blockly.CatblocksMsgs.hasLocale = function (locale) {
  return Object.keys(Blockly.CatblocksMsgs.getLocales()).includes(locale);
};

Blockly.CatblocksMsgs.setLocale = function (locale, filesLocation = undefined) {
  if (Blockly.CatblocksMsgs.hasLocale(locale)) {
    if (Object.keys(Blockly.CatblocksMsgs.getLocales()[locale]).length === 1) {
      return Blockly.CatblocksMsgs.loadNewLocale(locale, filesLocation).then(() => {
        Blockly.CatblocksMsgs.currentLocale_ = locale;
        Blockly.Msg = Object.assign({}, Blockly.Msg, Blockly.CatblocksMsgs.getLocales()[locale]);
      });
    } else {
      Blockly.CatblocksMsgs.currentLocale_ = locale;
      Blockly.Msg = Object.assign({}, Blockly.Msg, Blockly.CatblocksMsgs.getLocales()[locale]);
      return Promise.resolve();
    }
  } else {
    const localeWithoutSuffix = locale.substring(0, locale.indexOf('_'));
    if (locale !== localeWithoutSuffix) {
      return Blockly.CatblocksMsgs.setLocale(localeWithoutSuffix, filesLocation);
    } else {
      console.warn('Fallback to default language and ignoring unrecognized locale: ' + locale);
      return Blockly.CatblocksMsgs.setLocale(Blockly.CatblocksMsgs.currentLocale_, filesLocation);
    }
  }
};

Blockly.CatblocksMsgs.reloadCurrentLocale = function () {
  return Blockly.CatblocksMsgs.setLocale(Blockly.CatblocksMsgs.currentLocale_);
};

Blockly.CatblocksMsgs.getCurrentLocale = function () {
  return Blockly.CatblocksMsgs.currentLocale_;
};

Blockly.CatblocksMsgs.getCurrentLocaleValues = function () {
  return Blockly.CatblocksMsgs.getLocales()[Blockly.CatblocksMsgs.getCurrentLocale()];
};

Blockly.CatblocksMsgs.loadNewLocale = function (locale, filesLocation) {
  let json_object = [];
  let url = window.location.origin + '/i18n/' + locale + '.json';

  if (filesLocation != null) {
    url = filesLocation + locale + '.json';
  }
  if (window.CatBlocks && window.CatBlocks.config && window.CatBlocks.config.i18n) {
    url = window.CatBlocks.config.i18n + locale + '.json';
  }

  return $.getJSON(url, function (result) {
    json_object = result;
    Object.keys(json_object).forEach(key => {
      if (key !== 'DROPDOWN_NAME') {
        Blockly.CatblocksMsgs.getLocales()[locale][key] = json_object[key];
      }
    });
  });
};

Blockly.CatblocksMsgs.getLocales = function () {
  return locales;
};
