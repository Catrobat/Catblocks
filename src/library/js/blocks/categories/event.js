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
  WhenClonedScript: {
    message0: '%{BKY_CONTROL_WHENYOUSTARTASACLONE}'
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
  WhenBackgroundChangesScript: {
    message0: '%{BKY_EVENT_WHENBACKGROUNDCHANGES}',
    args0: [
      {
        type: 'field_input',
        name: 'look',
        text: 'new...'
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
