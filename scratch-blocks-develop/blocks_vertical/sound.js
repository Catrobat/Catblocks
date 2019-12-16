/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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

goog.provide('Blockly.Blocks.sound');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['PlaySoundBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_STARTSOUND,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['PlaySoundAndWaitBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_STARTSOUNDANDWAIT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['StopAllSoundsBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_STOPALLSOUNDS,
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetVolumeToBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_SETVOLUMETO,
      "args0": [
        {
          "type": "field_number",
          "name": "VOLUME",
          "value": 60
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeVolumeByNBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_CHANGEVOLUMEBY,
      "args0": [
        {
          "type": "field_number",
          "name": "VOLUME_CHANGE",
          "value": -10
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['SpeakBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_SPEAK,
      "args0": [
        {
          "type": "field_input",
          "name": "SPEAK",
          "text": "Hello!"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['SpeakAndWaitBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_SPEAKANDWAIT,
      "args0": [
        {
          "type": "field_input",
          "name": "SPEAK",
          "text": "Hello!"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['AskSpeechBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_ASKANDSTORESPOKENANSWERIN,
      "args0": [
        {
          "type": "field_input",
          "name": "ASK_SPEECH_QUESTION",
          "text": "What's your name?"
        },
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["VARIABLE"]
          ]
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};
