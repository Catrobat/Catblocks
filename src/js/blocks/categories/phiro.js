/**
 * @description phiro Catblocks bricks
 */

'use strict';

export default {
  "PhiroMotorMoveForwardBrick": {
    "message0": "%{BKY_PHIRO_MOTORMOVEFORWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHIRO_SPEED",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PhiroMotorMoveBackwardBrick": {
    "message0": "%{BKY_PHIRO_MOTORMOVEBACKWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHIRO_SPEED",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PhiroMotorStopBrick": {
    "message0": "%{BKY_PHIRO_MOTORSTOP}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PhiroPlayToneBrick": {
    "message0": "%{BKY_PHIRO_PLAYTONE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHIRO_DURATION_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PhiroRGBLightBrick": {
    "message0": "%{BKY_PHIRO_RGBLIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHIRO_LIGHT_RED",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHIRO_LIGHT_GREEN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHIRO_LIGHT_BLUE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PhiroIfLogicBeginBrick": {
    "type": "IfThenLogicBeginBrick",
    "message0": "%{BKY_PHIRO_IFLOGICBEGINIF}",
    "message1": "%1",
    "message2": "%{BKY_PHIRO_IFLOGICBEGINELSE}",
    "message3": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "SUBSTACK"
      }
    ],
    "args3": [
      {
        "type": "input_statement",
        "name": "SUBSTACK2"
      }
    ]
  }
};