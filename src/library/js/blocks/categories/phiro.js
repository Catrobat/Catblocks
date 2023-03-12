'use strict';

export default {
  PhiroMotorMoveForwardBrick: {
    message0: '%{BKY_PHIRO_MOTORMOVEFORWARD}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_phiro_motor_forward_action_spinner',
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
        name: 'PHIRO_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHIRO_SPEED_INFO'
      }
    ]
  },
  PhiroMotorMoveBackwardBrick: {
    message0: '%{BKY_PHIRO_MOTORMOVEBACKWARD}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_phiro_motor_backward_action_spinner',
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
        name: 'PHIRO_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHIRO_SPEED_INFO'
      }
    ]
  },
  PhiroMotorStopBrick: {
    message0: '%{BKY_PHIRO_MOTORSTOP}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_phiro_stop_motor_spinner',
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
  }
};
