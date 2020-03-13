/**
 * @description arduino Catblocks bricks
 */

'use sttrict';

export default {
  "SetVariableBrick": {
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
  },
  "ChangeVariableBrick": {
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
  },
  "ShowTextBrick": {
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
  },
  "ShowTextColorSizeAlignmentBrick": {
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
  },
  "DeleteItemOfUserListBrick": {
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
  },
  "AddItemToUserListBrick": {
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
  },
  "InsertItemIntoUserListBrick": {
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
  },
  "ReplaceItemInUserListBrick": {
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
  },
  "HideTextBrick": {
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
  },
  "ReadVariableFromDeviceBrick": {
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
  },
  "WriteVariableOnDeviceBrick": {
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
  }
};