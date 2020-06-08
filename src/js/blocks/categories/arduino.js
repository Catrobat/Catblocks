/**
 * @description arduino Catblocks bricks
 */

'use strict';

export default {
  "ArduinoSendDigitalValueBrick": {
    "message0": "%{BKY_ARDUINO_SENDDIGITALVALUE}",
    "args0": [
      {
        "type": "field_input",
        "name": "ARDUINO_DIGITAL_PIN_NUMBER",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "ARDUINO_DIGITAL_PIN_VALUE",
        "text": "unset"
      }
    ]
  },
  "ArduinoSendPWMValueBrick": {
    "message0": "%{BKY_ARDUINO_SENDPWMALVALUE}",
    "args0": [
      {
        "type": "field_input",
        "name": "ARDUINO_ANALOG_PIN_NUMBER",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "ARDUINO_ANALOG_PIN_VALUE",
        "text": "unset"
      }
    ]
  }
};