import Blockly from "scratch-blocks";




Blockly.Blocks['StitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_STITCH}",
      "category": "stitch",
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};

Blockly.Blocks['RunningStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_STITCH_RUNNING}",
      "args0": [
        {
          "type": "field_number",
          "name": "EMBROIDERY_LENGTH",
          "value": 10
        }
      ],
      "category": "stitch",
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};


Blockly.Blocks['ZigZagStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_STITCH_ZIGZAG}",
      "args0": [
        {
          "type": "field_number",
          "name": "ZIGZAG_EMBROIDERY_LENGTH",
          "value": 2
        },
        {
          "type": "field_number",
          "name": "ZIGZAG_EMBROIDERY_WIDTH",
          "value": 10
        }
      ],
      "category": "stitch",
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};


Blockly.Blocks['TripleStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_STITCH_TRIPLE}",
      "args0": [
        {
          "type": "field_number",
          "name": "EMBROIDERY_LENGTH",
          "value": 10
        }
      ],
      "category": "stitch",
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};


Blockly.Blocks['StopRunningStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_STITCH_STOP}",
      "category": "stitch",
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};
