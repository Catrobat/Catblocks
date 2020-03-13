/**
 * @description raspi Catblocks bricks
 */

'use strict';

export default {
  "WhenRaspiPinChangedBrick": {
    "message0": "%{BKY_RASPI_WHENPINCHANGED}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DROPDOWN",
        "options": [
          ["3", "5"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "DROPDOWN2",
        "options": [
          ["high", "low"]
        ]
      }
    ],
    "category": "raspi",
    "extensions": ["colours_arduino", "shape_hat"]
  },
  "RaspiIfLogicBeginBrick": {
    "type": "IfThenLogicBeginBrick",
    "message0": "%{BKY_RASPI_IFLOGICBEGINIF}",
    "message1": "%1",
    "message2": "%{BKY_RASPI_IFLOGICBEGINELSE}",
    "message3": "%1",
    "args0": [
      {
        "type": "field_number",
        "name": "PIN",
        "value": 3
      }
    ],
    "args1": [
      {
        "type": "input_statement",
        "name": "SUBSTACK"
      }
    ],
    "args3": [
      {
        "type": "input_statement",
        "name": "SUBSTACK2"
      }
    ],
    "category": "raspi",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "RaspiSendDigitalValueBrick": {
    "message0": "%{BKY_RASPI_SENDDIGITALVALUE}",
    "args0": [
      {
        "type": "field_number",
        "name": "PIN1",
        "value": 3
      },
      {
        "type": "field_number",
        "name": "PIN2",
        "value": 1
      }
    ],
    "category": "raspi",
    "extensions": ["colours_arduino", "shape_statement"]
  },
  "RaspiPwmBrick": {
    "message0": "%{BKY_RASPI_PWM}",
    "args0": [
      {
        "type": "field_number",
        "name": "PIN",
        "value": 3
      },
      {
        "type": "field_number",
        "name": "PERCENT",
        "value": 50
      },
      {
        "type": "field_number",
        "name": "HERTZ",
        "value": 100
      }
    ],
    "category": "raspi",
    "extensions": ["colours_arduino", "shape_statement"]
  }
};