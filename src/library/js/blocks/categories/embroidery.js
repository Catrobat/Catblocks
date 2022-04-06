'use strict';

export default {
  StitchBrick: {
    message0: '%{BKY_STITCH}'
  },
  RunningStitchBrick: {
    message0: '%{BKY_STITCH_RUNNING}',
    args0: [
      {
        type: 'field_input',
        name: 'EMBROIDERY_LENGTH',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'EMBROIDERY_LENGTH_INFO'
      }
    ]
  },
  ZigZagStitchBrick: {
    message0: '%{BKY_STITCH_ZIGZAG}',
    args0: [
      {
        type: 'field_input',
        name: 'ZIGZAG_EMBROIDERY_LENGTH',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ZIGZAG_EMBROIDERY_LENGTH_INFO'
      },
      {
        type: 'field_input',
        name: 'ZIGZAG_EMBROIDERY_WIDTH',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ZIGZAG_EMBROIDERY_WIDTH_INFO'
      }
    ]
  },
  TripleStitchBrick: {
    message0: '%{BKY_STITCH_TRIPLE}',
    args0: [
      {
        type: 'field_input',
        name: 'EMBROIDERY_LENGTH',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'EMBROIDERY_LENGTH_INFO'
      }
    ]
  },
  StopRunningStitchBrick: {
    message0: '%{BKY_STITCH_STOP}'
  },
  SewUpBrick: {
    message0: '%{BKY_EMBRIODERY_SEW_UP}'
  },
  WriteEmbroideryToFileBrick: {
    message0: '%{BKY_DATA_WRITE_EMBROIDERY_TO_FILE}',
    args0: [
      {
        type: 'field_input',
        name: 'WRITE_FILENAME',
        text: '%{BKY_DATA_WRITE_EMBROIDERY_TO_FILE_DEFAULT}'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'WRITE_FILENAME_INFO'
      }
    ]
  },
  SetThreadColorBrick: {
    message0: '%{BKY_EMBRIODERY_SET_THREAD_COLOR}',
    args0: [
      {
        type: 'field_input',
        name: 'THREAD_COLOR',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'THREAD_COLOR_INFO'
      }
    ]
  }
};
