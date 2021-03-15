/**
 * @description user defined bricks
 */

'use strict';

export default {
  UserDefinedScript: {
    message0: '%{BKY_USER_DEFINED_SCRIPT_DEFINE}',
    message1: '%1',
    message2: '%{BKY_USER_DEFINED_SCRIPT_AS}',
    message3: '%1',
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
  ReportBrick: {
    message0: '%{BKY_USER_BRICK_REPORT}',
    args0: [
      {
        type: 'field_input',
        name: 'REPORT_BRICK',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'REPORT_BRICK_INFO'
      }
    ]
  }
};
