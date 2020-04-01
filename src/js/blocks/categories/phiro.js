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
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHIRO_SPEED",
        "text": "unset"
      }
    ]
  },
  "PhiroMotorMoveBackwardBrick": {
    "message0": "%{BKY_PHIRO_MOTORMOVEBACKWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHIRO_SPEED",
        "text": "unset"
      }
    ]
  },
  "PhiroMotorStopBrick": {
    "message0": "%{BKY_PHIRO_MOTORSTOP}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      }
    ]
  },
  "PhiroPlayToneBrick": {
    "message0": "%{BKY_PHIRO_PLAYTONE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHIRO_DURATION_IN_SECONDS",
        "text": "unset"
      }
    ]
  },
  "PhiroRGBLightBrick": {
    "message0": "%{BKY_PHIRO_RGBLIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHIRO_LIGHT_RED",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHIRO_LIGHT_GREEN",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHIRO_LIGHT_BLUE",
        "text": "unset"
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
        "text": "unset"
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