'use strict';

export default {
  WhenGamepadButtonScript: {
    message0: '%{BKY_CAST_WHEN_GAMEPAD_BUTTON}',
    message1: '%1',
    message2: '%1%2',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_when_gamepad_button_spinner',
        name: 'ACTION'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ACTION_INFO'
      }
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args2: [
      {
        type: 'field_label',
        name: 'ADVANCED_MODE_PLACEHOLDER'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  },
  RaspiInterruptScript: {
    message0: '%{BKY_EVENT_RASPI_INTERRUPT_SCRIPT}',
    message1: '%1',
    message2: '%1%2',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_raspi_when_pinspinner',
        name: 'pin'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'pin_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_raspi_when_valuespinner',
        name: 'eventValue'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'eventValue_INFO'
      }
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args2: [
      {
        type: 'field_label',
        name: 'ADVANCED_MODE_PLACEHOLDER'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  }
};
