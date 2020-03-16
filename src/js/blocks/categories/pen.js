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
        "type": "field_number",
        "name": "PEN_SIZE",
        "value": 3.15
      }
    ]
  },
  "SetPenColorBrick": {
    "message0": "%{BKY_PEN_SETPENCOLORTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "PEN_COLOR_RED",
        "value": 255
      },
      {
        "type": "field_number",
        "name": "PEN_COLOR_GREEN",
        "value": 255
      },
      {
        "type": "field_number",
        "name": "PEN_COLOR_BLUE",
        "value": 255
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