/**
 * @description legoEV3 Catblocks bricks
 */

'use strict';

export default {
  "LegoEv3MotorTurnAngleBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORTURNANGLE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["A", "B"]
        ]
      },
      {
        "type": "field_number",
        "name": "VARIABLE",
        "text": "180"
      }
    ],
    "category": "legoEV3",
    "extensions": ["colours_legoEV3", "shape_statement"]
  },
  "LegoEv3MotorMoveBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORMOVE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["A", "B"]
        ]
      },
      {
        "type": "field_number",
        "name": "VARIABLE",
        "text": "100"
      }
    ],
    "category": "legoEV3",
    "extensions": ["colours_legoEV3", "shape_statement"]
  },
  "LegoEv3MotorStopBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORSTOP}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["A", "B"]
        ]
      }
    ],
    "category": "legoEV3",
    "extensions": ["colours_legoEV3", "shape_statement"]
  },
  "LegoEv3PlayToneBrick": {
    "message0": "%{BKY_LEGOEV3_PLAYTONE}",
    "args0": [
      {
        "type": "field_number",
        "name": "TIME",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "FREQUENCY",
        "value": 2
      },
      {
        "type": "field_number",
        "name": "VOLUME",
        "value": 100
      }
    ],
    "category": "legoEV3",
    "extensions": ["colours_legoEV3", "shape_statement"]
  },
  "LegoEv3SetLedBrick": {
    "message0": "%{BKY_LEGOEV3_SETLED}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Off", "Green"]
        ]
      }
    ],
    "category": "legoEV3",
    "extensions": ["colours_legoEV3", "shape_statement"]
  }
};