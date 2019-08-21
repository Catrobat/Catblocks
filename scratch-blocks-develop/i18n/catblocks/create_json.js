#!/usr/bin/env node

/**
 * @author Andreas Karner <andreas.karner@student.tugraz.at>
 * @description generate crowdin json files based on build rules and string templates from catroid
 *  
 * @changelog 2019-08-14: initial version
 */

const fs = require('fs');
const path = require('path');
const xml2json = require('xml2json');

// please define here the configuration if needed
const RULES_FILE = path.join('i18n', 'catblocks', 'msg_json_rules.json');
const STRINGS_DIR = path.join('msg', 'catroid_strings');
const RULE_COMMENT = '@';
const STRINGS_FILE = 'strings.xml';
const DEST_DIR = path.join('msg', 'json');
const RULES = JSON.parse(fs.readFileSync(RULES_FILE, { encoding: 'utf-8' }))
const LANG_DIRS = fs.readdirSync(STRINGS_DIR, { encoding: 'utf-8' });

const PARSE_STRING_DIR = function (dirname) { return dirname.replace('values-', ''); };
const PARSE_STRING_VALUES = function (jsonstream) {
  let values = {};
  const data = JSON.parse(jsonstream).resources;

  Object.keys(data).forEach(xmltag => {
    switch (xmltag) {
      case "string": {
        data.string.forEach(stringpair => {
          values[stringpair['name']] = stringpair['$t'];
        });
        break;
      }
      case "plurals": {
        data.plurals.forEach(pluralpair => {
          if (pluralpair.item instanceof Object) {
            values[`${pluralpair['name']}.${pluralpair.item['quantity']}`] = pluralpair.item['$t'];
          } else {
            pluralpair.item.forEach(pluralitem => {
              values[`${pluralpair['name']}.${pluralitem['quantity']}`] = pluralitem['$t'];
            })
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

LANG_DIRS.forEach(dirname => {
  const lang_file_path = path.join(STRINGS_DIR, dirname, STRINGS_FILE);
  const lang_file = fs.readFileSync(lang_file_path, { encoding: 'utf-8' });
  const lang_values = PARSE_STRING_VALUES(xml2json.toJson(lang_file));
  const lang_name = PARSE_STRING_DIR(dirname);
  const dst_json_path = path.join(DEST_DIR, lang_name + '.json');

  const result = {};
  Object.keys(RULES).filter(key => !key.startsWith(RULE_COMMENT)).forEach(rule => {
    let value = substituteVariableData(RULES[rule], lang_values);
    result[rule] = value.split('"').join('');
  });
  fs.writeFileSync(dst_json_path, JSON.stringify(result), { encoding: 'utf-8' });
});