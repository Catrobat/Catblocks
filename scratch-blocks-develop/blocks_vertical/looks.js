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

goog.provide('Blockly.Blocks.looks');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['SetLookBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SWITCHTOLOOK,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetLookByIndexBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SWITCHTOLOOKWITHNUMBER,
      "args0": [
        {
          "type": "field_number",
          "name": "LOOK_INDEX",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['NextLookBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_NEXTLOOK,
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['PreviousLookBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_PREVIOUSLOOK,
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetSizeToBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETSIZETO,
      "args0": [
        {
          "type": "field_number",
          "name": "SIZE",
          "value": 60
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['HideBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_HIDE,
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ShowBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SHOW,
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['AskBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_ASKANDSTOREWRITTENANSWERIN,
      "args0": [
        {
          "type": "field_input",
          "name": "ASK_QUESTION",
          "text": "What's your name?"
        },
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SayBubbleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SAY_CAT,
      "args0": [
        {
          "type": "field_input",
          "name": "SAY_BRICK",
          "text": "Hello!"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SayForBubbleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SAYFORSECOND,
      "args0": [
        {
          "type": "field_input",
          "name": "SAY_BRICK",
          "text": "Hello!"
        },
        {
          "type": "field_number",
          "name": "DURATION_IN_SECONDS",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ThinkBubbleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_THINK_CAT,
      "args0": [
        {
          "type": "field_input",
          "name": "THINK_BRICK",
          "text": "Hmmmm!"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ThinkForBubbleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_THINKFORSECONDS,
      "args0": [
        {
          "type": "field_input",
          "name": "THINK_BRICK",
          "text": "Hmmmm!"
        },
        {
          "type": "field_number",
          "name": "DURATION_IN_SECONDS",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetTransparencyBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETTRANSPARENCYTO,
      "args0": [
        {
          "type": "field_number",
          "name": "TRANSPARENCY",
          "value": 50
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeSizeByNBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_CHANGESIZEBY,
      "args0": [
        {
          "type": "field_number",
          "name": "SIZE_CHANGE",
          "value": 10
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeTransparencyByNBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_CHANGETRANSPARENCYBY,
      "args0": [
        {
          "type": "field_number",
          "name": "TRANSPARENCY_CHANGE",
          "value": 10
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBrightnessBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETBRIGHTHNESSTO,
      "args0": [
        {
          "type": "field_number",
          "name": "BRIGHTNESS",
          "value": 20
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeBrightnessByNBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_CHANGEBRIGHTHNESSBY,
      "args0": [
        {
          "type": "field_number",
          "name": "BRIGHTNESS_CHANGE",
          "value": 50
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetColorBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETCOLORTO,
      "args0": [
        {
          "type": "field_number",
          "name": "COLOR",
          "value": 0
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeColorByNBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_CHANGECOLORBY,
      "args0": [
        {
          "type": "field_number",
          "name": "COLOR_CHANGE",
          "value": 0
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ClearGraphicEffectBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_CLEARGRAPHICEFFECTS_CAT,
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETBACKGROUND,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundByIndexBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETBACKGROUNDTONUMBER,
      "args0": [
        {
          "type": "field_number",
          "name": "LOOK_INDEX",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundAndWaitBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETBACKGROUNDANDWAIT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundByIndexAndWaitBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_SETBACKGROUNDTONUMBERANDWAIT,
      "args0": [
        {
          "type": "field_number",
          "name": "LOOK_INDEX",
          "value": 10
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['CameraBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_TURNCAMERA,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["on", "ON"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChooseCameraBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_USECAMERA,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["front", "FRONT"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['FlashBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LOOKS_TURNFLASHLIGHT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["on", "ON"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};
