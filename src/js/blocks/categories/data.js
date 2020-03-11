import Blockly from "scratch-blocks";

Blockly.Blocks['SetVariableBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_SETVARIABLETOCAT}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_input",
          "name": "VARIABLE",
          "text": "Some Value"
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeVariableBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_CHANGEVARIABLEBY}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_input",
          "name": "VARIABLE_CHANGE",
          "text": "Some new Value"
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ShowTextBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_SHOWVARIABLEAT}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "X_POSITION",
          "value": 10
        },
        {
          "type": "field_number",
          "name": "Y_POSITION",
          "value": 50
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};


Blockly.Blocks['ShowTextColorSizeAlignmentBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_SHOWVARIABLEATSIZECOLORALIGNED}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "X_POSITION",
          "value": 20
        },
        {
          "type": "field_number",
          "name": "Y_POSITION",
          "value": 20
        },
        {
          "type": "field_number",
          "name": "SIZE",
          "value": 100
        },
        {
          "type": "field_number",
          "name": "COLOR",
          "value": 240
        },
        {
          "type": "field_dropdown",
          "name": "DROPDOWN2",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};


Blockly.Blocks['DeleteItemOfUserListBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_DELETEITEMFROMLIST}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "LIST_DELETE_ITEM",
          "value": 1
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};


Blockly.Blocks['AddItemToUserListBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_ADDTOLIST}",
      "args0": [
        {
          "type": "field_input",
          "name": "LIST_ADD_ITEM",
          "text": "name"
        },
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['InsertItemIntoUserListBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_INSERTINTOLIST}",
      "args0": [
        {
          "type": "field_input",
          "name": "INSERT_ITEM_INTO_USERLIST_VALUE",
          "text": "name"
        },
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "INSERT_ITEM_INTO_USERLIST_INDEX",
          "value": 1
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ReplaceItemInUserListBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_REPLACEITEMINLIST}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        },
        {
          "type": "field_number",
          "name": "INSERT_ITEM_INTO_USERLIST_INDEX",
          "value": 0
        },
        {
          "type": "field_input",
          "name": "INSERT_ITEM_INTO_USERLIST_VALUE",
          "text": "new Value"
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['HideTextBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_HIDEVARIABLE}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['ReadVariableFromDeviceBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_READVARIABLE}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};

Blockly.Blocks['WriteVariableOnDeviceBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_DATA_WRITEVARIABLE}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": "operators",
      "extensions": ["colours_data", "shape_statement"]
    });
  }
};
