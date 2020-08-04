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
  },
  AssertUserListsBrick: {
    message0: '%{BKY_ASSERTION_ASSERT_USER_LISTS}',
    args0: [
      {
        type: 'field_input',
        name: 'ASSERT_LISTS_ACTUAL',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'ASSERT_LISTS_EXPECTED',
        text: 'unset'
      }
    ]
  },
  ParameterizedBrick: {
    message0: '%{BKY_ASSERTION_PARAMETERIZED_HEAD}',
    message1: '%1',
    message2: '%{BKY_ASSERTION_PARAMETERIZED_BOTTOM}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
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
        type: 'field_input',
        name: 'ASSERT_LOOP_ACTUAL',
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
