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
 * Change the Blockly.Msg strings to a new Locale
 * Does not exist in Blockly, but needed in scratch-blocks
 * @param {string} locale E.g., 'de', or 'zh-tw'
 * @package
 */
Blockly.CatblocksMsgs.setLocale = function(locale) {
  if (Object.keys(Blockly.CatblocksMsgs.locales).includes(locale)) {
    Blockly.CatblocksMsgs.currentLocale_ = locale;
    Blockly.Msg = Object.assign({}, Blockly.Msg, Blockly.CatblocksMsgs.locales[locale]);
  } else {
    // keep current locale
    console.warn('Ignoring unrecognized locale: ' + locale);
  }
};