/**
 * @description motion Catblocks bricks
 */

'use strict';

export default {
  PlaceAtBrick: {
    message0: '%{BKY_MOTION_PLACEATXY}',
    args0: [
      {
        type: 'field_input',
        name: 'X_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_INFO'
      },
      {
        type: 'field_input',
        name: 'Y_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_INFO'
      }
    ]
  },
  SetXBrick: {
    message0: '%{BKY_MOTION_SETXTO}',
    args0: [
      {
        type: 'field_input',
        name: 'X_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_INFO'
      }
    ]
  },
  SetYBrick: {
    message0: '%{BKY_MOTION_SETYTO}',
    args0: [
      {
        type: 'field_input',
        name: 'Y_POSITION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_INFO'
      }
    ]
  },
  ChangeXByNBrick: {
    message0: '%{BKY_MOTION_CHANGEXBY}',
    args0: [
      {
        type: 'field_input',
        name: 'X_POSITION_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_POSITION_CHANGE_INFO'
      }
    ]
  },
  ChangeYByNBrick: {
    message0: '%{BKY_MOTION_CHANGEYBY}',
    args0: [
      {
        type: 'field_input',
        name: 'Y_POSITION_CHANGE',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_POSITION_CHANGE_INFO'
      }
    ]
  },
  GoToBrick: {
    message0: '%{BKY_MOTION_GOTO}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SPINNER_INFO'
      }
    ]
  },
  IfOnEdgeBounceBrick: {
    message0: '%{BKY_MOTION_IFONEDGEBOUNCE}'
  },
  MoveNStepsBrick: {
    message0: '%{BKY_MOTION_MOVESTEPS}',
    args0: [
      {
        type: 'field_input',
        name: 'STEPS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STEPS_INFO'
      }
    ]
  },
  TurnRightBrick: {
    message0: '%{BKY_MOTION_TURNRIGHTDEGREES}',
    args0: [
      {
        type: 'field_input',
        name: 'TURN_RIGHT_DEGREES',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TURN_RIGHT_DEGREES_INFO'
      }
    ]
  },
  TurnLeftBrick: {
    message0: '%{BKY_MOTION_TURNLEFTDEGREES}',
    args0: [
      {
        type: 'field_input',
        name: 'TURN_LEFT_DEGREES',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'TURN_LEFT_DEGREES_INFO'
      }
    ]
  },
  PointInDirectionBrick: {
    message0: '%{BKY_MOTION_POINTINDIRECTIONDEGREES}',
    args0: [
      {
        type: 'field_input',
        name: 'DEGREES',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DEGREES_INFO'
      }
    ]
  },
  PointToBrick: {
    message0: '%{BKY_MOTION_POINTTOWARDS}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      }
    ]
  },
  SetRotationStyleBrick: {
    message0: '%{BKY_MOTION_SETROTATIONSTYLE}',
    args0: [
      {
        type: 'field_input',
        name: 'SPINNER',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'SPINNER_INFO'
      }
    ]
  },
  GlideToBrick: {
    message0: '%{BKY_MOTION_GLIDESECONDTOXY}',
    args0: [
      {
        type: 'field_input',
        name: 'DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DURATION_IN_SECONDS_INFO'
      },
      {
        type: 'field_input',
        name: 'X_DESTINATION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'X_DESTINATION_INFO'
      },
      {
        type: 'field_input',
        name: 'Y_DESTINATION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'Y_DESTINATION_INFO'
      }
    ]
  },
  GoNStepsBackBrick: {
    message0: '%{BKY_MOTION_GOBACKLAYER}',
    args0: [
      {
        type: 'field_input',
        name: 'STEPS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'STEPS_INFO'
      }
    ]
  },
  ComeToFrontBrick: {
    message0: '%{BKY_MOTION_GOTOFRONT}'
  },
  VibrationBrick: {
    message0: '%{BKY_MOTION_VIBRATEFORSECOND}',
    args0: [
      {
        type: 'field_input',
        name: 'VIBRATE_DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'VIBRATE_DURATION_IN_SECONDS_INFO'
      }
    ]
  },
  SetPhysicsObjectTypeBrick: {
    message0: '%{BKY_MOTION_SETYOURMOTIONTYPETO}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'DROPDOWN_INFO'
      }
    ]
  },
  SetVelocityBrick: {
    message0: '%{BKY_MOTION_SETVELOCITYTO}',
    args0: [
      {
        type: 'field_input',
        name: 'PHYSICS_VELOCITY_X',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_VELOCITY_X_INFO'
      },
      {
        type: 'field_input',
        name: 'PHYSICS_VELOCITY_Y',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_VELOCITY_Y_INFO'
      }
    ]
  },
  TurnLeftSpeedBrick: {
    message0: '%{BKY_MOTION_SPINLEFTDEGREESSECOND}',
    args0: [
      {
        type: 'field_input',
        name: 'PHYSICS_TURN_LEFT_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_TURN_LEFT_SPEED_INFO'
      }
    ]
  },
  TurnRightSpeedBrick: {
    message0: '%{BKY_MOTION_SPINRIGHTDEGREESSECOND}',
    args0: [
      {
        type: 'field_input',
        name: 'PHYSICS_TURN_RIGHT_SPEED',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_TURN_RIGHT_SPEED_INFO'
      }
    ]
  },
  SetGravityBrick: {
    message0: '%{BKY_MOTION_SETGRAVITYFORALLACTORSANDOBJECTSTO}',
    args0: [
      {
        type: 'field_input',
        name: 'PHYSICS_GRAVITY_X',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_GRAVITY_X_INFO'
      },
      {
        type: 'field_input',
        name: 'PHYSICS_GRAVITY_Y',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_GRAVITY_Y_INFO'
      }
    ]
  },
  SetMassBrick: {
    message0: '%{BKY_MOTION_SETMASSTOKILOGRAM}',
    args0: [
      {
        type: 'field_input',
        name: 'PHYSICS_MASS',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_MASS_INFO'
      }
    ]
  },
  SetBounceBrick: {
    message0: '%{BKY_MOTION_SETBOUNCEFACTORTO}',
    args0: [
      {
        type: 'field_input',
        name: 'PHYSICS_BOUNCE_FACTOR',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_BOUNCE_FACTOR_INFO'
      }
    ]
  },
  SetFrictionBrick: {
    message0: '%{BKY_MOTION_SETFRICTIONTO}',
    args0: [
      {
        type: 'field_input',
        name: 'PHYSICS_FRICTION',
        text: 'unset'
      },
      {
        type: 'field_image',
        src: `${document.location.pathname}media/info_icon.svg`,
        height: 24,
        width: 24,
        alt: '(i)',
        flip_rtl: true,
        name: 'PHYSICS_FRICTION_INFO'
      }
    ]
  }
};
