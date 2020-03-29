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
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN2",
        "text": "DEFAULT_VALUE"
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
        "type": "field_input",
        "name": "IF_CONDITION",
        "text": "DEFAULT_VALUE"
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
        "type": "field_input",
        "name": "RASPI_DIGITAL_PIN_NUMBER",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "RASPI_DIGITAL_PIN_VALUE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "RaspiPwmBrick": {
    "message0": "%{BKY_RASPI_PWM}",
    "args0": [
      {
        "type": "field_input",
        "name": "RASPI_DIGITAL_PIN_NUMBER",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "RASPI_PWM_PERCENTAGE",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "RASPI_PWM_FREQUENCY",
        "text": "DEFAULT_VALUE"
      }
    ]
  }
};