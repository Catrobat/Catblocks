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
    ]
  },
  "SetLookByIndexBrick": {
    "message0": "%{BKY_LOOKS_SWITCHTOLOOKWITHNUMBER}",
    "args0": [
      {
        "type": "field_number",
        "name": "LOOK_INDEX",
        "value": 1
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
        "type": "field_number",
        "name": "SIZE",
        "value": 60
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
        "text": "What\"s your name?"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "SayBubbleBrick": {
    "message0": "%{BKY_LOOKS_SAY_CAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "SAY_BRICK",
        "text": "Hello!"
      }
    ]
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
    ]
  },
  "ThinkBubbleBrick": {
    "message0": "%{BKY_LOOKS_THINK_CAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "THINK_BRICK",
        "text": "Hmmmm!"
      }
    ]
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
    ]
  },
  "SetTransparencyBrick": {
    "message0": "%{BKY_LOOKS_SETTRANSPARENCYTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "TRANSPARENCY",
        "value": 50
      }
    ]
  },
  "ChangeSizeByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGESIZEBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "SIZE_CHANGE",
        "value": 10
      }
    ]
  },
  "ChangeTransparencyByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGETRANSPARENCYBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "TRANSPARENCY_CHANGE",
        "value": 10
      }
    ]
  },
  "SetBrightnessBrick": {
    "message0": "%{BKY_LOOKS_SETBRIGHTHNESSTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "BRIGHTNESS",
        "value": 20
      }
    ]
  },
  "ChangeBrightnessByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGEBRIGHTHNESSBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "BRIGHTNESS_CHANGE",
        "value": 50
      }
    ]
  },
  "SetColorBrick": {
    "message0": "%{BKY_LOOKS_SETCOLORTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "COLOR",
        "value": 0
      }
    ]
  },
  "ChangeColorByNBrick": {
    "message0": "%{BKY_LOOKS_CHANGECOLORBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "COLOR_CHANGE",
        "value": 0
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
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "SetBackgroundByIndexBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBER}",
    "args0": [
      {
        "type": "field_number",
        "name": "LOOK_INDEX",
        "value": 1
      }
    ]
  },
  "SetBackgroundAndWaitBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "SetBackgroundByIndexAndWaitBrick": {
    "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBERANDWAIT}",
    "args0": [
      {
        "type": "field_number",
        "name": "LOOK_INDEX",
        "value": 10
      }
    ]
  },
  "CameraBrick": {
    "message0": "%{BKY_LOOKS_TURNCAMERA}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "ChooseCameraBrick": {
    "message0": "%{BKY_LOOKS_USECAMERA}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "FlashBrick": {
    "message0": "%{BKY_LOOKS_TURNFLASHLIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  }
};