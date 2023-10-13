'use strict';

export default {
  UserDefinedScript: {
    message0: '%{BKY_USER_DEFINED_SCRIPT_DEFINE}',
    message1: '%1',
    message2: '%{BKY_USER_DEFINED_SCRIPT_SCREEN_REFRESH_AS}',
    message3: '%1',
    message4: '%1%2',
    args1: [
      {
        type: 'input_statement',
        name: 'TEMPLATE_BRICK',
        check: 'UserDefinedReadOnly'
      }
    ],
    args2: [
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 42,
        width: 1,
        alt: '',
        name: 'dummy_icon'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_set_screen_refresh_spinner',
        value_xpath: ['screenRefresh'],
        message_format: 'UDB_SCREEN_REFRESH_%v',
        name: 'UDB_SCREEN_REFRESH'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'UDB_SCREEN_REFRESH_INFO'
      }
    ],
    args3: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args4: [
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
