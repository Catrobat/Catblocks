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
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
      }
    ]
  },
  "DroneMoveDownBrick": {
    "message0": "%{BKY_DRONE_MOVEDOWN}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
      }
    ]
  },
  "DroneMoveLeftBrick": {
    "message0": "%{BKY_DRONE_MOVELEFT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
      }
    ]
  },
  "DroneMoveRightBrick": {
    "message0": "%{BKY_DRONE_MOVERIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
      }
    ]
  },
  "DroneMoveForwardBrick": {
    "message0": "%{BKY_DRONE_MOVEFORWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
      }
    ]
  },
  "DroneMoveBackwardBrick": {
    "message0": "%{BKY_DRONE_MOVEBACKWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
      }
    ]
  },
  "DroneTurnLeftBrick": {
    "message0": "%{BKY_DRONE_TURNLEFT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
      }
    ]
  },
  "DroneTurnRightBrick": {
    "message0": "%{BKY_DRONE_TURNRIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "unset"
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
        "name": "ADRONEANIMATION",
        "text": "unset"
      }
    ]
  },
  "DroneSwitchCameraBrick": {
    "message0": "%{BKY_DRONE_SWITCHCAMERA}"
  }
};