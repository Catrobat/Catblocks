/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
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

'use strict';

goog.provide('Blockly.Blocks.operators');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['PenDownBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PEN_PENDOWN,
      "category": Blockly.Categories.operators,
      "extensions": ["colours_pen", "shape_statement"]
    });
  }
};


Blockly.Blocks['PenUpBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PEN_PENUP,
      "category": Blockly.Categories.operators,
      "extensions": ["colours_pen", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetPenSizeBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PEN_SETPENSIZETO,
      "args0": [
        {
          "type": "field_number",
          "name": "PEN_SIZE",
          "value": 3.15
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_pen", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetPenColorBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PEN_SETPENCOLORTO,
      "args0": [
        {
          "type": "field_number",
          "name": "PEN_COLOR_RED",
          "value": 255
        },
        {
          "type": "field_number",
          "name": "PEN_COLOR_GREEN",
          "value": 255
        },
        {
          "type": "field_number",
          "name": "PEN_COLOR_BLUE",
          "value": 255
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_pen", "shape_statement"]
    });
  }
};

Blockly.Blocks['StampBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PEN_STAMP,
      "category": Blockly.Categories.operators,
      "extensions": ["colours_pen", "shape_statement"]
    });
  }
};

Blockly.Blocks['ClearBackgroundBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PEN_CLEAR,
      "category": Blockly.Categories.operators,
      "extensions": ["colours_pen", "shape_statement"]
    });
  }
};
