/**
 * @description arduino Catblocks bricks
 */

"use strict";

export default {
  "StartScript": {
    "message0": "%{BKY_EVENT_WHENSCENESTARTS}",
    "category": "event",
    "extensions": ["colours_event", "shape_hat"]
  },
  "WhenScript": {
    "message0": "%{BKY_EVENT_WHENTAPPED}",
    "category": "event",
    "extensions": ["colours_event", "shape_hat"],
    "args0": []
  },
  "WhenTouchDownScript": {
    "message0": "%{BKY_EVENT_WHENSTAGEISTAPPED}",
    "category": "event",
    "extensions": ["colours_event", "shape_hat"]
  },
  "BroadcastScript": {
    "message0": "%{BKY_EVENT_WHENYOURECEIVE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "event",
    "extensions": ["colours_event", "shape_hat"]
  },
  "BroadcastBrick": {
    "message0": "%{BKY_EVENT_BROADCAST_CB}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "event",
    "extensions": ["colours_event", "shape_statement"]
  },
  "BroadcastWaitBrick": {
    "message0": "%{BKY_EVENT_BROADCASTANDWAIT_CB}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "event",
    "extensions": ["colours_event", "shape_statement"]
  },
  "WhenConditionScript": {
    "message0": "%{BKY_EVENT_WHENBECOMESTRUE}",
    "args0": [
      {
        "type": "field_input",
        "name": "IF_CONDITION",
        "text": "1 < 2"
      }
    ],
    "category": "event",
    "extensions": ["colours_event", "shape_hat"]
  },
  "WhenBounceOffScript": {
    "message0": "%{BKY_EVENT_WHENYOUBOUNCEOFF}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["any edge, actor, or object", "EDGE"]
        ]
      }
    ],
    "category": "event",
    "extensions": ["colours_event", "shape_hat"]
  },
  "WhenBackgroundChangesScript": {
    "message0": "%{BKY_EVENT_WHENBACKGROUNDCHANGES}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "event",
    "extensions": ["colours_event", "shape_hat"]
  }
};