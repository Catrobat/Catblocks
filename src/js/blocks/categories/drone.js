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
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneMoveDownBrick": {
    "message0": "%{BKY_DRONE_MOVEDOWN}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneMoveLeftBrick": {
    "message0": "%{BKY_DRONE_MOVELEFT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneMoveRightBrick": {
    "message0": "%{BKY_DRONE_MOVERIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneMoveForwardBrick": {
    "message0": "%{BKY_DRONE_MOVEFORWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneMoveBackwardBrick": {
    "message0": "%{BKY_DRONE_MOVEBACKWARD}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneTurnLeftBrick": {
    "message0": "%{BKY_DRONE_TURNLEFT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneTurnRightBrick": {
    "message0": "%{BKY_DRONE_TURNRIGHT}",
    "args0": [
      {
        "type": "field_input",
        "name": "DRONE_TIME_TO_FLY_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DRONE_POWER_IN_PERCENT",
        "text": "DEFAULT_VALUE"
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
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "DroneSwitchCameraBrick": {
    "message0": "%{BKY_DRONE_SWITCHCAMERA}"
  }
};