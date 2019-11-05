'use strict';

goog.provide('Blockly.Blocks.jumpingSumo');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['JumpingSumoMoveForwardBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_MOVEFORWARD,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1"
        },
        {
          "type": "field_number",
          "name": "ARG2"
        }
      ],
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoMoveBackwardBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_MOVEBACKWARD,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1"
        },
        {
          "type": "field_number",
          "name": "ARG2"
        }
      ],
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoAnimationsBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_ANIMATION,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Spin", "Tab"]
          ]
        }
      ],
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};


Blockly.Blocks['JumpingSumoSoundBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_SOUND,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ARG1",
          "options": [
            ["Normal", "Robot"]
          ]
        },
        {
          "type": "field_number",
          "name": "ARG2",
          "text": "50"
        }
      ],
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoNoSoundBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_NOSOUND,
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoJumpLongBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_JUMPLONG,
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};


Blockly.Blocks['JumpingSumoJumpHighBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_JUMPHIGH,
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoRotateLeftBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_ROTATELEFT,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1",
          "value": 90
        }
      ],
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoRotateRightBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_ROTATERIGHT,
      "args0": [
        {
          "type": "field_number",
          "name": "ARG1",
          "value": 90
        }
      ],
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoTurnBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_TURN,
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};

Blockly.Blocks['JumpingSumoTakingPictureBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SUMO_TAKINGPICTURE,
      "category": Blockly.Categories.jumpingSumo,
      "extensions": ["colours_drone", "shape_statement"]
    });
  }
};
