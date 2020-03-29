/**
 * @description arduino Catblocks bricks
 */

'use strict';

export default {
  "StartScript": {
    "message0": "%{BKY_EVENT_WHENSCENESTARTS}"
  },
  "WhenScript": {
    "message0": "%{BKY_EVENT_WHENTAPPED}"
  },
  "WhenTouchDownScript": {
    "message0": "%{BKY_EVENT_WHENSTAGEISTAPPED}"
  },
  "BroadcastScript": {
    "message0": "%{BKY_EVENT_WHENYOURECEIVE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "BroadcastBrick": {
    "message0": "%{BKY_EVENT_BROADCAST_CB}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "BroadcastWaitBrick": {
    "message0": "%{BKY_EVENT_BROADCASTANDWAIT_CB}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "WhenConditionScript": {
    "message0": "%{BKY_EVENT_WHENBECOMESTRUE}",
    "args0": [
      {
        "type": "field_input",
        "name": "IF_CONDITION",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "WhenBounceOffScript": {
    "message0": "%{BKY_EVENT_WHENYOUBOUNCEOFF}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "WhenBackgroundChangesScript": {
    "message0": "%{BKY_EVENT_WHENBACKGROUNDCHANGES}",
    "args0": [
      {
        "type": "field_input",
        "name": "look",
        "text": "DEFAULT_VALUE"
      }
    ]
  }
};