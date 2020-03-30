/**
 * @description motion Catblocks bricks
 */

'use strict';

export default {
  "PlaceAtBrick": {
    "message0": "%{BKY_MOTION_PLACEATXY}",
    "args0": [
      {
        "type": "field_input",
        "name": "X_POSITION",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetXBrick": {
    "message0": "%{BKY_MOTION_SETXTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "X_POSITION",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetYBrick": {
    "message0": "%{BKY_MOTION_SETYTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeXByNBrick": {
    "message0": "%{BKY_MOTION_CHANGEXBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "X_POSITION_CHANGE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ChangeYByNBrick": {
    "message0": "%{BKY_MOTION_CHANGEYBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "Y_POSITION_CHANGE",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "GoToBrick": {
    "message0": "%{BKY_MOTION_GOTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPINNER",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "IfOnEdgeBounceBrick": {
    "message0": "%{BKY_MOTION_IFONEDGEBOUNCE}"
  },
  "MoveNStepsBrick": {
    "message0": "%{BKY_MOTION_MOVESTEPS}",
    "args0": [
      {
        "type": "field_input",
        "name": "STEPS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "TurnRightBrick": {
    "message0": "%{BKY_MOTION_TURNRIGHTDEGREES}",
    "args0": [
      {
        "type": "field_input",
        "name": "TURN_RIGHT_DEGREES",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "TurnLeftBrick": {
    "message0": "%{BKY_MOTION_TURNLEFTDEGREES}",
    "args0": [
      {
        "type": "field_input",
        "name": "TURN_LEFT_DEGREES",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PointInDirectionBrick": {
    "message0": "%{BKY_MOTION_POINTINDIRECTIONDEGREES}",
    "args0": [
      {
        "type": "field_input",
        "name": "DEGREES",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "PointToBrick": {
    "message0": "%{BKY_MOTION_POINTTOWARDS}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetRotationStyleBrick": {
    "message0": "%{BKY_MOTION_SETROTATIONSTYLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPINNER",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "GlideToBrick": {
    "message0": "%{BKY_MOTION_GLIDESECONDTOXY}",
    "args0": [
      {
        "type": "field_input",
        "name": "DURATION_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "X_DESTINATION",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "Y_DESTINATION",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "GoNStepsBackBrick": {
    "message0": "%{BKY_MOTION_GOBACKLAYER}",
    "args0": [
      {
        "type": "field_input",
        "name": "STEPS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "ComeToFrontBrick": {
    "message0": "%{BKY_MOTION_GOTOFRONT}"
  },
  "VibrationBrick": {
    "message0": "%{BKY_MOTION_VIBRATEFORSECOND}",
    "args0": [
      {
        "type": "field_input",
        "name": "VIBRATE_DURATION_IN_SECONDS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetPhysicsObjectTypeBrick": {
    "message0": "%{BKY_MOTION_SETYOURMOTIONTYPETO}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetVelocityBrick": {
    "message0": "%{BKY_MOTION_SETVELOCITYTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_VELOCITY_X",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHYSICS_VELOCITY_Y",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "TurnLeftSpeedBrick": {
    "message0": "%{BKY_MOTION_SPINLEFTDEGREESSECOND}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_TURN_LEFT_SPEED",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "TurnRightSpeedBrick": {
    "message0": "%{BKY_MOTION_SPINRIGHTDEGREESSECOND}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_TURN_RIGHT_SPEED",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetGravityBrick": {
    "message0": "%{BKY_MOTION_SETGRAVITYFORALLACTORSANDOBJECTSTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_GRAVITY_X",
        "text": "DEFAULT_VALUE"
      },
      {
        "type": "field_input",
        "name": "PHYSICS_GRAVITY_Y",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetMassBrick": {
    "message0": "%{BKY_MOTION_SETMASSTOKILOGRAM}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_MASS",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetBounceBrick": {
    "message0": "%{BKY_MOTION_SETBOUNCEFACTORTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_BOUNCE_FACTOR",
        "text": "DEFAULT_VALUE"
      }
    ]
  },
  "SetFrictionBrick": {
    "message0": "%{BKY_MOTION_SETFRICTIONTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_FRICTION",
        "text": "DEFAULT_VALUE"
      }
    ]
  }
};