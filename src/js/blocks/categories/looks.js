/**
 * @description looks Catblocks bricks
 */

'use strict';

export default {
  SetLookBrick: {
    message0: '%{BKY_LOOKS_SWITCHTOLOOK}',
    args0: [
      {
        type: 'field_input',
        name: 'look',
        text: 'unset'
      }
    ]
  },
  SetLookByIndexBrick: {
    message0: '%{BKY_LOOKS_SWITCHTOLOOKWITHNUMBER}',
    args0: [
      {
        type: 'field_input',
        name: 'LOOK_INDEX',
        text: 'unset'
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
        type: 'field_input',
        name: 'SIZE',
        text: 'unset'
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
        type: 'field_input',
        name: 'ASK_QUESTION',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      }
    ]
  },
  SayBubbleBrick: {
    message0: '%{BKY_LOOKS_SAY_CAT}',
    args0: [
      {
        type: 'field_input',
        name: 'STRING',
        text: 'unset'
      }
    ]
  },
  SayForBubbleBrick: {
    message0: '%{BKY_LOOKS_SAYFORSECOND}',
    args0: [
      {
        type: 'field_input',
        name: 'STRING',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'DURATION_IN_SECONDS',
        text: 'unset'
      }
    ]
  },
  ThinkBubbleBrick: {
    message0: '%{BKY_LOOKS_THINK_CAT}',
    args0: [
      {
        type: 'field_input',
        name: 'STRING',
        text: 'unset'
      }
    ]
  },
  ThinkForBubbleBrick: {
    message0: '%{BKY_LOOKS_THINKFORSECONDS}',
    args0: [
      {
        type: 'field_input',
        name: 'STRING',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'DURATION_IN_SECONDS',
        text: 'unset'
      }
    ]
  },
  SetTransparencyBrick: {
    message0: '%{BKY_LOOKS_SETTRANSPARENCYTO}',
    args0: [
      {
        type: 'field_input',
        name: 'TRANSPARENCY',
        text: 'unset'
      }
    ]
  },
  ChangeSizeByNBrick: {
    message0: '%{BKY_LOOKS_CHANGESIZEBY}',
    args0: [
      {
        type: 'field_input',
        name: 'SIZE_CHANGE',
        text: 'unset'
      }
    ]
  },
  ChangeTransparencyByNBrick: {
    message0: '%{BKY_LOOKS_CHANGETRANSPARENCYBY}',
    args0: [
      {
        type: 'field_input',
        name: 'TRANSPARENCY_CHANGE',
        text: 'unset'
      }
    ]
  },
  SetBrightnessBrick: {
    message0: '%{BKY_LOOKS_SETBRIGHTHNESSTO}',
    args0: [
      {
        type: 'field_input',
        name: 'BRIGHTNESS',
        text: 'unset'
      }
    ]
  },
  ChangeBrightnessByNBrick: {
    message0: '%{BKY_LOOKS_CHANGEBRIGHTHNESSBY}',
    args0: [
      {
        type: 'field_input',
        name: 'BRIGHTNESS_CHANGE',
        text: 'unset'
      }
    ]
  },
  SetColorBrick: {
    message0: '%{BKY_LOOKS_SETCOLORTO}',
    args0: [
      {
        type: 'field_input',
        name: 'COLOR',
        text: 'unset'
      }
    ]
  },
  ChangeColorByNBrick: {
    message0: '%{BKY_LOOKS_CHANGECOLORBY}',
    args0: [
      {
        type: 'field_input',
        name: 'COLOR_CHANGE',
        text: 'unset'
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
        type: 'field_input',
        name: 'look',
        text: 'unset'
      }
    ]
  },
  SetBackgroundByIndexBrick: {
    message0: '%{BKY_LOOKS_SETBACKGROUNDTONUMBER}',
    args0: [
      {
        type: 'field_input',
        name: 'LOOK_INDEX',
        text: 'unset'
      }
    ]
  },
  SetBackgroundAndWaitBrick: {
    message0: '%{BKY_LOOKS_SETBACKGROUNDANDWAIT}',
    args0: [
      {
        type: 'field_input',
        name: 'look',
        text: 'unset'
      }
    ]
  },
  SetBackgroundByIndexAndWaitBrick: {
    message0: '%{BKY_LOOKS_SETBACKGROUNDTONUMBERANDWAIT}',
    args0: [
      {
        type: 'field_input',
        name: 'LOOK_INDEX',
        text: 'unset'
      }
    ]
  },
  CameraBrick: {
    message0: '%{BKY_LOOKS_TURNCAMERA}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: 'unset'
      }
    ]
  },
  ChooseCameraBrick: {
    message0: '%{BKY_LOOKS_USECAMERA}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: 'unset'
      }
    ]
  },
  FlashBrick: {
    message0: '%{BKY_LOOKS_TURNFLASHLIGHT}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: 'unset'
      }
    ]
  }
};
