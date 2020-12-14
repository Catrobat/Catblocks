'use strict';

export default {
  WhenNfcBrick: {
    message0: '%{BKY_EVENT_WHENNFC}',
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

  SetNfcTagBrick: {
    message0: '%{BKY_CONTROL_SETNFCTAG}',
    args0: [
      {
        type: 'field_input',
        name: 'NFC_NDEF_MESSAGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'NFC_NDEF_MESSAGE_INFO'
      },
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
  TapAtBrick: {
    message0: '%{BKY_ASSERTION_TAP_AT}',
    args0: [
      {
        type: 'field_input',
        name: 'X_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_INFO'
      },
      {
        type: 'field_input',
        name: 'Y_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_INFO'
      }
    ]
  },
  TapForBrick: {
    message0: '%{BKY_ASSERTION_TAP_FOR}',
    args0: [
      {
        type: 'field_input',
        name: 'X_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_INFO'
      },
      {
        type: 'field_input',
        name: 'Y_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_INFO'
      },
      {
        type: 'field_input',
        name: 'FOR_DURATION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'FOR_DURATION_INFO'
      }
    ]
  },
  ResetTimerBrick: {
    message0: '%{BKY_DEVICE_RESET_TIMER}'
  },
  TouchAndSlide: {
    message0: '%{BKY_CONTROL_TOUCH_AND_SLIDE}',
    args0: [
      {
        type: 'field_input',
        name: 'brick_touch_slide_edit_from_x',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_touch_slide_edit_from_x_INFO'
      },
      {
        type: 'field_input',
        name: 'brick_touch_slide_edit_from_y',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_touch_slide_edit_from_y_INFO'
      },
      {
        type: 'field_input',
        name: 'brick_touch_slide_edit_to_x',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_touch_slide_edit_to_x_INFO'
      },
      {
        type: 'field_input',
        name: 'brick_touch_slide_edit_to_y',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_touch_slide_edit_to_y_INFO'
      },
      {
        type: 'field_input',
        name: 'brick_tap_for_edit_duration',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_tap_for_edit_duration_INFO'
      }
    ]
  },
  OpenUrlBrick: {
    message0: '%{BKY_CONTROL_OPEN_URL}',
    args0: [
      {
        type: 'field_input',
        name: 'brick_open_url_edit_text',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_open_url_edit_text_INFO'
      }
    ]
  }
};
