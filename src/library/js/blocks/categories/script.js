'use strict';

export default {
  WhenGamepadButtonScript: {
    message0: '%{BKY_CAST_WHEN_GAMEPAD_BUTTON}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_when_gamepad_button_spinner',
        name: 'ACTION'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ACTION_INFO'
      }
    ]
  }
};
