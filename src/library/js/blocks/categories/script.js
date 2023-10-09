'use strict';

export default {
  WhenGamepadButtonScript: {
    message0: '%{BKY_CAST_WHEN_GAMEPAD_BUTTON}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_when_gamepad_button_spinner',
        value_xpath: ['action'],
        message_format: '%v',
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
    ]
  },
  RaspiInterruptScript: {
    message0: '%{BKY_EVENT_RASPI_INTERRUPT_SCRIPT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_raspi_when_pinspinner',
        value_xpath: ['pin'],
        message_format: '%v',
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
        value_xpath: ['eventValue'],
        message_format: 'RASPI_%v',
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
    ]
  }
};
