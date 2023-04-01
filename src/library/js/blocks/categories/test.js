'use strict';

export default {
  FinishStageBrick: {
    message0: '%{BKY_ASSERTION_FINISH_TESTS}'
  },
  AssertEqualsBrick: {
    message0: '%{BKY_ASSERTION_ASSERT_EQUALS}',
    args0: [
      {
        type: 'field_catblockstext',
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
        type: 'field_catblockstext',
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
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_assert_lists_actual',
        name: 'ASSERT_LISTS_ACTUAL'
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
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_assert_lists_expected',
        name: 'ASSERT_LISTS_EXPECTED'
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
        type: 'field_catblockstext',
        name: 'CATBLOCKS_ASSERT_LISTS_SELECTED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'CATBLOCKS_ASSERT_LISTS_SELECTED_INFO'
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
        type: 'field_catblockstext',
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
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_param_expected_list',
        name: 'LIST_SELECTED'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LIST_SELECTED_INFO'
      }
    ]
  }
};
