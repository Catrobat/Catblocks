import Blockly from "scratch-blocks";

Blockly.Blocks['LegoNxtMotorTurnAngleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LEGONXT_MOTORTURNANGLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["A", "B"]
          ]
        },
        {
          "type": "field_number",
          "name": "VARIABLE",
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
          "name": "DROPDOWN",
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
          "name": "DROPDOWN",
          "options": [
            ["A", "B"]
          ]
        },
        {
          "type": "field_number",
          "name": "VARIABLE",
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
          "name": "SECONDS",
          "value": 1
        },
        {
          "type": "field_number",
          "name": "FREQUENCY",
          "value": 2
        }
      ],
      "category": Blockly.Categories.legoNXT,
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};
  