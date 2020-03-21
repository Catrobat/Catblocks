/**
 * @description motion Catblocks bricks
 */

'use strict';

export default {
  "PlaceAtBrick": {
    "message0": "%{BKY_MOTION_PLACEATXY}",
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
    ]
  },
  "SetXBrick": {
    "message0": "%{BKY_MOTION_SETXTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "X_POSITION",
        "value": 100
      }
    ]
  },
  "SetYBrick": {
    "message0": "%{BKY_MOTION_SETYTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "Y_POSITION",
        "value": 200
      }
    ]
  },
  "ChangeXByNBrick": {
    "message0": "%{BKY_MOTION_CHANGEXBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "X_POSITION_CHANGE",
        "value": 100
      }
    ]
  },
  "ChangeYByNBrick": {
    "message0": "%{BKY_MOTION_CHANGEYBY}",
    "args0": [
      {
        "type": "field_number",
        "name": "Y_POSITION_CHANGE",
        "value": 200
      }
    ]
  },
  "GoToBrick": {
    "message0": "%{BKY_MOTION_GOTO}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
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
        "type": "field_number",
        "name": "STEPS",
        "value": 10
      }
    ]
  },
  "TurnRightBrick": {
    "message0": "%{BKY_MOTION_TURNRIGHTDEGREES}",
    "args0": [
      {
        "type": "field_number",
        "name": "TURN_RIGHT_DEGREES",
        "value": 15
      }
    ]
  },
  "TurnLeftBrick": {
    "message0": "%{BKY_MOTION_TURNLEFTDEGREES}",
    "args0": [
      {
        "type": "field_number",
        "name": "TURN_LEFT_DEGREES",
        "value": 15
      }
    ]
  },
  "PointInDirectionBrick": {
    "message0": "%{BKY_MOTION_POINTINDIRECTIONDEGREES}",
    "args0": [
      {
        "type": "field_number",
        "name": "DEGREES",
        "value": 0
      }
    ]
  },
  "PointToBrick": {
    "message0": "%{BKY_MOTION_POINTTOWARDS}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "SetRotationStyleBrick": {
    "message0": "%{BKY_MOTION_SETROTATIONSTYLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "GlideToBrick": {
    "message0": "%{BKY_MOTION_GLIDESECONDTOXY}",
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
    ]
  },
  "GoNStepsBackBrick": {
    "message0": "%{BKY_MOTION_GOBACKLAYER}",
    "args0": [
      {
        "type": "field_number",
        "name": "STEPS",
        "value": 1
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
        "type": "field_number",
        "name": "VIBRATE_DURATION_IN_SECONDS",
        "value": 1
      }
    ]
  },
  "SetPhysicsObjectTypeBrick": {
    "message0": "%{BKY_MOTION_SETYOURMOTIONTYPETO}",
    "args0": [
      {
        "type": "field_input",
        "name": "DROPDOWN",
        "text": "new"
      }
    ]
  },
  "SetVelocityBrick": {
    "message0": "%{BKY_MOTION_SETVELOCITYTO}",
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
    ]
  },
  "TurnLeftSpeedBrick": {
    "message0": "%{BKY_MOTION_SPINLEFTDEGREESSECOND}",
    "args0": [
      {
        "type": "field_number",
        "name": "PHYSICS_TURN_LEFT_SPEED",
        "value": 15
      }
    ]
  },
  "TurnRightSpeedBrick": {
    "message0": "%{BKY_MOTION_SPINRIGHTDEGREESSECOND}",
    "args0": [
      {
        "type": "field_number",
        "name": "PHYSICS_TURN_RIGHT_SPEED",
        "value": 15
      }
    ]
  },
  "SetGravityBrick": {
    "message0": "%{BKY_MOTION_SETGRAVITYFORALLACTORSANDOBJECTSTO}",
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
    ]
  },
  "SetMassBrick": {
    "message0": "%{BKY_MOTION_SETMASSTOKILOGRAM}",
    "args0": [
      {
        "type": "field_number",
        "name": "PHYSICS_MASS",
        "value": 1
      }
    ]
  },
  "SetBounceBrick": {
    "message0": "%{BKY_MOTION_SETBOUNCEFACTORTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "PHYSICS_BOUNCE_FACTOR",
        "value": 80
      }
    ]
  },
  "SetFrictionBrick": {
    "message0": "%{BKY_MOTION_SETFRICTIONTO}",
    "args0": [
      {
        "type": "field_number",
        "name": "PHYSICS_FRICTION",
        "value": 80
      }
    ]
  }
};