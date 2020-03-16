/**
 * @description raspi Catblocks bricks
 */

'use strict';

export default {
  "WhenRaspiPinChangedBrick": {
    "message0": "%{BKY_RASPI_WHENPINCHANGED}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN2",
        "text": "new"
      }
    ]
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
    ]
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
    ]
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
    ]
  }
};