/**
 * @description sound Catblocks bricks
 */

'use strict';

export default {
  PlaySoundBrick: {
    message0: '%{BKY_SOUND_STARTSOUND}',
    args0: [
      {
        type: 'field_input',
        name: 'sound',
        text: 'unset'
      }
    ]
  },
  PlaySoundAndWaitBrick: {
    message0: '%{BKY_SOUND_STARTSOUNDANDWAIT}',
    args0: [
      {
        type: 'field_input',
        name: 'sound',
        text: 'unset'
      }
    ]
  },
  StopAllSoundsBrick: {
    message0: '%{BKY_SOUND_STOPALLSOUNDS}'
  },
  SetVolumeToBrick: {
    message0: '%{BKY_SOUND_SETVOLUMETO}',
    args0: [
      {
        type: 'field_input',
        name: 'VOLUME',
        text: 'unset'
      }
    ]
  },
  ChangeVolumeByNBrick: {
    message0: '%{BKY_SOUND_CHANGEVOLUMEBY}',
    args0: [
      {
        type: 'field_input',
        name: 'VOLUME_CHANGE',
        text: 'unset'
      }
    ]
  },
  SpeakBrick: {
    message0: '%{BKY_SOUND_SPEAK}',
    args0: [
      {
        type: 'field_input',
        name: 'SPEAK',
        text: 'unset'
      }
    ]
  },
  SpeakAndWaitBrick: {
    message0: '%{BKY_SOUND_SPEAKANDWAIT}',
    args0: [
      {
        type: 'field_input',
        name: 'SPEAK',
        text: 'unset'
      }
    ]
  },
  AskSpeechBrick: {
    message0: '%{BKY_SOUND_ASKANDSTORESPOKENANSWERIN}',
    args0: [
      {
        type: 'field_input',
        name: 'ASK_SPEECH_QUESTION',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      }
    ]
  }
};
