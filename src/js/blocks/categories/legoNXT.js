/**
 * @description legoNXT Catblocks bricks
 */

'use strict';

export default {
  "LegoNxtMotorTurnAngleBrick": {
    "message0": "%{BKY_LEGONXT_MOTORTURNANGLE}",
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
  "LegoNxtMotorStopBrick": {
    "message0": "%{BKY_LEGONXT_MOTORSTOP}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "LegoNxtMotorMoveBrick": {
    "message0": "%{BKY_LEGONXT_MOTORMOVE}",
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
  "LegoNxtPlayToneBrick": {
    "message0": "%{BKY_LEGONXT_PLAYTONE}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "FREQUENCY",
        "value": 2
      }
    ]
  }
};