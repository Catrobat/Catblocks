/**
 * @description event Catblocks bricks
 */

'use strict';

export default {
  "DroneTakeOffLandBrick": {
    "message0": "%{BKY_DRONE_TAKEOFFLAND}",
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneEmergencyBrick": {
    "message0": "%{BKY_DRONE_EMERGENCY}",
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneMoveUpBrick": {
    "message0": "%{BKY_DRONE_MOVEUP}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneMoveDownBrick": {
    "message0": "%{BKY_DRONE_MOVEDOWN}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneMoveLeftBrick": {
    "message0": "%{BKY_DRONE_MOVELEFT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneMoveRightBrick": {
    "message0": "%{BKY_DRONE_MOVERIGHT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneMoveForwardBrick": {
    "message0": "%{BKY_DRONE_MOVEFORWARD}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneMoveBackwardBrick": {
    "message0": "%{BKY_DRONE_MOVEBACKWARD}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneTurnLeftBrick": {
    "message0": "%{BKY_DRONE_TURNLEFT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneTurnRightBrick": {
    "message0": "%{BKY_DRONE_TURNRIGHT}",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneFlipBrick": {
    "message0": "%{BKY_DRONE_FLIP}",
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DronePlayLedAnimationBrick": {
    "message0": "%{BKY_DRONE_PLAYLEDANIMATION}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Blink green red", "Blink green"]
        ]
      }
    ],
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  },
  "DroneSwitchCameraBrick": {
    "message0": "%{BKY_DRONE_SWITCHCAMERA}",
    "category": "drone",
    "extensions": ["colours_drone", "shape_statement"]
  }
};