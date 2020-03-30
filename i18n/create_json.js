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
 */

const fs = require('fs');
const path = require('path');
const xml2json = require('xml2js');
const { locales } = require('./lang_codes_mapping');

// please define here the configuration if needed
const MAPPING_FILE = path.join('i18n', 'strings_to_json_mapping.json');
const MAPPING_COMMENT = '@';

const STRINGS_DIR = path.join('i18n', 'catroid_strings');
const STRINGS_FILE = 'strings.xml';

const JSON_DIR = path.join('i18n', 'json');
// create dir if not exists
if (!fs.existsSync(JSON_DIR)) {
  fs.mkdirSync(JSON_DIR);
}

/**
 * Parse/prepare dirname from localfilesystem to use in code
 * @param {*} dirname 
 */
const prepareStringFolderName = (dirname) => dirname.replace('values-', '').replace('-r', '-').replace('-', '_');

/**
 * Escape received string values from strings xml and return value
 * @param {*} value 
 */
const escapeStringValue = (value) => value ? value.replace(/\r?\n|\r|\\n/g, '') : '';

/**
 * parse json string stream from catroid string files and return object for value substitution 
 * @param {*} jsonstream 
 */
const parseStringFile = function (jsonstream) {
  const values = {};
  const data = jsonstream.resources;

  Object.keys(data).forEach(xmltag => {
    switch (xmltag) {
      case "string": {
        data.string.forEach(stringpair => {
          values[stringpair.$.name] = escapeStringValue(stringpair._);
        });
        break;
      }
      case "plurals": {
        data.plurals.forEach(pluralpair => {
          pluralpair.item.forEach(pluralitem => {
            values[`${pluralpair.$.name}.${pluralitem.quantity}`] = escapeStringValue(pluralitem._);
          });
        });
        break;
      }
      default: {
        console.warn(`Skip not supported xml tag from ${STRINGS_FILE}`);
        break;
      }
    }
  });
  return values;
};

/**
 * substitute variables with corresponding data 
 * @param {String} variable 
 * @param {Object} data 
 */
function substituteVariableData(variable, data) {
  let result = variable;
  variable.split('${').forEach(split => {
    const len = split.indexOf('}');
    if (len > -1) {
      const var_name = split.substr(0, len);
      result = result.replace(`$\{${var_name}}`, data[var_name]);
    }
  });
  return result;
}

/**
 * main stuff
 */
const mapping = JSON.parse(
  fs.readFileSync(MAPPING_FILE, { encoding: 'utf-8' })
);
const languages = fs.readdirSync(STRINGS_DIR, { encoding: 'utf-8' });

languages.forEach(language => {
  const lang_file_path = path.join(STRINGS_DIR, language, STRINGS_FILE);
  const lang_file = fs.readFileSync(lang_file_path, { encoding: 'utf-8' });
  xml2json.parseStringPromise(lang_file).then(data => {
    const lang_values = parseStringFile(data);
    const lang_name = prepareStringFolderName(language);
    const json_file = path.join(JSON_DIR, lang_name + '.json');

    const result = {};

    Object.keys(mapping).filter(key => !key.startsWith(MAPPING_COMMENT)).forEach(rule => {
      const value = substituteVariableData(mapping[rule], lang_values);
      result[rule] = value.split('"').join('');
    });
    result["DROPDOWN_NAME"] = locales[lang_name] ? locales[lang_name] : lang_name;

    fs.writeFileSync(json_file, JSON.stringify(result), { encoding: 'utf-8' });
  });
});