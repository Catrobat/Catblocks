/**
 * @description pen Catblocks bricks
 */

'use strict';

export default {
  "PenDownBrick": {
    "message0": "%{BKY_PEN_PENDOWN}"
  },
  "PenUpBrick": {
    "message0": "%{BKY_PEN_PENUP}"
  },
  "SetPenSizeBrick": {
    "message0": "%{BKY_PEN_SETPENSIZETO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PEN_SIZE",
        "text": "unset"
      }
    ]
  },
  "SetPenColorBrick": {
    "message0": "%{BKY_PEN_SETPENCOLORTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PEN_COLOR_RED",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PEN_COLOR_GREEN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PEN_COLOR_BLUE",
        "text": "unset"
      }
    ]
  },
  "StampBrick": {
    "message0": "%{BKY_PEN_STAMP}"
  },
  "ClearBackgroundBrick": {
    "message0": "%{BKY_PEN_CLEAR}"
  }
};