'use strict';

export default {
  ClearBackgroundBrick: {
    message0: '%{BKY_PEN_CLEAR}'
  },
  PenDownBrick: {
    message0: '%{BKY_PEN_PENDOWN}'
  },
  PenUpBrick: {
    message0: '%{BKY_PEN_PENUP}'
  },
  SetPenColorBrick: {
    message0: '%{BKY_PEN_SETPENCOLORTO}',
    args0: [
      {
        type: 'field_input',
        name: 'PEN_COLOR_RED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PEN_COLOR_RED_INFO'
      },
      {
        type: 'field_input',
        name: 'PEN_COLOR_GREEN',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PEN_COLOR_GREEN_INFO'
      },
      {
        type: 'field_input',
        name: 'PEN_COLOR_BLUE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PEN_COLOR_BLUE_INFO'
      }
    ]
  },
  SetPenSizeBrick: {
    message0: '%{BKY_PEN_SETPENSIZETO}',
    args0: [
      {
        type: 'field_input',
        name: 'PEN_SIZE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PEN_SIZE_INFO'
      }
    ]
  },
  StampBrick: {
    message0: '%{BKY_PEN_STAMP}'
  }
};
