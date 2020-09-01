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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'sound_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'sound_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'VOLUME_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'VOLUME_CHANGE_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SPEAK_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SPEAK_INFO'
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
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ASK_SPEECH_QUESTION_INFO'
      },
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
  StopSoundBrick: {
    message0: '%{BKY_SOUND_STOP_SOUND}',
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
  StartListening: {
    message0: '%{BKY_SOUND_START_LISTENING}',
    args0: [
      {
        type: 'field_input',
        name: 'LISTEN',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LISTEN_INFO'
      }
    ]
  }
};
