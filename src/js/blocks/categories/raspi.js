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
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "DROPDOWN2",
        "text": "unset"
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
        "text": "unset"
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
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "RASPI_DIGITAL_PIN_VALUE",
        "text": "unset"
      }
    ]
  },
  "RaspiPwmBrick": {
    "message0": "%{BKY_RASPI_PWM}",
    "args0": [
      {
        "type": "field_input",
        "name": "RASPI_DIGITAL_PIN_NUMBER",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "RASPI_PWM_PERCENTAGE",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "RASPI_PWM_FREQUENCY",
        "text": "unset"
      }
    ]
  }
};