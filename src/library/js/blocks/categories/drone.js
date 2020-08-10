/**
 * @description event Catblocks bricks
 */

'use strict';

export default {
  DroneTakeOffLandBrick: {
    message0: '%{BKY_DRONE_TAKEOFFLAND}'
  },
  DroneEmergencyBrick: {
    message0: '%{BKY_DRONE_EMERGENCY}'
  },
  DroneMoveUpBrick: {
    message0: '%{BKY_DRONE_MOVEUP}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneMoveDownBrick: {
    message0: '%{BKY_DRONE_MOVEDOWN}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneMoveLeftBrick: {
    message0: '%{BKY_DRONE_MOVELEFT}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneMoveRightBrick: {
    message0: '%{BKY_DRONE_MOVERIGHT}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneMoveForwardBrick: {
    message0: '%{BKY_DRONE_MOVEFORWARD}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneMoveBackwardBrick: {
    message0: '%{BKY_DRONE_MOVEBACKWARD}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneTurnLeftBrick: {
    message0: '%{BKY_DRONE_TURNLEFT}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneTurnRightBrick: {
    message0: '%{BKY_DRONE_TURNRIGHT}',
    args0: [
      {
        type: 'field_input',
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_TIME_TO_FLY_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'DRONE_POWER_IN_PERCENT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DRONE_POWER_IN_PERCENT_INFO'
      }
    ]
  },
  DroneFlipBrick: {
    message0: '%{BKY_DRONE_FLIP}'
  },
  DronePlayLedAnimationBrick: {
    message0: '%{BKY_DRONE_PLAYLEDANIMATION}',
    args0: [
      {
        type: 'field_input',
        name: 'ADRONEANIMATION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ADRONEANIMATION_INFO'
      }
    ]
  },
  DroneSwitchCameraBrick: {
    message0: '%{BKY_DRONE_SWITCHCAMERA}'
  }
};
