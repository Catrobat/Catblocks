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
        "type": "field_number",
        "name": "EMBROIDERY_LENGTH",
        "value": 10
      }
    ]
  },
  "ZigZagStitchBrick": {
    "message0": "%{BKY_STITCH_ZIGZAG}",
    "args0": [
      {
        "type": "field_number",
        "name": "ZIGZAG_EMBROIDERY_LENGTH",
        "value": 2
      },
      {
        "type": "field_number",
        "name": "ZIGZAG_EMBROIDERY_WIDTH",
        "value": 10
      }
    ]
  },
  "TripleStitchBrick": {
    "message0": "%{BKY_STITCH_TRIPLE}",
    "args0": [
      {
        "type": "field_number",
        "name": "EMBROIDERY_LENGTH",
        "value": 10
      }
    ]
  },
  "StopRunningStitchBrick": {
    "message0": "%{BKY_STITCH_STOP}"
  }
};