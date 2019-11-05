'use strict';

goog.provide('Blockly.Blocks.legoEV3');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['LegoEv3MotorTurnAngleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGOEV3_MOTORTURNANGLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["A", "B"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "text": "180"
        }
      ],
      "category": Blockly.Categories.legoEV3,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};

Blockly.Blocks['LegoEv3MotorMoveBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGOEV3_MOTORMOVE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["A", "B"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "text": "100"
        }
      ],
      "category": Blockly.Categories.legoEV3,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};

Blockly.Blocks['LegoEv3MotorStopBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGOEV3_MOTORSTOP,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["A", "B"]
          ]
        }
      ],
      "category": Blockly.Categories.legoEV3,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};

Blockly.Blocks['LegoEv3PlayToneBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGOEV3_PLAYTONE,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1",
          "value": 1
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "value": 2
        },
        {
          "type": "field_number",
          "name": "ARG3",
          "value": 100
        }
      ],
      "category": Blockly.Categories.legoEV3,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};

Blockly.Blocks['LegoEv3SetLedBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGOEV3_SETLED,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Off", "Green"]
          ]
        }
      ],
      "category": Blockly.Categories.legoEV3,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};

