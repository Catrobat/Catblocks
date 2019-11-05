'use strict';

goog.provide('Blockly.Blocks.legoNXT');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['LegoNxtMotorTurnAngleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGONXT_MOTORTURNANGLE,
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
      "category": Blockly.Categories.legoNXT,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};


Blockly.Blocks['LegoNxtMotorStopBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGONXT_MOTORSTOP,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["A", "B"]
          ]
        }
      ],
      "category": Blockly.Categories.legoNXT,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};


Blockly.Blocks['LegoNxtMotorMoveBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGONXT_MOTORMOVE,
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
      "category": Blockly.Categories.legoNXT,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};

Blockly.Blocks['LegoNxtPlayToneBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGONXT_PLAYTONE,
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
        }
      ],
      "category": Blockly.Categories.legoNXT,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};
