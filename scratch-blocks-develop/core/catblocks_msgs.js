/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
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
 * @fileoverview Catblocks Messages singleton, with function to override Blockly.Msg values.
 * @extends ScratchMsgs https://github.com/LLK/scratch-blocks
 * @author andreas.karner@student.tugraz.at (Andreas Karner)
 */
'use strict';

/**
 * Name space for the CatblcocksMsgs singleton.
 * Msg gets populated in the message files.
 */
goog.provide('Blockly.CatblocksMsgs');

goog.require('Blockly.Msg');


/**
 * The object containing messages for all locales - loaded from msg/scratch_msgs.
 * @type {Object}
 */
Blockly.CatblocksMsgs.locales = {};

/**
 * The current locale, default location
 * @type {String}
 * @private
 */
Blockly.CatblocksMsgs.currentLocale_ = 'en_GB';

/**
 * Helper function to check if CatblocksMsgs knows the requested locale
 * @param {string} locale E.g., 'en_GB', 'de_AT'
 * @return {boolean} true if location exists
 * @public
 */
Blockly.CatblocksMsgs.hasLocale = function(locale) {
  return Object.keys(Blockly.CatblocksMsgs.locales).includes(locale);
};

/**
 * Change the Blockly.Msg strings to a new Locale
 * Does not exist in Blockly, but needed in scratch-blocks
 * @param {string} locale E.g., 'de', or 'zh-tw'
 * @public
 */
Blockly.CatblocksMsgs.setLocale = function(locale) {
  if (Blockly.CatblocksMsgs.hasLocale(locale)) {
    Blockly.CatblocksMsgs.currentLocale_ = locale;
    Blockly.Msg = Object.assign({}, Blockly.Msg, Blockly.CatblocksMsgs.locales[locale]);
  } else {
    // keep current locale
    console.warn('Ignoring unrecognized locale: ' + locale);
  }
};

/**
 * Helper function to reload current locale to CatblocksMsgs
 * This function is mainly used for the init bootstrap process
 * @public
 */
Blockly.CatblocksMsgs.reloadCurrentLocale = function() {
  Blockly.CatblocksMsgs.setLocale(Blockly.CatblocksMsgs.currentLocale_);
};
