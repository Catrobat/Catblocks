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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ANIMATION_INFO'
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
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_TIME_TO_DRIVE_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_SPEED_INFO'
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
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_TIME_TO_DRIVE_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_SPEED_INFO'
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
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_VOLUME',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_VOLUME_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_ROTATE_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_ROTATE_INFO'
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
