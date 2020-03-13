/**
 * @description load all brick categories and
 *  export single summarized object
 * @author andreas.karner@student.tugraz.at
 */

'use strict';

import arduino from './arduino';
import control from './control';
import data from './data';

export default {
  "arduino": arduino,
  "control": control,
  "data": data
};