'use strict';

export default {
  PenDownBrick: {
    message0: '%{BKY_PEN_PENDOWN}'
  },
  PenUpBrick: {
    message0: '%{BKY_PEN_PENUP}'
  },
  SetPenSizeBrick: {
    message0: '%{BKY_PEN_SETPENSIZETO}',
    args0: [
      {
        type: 'field_catblockstext',
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
  SetPenColorBrick: {
    message0: '%{BKY_PEN_SETPENCOLORTO}',
    args0: [
      {
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
  StampBrick: {
    message0: '%{BKY_PEN_STAMP}'
  },
  ClearBackgroundBrick: {
    message0: '%{BKY_PEN_CLEAR}'
  }
};
