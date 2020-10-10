#!/usr/bin/env node
/* eslint-env node */

/**
 * generate crowdin message file based on msg/*.json files, 
 * please run first create_msg_json.js if needed
 */

const fs = require('fs');
const path = require('path');

// please define config here
const SRC_DIR = path.join('src', 'library', 'js');
const MSG_DIR = path.join('i18n');
const JSON_DIR = path.join(MSG_DIR, 'json');
const MESSAGE_FILE = path.join(SRC_DIR, 'locales.json');

// generate main catblocks_msgs.js file
const message_fd = fs.openSync(MESSAGE_FILE, 'w');

// generate for each msg/*.json file a object in catblocks_msgs.js files
const langfiles = fs.readdirSync(JSON_DIR, { encoding: 'utf-8' });
fs.writeSync(message_fd, `{\n`);

let locals_str = '';

langfiles.forEach(langfile => {
  if (langfile.match(/.+\.json$/)) {
    const lang_name = langfile.substr(0, langfile.indexOf('.'));
    const json_path = path.join(JSON_DIR, langfile);
    const json_object = JSON.parse(fs.readFileSync(json_path, { encoding: 'utf-8' }));

    locals_str += `  "${lang_name}": {`;
    Object.keys(json_object).forEach(key => {
      if (key === 'DROPDOWN_NAME') {
        locals_str += ` "${key}": "${json_object[key]}" `;
      }
    });
    locals_str += `},\n`;
  }
});

locals_str = locals_str.trimRight();
locals_str = locals_str.substr(0, locals_str.length - 1);
fs.writeSync(message_fd, locals_str);

fs.writeSync(message_fd, `\n}\n`);
fs.closeSync(message_fd);
