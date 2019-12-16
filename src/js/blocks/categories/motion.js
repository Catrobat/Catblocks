import Blockly from "scratch-blocks";

Blockly.Blocks['PlaceAtBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_PLACEATXY,
      "args0": [
        {
          "type": "field_number",
          "name": "X_POSITION",
          "value": 100
        },
        {
          "type": "field_number",
          "name": "Y_POSITION",
          "value": 200
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['SetXBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETXTO,
      "args0": [
        {
          "type": "field_number",
          "name": "X_POSITION",
          "value": 100
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetYBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETYTO,
      "args0": [
        {
          "type": "field_number",
          "name": "Y_POSITION",
          "value": 200
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeXByNBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_CHANGEXBY,
      "args0": [
        {
          "type": "field_number",
          "name": "X_POSITION_CHANGE",
          "value": 100
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeYByNBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_CHANGEYBY,
      "args0": [
        {
          "type": "field_number",
          "name": "Y_POSITION_CHANGE",
          "value": 200
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['GoToBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOTO,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["touch position", "TOUCH"]
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['IfOnEdgeBounceBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_IFONEDGEBOUNCE,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['MoveNStepsBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_MOVESTEPS,
      "args0": [
        {
          "type": "field_number",
          "name": "STEPS",
          "value": 10
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnRightBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNRIGHTDEGREES,
      "args0": [
        {
          "type": "field_number",
          "name": "TURN_RIGHT_DEGREES",
          "value": 15
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnLeftBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNLEFTDEGREES,
      "args0": [
        {
          "type": "field_number",
          "name": "TURN_LEFT_DEGREES",
          "value": 15
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['PointInDirectionBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_POINTINDIRECTIONDEGREES,
      "args0": [
        {
          "type": "field_number",
          "name": "DEGREES",
          "value": 0
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['PointToBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_POINTTOWARDS,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["new...", "NEW"]
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetRotationStyleBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETROTATIONSTYLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["left-right only", "RIGHTLEFT"]
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['GlideToBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GLIDESECONDTOXY,
      "args0": [
        {
          "type": "field_number",
          "name": "DURATION_IN_SECONDS",
          "value": 1
        },
        {
          "type": "field_number",
          "name": "X_DESTINATION",
          "value": 100
        },
        {
          "type": "field_number",
          "name": "Y_DESTINATION",
          "value": 200
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['GoNStepsBackBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOBACKLAYER,
      "args0": [
        {
          "type": "field_number",
          "name": "STEPS",
          "value": 1
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['ComeToFrontBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOTOFRONT,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['VibrationBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_VIBRATEFORSECOND,
      "args0": [
        {
          "type": "field_number",
          "name": "VIBRATE_DURATION_IN_SECONDS",
          "value": 1
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetPhysicsObjectTypeBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETYOURMOTIONTYPETO,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DROPDOWN",
          "options": [
            ["moving and bounce", "TOIT"]
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};



Blockly.Blocks['SetVelocityBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETVELOCITYTO,
      "args0": [
        {
          "type": "field_number",
          "name": "PHYSICS_VELOCITY_X",
          "value": 0
        },
        {
          "type": "field_number",
          "name": "PHYSICS_VELOCITY_Y",
          "value": 0
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnLeftSpeedBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SPINLEFTDEGREESSECOND,
      "args0": [
        {
          "type": "field_number",
          "name": "PHYSICS_TURN_LEFT_SPEED",
          "value": 15
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnRightSpeedBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SPINRIGHTDEGREESSECOND,
      "args0": [
        {
          "type": "field_number",
          "name": "PHYSICS_TURN_RIGHT_SPEED",
          "value": 15
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['SetGravityBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETGRAVITYFORALLACTORSANDOBJECTSTO,
      "args0": [
        {
          "type": "field_number",
          "name": "PHYSICS_GRAVITY_X",
          "value": 0
        },
        {
          "type": "field_number",
          "name": "PHYSICS_GRAVITY_Y",
          "value": 0
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['SetMassBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETMASSTOKILOGRAM,
      "args0": [
        {
          "type": "field_number",
          "name": "PHYSICS_MASS",
          "value": 1
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBounceBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETBOUNCEFACTORTO,
      "args0": [
        {
          "type": "field_number",
          "name": "PHYSICS_BOUNCE_FACTOR",
          "value": 80
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetFrictionBrick'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETFRICTIONTO,
      "args0": [
        {
          "type": "field_number",
          "name": "PHYSICS_FRICTION",
          "value": 80
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};
