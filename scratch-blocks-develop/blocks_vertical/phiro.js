'use strict';

goog.provide('Blockly.Blocks.phiro');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['PhiroMotorMoveForwardBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PHIRO_MOTORMOVEFORWARD,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Left", "Right"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 100
        }
      ],
      "category": Blockly.Categories.phiro,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['PhiroMotorMoveBackwardBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PHIRO_MOTORMOVEBACKWARD,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Left", "Right"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 100
        }
      ],
      "category": Blockly.Categories.phiro,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['PhiroMotorStopBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PHIRO_MOTORSTOP,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Left", "Right"]
          ]
        }
      ],
      "category": Blockly.Categories.phiro,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['PhiroPlayToneBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PHIRO_PLAYTONE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Do", "Re"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 1
        }
      ],
      "category": Blockly.Categories.phiro,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['PhiroRGBLightBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PHIRO_RGBLIGHT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Left", "Right","Both"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 0
        },
        {
          "type": "field_number",
          "name": "ARG3",
          "value": 255
        },
        {
          "type": "field_number",
          "name": "ARG4",
          "value": 255
        }
      ],
      "category": Blockly.Categories.phiro,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};

Blockly.Blocks['PhiroIfLogicBeginBrick'] = {
  init: function() {
    this.jsonInit({
      "type": "IfThenLogicBeginBrick",
      "message0": Blockly.Msg.PHIRO_IFLOGICBEGINIF,
      "message1": "%1",
      "message2": Blockly.Msg.PHIRO_IFLOGICBEGINELSE,
      "message3": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Front Left Sensor", "Front Right Sensor","Side Left Sensor"]
          ]
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
      "category": Blockly.Categories.phiro,
      "extensions": ["colours_arduino", "shape_statement"]
    });
  }
};
