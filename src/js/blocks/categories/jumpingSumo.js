/**
 * @description jumpoingSumo Catblocks bricks
 */

'use strict';

export default {
  "JumpingSumoMoveForwardBrick": {
    "message0": "%{BKY_SUMO_MOVEFORWARD}",
    "args0": [
      {
        "type": "field_number",
        "name": "STEPS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoMoveBackwardBrick": {
    "message0": "%{BKY_SUMO_MOVEBACKWARD}",
    "args0": [
      {
        "type": "field_number",
        "name": "STEPS"
      },
      {
        "type": "field_number",
        "name": "POWER"
      }
    ],
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoAnimationsBrick": {
    "message0": "%{BKY_SUMO_ANIMATION}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Spin", "Tab"]
        ]
      }
    ],
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoSoundBrick": {
    "message0": "%{BKY_SUMO_SOUND}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["Normal", "Robot"]
        ]
      },
      {
        "type": "field_number",
        "name": "VARIABLE",
        "text": "50"
      }
    ],
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoNoSoundBrick": {
    "message0": "%{BKY_SUMO_NOSOUND}",
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoJumpLongBrick": {
    "message0": "%{BKY_SUMO_JUMPLONG}",
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoJumpHighBrick": {
    "message0": "%{BKY_SUMO_JUMPHIGH}",
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoRotateLeftBrick": {
    "message0": "%{BKY_SUMO_ROTATELEFT}",
    "args0": [
      {
        "type": "field_number",
        "name": "ANGLE",
        "value": 90
      }
    ],
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoRotateRightBrick": {
    "message0": "%{BKY_SUMO_ROTATERIGHT}",
    "args0": [
      {
        "type": "field_number",
        "name": "ANGLE",
        "value": 90
      }
    ],
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoTurnBrick": {
    "message0": "%{BKY_SUMO_TURN}",
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  },
  "JumpingSumoTakingPictureBrick": {
    "message0": "%{BKY_SUMO_TAKINGPICTURE}",
    "category": "jumpingSumo",
    "extensions": ["colours_jumpingSumo", "shape_statement"]
  }
};