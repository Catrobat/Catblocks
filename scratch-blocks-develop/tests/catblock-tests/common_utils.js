/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
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

/**
 * @fileoverview Common test utils for Catblocks unit tests
 * @author andreas.karner@student.tugraz.at (akarner)
 */

'use strict';

/**
 * Return boolean if variable is from string type
 * @param {*} variable to validate if is string
 * @return {Boolean}
 */
const isString = variable => {
  return (typeof variable === 'string' || variable instanceof String);
};

/**
 * Return if value is valid string
 * @param {*} value to validate if not empty string
 * @return {Boolean}
 */
const hasStringValue = value => {
  if(!isString(value)) return false;
  else return (value != "" && value.length > 0);
};

/**
 * Load resource sync, needed for google test runner
 * @param {*} url to load sync mode
 * @return {string}
 */
const loadPageSync = url => {
  assertTrue(hasStringValue(url));

  var req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  if (req.status == 200) {
    return req.responseText;
  }
};

/**
 * Load json language file
 * @param {string} langName to load from catblocks
 * @return {Object} json parsed
 */
const loadLanguagePack = langName => {
  assertTrue(hasStringValue(langName));
  return JSON.parse(loadPageSync(`../../../msg/json/${langName}.json`))
}