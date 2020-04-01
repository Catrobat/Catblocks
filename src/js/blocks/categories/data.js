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
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "VARIABLE",
        "text": "unset"
      }
    ]
  },
  "ChangeVariableBrick": {
    "message0": "%{BKY_DATA_CHANGEVARIABLEBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "VARIABLE_CHANGE",
        "text": "unset"
      }
    ]
  },
  "ShowTextBrick": {
    "message0": "%{BKY_DATA_SHOWVARIABLEAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "X_POSITION",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "unset"
      }
    ]
  },
  "ShowTextColorSizeAlignmentBrick": {
    "message0": "%{BKY_DATA_SHOWVARIABLEATSIZECOLORALIGNED}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "X_POSITION",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "SIZE",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "COLOR",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "ALIGNMENT",
        "text": "unset"
      }
    ]
  },
  "DeleteItemOfUserListBrick": {
    "message0": "%{BKY_DATA_DELETEITEMFROMLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "LIST_DELETE_ITEM",
        "text": "unset"
      }
    ]
  },
  "AddItemToUserListBrick": {
    "message0": "%{BKY_DATA_ADDTOLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "LIST_ADD_ITEM",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      }
    ]
  },
  "InsertItemIntoUserListBrick": {
    "message0": "%{BKY_DATA_INSERTINTOLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "INSERT_ITEM_INTO_USERLIST_VALUE",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "INSERT_ITEM_INTO_USERLIST_INDEX",
        "text": "unset"
      }
    ]
  },
  "ReplaceItemInUserListBrick": {
    "message0": "%{BKY_DATA_REPLACEITEMINLIST}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "REPLACE_ITEM_IN_USERLIST_INDEX",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "REPLACE_ITEM_IN_USERLIST_VALUE",
        "text": "unset"
      }
    ]
  },
  "HideTextBrick": {
    "message0": "%{BKY_DATA_HIDEVARIABLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      }
    ]
  },
  "ReadVariableFromDeviceBrick": {
    "message0": "%{BKY_DATA_READVARIABLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      }
    ]
  },
  "WriteVariableOnDeviceBrick": {
    "message0": "%{BKY_DATA_WRITEVARIABLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      }
    ]
  }
};