/**
 * @description legoNXT Catblocks bricks
 */

'use strict';

export default {
  LegoNxtMotorTurnAngleBrick: {
    message0: '%{BKY_LEGONXT_MOTORTURNANGLE}',
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
        name: 'LEGO_NXT_DEGREES',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_NXT_DEGREES_INFO'
      }
    ]
  },
  LegoNxtMotorStopBrick: {
    message0: '%{BKY_LEGONXT_MOTORSTOP}',
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
      }
    ]
  },
  LegoNxtMotorMoveBrick: {
    message0: '%{BKY_LEGONXT_MOTORMOVE}',
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
        name: 'LEGO_NXT_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_NXT_SPEED_INFO'
      }
    ]
  },
  LegoNxtPlayToneBrick: {
    message0: '%{BKY_LEGONXT_PLAYTONE}',
    args0: [
      {
        type: 'field_input',
        name: 'LEGO_NXT_DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_NXT_DURATION_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'LEGO_NXT_FREQUENCY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_NXT_FREQUENCY_INFO'
      }
    ]
  }
};
