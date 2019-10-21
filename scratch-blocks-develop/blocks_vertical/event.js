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

goog.provide('Blockly.Blocks.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

//Cat Blocks
Blockly.Blocks['StartScript'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENSCENESTARTS,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['WhenScript'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENTAPPED,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"],
      "args0": [],
    });
  }
};

Blockly.Blocks['WhenTouchDownScript'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENSTAGEISTAPPED,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['BroadcastScript'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENYOURECEIVE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};


Blockly.Blocks['BroadcastBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_BROADCAST_CB,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_statement"]
    });
  }
};


Blockly.Blocks['BroadcastWaitBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_BROADCASTANDWAIT_CB,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_statement"]
    });
  }
};



Blockly.Blocks['WhenConditionScript'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENBECOMESTRUE,
      "args0": [
        {
          "type": "field_input",
          "name": "IF_CONDITION",
          "text": "1 < 2"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['WhenBounceOffScript'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENYOUBOUNCEOFF,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["any edge, actor, or object", "EDGE"]
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['WhenBackgroundChangesScript'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENBACKGROUNDCHANGES,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};
