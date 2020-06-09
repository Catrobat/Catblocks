#!/usr/bin/env node
/* eslint-env node */

/**
 * @author Andreas Karner <andreas.karner@student.tugraz.at>
 * @description generate crowdin json files based on build mapping and string templates from catroid
 *
 * @changelog 2019-08-14: initial version
 *            2019-08-21: fixed some bugs, update to support different xml tags
 *            2019-08-23: added some more comments, refactor code
 *            2019-11-05: [MF] updated to new structure
 *            2020-03-30: [AK] updated to use xml2js module
 *            2020-03-31: [AK] updated code to use default value for missing in current language
 *            2020-04-01: [AK] updated default language to 'values-en-rAU'
 *            2020-05-11: [GS] included and updated default language to 'values-en'
 */

const fs = require('fs');
const path = require('path');
const xml2json = require('xml2js');
const { locales } = require('./lang_codes_mapping');

// please define here the configuration if needed
const MAPPING_FILE = path.join('i18n', 'strings_to_json_mapping.json');
const MAPPING_COMMENT = '@';
const MAPPING = JSON.parse(fs.readFileSync(MAPPING_FILE, { encoding: 'utf-8' }));

const STRINGS_DIR = path.join('i18n', 'catroid_strings');
const STRINGS_FILE = 'strings.xml';
const DEF_LANG = 'values-en';
const DEF_LANG_FILE = path.join(STRINGS_DIR, DEF_LANG, STRINGS_FILE);

const JSON_DIR = path.join('i18n', 'json');

/**
 * Parse/prepare dirname from localfilesystem to use in code
 * @param {*} dirname
 */
const prepareStringFolderName = dirname => dirname.replace('values-', '').replace('-r', '-').replace('-', '_');

/**
 * Escape received string values from strings xml and return value
 * @param {*} value
 */
const escapeStringValue = value => (value ? value.replace(/\r?\n|\r|\\n|\\"/g, '') : '');

/**
 * Parse json string stream from catroid string files and return object for value substitution
 * @param {*} stream
 * @return Object
 */
const parseStringFile = stream => {
  const values = {};
  const data = stream.resources;

  Object.keys(data).forEach(xmltag => {
    switch (xmltag) {
      case 'string':
        data.string.forEach(stringpair => {
          values[stringpair.$.name] = escapeStringValue(stringpair._);
        });
        break;
      case 'plurals':
        data.plurals.forEach(pluralpair => {
          pluralpair.item.forEach(pluralitem => {
            values[`${pluralpair.$.name}.${pluralitem.$.quantity}`] = escapeStringValue(pluralitem._);
          });
        });
        break;
      default:
        console.warn(`Skip not supported xml tag from ${STRINGS_FILE}`);
        break;
    }
  });
  return values;
};

/**
 * substitute variables with corresponding data
 * @param {String} variable
 * @param {Object} data
 * @param {Object} defdata
 * @return String
 */
const substituteVariableData = (variable, data, defdata) => {
  let result = variable;
  variable.split('${').forEach(split => {
    const len = split.indexOf('}');
    if (len > -1) {
      const var_name = split.substr(0, len);
      if (data[var_name]) {
        result = result.replace(`$\{${var_name}}`, data[var_name]);
      } else {
        result = result.replace(`$\{${var_name}}`, defdata[var_name]);
      }
    }
  });
  return result;
};

/**
 * Read catroid string file and parse it into a js object
 * @param {*} file
 * @param {*} enc
 * @return Object
 */
const readStringFile = async (file, enc = 'utf-8') => {
  const payload = fs.readFileSync(file, { encoding: enc });
  return parseStringFile(await xml2json.parseStringPromise(payload));
};

/**
 * Generate language mapping
 * @param {*} values
 * @return Object
 */
const generateLangValues = (values, defvalues) => {
  const result = {};
  Object.keys(MAPPING)
    .filter(key => !key.startsWith(MAPPING_COMMENT))
    .forEach(rule => {
      const value = substituteVariableData(MAPPING[rule], values, defvalues);
      result[rule] = value.split('"').join('');
    });

  return result;
};

/**
 * Create language file based on MAPPING and values
 *  Dump result as json file into JSON_DIR
 * @param {*} lang
 * @param {*} values
 */
const dumpStringFile = (lang, values) => {
  const langname = prepareStringFolderName(lang);
  const jsonfile = path.join(JSON_DIR, langname + '.json');
  values['DROPDOWN_NAME'] = locales[langname] ? locales[langname] : langname;
  fs.writeFileSync(jsonfile, JSON.stringify(values), { encoding: 'utf-8' });
};

(async () => {
  if (!fs.existsSync(JSON_DIR)) {
    fs.mkdirSync(JSON_DIR);
  }

  const def_string = await readStringFile(DEF_LANG_FILE);
  const def_values = generateLangValues(def_string, def_string);
  dumpStringFile(DEF_LANG, def_values);

  const languages = fs.readdirSync(STRINGS_DIR, { encoding: 'utf-8' });
  languages
    .filter(lang => lang != DEF_LANG)
    .forEach(async langname => {
      const lang_file = path.join(STRINGS_DIR, langname, STRINGS_FILE);
      const lang_string = await readStringFile(lang_file);
      const lang_values = generateLangValues(lang_string, def_string);
      dumpStringFile(langname, lang_values);
    });
})();
