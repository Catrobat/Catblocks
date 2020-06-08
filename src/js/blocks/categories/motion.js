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
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "unset"
      }
    ]
  },
  "SetXBrick": {
    "message0": "%{BKY_MOTION_SETXTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "X_POSITION",
        "text": "unset"
      }
    ]
  },
  "SetYBrick": {
    "message0": "%{BKY_MOTION_SETYTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "Y_POSITION",
        "text": "unset"
      }
    ]
  },
  "ChangeXByNBrick": {
    "message0": "%{BKY_MOTION_CHANGEXBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "X_POSITION_CHANGE",
        "text": "unset"
      }
    ]
  },
  "ChangeYByNBrick": {
    "message0": "%{BKY_MOTION_CHANGEYBY}",
    "args0": [
      {
        "type": "field_input",
        "name": "Y_POSITION_CHANGE",
        "text": "unset"
      }
    ]
  },
  "GoToBrick": {
    "message0": "%{BKY_MOTION_GOTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPINNER",
        "text": "unset"
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
        "text": "unset"
      }
    ]
  },
  "TurnRightBrick": {
    "message0": "%{BKY_MOTION_TURNRIGHTDEGREES}",
    "args0": [
      {
        "type": "field_input",
        "name": "TURN_RIGHT_DEGREES",
        "text": "unset"
      }
    ]
  },
  "TurnLeftBrick": {
    "message0": "%{BKY_MOTION_TURNLEFTDEGREES}",
    "args0": [
      {
        "type": "field_input",
        "name": "TURN_LEFT_DEGREES",
        "text": "unset"
      }
    ]
  },
  "PointInDirectionBrick": {
    "message0": "%{BKY_MOTION_POINTINDIRECTIONDEGREES}",
    "args0": [
      {
        "type": "field_input",
        "name": "DEGREES",
        "text": "unset"
      }
    ]
  },
  "PointToBrick": {
    "message0": "%{BKY_MOTION_POINTTOWARDS}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      }
    ]
  },
  "SetRotationStyleBrick": {
    "message0": "%{BKY_MOTION_SETROTATIONSTYLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "SPINNER",
        "text": "unset"
      }
    ]
  },
  "GlideToBrick": {
    "message0": "%{BKY_MOTION_GLIDESECONDTOXY}",
    "args0": [
      {
        "type": "field_input",
        "name": "DURATION_IN_SECONDS",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "X_DESTINATION",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "Y_DESTINATION",
        "text": "unset"
      }
    ]
  },
  "GoNStepsBackBrick": {
    "message0": "%{BKY_MOTION_GOBACKLAYER}",
    "args0": [
      {
        "type": "field_input",
        "name": "STEPS",
        "text": "unset"
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
        "text": "unset"
      }
    ]
  },
  "SetPhysicsObjectTypeBrick": {
    "message0": "%{BKY_MOTION_SETYOURMOTIONTYPETO}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "unset"
      }
    ]
  },
  "SetVelocityBrick": {
    "message0": "%{BKY_MOTION_SETVELOCITYTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_VELOCITY_X",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHYSICS_VELOCITY_Y",
        "text": "unset"
      }
    ]
  },
  "TurnLeftSpeedBrick": {
    "message0": "%{BKY_MOTION_SPINLEFTDEGREESSECOND}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_TURN_LEFT_SPEED",
        "text": "unset"
      }
    ]
  },
  "TurnRightSpeedBrick": {
    "message0": "%{BKY_MOTION_SPINRIGHTDEGREESSECOND}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_TURN_RIGHT_SPEED",
        "text": "unset"
      }
    ]
  },
  "SetGravityBrick": {
    "message0": "%{BKY_MOTION_SETGRAVITYFORALLACTORSANDOBJECTSTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_GRAVITY_X",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "PHYSICS_GRAVITY_Y",
        "text": "unset"
      }
    ]
  },
  "SetMassBrick": {
    "message0": "%{BKY_MOTION_SETMASSTOKILOGRAM}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_MASS",
        "text": "unset"
      }
    ]
  },
  "SetBounceBrick": {
    "message0": "%{BKY_MOTION_SETBOUNCEFACTORTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_BOUNCE_FACTOR",
        "text": "unset"
      }
    ]
  },
  "SetFrictionBrick": {
    "message0": "%{BKY_MOTION_SETFRICTIONTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "PHYSICS_FRICTION",
        "text": "unset"
      }
    ]
  }
};