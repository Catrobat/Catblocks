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
  StartListeningBrick: {
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
  },
  SetInstrumentBrick: {
    message0: '%{BKY_SOUND_SET_INSTRUMENT}',
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
  PauseForBeatsBrick: {
    message0: '%{BKY_SOUND_PAUSE_FOR_BEATS}',
    args0: [
      {
        type: 'field_input',
        name: 'BEATS_TO_PAUSE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'BEATS_TO_PAUSE_INFO'
      }
    ]
  },
  SetListeningLanguageBrick: {
    message0: '%{BKY_SOUND_SET_LISTENING_LANGUAGE}',
    args0: [
      {
        type: 'field_input',
        name: 'brick_set_listening_language_spinner',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_set_listening_language_spinner_INFO'
      }
    ]
  },
  SetTempoBrick: {
    message0: '%{BKY_SOUND_SET_TEMPO}',
    args0: [
      {
        type: 'field_input',
        name: 'TEMPO',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TEMPO_INFO'
      }
    ]
  },
  ChangeTempoByNBrick: {
    message0: '%{BKY_SOUND_CHANGE_TEMPO_BY}',
    args0: [
      {
        type: 'field_input',
        name: 'TEMPO_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TEMPO_CHANGE_INFO'
      }
    ]
  },
  PlayDrumForBeatsBrick: {
    message0: '%{BKY_SOUND_PLAY_DRUM_FOR_BEATS}',
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
      },
      {
        type: 'field_input',
        name: 'PLAY_DRUM',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PLAY_DRUM_INFO'
      }
    ]
  },
  PlayNoteForBeatsBrick: {
    message0: '%{BKY_SOUND_PLAY_NOTE_FOR_BEATS}',
    args0: [
      {
        type: 'field_input',
        name: 'NOTE_TO_PLAY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'NOTE_TO_PLAY_INFO'
      },
      {
        type: 'field_input',
        name: 'BEATS_TO_PLAY_NOTE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'BEATS_TO_PLAY_NOTE_INFO'
      }
    ]
  },
  JumpingSumoSoundBrick: {
    message0: '%{BKY_SUMO_SOUND}',
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
      },
      {
        type: 'field_input',
        name: 'JUMPING_SUMO_VOLUME',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'JUMPING_SUMO_VOLUME_INFO'
      }
    ]
  },
  JumpingSumoNoSoundBrick: {
    message0: '%{BKY_SUMO_NOSOUND}'
  },
  PhiroPlayToneBrick: {
    message0: '%{BKY_PHIRO_PLAYTONE}',
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
      },
      {
        type: 'field_input',
        name: 'PHIRO_DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHIRO_DURATION_IN_SECONDS_INFO'
      }
    ]
  },
  PlaySoundAtBrick: {
    message0: '%{BKY_SOUND_STOP_SOUND_AT}',
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
      },
      {
        type: 'field_input',
        name: 'PLAY_SOUND_AT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PLAY_SOUND_AT_INFO'
      }
    ]
  }
};
