import Blockly from "scratch-blocks";

const defaultLanguage = 'en_GB';

Blockly.CatblocksMsgs = {};
Blockly.CatblocksMsgs.locales = {};

Blockly.CatblocksMsgs.currentLocale_ = 'en_GB';

Blockly.CatblocksMsgs.hasLocale = function(locale) {
  return fetch(`i18n/${locale}.json`)
    .then(res => {
      if (res.ok) {
        return true;
      }
      return false;
    });
};

Blockly.CatblocksMsgs.loadLanguage = function(langCode) {
  return fetch(`i18n/${langCode}.json`)
    .then(res => {
      if (!res.ok) {
        console.error(`Language ${langCode} not found, using default`);
        return fetch(`i18n/${defaultLanguage}.json`)
          .then(defaultLang => {
            if (defaultLang.ok) {
              return defaultLang.json();
            } 
            console.error('Default Language not found');
            return {};
          });
      }
      return res.json();
    })
    .then(json => Blockly.Msg = Object.assign({}, json));
};

Blockly.CatblocksMsgs.setLocale = function(locale) {
  return new Promise((res) => {
    if (Blockly.CatblocksMsgs.hasLocale(locale)) {
      Blockly.CatblocksMsgs.currentLocale_ = locale;
      Blockly.CatblocksMsgs.loadLanguage(locale).then(lang => {
        Blockly.Msg = Object.assign({}, Blockly.Msg, lang);
        res(true);
      });
    } else {
      // keep current locale
      console.warn('Ignoring unrecognized locale: ' + locale);
      res(false);
    }
  });
};

Blockly.CatblocksMsgs.reloadCurrentLocale = function() {
  return Blockly.CatblocksMsgs.setLocale(Blockly.CatblocksMsgs.currentLocale_);
};