import Blockly from "scratch-blocks";

Blockly.Blocks['SetLookBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SWITCHTOLOOK}",
      "args0": [
        {
          "type": "field_input",
          "name": "look",
          "text": "newLook"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetLookByIndexBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SWITCHTOLOOKWITHNUMBER}",
      "args0": [
        {
          "type": "field_number",
          "name": "LOOK_INDEX",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['NextLookBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_NEXTLOOK}",
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['PreviousLookBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_PREVIOUSLOOK}",
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetSizeToBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETSIZETO}",
      "args0": [
        {
          "type": "field_number",
          "name": "SIZE",
          "value": 60
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['HideBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_HIDE}",
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ShowBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SHOW}",
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['AskBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_ASKANDSTOREWRITTENANSWERIN}",
      "args0": [
        {
          "type": "field_input",
          "name": "ASK_QUESTION",
          "text": "What's your name?"
        },
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SayBubbleBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SAY_CAT}",
      "args0": [
        {
          "type": "field_input",
          "name": "SAY_BRICK",
          "text": "Hello!"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SayForBubbleBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SAYFORSECOND}",
      "args0": [
        {
          "type": "field_input",
          "name": "STRING",
          "text": "Hello!"
        },
        {
          "type": "field_number",
          "name": "DURATION_IN_SECONDS",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ThinkBubbleBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_THINK_CAT}",
      "args0": [
        {
          "type": "field_input",
          "name": "THINK_BRICK",
          "text": "Hmmmm!"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ThinkForBubbleBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_THINKFORSECONDS}",
      "args0": [
        {
          "type": "field_input",
          "name": "THINK_BRICK",
          "text": "Hmmmm!"
        },
        {
          "type": "field_number",
          "name": "DURATION_IN_SECONDS",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetTransparencyBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETTRANSPARENCYTO}",
      "args0": [
        {
          "type": "field_number",
          "name": "TRANSPARENCY",
          "value": 50
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeSizeByNBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_CHANGESIZEBY}",
      "args0": [
        {
          "type": "field_number",
          "name": "SIZE_CHANGE",
          "value": 10
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeTransparencyByNBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_CHANGETRANSPARENCYBY}",
      "args0": [
        {
          "type": "field_number",
          "name": "TRANSPARENCY_CHANGE",
          "value": 10
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBrightnessBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETBRIGHTHNESSTO}",
      "args0": [
        {
          "type": "field_number",
          "name": "BRIGHTNESS",
          "value": 20
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeBrightnessByNBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_CHANGEBRIGHTHNESSBY}",
      "args0": [
        {
          "type": "field_number",
          "name": "BRIGHTNESS_CHANGE",
          "value": 50
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetColorBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETCOLORTO}",
      "args0": [
        {
          "type": "field_number",
          "name": "COLOR",
          "value": 0
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeColorByNBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_CHANGECOLORBY}",
      "args0": [
        {
          "type": "field_number",
          "name": "COLOR_CHANGE",
          "value": 0
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ClearGraphicEffectBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_CLEARGRAPHICEFFECTS_CAT}",
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETBACKGROUND}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundByIndexBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBER}",
      "args0": [
        {
          "type": "field_number",
          "name": "LOOK_INDEX",
          "value": 1
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundAndWaitBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETBACKGROUNDANDWAIT}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBackgroundByIndexAndWaitBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_SETBACKGROUNDTONUMBERANDWAIT}",
      "args0": [
        {
          "type": "field_number",
          "name": "LOOK_INDEX",
          "value": 10
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['CameraBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_TURNCAMERA}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["on", "ON"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChooseCameraBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_USECAMERA}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["front", "FRONT"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['FlashBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": "%{BKY_LOOKS_TURNFLASHLIGHT}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["on", "ON"]
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};
