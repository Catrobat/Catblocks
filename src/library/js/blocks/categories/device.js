'use strict';

export default {
  WhenNfcScript: {
    message0: '%{BKY_EVENT_WHENNFC}',
    message1: '%1',
    message2: '%1%2',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_when_nfc_spinner',
        value_xpath: ['nfcTag', 'name'],
        message_format: '%v',
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
  SetNfcTagBrick: {
    message0: '%{BKY_CONTROL_SETNFCTAG}',
    args0: [
      {
        type: 'field_catblockstext',
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
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_set_nfc_tag_ndef_record_spinner',
        value_xpath: ['nfcTagNdefType'],
        message_format: 'TNF_%v',
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
  TapAtBrick: {
    message0: '%{BKY_ASSERTION_TAP_AT}',
    args0: [
      {
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
        name: 'DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DURATION_IN_SECONDS_INFO'
      }
    ]
  },
  ResetTimerBrick: {
    message0: '%{BKY_DEVICE_RESET_TIMER}'
  },
  TouchAndSlideBrick: {
    message0: '%{BKY_CONTROL_TOUCH_AND_SLIDE}',
    args0: [
      {
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
        name: 'X_POSITION_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_CHANGE_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'Y_POSITION_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_CHANGE_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DURATION_IN_SECONDS_INFO'
      }
    ]
  },
  OpenUrlBrick: {
    message0: '%{BKY_CONTROL_OPEN_URL}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'OPEN_URL',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'OPEN_URL_INFO'
      }
    ]
  }
};
