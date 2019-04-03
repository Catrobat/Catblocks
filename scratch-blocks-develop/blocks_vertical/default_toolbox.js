/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.defaultToolbox');

goog.require('Blockly.Blocks');

/**
 * @fileoverview Provide a default toolbox XML.
 */

Blockly.Blocks.defaultToolbox = '<xml id="toolbox-categories" style="display: none">' +
  '<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">' +
  '<block type="motion_placeatxy" id="" x="252" y="544">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setxto" id="" x="307" y="553">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>'  +
  '<block type="motion_setyto" id="" x="307" y="553">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_changexby" id="" x="411" y="679">\n' +
  '<value name="DX">\n' +
  '<shadow type="math_number" id="">\n' +
  '<field name="NUM">10</field>\n' +
  '</shadow>\n' +
  '</value>\n' +
  '</block>' +
  '<block type="motion_changeyby" id="" x="411" y="679">\n' +
  '    <value name="DY">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_goto" id="" x="275" y="585">\n' +
  '    <value name="TO">\n' +
  '      <shadow type="motion_goto_menu" id="">\n' +
  '        <field name="TO">touch position</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_ifonedgebounce" id="" x="285" y="772"></block>' +
  '<block type="motion_movesteps" id="" x="37" y="213">\n' +
  '    <value name="STEPS">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_turnleftdegrees" id="" x="24" y="187">\n' +
  '    <value name="DEGREES">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_turnrightdegrees" id="" x="24" y="187">\n' +
  '    <value name="DEGREES">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_pointindirectiondegrees" id="" x="113" y="391">\n' +
  '    <value name="DIRECTION">\n' +
  '      <shadow type="math_angle" id="">\n' +
  '        <field name="NUM">90</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_pointtowards" id="" x="183" y="401">\n' +
  '    <value name="TOWARDS">\n' +
  '      <shadow type="motion_pointtowards_menu" id="">\n' +
  '        <field name="TOWARDS">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setrotationstyle" id="" x="243" y="632">\n' +
  '    <field name="STYLE">left-right only</field>\n' +
  '  </block>' +
  '<block type="motion_glidesecondtoxy" id="" x="188" y="512">\n' +
  '    <value name="SECS">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_gobacklayer" id="" x="172" y="249">\n' +
  '    <value name="STEPS">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_gotofront" id="" x="252" y="611"></block>' +
  '<block type="motion_vibrateforsecond" id="" x="241" y="277">\n' +
  '    <value name="STEPS">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setyourmotiontypeto" id="" x="183" y="401">\n' +
  '    <value name="TOWARDS">\n' +
  '      <shadow type="motion_setyourmotiontypeto_menu" id="">\n' +
  '        <field name="TOWARDS">moving and bouncing under gravity</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setvelocitytoxystepssecond" id="" x="243" y="440">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_spinleftdegreessecond" id="" x="163" y="696">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_spinrightdegreessecond" id="" x="163" y="696">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setgravityforallactorsandobjectstoxystepssecond2" id="" x="276" y="457">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">-10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setmasstokilogram" id="" x="307" y="235">\n' +
  '    <value name="STEPS">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setbouncefactorto" id="" x="161" y="756">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">80</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="motion_setfrictionto" id="" x="161" y="756">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">80</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#59C059" secondaryColour="#59C059">' +
  '<block type="looks_switchtolook" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_costume" id="">\n' +
  '        <field name="COSTUME">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_switchtolookwithnumber" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_nextlook" id="" x="140" y="375"></block>' +
  '<block type="looks_previouslook" id="" x="140" y="375"></block>' +
  '<block type="looks_setsizeto" id="" x="53" y="482">\n' +
  '    <value name="SIZE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">60</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_changesizeby" id="" x="95" y="464">\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_hide" id="" x="115" y="176"></block>' +
  '<block type="looks_show" id="" x="123" y="171"></block>' +
  '<block type="looks_askandstorewrittenanswerin" id="" x="80" y="346">\n' +
  '    <field name="EFFECT">ShipX</field>\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">What\'s your name?</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_say" id="" x="144" y="382">\n' +
  '    <value name="MESSAGE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_sayforsecond" id="" x="144" y="382">\n' +
  '    <value name="MESSAGE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="SECS">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_think" id="" x="144" y="382">\n' +
  '    <value name="MESSAGE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">Hmmmm!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_thinkforsecond" id="" x="144" y="382">\n' +
  '    <value name="MESSAGE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">Hmmmm!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="SECS">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_settransparencyto" id="" x="29" y="212">\n' +
  '    <value name="SIZE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">50</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_changetransparencyby" id="" x="95" y="464">\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">25</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_setbrightnessto" id="" x="29" y="212">\n' +
  '    <value name="SIZE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">50</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_changebrightnessby" id="" x="95" y="464">\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">25</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_setcolourto" id="" x="95" y="464">\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_changecolourby" id="" x="95" y="464">\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">25</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_cleargraphiceffects" id="" x="115" y="176"></block>' +
  '<block type="looks_setbackground" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_background" id="">\n' +
  '        <field name="COSTUME">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_setbackgroundtonumber" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_setbackgroundandwait" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_costume" id="">\n' +
  '        <field name="COSTUME">Space_Background_bigger</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_setbackgroundtonumberandwait" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_turncamera" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_camera" id="">\n' +
  '        <field name="COSTUME">on</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_usecamera" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_camera2" id="">\n' +
  '        <field name="COSTUME">front</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="looks_turnflashlight" id="" x="267" y="335">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_camera" id="">\n' +
  '        <field name="COSTUME">on</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#9966FF" secondaryColour="#9966FF">' +
    '<block type="sound_startsound" id="" x="141" y="180">\n' +
  '    <value name="SOUND_MENU">\n' +
  '      <shadow type="sound_startsound_menu" id="">\n' +
  '        <field name="SOUND_MENU">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="sound_startsoundandwait" id="" x="141" y="180">\n' +
  '    <value name="SOUND_MENU">\n' +
  '      <shadow type="sound_startsoundandwait_menu" id="">\n' +
  '        <field name="SOUND_MENU">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="sound_stopallsounds" id="" x="128" y="197"></block>' +
    '<block type="sound_setvolumeto" id="" x="168" y="321">\n' +
  '    <value name="VOLUME">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">60</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="sound_changevolumeby" id="" x="137" y="400">\n' +
  '    <value name="VOLUME">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">-10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="sound_speak" id="" x="137" y="400">\n' +
  '    <value name="TEXT">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="sound_speakandwait" id="" x="137" y="400">\n' +
  '    <value name="TEXT">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="sound_askandstorespokenanswerin" id="" x="92" y="245">\n' +
  '    <value name="TEXT">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">What\'s your name?</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="SOUND_MENU">\n' +
  '      <shadow type="sound_askandstorespokenanswerin_menu" id="">\n' +
  '        <field name="SOUND_MENU">name</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FF661A" secondaryColour="#CC9900">' +
    '<block type="event_whenscenestarts" id="" x="123" y="244"></block>' +
    '<block type="event_whentapped" id="" x="123" y="244"></block>' +
    '<block type="event_whenstageistapped" id="" x="123" y="244"></block>' +
    '<block type="event_whenyoureceived" id="" x="263" y="268">' +
  '    <field name="BROADCAST_OPTION" id="" variabletype="broadcast_msg">new message</field>' +
  '  </block>' +
    '<block type="event_broadcast" id="" x="333" y="149">\n' +
  '    <value name="BROADCAST_INPUT">\n' +
  '      <shadow type="event_broadcast_menu" id="">\n' +
  '        <field name="BROADCAST_OPTION" id="" variabletype="broadcast_msg">new message</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="event_broadcastandwait" id="" x="333" y="149">\n' +
  '    <value name="BROADCAST_INPUT">\n' +
  '      <shadow type="event_broadcast_menu" id="">\n' +
  '        <field name="BROADCAST_OPTION" id="" variabletype="broadcast_msg">new message</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="event_whenbecomestrue" id="" x="91" y="416">\n' +
  '    <value name="VALUE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1 &lt; 2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="event_whenyoubounceoff" x="263" y="268">\n' +
  '    <field name="BROADCAST_OPTION" variabletype="broadcast_msg">any edge, actor, or object</field>\n' +
  '  </block>' +
    '<block type="event_whenbackgroundchangesto" id="/|-$mkxN`/P8hPfOH(AU" x="263" y="268">\n' +
  '    <field name="BROADCAST_OPTION" id="bd0`~YlSD]d06p}UJ!yX" variabletype="broadcast_msg">Background</field>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">' +
    '<block type="control_wait" id="" x="255" y="414">\n' +
  '    <value name="DURATION">\n' +
  '      <shadow type="math_positive_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_note" id="" x="248" y="454">\n' +
  '    <value name="NOTE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">add comment here...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_forever" id="" x="295" y="275"></block>' +
    '<block type="control_ifistruethenelse" id="" x="269" y="411">\n' +
  '        <value name="TEXT">\n' +
  '          <shadow type="text" id="">\n' +
  '            <field name="TEXT">1&lt;2</field>\n' +
  '          </shadow>\n' +
  '        </value>\n' +
  '  </block>' +
    '<block type="control_ifistruethen" id="" x="269" y="411">\n' +
  '    <value name="TEXT">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1&lt;2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_waituntilistrue" id="" x="269" y="411">\n' +
  '    <value name="TEXT">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1&lt;2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_repeattimes" id="" x="269" y="411">\n' +
  '    <value name="NUM">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_repeatuntilistrue" id="" x="269" y="411">\n' +
  '    <value name="TEXT">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1&lt;2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_continuescene" id="" x="359" y="480">\n' +
  '    <value name="SCENE_OPTION">\n' +
  '      <shadow type="control_continuescene_menu" id="">\n' +
  '        <field name="SCENE_OPTION">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_startscene" id="" x="359" y="480">\n' +
  '    <value name="SCENE_OPTION">\n' +
  '      <shadow type="control_startscene_menu" id="">\n' +
  '        <field name="SCENE_OPTION">Scene 1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_stopscript" id="" x="359" y="480">\n' +
  '    <value name="SCENE_OPTION">\n' +
  '      <shadow type="control_stopscript_menu" id="">\n' +
  '        <field name="SCENE_OPTION">this script</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_createcloneof" id="" x="359" y="480">\n' +
  '    <value name="SCENE_OPTION">\n' +
  '      <shadow type="control_createcloneof_menu" id="">\n' +
  '        <field name="SCENE_OPTION">yourself</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="control_delete_this_clone" id="" x="12" y="597"></block>' +
  '</category>' +
  '<category name="Pen" id="sensing" colour="#0fBD8C" secondaryColour="#2E8EB8">' +
    '<block type="pen_pendown" id="" x="235" y="680"></block>' +
    '<block type="pen_penup" id="" x="235" y="680"></block>' +
    '<block type="pen_setpensizeto" id="" x="92" y="201">\n' +
  '    <value name="SIZE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">3.15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="pen_setpencolorto" id="" x="207" y="557">\n' +
  '    <value name="red">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="green">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="blue">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">255</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="pen_stamp" id="" x="235" y="680"></block>' +
    '<block type="pen_clear" id="" x="235" y="680"></block>' +
  '</category>' +
  '<category name="Data" id="operators" colour="#FF6680" secondaryColour="#389438">' +
    '<block type="data_setvariabletocat" id="" x="176" y="533">\n' +
  '    <field name="EFFECT">name</field>\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="data_changevariablebycat" id="" x="176" y="533">\n' +
  '    <field name="EFFECT">name</field>\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="data_showvariableat" id="" x="176" y="533">\n' +
  '    <field name="EFFECT">name</field>\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="data_showvariableatsizecoloraligned" id="" x="176" y="533">\n' +
  '    <value name="X">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="size">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">120</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="color">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">#FF0000</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="CHANGE">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <field name="NAME">name</field>\n' +
  '    <field name="ALIGNMENT">centered</field>\n' +
  '  </block>' +
    '<block type="data_hidevariable" id="" x="100" y="405">\n' +
  '    <field name="VARIABLE" id="" variabletype="">name</field>\n' +
  '  </block>' +
    '<block type="data_addtolist" id="" x="243" y="379">\n' +
  '    <field name="LIST" id="" variabletype="list">list</field>\n' +
  '    <value name="ITEM">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">name</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="data_deletefromlist" id="" x="243" y="379">\n' +
  '    <field name="LIST" id="" variabletype="list">list</field>\n' +
  '    <value name="INDEX">\n' +
  '      <shadow type="math_number" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="data_insertintolist" id="" x="30" y="211">\n' +
  '    <value name="VALUE">\n' +
  '      <shadow type="math_integer" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <field name="LIST" id="" variabletype="list">list</field>\n' +
  '    <value name="INDEX">\n' +
  '      <shadow type="math_integer" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="data_replaceiteminlist" id="" x="30" y="211">\n' +
  '    <field name="LIST" id="" variabletype="list">list</field>\n' +
  '    <value name="INDEX1">\n' +
  '      <shadow type="math_integer" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="INDEX2">\n' +
  '      <shadow type="math_integer" id="">\n' +
  '        <field name="NUM">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '</xml>';
