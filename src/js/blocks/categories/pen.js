/**
 * @description pen Catblocks bricks
 */

'use strict';

export default {
  "PenDownBrick": {
    "message0": "%{BKY_PEN_PENDOWN}",
    "category": "operators",
    "extensions": ["colours_pen", "shape_statement"]
  },
  "PenUpBrick": {
    "message0": "%{BKY_PEN_PENUP}",
    "category": "operators",
    "extensions": ["colours_pen", "shape_statement"]
  },
  "SetPenSizeBrick": {
    "message0": "%{BKY_PEN_SETPENSIZETO}",
    "args0": [
      {
        "type": "field_number",
        "name": "PEN_SIZE",
        "value": 3.15
      }
    ],
    "category": "motion",
    "extensions": ["colours_pen", "shape_statement"]
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
    ],
    "category": "motion",
    "extensions": ["colours_pen", "shape_statement"]
  },
  "StampBrick": {
    "message0": "%{BKY_PEN_STAMP}",
    "category": "operators",
    "extensions": ["colours_pen", "shape_statement"]
  },
  "ClearBackgroundBrick": {
    "message0": "%{BKY_PEN_CLEAR}",
    "category": "operators",
    "extensions": ["colours_pen", "shape_statement"]
  }
};