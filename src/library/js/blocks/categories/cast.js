/**
 * @description chromecast Catblocks bricks
 */

'use strict';

export default {
  WhenGamepadButtonBrick: {
    message0: '%{BKY_CAST_WHEN_GAMEPAD_BUTTON}',
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
  }
};
