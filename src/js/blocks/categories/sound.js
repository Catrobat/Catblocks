/**
 * @description sound Catblocks bricks
 */

'use strict';

export default {
  "PlaySoundBrick": {
    "message0": "%{BKY_SOUND_STARTSOUND}",
    "args0": [
      {
        "type": "field_input",
        "name": "sound",
        "text": "sound"
      }
    ]
  },
  "PlaySoundAndWaitBrick": {
    "message0": "%{BKY_SOUND_STARTSOUNDANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "sound",
        "text": "sound"
      }
    ]
  },
  "StopAllSoundsBrick": {
    "message0": "%{BKY_SOUND_STOPALLSOUNDS}"
  },
  "SetVolumeToBrick": {
    "message0": "%{BKY_SOUND_SETVOLUMETO}",
    "args0": [
      {
        "type": "field_number",
        "name": "VOLUME",
        "value": 60
      }
    ]
  },
  "ChangeVolumeByNBrick": {
    "message0": "%{BKY_SOUND_CHANGEVOLUMEBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "VOLUME_CHANGE",
        "value": -10
      }
    ]
  },
  "SpeakBrick": {
    "message0": "%{BKY_SOUND_SPEAK}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPEAK",
        "text": "Hello!"
      }
    ]
  },
  "SpeakAndWaitBrick": {
    "message0": "%{BKY_SOUND_SPEAKANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPEAK",
        "text": "Hello!"
      }
    ]
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
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  }
};