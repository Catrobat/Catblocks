#!/usr/bin/env node
/* eslint-env node */

/**
 * generate crowdin message file based on msg/*.json files, 
 * please run first create_msg_json.js if needed
 */

const fs = require('fs');
const path = require('path');

// please define config here
const SRC_DIR = path.join('src', 'library', 'ts', 'i18n');
const MESSAGE_FILE = path.join(SRC_DIR, 'Locale.ts');

const MSG_DIR = path.join('i18n');
const JSON_DIR = path.join(MSG_DIR, 'json');

// generate locales.ts file
const message_fd = fs.openSync(MESSAGE_FILE, 'w');

// read all json files
const langfiles = fs.readdirSync(JSON_DIR, { encoding: 'utf-8' });

let enum_values = '';
for (const languageFile of langfiles) {
  if (languageFile.match(/.+\.json$/)) {
    const lang_name = languageFile.substring(0, languageFile.indexOf('.'));

    const json_path = path.join(JSON_DIR, languageFile);
    const json_object = JSON.parse(fs.readFileSync(json_path, { encoding: 'utf-8' }));

    if (json_object.DROPDOWN_NAME) {
      enum_values += `  ${lang_name} = '${json_object.DROPDOWN_NAME}',\n`;
    }
  }
}

enum_values = enum_values.replace(/,\n$/, '');
fs.writeFileSync(message_fd, `export enum Locale {\n${enum_values}\n}\n`);
fs.closeSync(message_fd);
