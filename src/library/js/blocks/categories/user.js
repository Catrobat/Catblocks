'use strict';

export default {
  UserDefinedScript: {
    message0: '%{BKY_USER_DEFINED_SCRIPT_DEFINE}',
    message1: '%1',
    message2: '%{BKY_USER_DEFINED_SCRIPT_SCREEN_REFRESH_AS}',
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
        type: 'field_input',
        name: 'UDB_SCREEN_REFRESH',
        text: 'unset'
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
    ]
  }
};
