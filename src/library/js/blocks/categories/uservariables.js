'use strict';

export default {
  SetVariableBrick: {
    message0: '%{BKY_DATA_SETVARIABLETOCAT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'set_variable_spinner',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'VARIABLE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'VARIABLE_INFO'
      }
    ]
  },
  ChangeVariableBrick: {
    message0: '%{BKY_DATA_CHANGEVARIABLEBY}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'change_variable_spinner',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'VARIABLE_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'VARIABLE_CHANGE_INFO'
      }
    ]
  },
  ShowTextBrick: {
    message0: '%{BKY_DATA_SHOWVARIABLEAT}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'show_variable_spinner',
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
      },
      {
        type: 'field_catblockstext',
        name: 'X_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'Y_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_INFO'
      }
    ]
  },
  ShowTextColorSizeAlignmentBrick: {
    message0: '%{BKY_DATA_SHOWVARIABLEATSIZECOLORALIGNED}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'show_variable_color_size_spinner',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'X_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'Y_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'SIZE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SIZE_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'COLOR',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'COLOR_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_show_variable_color_size_align_spinner',
        name: 'ALIGNMENT'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'ALIGNMENT_INFO'
      }
    ]
  },
  DeleteItemOfUserListBrick: {
    message0: '%{BKY_DATA_DELETEITEMFROMLIST}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'delete_item_of_userlist_spinner',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'LIST_DELETE_ITEM',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LIST_DELETE_ITEM_INFO'
      }
    ]
  },
  AddItemToUserListBrick: {
    message0: '%{BKY_DATA_ADDTOLIST}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'LIST_ADD_ITEM',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'LIST_ADD_ITEM_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'add_item_to_userlist_spinner',
        name: 'DROPDOWN'
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
  InsertItemIntoUserListBrick: {
    message0: '%{BKY_DATA_INSERTINTOLIST}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'INSERT_ITEM_INTO_USERLIST_VALUE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'INSERT_ITEM_INTO_USERLIST_VALUE_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'insert_item_into_userlist_spinner',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'INSERT_ITEM_INTO_USERLIST_INDEX',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'INSERT_ITEM_INTO_USERLIST_INDEX_INFO'
      }
    ]
  },
  ReplaceItemInUserListBrick: {
    message0: '%{BKY_DATA_REPLACEITEMINLIST}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'replace_item_in_userlist_spinner',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'REPLACE_ITEM_IN_USERLIST_INDEX',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'REPLACE_ITEM_IN_USERLIST_INDEX_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'REPLACE_ITEM_IN_USERLIST_VALUE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'REPLACE_ITEM_IN_USERLIST_VALUE_INFO'
      }
    ]
  },
  HideTextBrick: {
    message0: '%{BKY_DATA_HIDEVARIABLE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'hide_variable_spinner',
        name: 'DROPDOWN'
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
  ReadVariableFromDeviceBrick: {
    message0: '%{BKY_DATA_READVARIABLE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'read_variable_from_device_spinner',
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
  WriteVariableOnDeviceBrick: {
    message0: '%{BKY_DATA_WRITEVARIABLE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'write_variable_spinner',
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
  StoreCSVIntoUserListBrick: {
    message0: '%{BKY_DATA_STORECSVINTOUSERLIST}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'STORE_CSV_INTO_USERLIST_COLUMN',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STORE_CSV_INTO_USERLIST_COLUMN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'STORE_CSV_INTO_USERLIST_CSV',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STORE_CSV_INTO_USERLIST_CSV_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_store_csv_into_userlist_spinner',
        name: 'DROPDOWN'
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
  ClearUserListBrick: {
    message0: '%{BKY_DATA_CLEARUSERLIST}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'clear_userlist_spinner',
        name: 'DROPDOWN'
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
  WebRequestBrick: {
    message0: '%{BKY_DATA_WEBREQUEST}',
    args0: [
      {
        type: 'field_catblockstext',
        name: 'WEB_REQUEST',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'WEB_REQUEST_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'web_request_spinner',
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
  ReadVariableFromFileBrick: {
    message0: '%{BKY_DATA_READ_VARIABLE_FROM_FILE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_read_variable_from_file_spinner_variable',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'READ_FILENAME',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'READ_FILENAME_INFO'
      },
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_read_variable_from_file_spinner_mode',
        name: 'SPINNER'
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
  WriteVariableToFileBrick: {
    message0: '%{BKY_DATA_WRITE_VARIABLE_TO_FILE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'brick_write_variable_to_file_spinner',
        name: 'DROPDOWN'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      },
      {
        type: 'field_catblockstext',
        name: 'WRITE_FILENAME',
        text: 'unset'
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
  }
};
