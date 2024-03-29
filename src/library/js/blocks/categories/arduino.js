'use strict';

export default {
  RaspiSendDigitalValueBrick: {
    message0: '%{BKY_RASPI_SENDDIGITALVALUE}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'RASPI_DIGITAL_PIN_NUMBER',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'RASPI_DIGITAL_PIN_NUMBER_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'RASPI_DIGITAL_PIN_VALUE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'RASPI_DIGITAL_PIN_VALUE_INFO'
      }
    ]
  },
  RaspiPwmBrick: {
    message0: '%{BKY_RASPI_PWM}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'RASPI_DIGITAL_PIN_NUMBER',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'RASPI_DIGITAL_PIN_NUMBER_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'RASPI_PWM_PERCENTAGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'RASPI_PWM_PERCENTAGE_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'RASPI_PWM_FREQUENCY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'RASPI_PWM_FREQUENCY_INFO'
      }
    ]
  },
  ArduinoSendDigitalValueBrick: {
    message0: '%{BKY_ARDUINO_SENDDIGITALVALUE}',
    args0: [
      {
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
