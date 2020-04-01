/**
 * @description stich Catblocks bricks
 */

'use strict';

export default {
  "StitchBrick": {
    "message0": "%{BKY_STITCH}"
  },
  "RunningStitchBrick": {
    "message0": "%{BKY_STITCH_RUNNING}",
    "args0": [
      {
        "type": "field_input",
        "name": "EMBROIDERY_LENGTH",
        "text": "unset"
      }
    ]
  },
  "ZigZagStitchBrick": {
    "message0": "%{BKY_STITCH_ZIGZAG}",
    "args0": [
      {
        "type": "field_input",
        "name": "ZIGZAG_EMBROIDERY_LENGTH",
        "text": "unset"
      },
      {
        "type": "field_input",
        "name": "ZIGZAG_EMBROIDERY_WIDTH",
        "text": "unset"
      }
    ]
  },
  "TripleStitchBrick": {
    "message0": "%{BKY_STITCH_TRIPLE}",
    "args0": [
      {
        "type": "field_input",
        "name": "EMBROIDERY_LENGTH",
        "text": "unset"
      }
    ]
  },
  "StopRunningStitchBrick": {
    "message0": "%{BKY_STITCH_STOP}"
  }
};