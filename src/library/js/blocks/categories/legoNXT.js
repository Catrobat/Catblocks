/**
 * @description legoNXT Catblocks bricks
 */

'use strict';

export default {
  LegoNxtMotorTurnAngleBrick: {
    message0: '%{BKY_LEGONXT_MOTORTURNANGLE}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'LEGO_NXT_DEGREES',
        text: 'unset'
      }
    ]
  },
  LegoNxtMotorStopBrick: {
    message0: '%{BKY_LEGONXT_MOTORSTOP}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      }
    ]
  },
  LegoNxtMotorMoveBrick: {
    message0: '%{BKY_LEGONXT_MOTORMOVE}',
    args0: [
      {
        type: 'field_input',
        name: 'DROPDOWN',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'LEGO_NXT_SPEED',
        text: 'unset'
      }
    ]
  },
  LegoNxtPlayToneBrick: {
    message0: '%{BKY_LEGONXT_PLAYTONE}',
    args0: [
      {
        type: 'field_input',
        name: 'LEGO_NXT_DURATION_IN_SECONDS',
        text: 'unset'
      },
      {
        type: 'field_input',
        name: 'LEGO_NXT_FREQUENCY',
        text: 'unset'
      }
    ]
  }
};
