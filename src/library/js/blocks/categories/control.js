'use strict';

export default {
  ForeverBrick: {
    message0: '%{BKY_CONTROL_FOREVER}',
    message1: '%1',
    message2: '%1%2',
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TIME_TO_WAIT_IN_SECONDS_CATBLOCKS_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'NOTE_INFO'
      }
    ]
  },
  IfLogicBeginBrick: {
    type: 'IfThenLogicBeginBrick',
    message0: '%{BKY_CONTROL_IFISTRUEELSEIF}',
    message1: '%1',
    message2: '%{BKY_CONTROL_IFISTRUEELSEELSE}%1',
    message3: '%1',
    message4: '%1%2',
    args0: [
      {
        type: 'field_input',
        name: 'IF_CONDITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'IF_CONDITION_INFO'
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
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ],
    args3: [
      {
        type: 'input_statement',
        name: 'SUBSTACK2'
      }
    ],
    args4: [
      {
        type: 'field_label',
        name: 'ADVANCED_MODE_PLACEHOLDER'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  },
  IfThenLogicBeginBrick: {
    type: 'IfLogicBeginBrick',
    message0: '%{BKY_CONTROL_IFISTRUEELSEIF}',
    message1: '%1',
    message2: '%1%2',
    args0: [
      {
        type: 'field_input',
        name: 'IF_CONDITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'IF_CONDITION_INFO'
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
        type: 'field_label',
        name: 'ADVANCED_MODE_PLACEHOLDER'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'IF_CONDITION_INFO'
      }
    ]
  },
  RepeatBrick: {
    message0: '%{BKY_CONTROL_REPEATTIMES}',
    message1: '%1',
    message2: '%1%2',
    lastDummyAlign2: 'RIGHT',
    args0: [
      {
        type: 'field_input',
        name: 'TIMES_TO_REPEAT',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TIMES_TO_REPEAT_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  },
  RepeatUntilBrick: {
    message0: '%{BKY_CONTROL_REPEATUNTILISTRUE}',
    message1: '%1',
    message2: '%1%2',
    lastDummyAlign2: 'RIGHT',
    args0: [
      {
        type: 'field_input',
        name: 'REPEAT_UNTIL_CONDITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'REPEAT_UNTIL_CONDITION_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
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
  SceneStartBrick: {
    message0: '%{BKY_CONTROL_STARTSCENE}',
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
  StopScriptBrick: {
    message0: '%{BKY_CONTROL_STOPCAT}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: 'unset'
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
  CloneBrick: {
    message0: '%{BKY_CONTROL_CREATECLONEOFCAT}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: '%{BKY_CONTROL_OFYOURSELF}'
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
  DeleteThisCloneBrick: {
    message0: '%{BKY_CONTROL_DELETETHISCLONE}'
  },
  WaitTillIdleBrick: {
    message0: '%{BKY_ASSERTION_WAIT_TILL_IDLE}'
  },
  ExitStageBrick: {
    message0: '%{BKY_CONTROL_EXIT_STAGE}'
  },
  ForVariableFromToBrick: {
    message0: '%{BKY_CONTROL_FOR_VARIABLE_FROM_TO}',
    message1: '%1',
    message2: '%1%2',
    lastDummyAlign2: 'RIGHT',
    args0: [
      {
        type: 'field_input',
        name: 'FOR_LOOP_FROM',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'FOR_LOOP_FROM_INFO'
      },
      {
        type: 'field_input',
        name: 'FOR_LOOP_TO',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'FOR_LOOP_TO_INFO'
      },
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'new...'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  },
  ForItemInUserListBrick: {
    message0: '%{BKY_CONTROL_FOR_VARIABLE_IN_USER_LIST}',
    message1: '%1',
    message2: '%1%2',
    lastDummyAlign2: 'RIGHT',
    args0: [
      {
        type: 'field_input',
        name: 'FOR_ITEM_IN_USERLIST_LIST',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'FOR_ITEM_IN_USERLIST_LIST_INFO'
      },
      {
        type: 'field_input',
        name: 'FOR_ITEM_IN_USERLIST_VARIABLE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'FOR_ITEM_IN_USERLIST_VARIABLE_INFO'
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
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  },
  BroadcastBrick: {
    message0: '%{BKY_EVENT_BROADCAST_CB}',
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
  BroadcastWaitBrick: {
    message0: '%{BKY_EVENT_BROADCASTANDWAIT_CB}',
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
  RaspiIfLogicBeginBrick: {
    type: 'IfThenLogicBeginBrick',
    message0: '%{BKY_RASPI_IFLOGICBEGINIF}',
    message1: '%1',
    message2: '%{BKY_RASPI_IFLOGICBEGINELSE}%1',
    message3: '%1',
    message4: '%{BKY_CONTROL_IFENDIF}%1',
    args0: [
      {
        type: 'field_input',
        name: 'IF_CONDITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'IF_CONDITION_INFO'
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
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ],
    args3: [
      {
        type: 'input_statement',
        name: 'SUBSTACK2'
      }
    ],
    args4: [
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  },
  PhiroIfLogicBeginBrick: {
    type: 'IfThenLogicBeginBrick',
    message0: '%{BKY_PHIRO_IFLOGICBEGINIF}',
    message1: '%1',
    message2: '%{BKY_PHIRO_IFLOGICBEGINELSE}%1',
    message3: '%1',
    message4: '%{BKY_CONTROL_IFENDIF}%1',
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
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ],
    args3: [
      {
        type: 'input_statement',
        name: 'SUBSTACK2'
      }
    ],
    args4: [
      {
        type: 'field_image',
        src: `${document.location.pathname}media/empty_icon.svg`,
        height: 24,
        width: 24,
        flip_rtl: true,
        name: 'ADVANCED_MODE_PLACEHOLDER'
      }
    ]
  }
};
