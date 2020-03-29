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
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PlaySoundAndWaitBrick": {
    "message0": "%{BKY_SOUND_STARTSOUNDANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "sound",
        "text": "DEFAULT_VALUE"
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
        "type": "field_input",
        "name": "VOLUME",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeVolumeByNBrick": {
    "message0": "%{BKY_SOUND_CHANGEVOLUMEBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "VOLUME_CHANGE",
        "value": "DEFAULT_VALUE"
      }
    ]
  },
  "SpeakBrick": {
    "message0": "%{BKY_SOUND_SPEAK}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPEAK",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SpeakAndWaitBrick": {
    "message0": "%{BKY_SOUND_SPEAKANDWAIT}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPEAK",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "AskSpeechBrick": {
    "message0": "%{BKY_SOUND_ASKANDSTORESPOKENANSWERIN}",
    "args0": [
      {
        "type": "field_input",
        "name": "ASK_SPEECH_QUESTION",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  }
};