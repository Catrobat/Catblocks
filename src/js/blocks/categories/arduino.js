/**
 * @description arduino Catblocks bricks
 */

'use strict';

export default {
  "ArduinoSendDigitalValueBrick": {
    "message0": "%{BKY_ARDUINO_SENDDIGITALVALUE}",
    "args0": [
      {
        "type": "field_number",
        "name": "DIGITAL_PIN",
        "value": 4
      },
      {
        "type": "field_number",
        "name": "DIGITAL_PIN_VALUE",
        "value": 2
      }
    ],
    "category": "arduino",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "ArduinoSendPWMValueBrick":
  {
    "message0": "%{BKY_ARDUINO_SENDPWMALVALUE}",
    "args0": [
      {
        "type": "field_number",
        "name": "PWM_PIN",
        "value": 4
      },
      {
        "type": "field_number",
        "name": "PWM_PIN_VALUE",
        "value": 2
      }
    ],
    "category": "arduino",
    "extensions": ["colours_arduino", "shape_statement"]
  }
};