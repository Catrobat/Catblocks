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

goog.provide('Blockly.Blocks.data');
goog.provide('Blockly.Constants.Data');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['SetVariableBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_SETVARIABLETOCAT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_input",
          "name": "ARG2",
          "text": "Some Value"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeVariableBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_CHANGEVARIABLEBY,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_input",
          "name": "ARG2",
          "text": "Some new Value"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ShowTextBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_SHOWVARIABLEAT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 10
        },
        {
          "type": "field_number",
          "name": "ARG3",
          "value": 50
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};


Blockly.Blocks['ShowTextColorSizeAlignmentBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_SHOWVARIABLEATSIZECOLORALIGNED,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 20
        },
        {
          "type": "field_number",
          "name": "ARG3",
          "value": 20
        },
        {
          "type": "field_number",
          "name": "ARG4",
          "value": 100
        },
        {
          "type": "field_number",
          "name": "ARG5",
          "value": 240
        },
        {
          "type": "field_dropdown",
          "name": "ARG6",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};


Blockly.Blocks['DeleteItemOfUserListBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_DELETEITEMFROMLIST,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 1
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};


Blockly.Blocks['AddItemToUserListBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_ADDTOLIST,
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "name"
        },
        {
          "type": "field_dropdown",
          "name": "ARG2",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['InsertItemIntoUserListBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_INSERTINTOLIST,
      "args0": [
        {
          "type": "field_input",
          "name": "ARG1",
          "text": "name"
        },
        {
          "type": "field_dropdown",
          "name": "ARG2",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG3",
          "value": 1
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ReplaceItemInUserListBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_REPLACEITEMINLIST,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 0
        },
        {
          "type": "field_input",
          "name": "ARG3",
          "text": "new Value"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['HideTextBrick'] = {
  /**
   * Block to read a variable from device
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_HIDEVARIABLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ReadVariableFromDeviceBrick'] = {
  /**
   * Block to hide a variable
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_READVARIABLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['WriteVariableOnDeviceBrick'] = {
  /**
   * Block to hide a variable
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.DATA_WRITEVARIABLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};
