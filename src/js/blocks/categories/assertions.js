/**
 * @description assertions Catblocks bricks
 */

'use strict';

export default {
  TapAtBrick: {
    message0: '%{BKY_ASSERTION_TAP_AT}',
    args0: [
      {
        type: 'field_input',
        name: 'TAP_AT_EDIT_TEXT_X',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'TAP_AT_EDIT_TEXT_Y',
        text: 'unset'
      }
    ]
  },
  FinishStageBrick: {
    message0: '%{BKY_ASSERTION_FINISH_STAGE}'
  },
  WaitTillIdleBrick: {
    message0: '%{BKY_ASSERTION_WAIT_TILL_IDLE}'
  },
  AssertEqualsBrick: {
    message0: '%{BKY_ASSERTION_ASSERT_EQUALS}',
    args0: [
      {
        type: 'field_input',
        name: 'ASSERT_ACTUAL',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'ASSERT_EXPECTED',
        text: 'unset'
      }
    ]
  }
};
