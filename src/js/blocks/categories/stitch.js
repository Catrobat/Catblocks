import Blockly from "scratch-blocks";




Blockly.Blocks['StitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.STITCH,
      "category": Blockly.Categories.stitch,
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};

Blockly.Blocks['RunningStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.STITCH_RUNNING,
      "args0": [
        {
          "type": "field_number",
          "name": "EMBROIDERY_LENGTH",
          "value": 10
        }
      ],
      "category": Blockly.Categories.stitch,
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};


Blockly.Blocks['ZigZagStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.STITCH_ZIGZAG,
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
      "category": Blockly.Categories.stitch,
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};


Blockly.Blocks['TripleStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.STITCH_TRIPLE,
      "args0": [
        {
          "type": "field_number",
          "name": "EMBROIDERY_LENGTH",
          "value": 10
        }
      ],
      "category": Blockly.Categories.stitch,
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};


Blockly.Blocks['StopRunningStitchBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.STITCH_STOP,
      "category": Blockly.Categories.stitch,
      "extensions": ["colours_stitch", "shape_statement"]
    });
  }
};