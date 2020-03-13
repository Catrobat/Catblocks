/**
 * @description phiro Catblocks bricks
 */

'use strict';

export default {
  "PhiroMotorMoveForwardBrick": {
    "message0": "%{BKY_PHIRO_MOTORMOVEFORWARD}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Left", "Right"]
        ]
      },
      {
        "type": "field_number",
        "name": "SPEED",
        "value": 100
      }
    ],
    "category": "phiro",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "PhiroMotorMoveBackwardBrick": {
    "message0": "%{BKY_PHIRO_MOTORMOVEBACKWARD}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Left", "Right"]
        ]
      },
      {
        "type": "field_number",
        "name": "SPEED",
        "value": 100
      }
    ],
    "category": "phiro",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "PhiroMotorStopBrick": {
    "message0": "%{BKY_PHIRO_MOTORSTOP}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Left", "Right"]
        ]
      }
    ],
    "category": "phiro",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "PhiroPlayToneBrick": {
    "message0": "%{BKY_PHIRO_PLAYTONE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Do", "Re"]
        ]
      },
      {
        "type": "field_number",
        "name": "DURATION",
        "value": 1
      }
    ],
    "category": "phiro",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "PhiroRGBLightBrick": {
    "message0": "%{BKY_PHIRO_RGBLIGHT}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Left", "Right", "Both"]
        ]
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
    ],
    "category": "phiro",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "PhiroIfLogicBeginBrick": {
    "type": "IfThenLogicBeginBrick",
    "message0": "%{BKY_PHIRO_IFLOGICBEGINIF}",
    "message1": "%1",
    "message2": "%{BKY_PHIRO_IFLOGICBEGINELSE}",
    "message3": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Front Left Sensor", "Front Right Sensor", "Side Left Sensor"]
        ]
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
    ],
    "category": "phiro",
    "extensions": ["colours_arduino", "shape_statement"]
  }
};