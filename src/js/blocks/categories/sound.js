/**
 * @description sound Catblocks bricks
 */

"use strict";

export default {
  "PlaySoundBrick": {
    "message0": "%{BKY_SOUND_STARTSOUND}",
    "args0": [
      {
        "type": "field_input",
        "name": "sound",
        "text": "sound"
      }
    ],
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  },
  "PlaySoundAndWaitBrick": {
    "message0": "%{BKY_SOUND_STARTSOUNDANDWAIT}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  },
  "StopAllSoundsBrick": {
    "message0": "%{BKY_SOUND_STOPALLSOUNDS}",
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  },
  "SetVolumeToBrick": {
    "message0": "%{BKY_SOUND_SETVOLUMETO}",
    "args0": [
      {
        "type": "field_number",
        "name": "VOLUME",
        "value": 60
      }
    ],
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  },
  "ChangeVolumeByNBrick": {
    "message0": "%{BKY_SOUND_CHANGEVOLUMEBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "VOLUME_CHANGE",
        "value": -10
      }
    ],
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  },
  "SpeakBrick": {
    "message0": "%{BKY_SOUND_SPEAK}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPEAK",
        "text": "Hello!"
      }
    ],
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  },
  "SpeakAndWaitBrick": {
    "message0": "%{BKY_SOUND_SPEAKANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPEAK",
        "text": "Hello!"
      }
    ],
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  },
  "AskSpeechBrick": {
    "message0": "%{BKY_SOUND_ASKANDSTORESPOKENANSWERIN}",
    "args0": [
      {
        "type": "field_input",
        "name": "ASK_SPEECH_QUESTION",
        "text": "What\"s your name?"
      },
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["new...", "NEW"]
        ]
      }
    ],
    "category": "sound",
    "extensions": ["colours_sounds", "shape_statement"]
  }
};