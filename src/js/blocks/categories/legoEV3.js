/**
 * @description legoEV3 Catblocks bricks
 */

'use strict';

export default {
  "LegoEv3MotorTurnAngleBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORTURNANGLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      },
      {
        "type": "field_number",
        "name": "VARIABLE",
        "value": 180
      }
    ]
  },
  "LegoEv3MotorMoveBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORMOVE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      },
      {
        "type": "field_number",
        "name": "VARIABLE",
        "value": 100
      }
    ]
  },
  "LegoEv3MotorStopBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORSTOP}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
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
    ]
  },
  "LegoEv3SetLedBrick": {
    "message0": "%{BKY_LEGOEV3_SETLED}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  }
};