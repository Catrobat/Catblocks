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

goog.provide('Blockly.Blocks.control');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['ForeverBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "ForeverBrick",
      "message0": Blockly.Msg.CONTROL_FOREVER,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['WaitBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "WaitBrick",
      "message0": Blockly.Msg.CONTROL_WAIT,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1",
          "value": 1
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['NoteBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "NoteBrick",
      "message0": Blockly.Msg.CONTROL_NOTE,
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "Add comment here..."
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['IfThenLogicBeginBrick'] = {
  init: function() {
    this.jsonInit({
      "type": "IfThenLogicBeginBrick",
      "message0": Blockly.Msg.CONTROL_IFISTRUEELSEIF,
      "message1": "%1",
      "message2": Blockly.Msg.CONTROL_IFISTRUEELSEELSE,
      "message3": "%1",
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "1 < 2"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args3": [
        {
          "type": "input_statement",
          "name": "SUBSTACK2"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['IfLogicBeginBrick'] = {
  init: function() {
    this.jsonInit({
      "type": "IfLogicBeginBrick",
      "message0": Blockly.Msg.CONTROL_IFISTRUEELSEIF,
      "message1": "%1", // Statement
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "1 < 2"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['WaitUntilBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_WAITUNTILTRUE,
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "1 < 2"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['RepeatBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "RepeatBrick",
      "message0": Blockly.Msg.CONTROL_REPEATTIMES,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "1 < 2"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['RepeatUntilBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "RepeatUntilBrick",
      "message0": Blockly.Msg.CONTROL_REPEATUNTILISTRUE,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "1 < 2"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['SceneTransitionBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "SceneTransitionBrick",
      "message0": Blockly.Msg.CONTROL_CONTINUESCENE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['SceneStartBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "SceneStartBrick",
      "message0": Blockly.Msg.CONTROL_STARTSCENE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['StopScriptBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "StopScriptBrick",
      "message0": Blockly.Msg.CONTROL_STOPCAT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['CloneBrick'] = {
  init: function() {
    this.jsonInit({
      "id": "CloneBrick",
      "message0": Blockly.Msg.CONTROL_CREATECLONEOFCAT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['DeleteThisCloneBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_DELETETHISCLONE,
      "args0": [
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['WhenClonedScript'] = {
  init: function() {
    this.jsonInit({
      "id": "WhenClonedScript",
      "message0": Blockly.Msg.CONTROL_WHENYOUSTARTASACLONE,
      "args0": [
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_hat"]
    });
  }
};
