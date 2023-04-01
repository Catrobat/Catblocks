'use strict';

export default {
  SetLookBrick: {
    message0: '%{BKY_LOOKS_SWITCHTOLOOK}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_set_look_spinner',
        name: 'look'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'look_INFO'
      }
    ]
  },
  SetLookByIndexBrick: {
    message0: '%{BKY_LOOKS_SWITCHTOLOOKWITHNUMBER}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'LOOK_INDEX',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LOOK_INDEX_INFO'
      }
    ]
  },
  NextLookBrick: {
    message0: '%{BKY_LOOKS_NEXTLOOK}'
  },
  PreviousLookBrick: {
    message0: '%{BKY_LOOKS_PREVIOUSLOOK}'
  },
  SetSizeToBrick: {
    message0: '%{BKY_LOOKS_SETSIZETO}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'SIZE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SIZE_INFO'
      }
    ]
  },
  HideBrick: {
    message0: '%{BKY_LOOKS_HIDE}'
  },
  ShowBrick: {
    message0: '%{BKY_LOOKS_SHOW}'
  },
  AskBrick: {
    message0: '%{BKY_LOOKS_ASKANDSTOREWRITTENANSWERIN}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'ASK_QUESTION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ASK_QUESTION_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_ask_spinner',
        name: 'DROPDOWN'
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
  SayBubbleBrick: {
    message0: '%{BKY_LOOKS_SAY_CAT}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'STRING',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STRING_INFO'
      }
    ]
  },
  SayForBubbleBrick: {
    message0: '%{BKY_LOOKS_SAYFORSECOND}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'STRING',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STRING_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DURATION_IN_SECONDS_INFO'
      }
    ]
  },
  ThinkBubbleBrick: {
    message0: '%{BKY_LOOKS_THINK_CAT}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'STRING',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STRING_INFO'
      }
    ]
  },
  ThinkForBubbleBrick: {
    message0: '%{BKY_LOOKS_THINKFORSECONDS}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'STRING',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STRING_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DURATION_IN_SECONDS_INFO'
      }
    ]
  },
  SetTransparencyBrick: {
    message0: '%{BKY_LOOKS_SETTRANSPARENCYTO}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'TRANSPARENCY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TRANSPARENCY_INFO'
      }
    ]
  },
  ChangeSizeByNBrick: {
    message0: '%{BKY_LOOKS_CHANGESIZEBY}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'SIZE_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SIZE_CHANGE_INFO'
      }
    ]
  },
  ChangeTransparencyByNBrick: {
    message0: '%{BKY_LOOKS_CHANGETRANSPARENCYBY}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'TRANSPARENCY_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TRANSPARENCY_CHANGE_INFO'
      }
    ]
  },
  SetBrightnessBrick: {
    message0: '%{BKY_LOOKS_SETBRIGHTHNESSTO}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'BRIGHTNESS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'BRIGHTNESS_INFO'
      }
    ]
  },
  ChangeBrightnessByNBrick: {
    message0: '%{BKY_LOOKS_CHANGEBRIGHTHNESSBY}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'BRIGHTNESS_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'BRIGHTNESS_CHANGE_INFO'
      }
    ]
  },
  SetColorBrick: {
    message0: '%{BKY_LOOKS_SETCOLORTO}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'COLOR',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'COLOR_INFO'
      }
    ]
  },
  ChangeColorByNBrick: {
    message0: '%{BKY_LOOKS_CHANGECOLORBY}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'COLOR_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'COLOR_CHANGE_INFO'
      }
    ]
  },
  ClearGraphicEffectBrick: {
    message0: '%{BKY_LOOKS_CLEARGRAPHICEFFECTS_CAT}'
  },
  SetBackgroundBrick: {
    message0: '%{BKY_LOOKS_SETBACKGROUND}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_set_background_spinner',
        name: 'look'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'look_INFO'
      }
    ]
  },
  SetBackgroundByIndexBrick: {
    message0: '%{BKY_LOOKS_SETBACKGROUNDTONUMBER}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'BACKGROUND_INDEX',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'BACKGROUND_INDEX_INFO'
      }
    ]
  },
  SetBackgroundAndWaitBrick: {
    message0: '%{BKY_LOOKS_SETBACKGROUNDANDWAIT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_set_background_spinner',
        name: 'look'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'look_INFO'
      }
    ]
  },
  SetBackgroundByIndexAndWaitBrick: {
    message0: '%{BKY_LOOKS_SETBACKGROUNDTONUMBERANDWAIT}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'BACKGROUND_WAIT_INDEX',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'BACKGROUND_WAIT_INDEX_INFO'
      }
    ]
  },
  CameraBrick: {
    message0: '%{BKY_LOOKS_TURNCAMERA}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_video_spinner',
        name: 'SPINNER'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SPINNER_INFO'
      }
    ]
  },
  ChooseCameraBrick: {
    message0: '%{BKY_LOOKS_USECAMERA}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_choose_camera_spinner',
        name: 'SPINNER'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SPINNER_INFO'
      }
    ]
  },
  FlashBrick: {
    message0: '%{BKY_LOOKS_TURNFLASHLIGHT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_flash_spinner',
        name: 'SPINNER'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SPINNER_INFO'
      }
    ]
  },
  BackgroundRequestBrick: {
    message0: '%{BKY_LOOKS_BACKGROUNDREQUEST}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'BACKGROUND_REQUEST',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'BACKGROUND_REQUEST_INFO'
      }
    ]
  },
  LookRequestBrick: {
    message0: '%{BKY_LOOKS_LOOKREQUEST}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'LOOK_REQUEST',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LOOK_REQUEST_INFO'
      }
    ]
  },
  CopyLookBrick: {
    message0: '%{BKY_LOOKS_COPY_LOOK}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'LOOK_COPY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LOOK_COPY_INFO'
      }
    ]
  },
  DeleteLookBrick: {
    message0: '%{BKY_LOOKS_DELETE_LOOK}'
  },
  PaintNewLookBrick: {
    message0: '%{BKY_LOOKS_PAINT_NEW_LOOK}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'LOOK_NEW',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LOOK_NEW_INFO'
      }
    ]
  },
  EditLookBrick: {
    message0: '%{BKY_LOOKS_EDIT_LOOK}'
  },
  DroneSwitchCameraBrick: {
    message0: '%{BKY_DRONE_SWITCHCAMERA}'
  },
  PhiroRGBLightBrick: {
    message0: '%{BKY_PHIRO_RGBLIGHT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_phiro_rgb_light_spinner',
        name: 'eye'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'eye_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'PHIRO_LIGHT_RED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHIRO_LIGHT_RED_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'PHIRO_LIGHT_GREEN',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHIRO_LIGHT_GREEN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'PHIRO_LIGHT_BLUE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHIRO_LIGHT_BLUE_INFO'
      }
    ]
  },
  FadeParticleEffectBrick: {
    message0: '%{BKY_FADE_PARTICLE_EFFECT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        name: 'brick_fade_particle_effect_spinner'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_fade_particle_effect_spinner_INFO'
      }
    ]
  },
  ParticleEffectAdditivityBrick: {
    message0: '%{BKY_ADDITIVE_PARTICLE_EFFECT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        name: 'brick_additive_particle_effect_spinner'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_additive_particle_effect_spinner_INFO'
      }
    ]
  },
  SetCameraFocusPointBrick: {
    message0: '%{BKY_SET_CAMERA_FOCUS}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'HORIZONTAL_FLEXIBILITY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'HORIZONTAL_FLEXIBILITY_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'VERTICAL_FLEXIBILITY',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'VERTICAL_FLEXIBILITY_INFO'
      }
    ]
  },
  SetParticleColorBrick: {
    message0: '%{BKY_SET_PARTICLE_COLOR}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'COLOR',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'brick_set_particle_color_INFO'
      }
    ]
  }
};
