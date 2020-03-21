/**
 * @description event Catblocks bricks
 */

'use strict';

export default {
  "DroneTakeOffLandBrick": {
    "message0": "%{BKY_DRONE_TAKEOFFLAND}"
  },
  "DroneEmergencyBrick": {
    "message0": "%{BKY_DRONE_EMERGENCY}"
  },
  "DroneMoveUpBrick": {
    "message0": "%{BKY_DRONE_MOVEUP}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneMoveDownBrick": {
    "message0": "%{BKY_DRONE_MOVEDOWN}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneMoveLeftBrick": {
    "message0": "%{BKY_DRONE_MOVELEFT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneMoveRightBrick": {
    "message0": "%{BKY_DRONE_MOVERIGHT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneMoveForwardBrick": {
    "message0": "%{BKY_DRONE_MOVEFORWARD}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneMoveBackwardBrick": {
    "message0": "%{BKY_DRONE_MOVEBACKWARD}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneTurnLeftBrick": {
    "message0": "%{BKY_DRONE_TURNLEFT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneTurnRightBrick": {
    "message0": "%{BKY_DRONE_TURNRIGHT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "DroneFlipBrick": {
    "message0": "%{BKY_DRONE_FLIP}"
  },
  "DronePlayLedAnimationBrick": {
    "message0": "%{BKY_DRONE_PLAYLEDANIMATION}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "DroneSwitchCameraBrick": {
    "message0": "%{BKY_DRONE_SWITCHCAMERA}"
  }
};