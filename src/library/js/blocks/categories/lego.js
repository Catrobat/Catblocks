'use strict';

export default {
  LegoEv3MotorTurnAngleBrick: {
    message0: '%{BKY_LEGOEV3_MOTORTURNANGLE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'lego_ev3_motor_turn_angle_spinner',
        name: 'DROPDOWN'
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
        type: 'field_catblockstext',
        name: 'LEGO_EV3_DEGREES',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_EV3_DEGREES_INFO'
      }
    ]
  },
  LegoEv3MotorMoveBrick: {
    message0: '%{BKY_LEGOEV3_MOTORMOVE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_ev3_motor_move_spinner',
        name: 'DROPDOWN'
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
        type: 'field_catblockstext',
        name: 'LEGO_EV3_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_EV3_SPEED_INFO'
      }
    ]
  },
  LegoEv3MotorStopBrick: {
    message0: '%{BKY_LEGOEV3_MOTORSTOP}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'ev3_stop_motor_spinner',
        name: 'DROPDOWN'
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
  LegoEv3PlayToneBrick: {
    message0: '%{BKY_LEGOEV3_PLAYTONE}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'LEGO_EV3_DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_EV3_DURATION_IN_SECONDS_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'LEGO_EV3_FREQUENCY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_EV3_FREQUENCY_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'LEGO_EV3_VOLUME',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LEGO_EV3_VOLUME_INFO'
      }
    ]
  },
  LegoEv3SetLedBrick: {
    message0: '%{BKY_LEGOEV3_SETLED}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_ev3_set_led_spinner',
        name: 'DROPDOWN'
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
  LegoNxtMotorTurnAngleBrick: {
    message0: '%{BKY_LEGONXT_MOTORTURNANGLE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'lego_motor_turn_angle_spinner',
        name: 'DROPDOWN'
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
        type: 'field_catblockstext',
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
        type: 'field_catblocksspinner',
        catroid_field_id: 'stop_motor_spinner',
        name: 'DROPDOWN'
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
        type: 'field_catblocksspinner',
        catroid_field_id: 'lego_motor_action_spinner',
        name: 'DROPDOWN'
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
