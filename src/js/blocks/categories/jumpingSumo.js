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
        "name": "STEPS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "JumpingSumoMoveBackwardBrick": {
    "message0": "%{BKY_SUMO_MOVEBACKWARD}",
    "args0": [
      {
        "type": "field_number",
        "name": "STEPS",
        "value": 1
      },
      {
        "type": "field_number",
        "name": "POWER",
        "value": 1
      }
    ]
  },
  "JumpingSumoAnimationsBrick": {
    "message0": "%{BKY_SUMO_ANIMATION}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "JumpingSumoSoundBrick": {
    "message0": "%{BKY_SUMO_SOUND}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      },
      {
        "type": "field_number",
        "name": "VARIABLE",
        "value": 50
      }
    ]
  },
  "JumpingSumoNoSoundBrick": {
    "message0": "%{BKY_SUMO_NOSOUND}"
  },
  "JumpingSumoJumpLongBrick": {
    "message0": "%{BKY_SUMO_JUMPLONG}"
  },
  "JumpingSumoJumpHighBrick": {
    "message0": "%{BKY_SUMO_JUMPHIGH}"
  },
  "JumpingSumoRotateLeftBrick": {
    "message0": "%{BKY_SUMO_ROTATELEFT}",
    "args0": [
      {
        "type": "field_number",
        "name": "ANGLE",
        "value": 90
      }
    ]
  },
  "JumpingSumoRotateRightBrick": {
    "message0": "%{BKY_SUMO_ROTATERIGHT}",
    "args0": [
      {
        "type": "field_number",
        "name": "ANGLE",
        "value": 90
      }
    ]
  },
  "JumpingSumoTurnBrick": {
    "message0": "%{BKY_SUMO_TURN}"
  },
  "JumpingSumoTakingPictureBrick": {
    "message0": "%{BKY_SUMO_TAKINGPICTURE}"
  }
};