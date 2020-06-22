/**
 * @description control Catblocks bricks
 */

'use strict';

export default {
  ForeverBrick: {
    message0: '%{BKY_CONTROL_FOREVER}',
    message1: '%1',
    message2: '%1',
    lastDummyAlign2: 'RIGHT',
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args2: [
      {
        type: 'field_image',
        src: `${document.location.pathname}media/repeat.svg`,
        height: 24,
        width: 24,
        alt: '*',
        flip_rtl: true
      }
    ]
  },
  WaitBrick: {
    message0: '%{BKY_CONTROL_WAIT}',
    args0: [
      {
        type: 'field_input',
        name: 'TIME_TO_WAIT_IN_SECONDS',
        text: 'unset'
      }
    ]
  },
  NoteBrick: {
    message0: '%{BKY_CONTROL_NOTE}',
    args0: [
      {
        type: 'field_input',
        name: 'NOTE',
        text: 'unset'
      }
    ]
  },
  IfLogicBeginBrick: {
    type: 'IfThenLogicBeginBrick',
    message0: '%{BKY_CONTROL_IFISTRUEELSEIF}',
    message1: '%1',
    message2: '%{BKY_CONTROL_IFISTRUEELSEELSE}',
    message3: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'IF_CONDITION',
        text: 'unset'
      }
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args3: [
      {
        type: 'input_statement',
        name: 'SUBSTACK2'
      }
    ]
  },
  IfThenLogicBeginBrick: {
    type: 'IfLogicBeginBrick',
    message0: '%{BKY_CONTROL_IFISTRUEELSEIF}',
    message1: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'IF_CONDITION',
        text: 'unset'
      }
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ]
  },
  WaitUntilBrick: {
    message0: '%{BKY_CONTROL_WAITUNTILTRUE}',
    args0: [
      {
        type: 'field_input',
        name: 'IF_CONDITION',
        text: 'unset'
      }
    ]
  },
  RepeatBrick: {
    message0: '%{BKY_CONTROL_REPEATTIMES}',
    message1: '%1',
    message2: '%1',
    lastDummyAlign2: 'RIGHT',
    args0: [
      {
        type: 'field_input',
        name: 'TIMES_TO_REPEAT',
        text: 'unset'
      }
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args2: [
      {
        type: 'field_image',
        src: `${document.location.pathname}media/repeat.svg`,
        height: 24,
        width: 24,
        alt: '*',
        flip_rtl: true
      }
    ]
  },
  RepeatUntilBrick: {
    message0: '%{BKY_CONTROL_REPEATUNTILISTRUE}',
    message1: '%1',
    message2: '%1',
    lastDummyAlign2: 'RIGHT',
    args0: [
      {
        type: 'field_input',
        name: 'REPEAT_UNTIL_CONDITION',
        text: 'unset'
      }
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'SUBSTACK'
      }
    ],
    args2: [
      {
        type: 'field_image',
        src: `${document.location.pathname}media/repeat.svg`,
        height: 24,
        width: 24,
        alt: '*',
        flip_rtl: true
      }
    ]
  },
  SceneTransitionBrick: {
    message0: '%{BKY_CONTROL_CONTINUESCENE}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      }
    ]
  },
  SceneStartBrick: {
    message0: '%{BKY_CONTROL_STARTSCENE}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      }
    ]
  },
  StopScriptBrick: {
    message0: '%{BKY_CONTROL_STOPCAT}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: 'unset'
      }
    ]
  },
  CloneBrick: {
    message0: '%{BKY_CONTROL_CREATECLONEOFCAT}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      }
    ]
  },
  DeleteThisCloneBrick: {
    message0: '%{BKY_CONTROL_DELETETHISCLONE}'
  },
  WhenClonedScript: {
    message0: '%{BKY_CONTROL_WHENYOUSTARTASACLONE}'
  },
  SetNfcTagBrick: {
    message0: '%{BKY_CONTROL_SETNFCTAG}',
    args0: [
      {
        type: 'field_input',
        name: 'NFC_NDEF_MESSAGE',
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
