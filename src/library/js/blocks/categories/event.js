/**
 * @description arduino Catblocks bricks
 */

'use strict';

export default {
  StartScript: {
    message0: '%{BKY_EVENT_WHENSCENESTARTS}'
  },
  WhenScript: {
    message0: '%{BKY_EVENT_WHENTAPPED}'
  },
  WhenTouchDownScript: {
    message0: '%{BKY_EVENT_WHENSTAGEISTAPPED}'
  },
  BroadcastScript: {
    message0: '%{BKY_EVENT_WHENYOURECEIVE}',
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
  BroadcastBrick: {
    message0: '%{BKY_EVENT_BROADCAST_CB}',
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
  BroadcastWaitBrick: {
    message0: '%{BKY_EVENT_BROADCASTANDWAIT_CB}',
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
  WhenConditionScript: {
    message0: '%{BKY_EVENT_WHENBECOMESTRUE}',
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
    ]
  },
  WhenBounceOffScript: {
    message0: '%{BKY_EVENT_WHENYOUBOUNCEOFF}',
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
  WhenBackgroundChangesScript: {
    message0: '%{BKY_EVENT_WHENBACKGROUNDCHANGES}',
    args0: [
      {
        type: 'field_input',
        name: 'look',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'look_INFO'
      }
    ]
  }
};
