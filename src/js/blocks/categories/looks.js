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
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetLookByIndexBrick": {
    "message0": "%{BKY_LOOKS_SWITCHTOLOOKWITHNUMBER}",
    "args0": [
      {
        "type": "field_input",
        "name": "LOOK_INDEX",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "NextLookBrick": {
    "message0": "%{BKY_LOOKS_NEXTLOOK}"
  },
  "PreviousLookBrick": {
    "message0": "%{BKY_LOOKS_PREVIOUSLOOK}"
  },
  "SetSizeToBrick": {
    "message0": "%{BKY_LOOKS_SETSIZETO}",
    "args0": [
      {
        "type": "field_input",
        "name": "SIZE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "HideBrick": {
    "message0": "%{BKY_LOOKS_HIDE}"
  },
  "ShowBrick": {
    "message0": "%{BKY_LOOKS_SHOW}"
  },
  "AskBrick": {
    "message0": "%{BKY_LOOKS_ASKANDSTOREWRITTENANSWERIN}",
    "args0": [
      {
        "type": "field_input",
        "name": "ASK_QUESTION",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SayBubbleBrick": {
    "message0": "%{BKY_LOOKS_SAY_CAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "STRING",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SayForBubbleBrick": {
    "message0": "%{BKY_LOOKS_SAYFORSECOND}",
    "args0": [
      {
        "type": "field_input",
        "name": "STRING",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DURATION_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ThinkBubbleBrick": {
    "message0": "%{BKY_LOOKS_THINK_CAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "STRING",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ThinkForBubbleBrick": {
    "message0": "%{BKY_LOOKS_THINKFORSECONDS}",
    "args0": [
      {
        "type": "field_input",
        "name": "STRING",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DURATION_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetTransparencyBrick": {
    "message0": "%{BKY_LOOKS_SETTRANSPARENCYTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "TRANSPARENCY",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeSizeByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGESIZEBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "SIZE_CHANGE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeTransparencyByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGETRANSPARENCYBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "TRANSPARENCY_CHANGE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetBrightnessBrick": {
    "message0": "%{BKY_LOOKS_SETBRIGHTHNESSTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "BRIGHTNESS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeBrightnessByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGEBRIGHTHNESSBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "BRIGHTNESS_CHANGE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetColorBrick": {
    "message0": "%{BKY_LOOKS_SETCOLORTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "COLOR",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeColorByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGECOLORBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "COLOR_CHANGE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ClearGraphicEffectBrick": {
    "message0": "%{BKY_LOOKS_CLEARGRAPHICEFFECTS_CAT}"
  },
  "SetBackgroundBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUND}",
    "args0": [
      {
        "type": "field_input",
        "name": "look",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetBackgroundByIndexBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBER}",
    "args0": [
      {
        "type": "field_input",
        "name": "LOOK_INDEX",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetBackgroundAndWaitBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "look",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetBackgroundByIndexAndWaitBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBERANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "LOOK_INDEX",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "CameraBrick": {
    "message0": "%{BKY_LOOKS_TURNCAMERA}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPINNER",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChooseCameraBrick": {
    "message0": "%{BKY_LOOKS_USECAMERA}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPINNER",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "FlashBrick": {
    "message0": "%{BKY_LOOKS_TURNFLASHLIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPINNER",
        "text": "DEFAULT_VALUE"
      }
    ]
  }
};
