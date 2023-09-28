'use strict';

export default {
  ReadListFromDeviceBrick: {
    message0: '%{BKY_DATA_READLISTFROMDEVICE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'read_list_from_device_spinner',
        value_xpath: ['userList', 'name'],
        message_format: '%v',
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
  WriteListOnDeviceBrick: {
    message0: '%{BKY_DATA_WRITELISTONDEVICE}',
    args0: [
      {
        type: 'field_catblocksspinner',
        catroid_field_id: 'write_list_spinner',
        value_xpath: ['userList', 'name'],
        message_format: '%v',
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
  }
};
