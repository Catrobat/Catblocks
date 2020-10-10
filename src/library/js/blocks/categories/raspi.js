/**
 * @description raspi Catblocks bricks
 */

'use strict';

export default {
  WhenRaspiPinChangedBrick: {
    message0: '%{BKY_RASPI_WHENPINCHANGED}',
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
        name: 'DROPDOWN2',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN2_INFO'
      }
    ]
  },
  RaspiIfLogicBeginBrick: {
    type: 'IfThenLogicBeginBrick',
    message0: '%{BKY_RASPI_IFLOGICBEGINIF}',
    message1: '%1',
    message2: '%{BKY_RASPI_IFLOGICBEGINELSE}',
    message3: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'IF_CONDITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'IF_CONDITION_INFO'
      }
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args3: [
      {
        type: 'input_statement',
        name: 'SUBSTACK2'
      }
    ]
  },
  RaspiSendDigitalValueBrick: {
    message0: '%{BKY_RASPI_SENDDIGITALVALUE}',
    args0: [
      {
        type: 'field_input',
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
        type: 'field_input',
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
        type: 'field_input',
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
        type: 'field_input',
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
        type: 'field_input',
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
  }
};
