/**
 * @license
 * Message Tests
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

// string folder with catroid languages
const STRINGS_FOLDER_PATH = "/scratch-blocks-develop/msg/catroid_strings/";
const STRING_FILES = listDir(getUrl(STRINGS_FOLDER_PATH), true);

// json folder
const JSON_FOLDER_PATH = "/scratch-blocks-develop/msg/json/";
const JSON_FILES = listDir(getUrl(JSON_FOLDER_PATH), true);

// js folder
const JS_FOLDER_PATH = "/scratch-blocks-develop/msg/js/";
const JS_FILES = listDir(getUrl(JS_FOLDER_PATH), true);

// rules file
const RULES_FILE_PATH = "/scratch-blocks-develop/i18n/catblocks/msg_json_rules.json";
const RULES = loadRules(RULES_FILE_PATH);

// message file
const MESSAGE_PATH = "/scratch-blocks-develop/msg/catblocks_msgs.js";
const MESSAGE = loadPageSync(MESSAGE_PATH);

// helper
function loadRules(filepath) {
  let rules = {};
  const all_rules = JSON.parse(loadPageSync(filepath));
  Object.keys(all_rules).forEach(key => {
    if (!key.startsWith("@")) {
      rules[key] = all_rules[key];
    }
  });
  return rules;
};


/**
 * Check if for each catroid string folder has generated a .js and .json file exists
 */
function test_messageFilesGenerated() {
  STRING_FILES.forEach(strfolder => {
    const locale = strfolder.replace('values-', '').replace('-', '_').replace('/', '');
    console.log(`Check locale: ${locale} has generated .js and .json file`);
    // console.log("JSON exists:");
    assertTrue(JSON_FILES.includes(`${locale}.json`));
    // console.log("JS exists:");
    assertTrue(JS_FILES.includes(`${locale}.js`));
  });
};

/**
 * Check if each json file includes all keys from msg_json_rules.json
 */
function test_allRulesInJSON() {
  JSON_FILES.forEach(testfile => {
    if (testfile.match(/.json$/)) {
      console.log(`Check file ${testfile} if all rules got generated`);
      const test = loadRules(`${JSON_FOLDER_PATH}${testfile}`);
      assertTrue(JSON.stringify(Object.keys(RULES).sort()) === JSON.stringify(Object.keys(test).sort()));
    }
  });
};

/**
 * Check if each js file includes all keys from msg_json_rules.json
 */
function test_allRulesInJS() {
  JS_FILES.forEach(testfile => {
    if (testfile.match(/.js$/)) {
      console.log(`Check file ${testfile} if all rules got generated`);
      const test = loadPageSync(`${JS_FOLDER_PATH}${testfile}`).split('\n').join(' ').split('\r').join(' ');
      Object.keys(RULES).forEach(rule => {
        assertTrue(test.indexOf(rule) > -1);
      })
    }
  });
};

/**
 * Check if all js files are included in the final catblocks_msgs.js file
 */
function test_messageImports() {
  const message_lines = MESSAGE.split('\n');
  JS_FILES.forEach(jsfile => {
    console.log(`Check if imports are fine for ${jsfile}`);
    const name = jsfile.split('.')[0];
    assertTrue(message_lines.includes(`import ${name} from './js/${name}.js'`));
    assertTrue(message_lines.includes(`Blockly.ScratchMsgs.locales[\"${name}\"] = ${name};`));
  });
};