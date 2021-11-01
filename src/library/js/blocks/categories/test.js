'use strict';

export default {
  FinishStageBrick: {
    message0: '%{BKY_ASSERTION_FINISH_TESTS}'
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
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ASSERT_EQUALS_ACTUAL_INFO'
      },
      {
        type: 'field_input',
        name: 'ASSERT_EQUALS_EXPECTED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ASSERT_EQUALS_EXPECTED_INFO'
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
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ASSERT_LISTS_ACTUAL_INFO'
      },
      {
        type: 'field_input',
        name: 'ASSERT_LISTS_EXPECTED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ASSERT_LISTS_EXPECTED_INFO'
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
        type: 'field_input',
        name: 'ASSERT_LOOP_ACTUAL',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ASSERT_LOOP_ACTUAL_INFO'
      },
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
  }
};
