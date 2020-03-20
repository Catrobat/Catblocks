/**
 * @description looks Catblocks bricks
 */

'use strict';

export default {
  "SetLookBrick": {
    "message0": "%{BKY_LOOKS_SWITCHTOLOOK}",
    "args0": [
      {
        "type": "field_input",
        "name": "look",
        "text": "newLook"
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetLookByIndexBrick": {
    "message0": "%{BKY_LOOKS_SWITCHTOLOOKWITHNUMBER}",
    "args0": [
      {
        "type": "field_number",
        "name": "LOOK_INDEX",
        "value": 1
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "NextLookBrick": {
    "message0": "%{BKY_LOOKS_NEXTLOOK}",
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "PreviousLookBrick": {
    "message0": "%{BKY_LOOKS_PREVIOUSLOOK}",
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetSizeToBrick": {
    "message0": "%{BKY_LOOKS_SETSIZETO}",
    "args0": [
      {
        "type": "field_number",
        "name": "SIZE",
        "value": 60
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "HideBrick": {
    "message0": "%{BKY_LOOKS_HIDE}",
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ShowBrick": {
    "message0": "%{BKY_LOOKS_SHOW}",
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "AskBrick": {
    "message0": "%{BKY_LOOKS_ASKANDSTOREWRITTENANSWERIN}",
    "args0": [
      {
        "type": "field_input",
        "name": "ASK_QUESTION",
        "text": "What\"s your name?"
      },
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SayBubbleBrick": {
    "message0": "%{BKY_LOOKS_SAY_CAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "SAY_BRICK",
        "text": "Hello!"
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SayForBubbleBrick": {
    "message0": "%{BKY_LOOKS_SAYFORSECOND}",
    "args0": [
      {
        "type": "field_input",
        "name": "STRING",
        "text": "Hello!"
      },
      {
        "type": "field_number",
        "name": "DURATION_IN_SECONDS",
        "value": 1
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ThinkBubbleBrick": {
    "message0": "%{BKY_LOOKS_THINK_CAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "THINK_BRICK",
        "text": "Hmmmm!"
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ThinkForBubbleBrick": {
    "message0": "%{BKY_LOOKS_THINKFORSECONDS}",
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
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetTransparencyBrick": {
    "message0": "%{BKY_LOOKS_SETTRANSPARENCYTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "TRANSPARENCY",
        "value": 50
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ChangeSizeByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGESIZEBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "SIZE_CHANGE",
        "value": 10
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ChangeTransparencyByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGETRANSPARENCYBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "TRANSPARENCY_CHANGE",
        "value": 10
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetBrightnessBrick": {
    "message0": "%{BKY_LOOKS_SETBRIGHTHNESSTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "BRIGHTNESS",
        "value": 20
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ChangeBrightnessByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGEBRIGHTHNESSBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "BRIGHTNESS_CHANGE",
        "value": 50
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetColorBrick": {
    "message0": "%{BKY_LOOKS_SETCOLORTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "COLOR",
        "value": 0
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ChangeColorByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGECOLORBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "COLOR_CHANGE",
        "value": 0
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ClearGraphicEffectBrick": {
    "message0": "%{BKY_LOOKS_CLEARGRAPHICEFFECTS_CAT}",
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetBackgroundBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUND}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetBackgroundByIndexBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBER}",
    "args0": [
      {
        "type": "field_number",
        "name": "LOOK_INDEX",
        "value": 1
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetBackgroundAndWaitBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDANDWAIT}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "SetBackgroundByIndexAndWaitBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBERANDWAIT}",
    "args0": [
      {
        "type": "field_number",
        "name": "LOOK_INDEX",
        "value": 10
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "CameraBrick": {
    "message0": "%{BKY_LOOKS_TURNCAMERA}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["on", "ON"]
        ]
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "ChooseCameraBrick": {
    "message0": "%{BKY_LOOKS_USECAMERA}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["front", "FRONT"]
        ]
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  },
  "FlashBrick": {
    "message0": "%{BKY_LOOKS_TURNFLASHLIGHT}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["on", "ON"]
        ]
      }
    ],
    "category": "looks",
    "extensions": ["colours_looks", "shape_statement"]
  }
};