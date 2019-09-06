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

// rules file
const MAPPING_FILE = "/scratch-blocks-develop/i18n/catblocks/strings_to_json_mapping.json";
const MAPPING = loadRules(MAPPING_FILE);

// message file
const MESSAGE_PATH = "/scratch-blocks-develop/msg/catblocks_msgs.js";
const MESSAGE = loadPageSync(getUrl(MESSAGE_PATH));

// helper
function loadRules(filepath) {
  let rules = {};
  const all_rules = JSON.parse(loadPageSync(getUrl(filepath)));
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
    const locale = strfolder.replace('values-', '').replace('-', '_').replace('/', '').replace('_r', '_');
    console.log(`Check locale: ${locale} has generated .json file`);

    assertTrue(JSON_FILES.includes(`${locale}.json`));
  });
  console.log(`Check if message file ${MESSAGE_PATH} exists`)
  assertTrue(MESSAGE != undefined || MESSAGE != null);
};

/**
 * Check if each json file includes all keys from msg_json_rules.json
 */
function test_allRulesInJSON() {
  JSON_FILES.forEach(testfile => {
    if (testfile.match(/.json$/)) {
      console.log(`Check file ${testfile} if all rules got generated`);
      const test = loadRules(`${JSON_FOLDER_PATH}${testfile}`);

      assertTrue(JSON.stringify(Object.keys(MAPPING).sort()) === JSON.stringify(Object.keys(test).sort()));
    }
  });
};

/**
 * Check if Blockly.ScratchMsgs object has loaded all locations properly
 */
function test_blocklyLoadedLocations() {
  injectTestWorkspace();
  JSON_FILES.forEach(jsonfile => {
    if (jsonfile.match(/.json$/)) {
      const lang = jsonfile.replace('.json', '');
      console.log(`Check if lang ${lang} loaded into Blockly object`);
      
      assertTrue(Blockly.ScratchMsgs.locales[lang] !== null);
    }
  });
}