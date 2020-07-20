/**
 * @description jumpoingSumo Catblocks bricks
 */

'use strict';

export default {
  JumpingSumoAnimationsBrick: {
    message0: '%{BKY_SUMO_ANIMATION}',
    args0: [
      {
        type: 'field_input',
        name: 'ANIMATION',
        text: 'unset'
      }
    ]
  },
  JumpingSumoJumpHighBrick: {
    message0: '%{BKY_SUMO_JUMPHIGH}'
  },
  JumpingSumoJumpLongBrick: {
    message0: '%{BKY_SUMO_JUMPLONG}'
  },
  JumpingSumoMoveBackwardBrick: {
    message0: '%{BKY_SUMO_MOVEBACKWARD}',
    args0: [
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_TIME_TO_DRIVE_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_SPEED',
        text: 'unset'
      }
    ]
  },
  JumpingSumoMoveForwardBrick: {
    message0: '%{BKY_SUMO_MOVEFORWARD}',
    args0: [
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_TIME_TO_DRIVE_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_SPEED',
        text: 'unset'
      }
    ]
  },
  JumpingSumoSoundBrick: {
    message0: '%{BKY_SUMO_SOUND}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_VOLUME',
        text: 'unset'
      }
    ]
  },
  JumpingSumoNoSoundBrick: {
    message0: '%{BKY_SUMO_NOSOUND}'
  },
  JumpingSumoRotateLeftBrick: {
    message0: '%{BKY_SUMO_ROTATELEFT}',
    args0: [
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_ROTATE',
        text: 'unset'
      }
    ]
  },
  JumpingSumoRotateRightBrick: {
    message0: '%{BKY_SUMO_ROTATERIGHT}',
    args0: [
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_ROTATE',
        text: 'unset'
      }
    ]
  },
  JumpingSumoTurnBrick: {
    message0: '%{BKY_SUMO_TURN}'
  },
  JumpingSumoTakingPictureBrick: {
    message0: '%{BKY_SUMO_TAKINGPICTURE}'
  }
};
