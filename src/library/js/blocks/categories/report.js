'use strict';

export default {
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
