import Blockly from "scratch-blocks";

Blockly.Blocks['LegoEv3MotorTurnAngleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LEGOEV3_MOTORTURNANGLE}",
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
      "category": "legoEV3",
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};
  
Blockly.Blocks['LegoEv3MotorMoveBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LEGOEV3_MOTORMOVE}",
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
      "category": "legoEV3",
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};
  
Blockly.Blocks['LegoEv3MotorStopBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LEGOEV3_MOTORSTOP}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["A", "B"]
          ]
        }
      ],
      "category": "legoEV3",
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};
  
Blockly.Blocks['LegoEv3PlayToneBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LEGOEV3_PLAYTONE}",
      "args0": [
        {
          "type": "field_number",
          "name": "TIME",
          "value": 1
        },
        {
          "type": "field_number",
          "name": "FREQUENCY",
          "value": 2
        },
        {
          "type": "field_number",
          "name": "VOLUME",
          "value": 100
        }
      ],
      "category": "legoEV3",
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};
  
Blockly.Blocks['LegoEv3SetLedBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LEGOEV3_SETLED}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["Off", "Green"]
          ]
        }
      ],
      "category": "legoEV3",
      "extensions": ["colours_lego", "shape_statement"]
    });
  }
};