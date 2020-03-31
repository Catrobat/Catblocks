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
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "LEGO_EV3_DEGREES",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "LegoEv3MotorMoveBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORMOVE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "LEGO_NXT_SPEED",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "LegoEv3MotorStopBrick": {
    "message0": "%{BKY_LEGOEV3_MOTORSTOP}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "LegoEv3PlayToneBrick": {
    "message0": "%{BKY_LEGOEV3_PLAYTONE}",
    "args0": [
      {
        "type": "field_input",
        "name": "LEGO_EV3_DURATION_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "LEGO_EV3_FREQUENCY",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "LEGO_EV3_VOLUME",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "LegoEv3SetLedBrick": {
    "message0": "%{BKY_LEGOEV3_SETLED}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  }
};