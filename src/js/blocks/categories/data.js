/**
 * @description data Catblocks bricks
 */

'use strict';

export default {
  "SetVariableBrick": {
    "message0": "%{BKY_DATA_SETVARIABLETOCAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "VARIABLE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeVariableBrick": {
    "message0": "%{BKY_DATA_CHANGEVARIABLEBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "VARIABLE_CHANGE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ShowTextBrick": {
    "message0": "%{BKY_DATA_SHOWVARIABLEAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "X_POSITION",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ShowTextColorSizeAlignmentBrick": {
    "message0": "%{BKY_DATA_SHOWVARIABLEATSIZECOLORALIGNED}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "X_POSITION",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "SIZE",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "COLOR",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "ALIGNMENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DeleteItemOfUserListBrick": {
    "message0": "%{BKY_DATA_DELETEITEMFROMLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "LIST_DELETE_ITEM",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "AddItemToUserListBrick": {
    "message0": "%{BKY_DATA_ADDTOLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "LIST_ADD_ITEM",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "InsertItemIntoUserListBrick": {
    "message0": "%{BKY_DATA_INSERTINTOLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "INSERT_ITEM_INTO_USERLIST_VALUE",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "INSERT_ITEM_INTO_USERLIST_INDEX",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ReplaceItemInUserListBrick": {
    "message0": "%{BKY_DATA_REPLACEITEMINLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "REPLACE_ITEM_IN_USERLIST_INDEX",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "REPLACE_ITEM_IN_USERLIST_VALUE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "HideTextBrick": {
    "message0": "%{BKY_DATA_HIDEVARIABLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ReadVariableFromDeviceBrick": {
    "message0": "%{BKY_DATA_READVARIABLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "WriteVariableOnDeviceBrick": {
    "message0": "%{BKY_DATA_WRITEVARIABLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  }
};