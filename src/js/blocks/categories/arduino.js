import Blockly from "scratch-blocks";

Blockly.Blocks['ArduinoSendDigitalValueBrick'] = {
  init: function() {
    this.jsonInit({
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
      "category": Blockly.Categories.arduino,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoSendPWMValueBrick'] = {
  init: function() {
    this.jsonInit({
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
      "category": Blockly.Categories.arduino,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};
  