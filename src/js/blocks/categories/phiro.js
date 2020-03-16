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
        "text": "new"
      },
      {
        "type": "field_number",
        "name": "SPEED",
        "value": 100
      }
    ]
  },
  "PhiroMotorMoveBackwardBrick": {
    "message0": "%{BKY_PHIRO_MOTORMOVEBACKWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      },
      {
        "type": "field_number",
        "name": "SPEED",
        "value": 100
      }
    ]
  },
  "PhiroMotorStopBrick": {
    "message0": "%{BKY_PHIRO_MOTORSTOP}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "PhiroPlayToneBrick": {
    "message0": "%{BKY_PHIRO_PLAYTONE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      },
      {
        "type": "field_number",
        "name": "DURATION",
        "value": 1
      }
    ]
  },
  "PhiroRGBLightBrick": {
    "message0": "%{BKY_PHIRO_RGBLIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      },
      {
        "type": "field_number",
        "name": "RED",
        "value": 0
      },
      {
        "type": "field_number",
        "name": "GREEN",
        "value": 255
      },
      {
        "type": "field_number",
        "name": "BLUE",
        "value": 255
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
        "text": "new"
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