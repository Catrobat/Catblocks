'use strict';

goog.provide('Blockly.Blocks.arduino');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['ArduinoSendDigitalValueBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SENDDIGITALVALUE,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1",
          "value": 4
        },
        {
          "type": "field_number",
          "name": "ARG2",
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
      "message0": Blockly.Msg.ARDUINO_SENDPWMALVALUE,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1",
          "value": 4
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 2
        }
      ],
      "category": Blockly.Categories.arduino,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};
