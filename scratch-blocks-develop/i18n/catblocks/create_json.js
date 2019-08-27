#!/usr/bin/env node

/**
 * @author Andreas Karner <andreas.karner@student.tugraz.at>
 * @description generate crowdin json files based on build mapping and string templates from catroid
 *  
 * @changelog 2019-08-14: initial version
 *            2019-08-21: fixed some bugs, update to support different xml tags
 *            2019-08-23: added some more comments, refactor code
 */

const fs = require('fs');
const path = require('path');
const xml2json = require('xml2json');

// please define here the configuration if needed
const MAPPING_FILE = path.join('i18n', 'catblocks', 'strings_to_json_mapping.json');
const MAPPING_COMMENT = '@';

const STRINGS_DIR = path.join('msg', 'catroid_strings');
const STRINGS_FILE = 'strings.xml';

const JSON_DIR = path.join('msg', 'json');


/**
 * Parse/prepare dirname from localfilesystem to use in code
 * @param {*} dirname 
 */
const prepareStringFolderName = (dirname) => dirname.replace('values-', '');

/**
 * Escape received string values from strings xml and return value
 * @param {*} value 
 */
const escapeStringValue = (value) => value ? value.split('\n').join(' ') : '';

/**
 * parse json string stream from catroid string files and return object for value substitution 
 * @param {*} jsonstream 
 */
const parseStringFile = function (jsonstream) {
  let values = {};
  const data = JSON.parse(jsonstream).resources;

  Object.keys(data).forEach(xmltag => {
    switch (xmltag) {
      case "string": {
        data.string.forEach(stringpair => {
          values[stringpair['name']] = escapeStringValue(stringpair['$t']);
        });
        break;
      }
      case "plurals": {
        data.plurals.forEach(pluralpair => {
          if (pluralpair.item instanceof Array) {
            pluralpair.item.forEach(pluralitem => {
              values[`${pluralpair['name']}.${pluralitem['quantity']}`] = escapeStringValue(pluralitem['$t']);
            });
          } else {
            values[`${pluralpair['name']}.${pluralpair.item['quantity']}`] = escapeStringValue(pluralpair.item['$t']);
          }
        });
        break;
      }
      default: {
        console.warn(`Skip not supported xml tag from ${STRINGS_FILE}`);
        break;
      }
    }
  })
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
      result = result.replace(`\$\{${var_name}\}`, data[var_name]);
    }
  });
  return result;
}

/**
 * main stuff
 */
const mapping = JSON.parse(
  fs.readFileSync(MAPPING_FILE, { encoding: 'utf-8' })
)
const languages = fs.readdirSync(STRINGS_DIR, { encoding: 'utf-8' });

languages.forEach(language => {
  const lang_file_path = path.join(STRINGS_DIR, language, STRINGS_FILE);
  const lang_file = fs.readFileSync(lang_file_path, { encoding: 'utf-8' });
  const lang_values = parseStringFile(xml2json.toJson(lang_file));
  const lang_name = prepareStringFolderName(language).replace('-', '_');
  const json_file = path.join(JSON_DIR, lang_name + '.json');

  const result = {};
  Object.keys(mapping).filter(key => !key.startsWith(MAPPING_COMMENT)).forEach(rule => {
    let value = substituteVariableData(mapping[rule], lang_values);
    result[rule] = value.split('"').join('');
  });

  fs.writeFileSync(json_file, JSON.stringify(result), { encoding: 'utf-8' });
});