import Blockly from "scratch-blocks";

Blockly.Blocks['PenDownBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.PEN_PENDOWN,
			"category": Blockly.Categories.operators,
			"extensions": ["colours_pen", "shape_statement"]
		});
	}
};


Blockly.Blocks['PenUpBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.PEN_PENUP,
			"category": Blockly.Categories.operators,
			"extensions": ["colours_pen", "shape_statement"]
		});
	}
};

Blockly.Blocks['SetPenSizeBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.PEN_SETPENSIZETO,
			"args0": [
				{
					"type": "field_number",
					"name": "PEN_SIZE",
					"value": 3.15
				}
			],
			"category": Blockly.Categories.motion,
			"extensions": ["colours_pen", "shape_statement"]
		});
	}
};

Blockly.Blocks['SetPenColorBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.PEN_SETPENCOLORTO,
			"args0": [
				{
					"type": "field_number",
					"name": "PEN_COLOR_RED",
					"value": 255
				},
				{
					"type": "field_number",
					"name": "PEN_COLOR_GREEN",
					"value": 255
				},
				{
					"type": "field_number",
					"name": "PEN_COLOR_BLUE",
					"value": 255
				}
			],
			"category": Blockly.Categories.motion,
			"extensions": ["colours_pen", "shape_statement"]
		});
	}
};

Blockly.Blocks['StampBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.PEN_STAMP,
			"category": Blockly.Categories.operators,
			"extensions": ["colours_pen", "shape_statement"]
		});
	}
};

Blockly.Blocks['ClearBackgroundBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.PEN_CLEAR,
			"category": Blockly.Categories.operators,
			"extensions": ["colours_pen", "shape_statement"]
		});
	}
};
