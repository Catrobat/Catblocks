/**
 * @description load all brick categories and
 *  export single summarized object
 * @author andreas.karner@student.tugraz.at
 */

'use strict';

import arduino from './arduino';
import control from './control';
import data from './data';
import drone from './drone';
import event from './event';
import jumpingSumo from './jumpingSumo';
import legoEV3 from './legoEV3';
import legoNXT from './legoNXT';
import looks from './looks';
import motion from './motion';
import pen from './pen';
import phiro from './phiro';
import raspi from './raspi';
import sound from './sound';
import stitch from './stitch';

export default {
  arduino: arduino,
  control: control,
  data: data,
  drone: drone,
  event: event,
  jumpingSumo: jumpingSumo,
  legoEV3: legoEV3,
  legoNXT: legoNXT,
  looks: looks,
  motion: motion,
  pen: pen,
  phiro: phiro,
  raspi: raspi,
  sound: sound,
  stitch: stitch
};
