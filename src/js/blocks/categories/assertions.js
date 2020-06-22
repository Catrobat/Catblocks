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
        name: 'X_POSITION',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'Y_POSITION',
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
        name: 'ASSERT_EQUALS_ACTUAL',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'ASSERT_EQUALS_EXPECTED',
        text: 'unset'
      }
    ]
  }
};
