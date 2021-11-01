/**
 * load all brick categories and
 * export single summarized object
 */

'use strict';

import arduino from './arduino';
import control from './control';
import device from './device';
import dummy from './dummy';
import embroidery from './embroidery';
import event from './event';
import lego from './lego';
import look from './look';
import motion from './motion';
import pen from './pen';
import phiro from './phiro';
import report from './report';
import script from './script';
import sound from './sound';
import test from './test';
import user from './user';
import userlist from './userlist';
import uservariables from './uservariables';

export default {
  arduino: arduino,
  control: control,
  device: device,
  dummy: dummy,
  embroidery: embroidery,
  event: event,
  lego: lego,
  look: look,
  motion: motion,
  pen: pen,
  phiro: phiro,
  report: report,
  script: script,
  sound: sound,
  test: test,
  user: user,
  userlist: userlist,
  uservariables: uservariables
};
