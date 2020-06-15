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
      }
    ]
  },
  WhenNfcBrick: {
    message0: '%{BKY_EVENT_WHENNFC}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      }
    ]
  }
};
