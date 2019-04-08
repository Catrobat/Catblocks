/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.motion');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

//Cat Blocks
Blockly.Blocks['PlaceAtBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_PLACEATXY,
      "args0": [
        {
          "type": "input_value",
          "name": "X_POSITION"
        },
        {
          "type": "input_value",
          "name": "Y_POSITION"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['SetXBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETXTO,
      "args0": [
        {
          "type": "input_value",
          "name": "X_POSITION"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetYBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETYTO,
      "args0": [
        {
          "type": "input_value",
          "name": "Y_POSITION"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeXByNBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_CHANGEXBY,
      "args0": [
        {
          "type": "input_value",
          "name": "X_POSITION_CHANGE"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['ChangeYByNBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_CHANGEYBY,
      "args0": [
        {
          "type": "input_value",
          "name": "Y_POSITION_CHANGE"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_goto_menu'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TO",
          "options": [
            ["touch position"],
            ["random position"]
          ]
        }
      ],
      "colour": Blockly.Colours.motion.secondary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary,
      "extensions": ["output_string"]
    });
  }
};



Blockly.Blocks['GoToBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOTO,
      "args0": [
        {
          "type": "input_value",
          "name": "TO"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['IfOnEdgeBounceBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_IFONEDGEBOUNCE,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['MoveNStepsBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_MOVESTEPS,
      "args0": [
        {
          "type": "input_value",
          "name": "STEPS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnRightBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNRIGHTDEGREES,
      "args0": [
        {
          "type": "input_value",
          "name": "TURN_RIGHT_DEGREES"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnLeftBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNLEFTDEGREES,
      "args0": [
        {
          "type": "input_value",
          "name": "TURN_LEFT_DEGREES"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['PointInDirectionBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_POINTINDIRECTIONDEGREES,
      "args0": [
        {
          "type": "input_value",
          "name": "DEGREES"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_pointtowards_menu'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TOWARDS",
          "options": [
            ["new..."]
          ]
        }
      ],
      "colour": Blockly.Colours.motion.secondary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['PointToBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_POINTTOWARDS,
      "args0": [
        {
          "type": "input_value",
          "name": "TOWARDS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetRotationStyleBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETROTATIONSTYLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "STYLE",
          "options": [
            ["left-right only"],
            ["all-around"],
            ["don't rotate"]
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['GlideToBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GLIDESECONDTOXY,
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION_IN_SECONDS"
        },
        {
          "type": "input_value",
          "name": "X_DESTINATION"
        },
        {
          "type": "input_value",
          "name": "Y_DESTINATION"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['GoNStepsBackBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOBACKLAYER,
      "args0": [
        {
          "type": "input_value",
          "name": "STEPS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['ComeToFrontBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOTOFRONT,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['VibrationBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_VIBRATEFORSECOND,
      "args0": [
        {
          "type": "input_value",
          "name": "VIBRATE_DURATION_IN_SECONDS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_setyourmotiontypeto_menu'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TOWARDS",
          "options": [
            ["moving and bouncing under gravity"],
            ["not moving under gravity, but others bounce of you under gravity"],
            ["not moving or bouncing under gravitiy (default)"]
          ]
        }
      ],
      "colour": Blockly.Colours.motion.secondary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['SetPhysicsObjectTypeBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETYOURMOTIONTYPETO,
      "args0": [
        {
          "type": "input_value",
          "name": "TOWARDS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};



Blockly.Blocks['SetVelocityBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETVELOCITYTO,
      "args0": [
        {
          "type": "input_value",
          "name": "PHYSICS_VELOCITY_X"
        },
        {
          "type": "input_value",
          "name": "PHYSICS_VELOCITY_Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnLeftSpeedBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SPINLEFTDEGREESSECOND,
      "args0": [
        {
          "type": "input_value",
          "name": "PHYSICS_TURN_LEFT_SPEED"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['TurnRightSpeedBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SPINRIGHTDEGREESSECOND,
      "args0": [
        {
          "type": "input_value",
          "name": "PHYSICS_TURN_RIGHT_SPEED"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['SetGravityBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETGRAVITYFORALLACTORSANDOBJECTSTO,
      "args0": [
        {
          "type": "input_value",
          "name": "PHYSICS_GRAVITY_X"
        },
        {
          "type": "input_value",
          "name": "PHYSICS_GRAVITY_Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['SetMassBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETMASSTOKILOGRAM,
      "args0": [
        {
          "type": "input_value",
          "name": "PHYSICS_MASS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetBounceBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETBOUNCEFACTORTO,
      "args0": [
        {
          "type": "input_value",
          "name": "PHYSICS_BOUNCE_FACTOR"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['SetFrictionBrick'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETFRICTIONTO,
      "args0": [
        {
          "type": "input_value",
          "name": "PHYSICS_FRICTION"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


//Scratch Blocks


Blockly.Blocks['motion_turnright'] = {
  /**
   * Block to turn right.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNRIGHT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "rotate-right.svg",
          "width": 24,
          "height": 24
        },
        {
          "type": "input_value",
          "name": "DEGREES"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_turnleft'] = {
  /**
   * Block to turn left.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNLEFT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "rotate-left.svg",
          "width": 24,
          "height": 24
        },
        {
          "type": "input_value",
          "name": "DEGREES"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_pointindirection'] = {
  /**
   * Block to point in direction.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_POINTINDIRECTION,
      "args0": [
        {
          "type": "input_value",
          "name": "DIRECTION"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};




Blockly.Blocks['motion_gotoxy'] = {
  /**
   * Block to go to X, Y.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOTOXY,
      "args0": [
        {
          "type": "input_value",
          "name": "X"
        },
        {
          "type": "input_value",
          "name": "Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['motion_glidesecstoxy'] = {
  /**
   * Block to glide for a specified time.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GLIDESECSTOXY,
      "args0": [
        {
          "type": "input_value",
          "name": "SECS"
        },
        {
          "type": "input_value",
          "name": "X"
        },
        {
          "type": "input_value",
          "name": "Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_glideto_menu'] = {
  /**
   * Glide to drop-down menu
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TO",
          "options": [
            [Blockly.Msg.MOTION_GLIDETO_POINTER, '_mouse_'],
            [Blockly.Msg.MOTION_GLIDETO_RANDOM, '_random_']
          ]
        }
      ],
      "colour": Blockly.Colours.motion.secondary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['motion_glideto'] = {
  /**
   * Block to glide to a menu item
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GLIDETO,
      "args0": [
        {
          "type": "input_value",
          "name": "SECS"
        },
        {
          "type": "input_value",
          "name": "TO"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};



Blockly.Blocks['motion_setx'] = {
  /**
   * Block to set X.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETX,
      "args0": [
        {
          "type": "input_value",
          "name": "X"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['motion_sety'] = {
  /**
   * Block to set Y.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETY,
      "args0": [
        {
          "type": "input_value",
          "name": "Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};



Blockly.Blocks['motion_xposition'] = {
  /**
   * Block to report X.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_XPOSITION,
      "category": Blockly.Categories.motion,
      "checkboxInFlyout": true,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_yposition'] = {
  /**
   * Block to report Y.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_YPOSITION,
      "category": Blockly.Categories.motion,
      "checkboxInFlyout": true,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_direction'] = {
  /**
   * Block to report direction.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_DIRECTION,
      "category": Blockly.Categories.motion,
      "checkboxInFlyout": true,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_scroll_right'] = {
  /**
   * Block to scroll the stage right. Does not actually do anything. This is
   * an obsolete block that is implemented for compatibility with Scratch 2.0
   * projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SCROLLRIGHT,
      "args0": [
        {
          "type": "input_value",
          "name": "DISTANCE"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_scroll_up'] = {
  /**
   * Block to scroll the stage up. Does not actually do anything. This is an
   * obsolete block that is implemented for compatibility with Scratch 2.0
   * projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SCROLLUP,
      "args0": [
        {
          "type": "input_value",
          "name": "DISTANCE"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_align_scene'] = {
  /**
   * Block to change the stage's scrolling alignment. Does not actually do
   * anything. This is an obsolete block that is implemented for compatibility
   * with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_ALIGNSCENE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ALIGNMENT",
          "options": [
            [Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMLEFT, 'bottom-left'],
            [Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMRIGHT, 'bottom-right'],
            [Blockly.Msg.MOTION_ALIGNSCENE_MIDDLE, 'middle'],
            [Blockly.Msg.MOTION_ALIGNSCENE_TOPLEFT, 'top-left'],
            [Blockly.Msg.MOTION_ALIGNSCENE_TOPRIGHT, 'top-right']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_xscroll'] = {
  /**
   * Block to report the stage's scroll position's X value. Does not actually
   * do anything. This is an obsolete block that is implemented for
   * compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_XSCROLL,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_yscroll'] = {
  /**
   * Block to report the stage's scroll position's Y value. Does not actually
   * do anything. This is an obsolete block that is implemented for
   * compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_YSCROLL,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};
