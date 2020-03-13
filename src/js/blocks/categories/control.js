/**
 * @description arduino Catblocks bricks
 */

'use strict';

export default {
  "ForeverBrick": {
    "id": "ForeverBrick",
    "message0": "%{BKY_CONTROL_FOREVER}",
    "message1": "%1",
    "message2": "%1",
    "lastDummyAlign2": "RIGHT",
    "args1": [
      {
        "type": "input_statement",
        "name": "SUBSTACK"
      }
    ],
    "args2": [
      {
        "type": "field_image",
        "src": "../media/repeat.svg",
        "width": 24,
        "height": 24,
        "alt": "*",
        "flip_rtl": true
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "WaitBrick": {
    "id": "WaitBrick",
    "message0": "%{BKY_CONTROL_WAIT}",
    "args0": [
      {
        "type": "field_number",
        "name": "TIME_TO_WAIT_IN_SECONDS",
        "value": 1
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "NoteBrick": {
    "id": "NoteBrick",
    "message0": "%{BKY_CONTROL_NOTE}",
    "args0": [
      {
        "type": "field_input",
        "name": "NOTE",
        "text": "Add comment here..."
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "IfLogicBeginBrick": {
    "type": "IfThenLogicBeginBrick",
    "message0": "%{BKY_CONTROL_IFISTRUEELSEIF}",
    "message1": "%1",
    "message2": "%{BKY_CONTROL_IFISTRUEELSEELSE}",
    "message3": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "IF_CONDITION",
        "text": "1 < 2"
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "SUBSTACK"
      }
    ],
    "args3": [
      {
        "type": "input_statement",
        "name": "SUBSTACK2"
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "IfThenLogicBeginBrick": {
    "type": "IfLogicBeginBrick",
    "message0": "%{BKY_CONTROL_IFISTRUEELSEIF}",
    "message1": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "IF_CONDITION",
        "text": "1 < 2"
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "SUBSTACK"
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "WaitUntilBrick": {
    "message0": "%{BKY_CONTROL_WAITUNTILTRUE}",
    "args0": [
      {
        "type": "field_input",
        "name": "IF_CONDITION",
        "text": "1 < 2"
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "RepeatBrick": {
    "id": "RepeatBrick",
    "message0": "%{BKY_CONTROL_REPEATTIMES}",
    "message1": "%1",
    "message2": "%1",
    "lastDummyAlign2": "RIGHT",
    "args0": [
      {
        "type": "field_input",
        "name": "TIMES_TO_REPEAT",
        "text": "1 < 2"
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "SUBSTACK"
      }
    ],
    "args2": [
      {
        "type": "field_image",
        "src": "../media/repeat.svg",
        "width": 24,
        "height": 24,
        "alt": "*",
        "flip_rtl": true
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "RepeatUntilBrick": {
    "id": "RepeatUntilBrick",
    "message0": "%{BKY_CONTROL_REPEATUNTILISTRUE}",
    "message1": "%1",
    "message2": "%1",
    "lastDummyAlign2": "RIGHT",
    "args0": [
      {
        "type": "field_input",
        "name": "REPEAT_UNTIL_CONDITION",
        "text": "1 < 2"
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "SUBSTACK"
      }
    ],
    "args2": [
      {
        "type": "field_image",
        "src": "../media/repeat.svg",
        "width": 24,
        "height": 24,
        "alt": "*",
        "flip_rtl": true
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "SceneTransitionBrick": {
    "id": "SceneTransitionBrick",
    "message0": "%{BKY_CONTROL_CONTINUESCENE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "SceneStartBrick": {
    "id": "SceneStartBrick",
    "message0": "%{BKY_CONTROL_STARTSCENE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "StopScriptBrick": {
    "id": "StopScriptBrick",
    "message0": "%{BKY_CONTROL_STOPCAT}",
    "args0": [
      {
        "type": "field_input",
        "name": "spinnerSelection",
        "text": "0"
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "CloneBrick": {
    "id": "CloneBrick",
    "message0": "%{BKY_CONTROL_CREATECLONEOFCAT}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_statement"]
  },
  "DeleteThisCloneBrick": {
    "message0": "%{BKY_CONTROL_DELETETHISCLONE}",
    "args0": [
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_end"]
  },
  "WhenClonedScript": {
    "id": "WhenClonedScript",
    "message0": "%{BKY_CONTROL_WHENYOUSTARTASACLONE}",
    "args0": [
    ],
    "category": "control",
    "extensions": ["colours_control", "shape_hat"]
  }
};