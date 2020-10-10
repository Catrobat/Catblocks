/**
 * @description arduino Catblocks bricks
 */

'use strict';

export default {
  ArduinoSendDigitalValueBrick: {
    message0: '%{BKY_ARDUINO_SENDDIGITALVALUE}',
    args0: [
      {
        type: 'field_input',
        name: 'ARDUINO_DIGITAL_PIN_NUMBER',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ARDUINO_DIGITAL_PIN_NUMBER_INFO'
      },
      {
        type: 'field_input',
        name: 'ARDUINO_DIGITAL_PIN_VALUE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ARDUINO_DIGITAL_PIN_VALUE_INFO'
      }
    ]
  },
  ArduinoSendPWMValueBrick: {
    message0: '%{BKY_ARDUINO_SENDPWMALVALUE}',
    args0: [
      {
        type: 'field_input',
        name: 'ARDUINO_ANALOG_PIN_NUMBER',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ARDUINO_ANALOG_PIN_NUMBER_INFO'
      },
      {
        type: 'field_input',
        name: 'ARDUINO_ANALOG_PIN_VALUE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ARDUINO_ANALOG_PIN_VALUE_INFO'
      }
    ]
  }
};
