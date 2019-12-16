import Blockly from "scratch-blocks";

Blockly.Blocks['StartScript'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_WHENSCENESTARTS,
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_hat"]
		});
	}
};

Blockly.Blocks['WhenScript'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_WHENTAPPED,
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_hat"],
			"args0": []
		});
	}
};

Blockly.Blocks['WhenTouchDownScript'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_WHENSTAGEISTAPPED,
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_hat"]
		});
	}
};

Blockly.Blocks['BroadcastScript'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_WHENYOURECEIVE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "DROPDOWN",
					"options": [
						["new...", "NEW"]
					]
				}
			],
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_hat"]
		});
	}
};


Blockly.Blocks['BroadcastBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_BROADCAST_CB,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "DROPDOWN",
					"options": [
						["new...", "NEW"]
					]
				}
			],
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_statement"]
		});
	}
};


Blockly.Blocks['BroadcastWaitBrick'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_BROADCASTANDWAIT_CB,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "DROPDOWN",
					"options": [
						["new...", "NEW"]
					]
				}
			],
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_statement"]
		});
	}
};



Blockly.Blocks['WhenConditionScript'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_WHENBECOMESTRUE,
			"args0": [
				{
					"type": "field_input",
					"name": "IF_CONDITION",
					"text": "1 < 2"
				}
			],
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_hat"]
		});
	}
};

Blockly.Blocks['WhenBounceOffScript'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_WHENYOUBOUNCEOFF,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "DROPDOWN",
					"options": [
						["any edge, actor, or object", "EDGE"]
					]
				}
			],
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_hat"]
		});
	}
};

Blockly.Blocks['WhenBackgroundChangesScript'] = {
	init: function () {
		this.jsonInit({
			"message0": Blockly.Msg.EVENT_WHENBACKGROUNDCHANGES,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "DROPDOWN",
					"options": [
						["new...", "NEW"]
					]
				}
			],
			"category": Blockly.Categories.event,
			"extensions": ["colours_event", "shape_hat"]
		});
	}
};
