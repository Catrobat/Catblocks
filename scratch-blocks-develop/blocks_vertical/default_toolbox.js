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
  '<block type="PlaceAtBrick">\n' +
'    <value name="X_POSITION">\n' +
'      <shadow type="text">\n' +
'        <field name="TEXT">100</field>\n' +
'      </shadow>\n' +
'    </value>\n' +
'    <value name="Y_POSITION">\n' +
'      <shadow type="text">\n' +
'        <field name="TEXT">200</field>\n' +
'      </shadow>\n' +
'    </value>\n' +
'  </block>' +
  '<block type="SetXBrick">\n' +
  '    <value name="X_POSITION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>'  +
  '<block type="SetYBrick">\n' +
  '    <value name="Y_POSITION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ChangeXByNBrick">\n' +
  '<value name="X_POSITION_CHANGE">\n' +
  '<shadow type="text">\n' +
  '<field name="TEXT">10</field>\n' +
  '</shadow>\n' +
  '</value>\n' +
  '</block>' +
  '<block type="ChangeYByNBrick">\n' +
  '    <value name="Y_POSITION_CHANGE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="Text">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="GoToBrick">\n' +
  '    <value name="TO">\n' +
  '      <shadow type="motion_goto_menu">\n' +
  '        <field name="TO">touch position</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="IfOnEdgeBounceBrick"></block>' +
  '<block type="MoveNStepsBrick">\n' +
  '    <value name="STEPS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="TurnLeftBrick">\n' +
  '    <value name="TURN_LEFT_DEGREES">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="TurnRightBrick">\n' +
  '    <value name="TURN_RIGHT_DEGREES">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="PointInDirectionBrick">\n' +
  '    <value name="DEGREES">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">90</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="PointToBrick">\n' +
  '    <value name="TOWARDS">\n' +
  '      <shadow type="motion_pointtowards_menu">\n' +
  '        <field name="TOWARDS">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetRotationStyleBrick">\n' +
  '    <field name="STYLE">left-right only</field>\n' +
  '  </block>' +
  '<block type="GlideToBrick">\n' +
  '    <value name="DURATION_IN_SECONDS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="X_DESTINATION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y_DESTINATION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="GoNStepsBackBrick">\n' +
  '    <value name="STEPS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ComeToFrontBrick"></block>' +
  '<block type="VibrationBrick" x="241" y="277">\n' +
  '    <value name="VIBRATE_DURATION_IN_SECONDS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetPhysicsObjectTypeBrick">\n' +
  '    <value name="TOWARDS">\n' +
  '      <shadow type="motion_setyourmotiontypeto_menu">\n' +
  '        <field name="TOWARDS">moving and bouncing under gravity</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetVelocityBrick">\n' +
  '    <value name="PHYSICS_VELOCITY_X">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="PHYSICS_VELOCITY_Y">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="TurnLeftSpeedBrick">\n' +
  '    <value name="PHYSICS_TURN_LEFT_SPEED">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="TurnRightSpeedBrick">\n' +
  '    <value name="PHYSICS_TURN_RIGHT_SPEED">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetGravityBrick">\n' +
  '    <value name="PHYSICS_GRAVITY_X">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="PHYSICS_GRAVITY_Y">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">-10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetMassBrick">\n' +
  '    <value name="PHYSICS_MASS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetBounceBrick">\n' +
  '    <value name="PHYSICS_BOUNCE_FACTOR">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">80</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetFrictionBrick">\n' +
  '    <value name="PHYSICS_FRICTION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">80</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#59C059" secondaryColour="#59C059">' +
  '<block type="SetLookBrick">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_costume">\n' +
  '        <field name="COSTUME">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetLookByIndexBrick">\n' +
  '    <value name="LOOK_INDEX">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="NextLookBrick"></block>' +
  '<block type="PreviousLookBrick"></block>' +
  '<block type="SetSizeToBrick">\n' +
  '    <value name="SIZE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">60</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ChangeSizeByNBrick">\n' +
  '    <value name="SIZE_CHANGE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="HideBrick"></block>' +
  '<block type="ShowBrick"></block>' +
  '<block type="AskBrick">\n' +
  '    <field name="EFFECT">name</field>\n' +
  '    <value name="ASK_QUESTION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">What\'s your name?</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SayBubbleBrick">\n' +
  '    <value name="SAY_BRICK">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SayForBubbleBrick">\n' +
  '    <value name="SAY_BRICK">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="DURATION_IN_SECONDS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ThinkBubbleBrick">\n' +
  '    <value name="THINK_BRICK">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">Hmmmm!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ThinkForBubbleBrick">\n' +
  '    <value name="THINK_BRICK">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">Hmmmm!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="DURATION_IN_SECONDS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetTransparencyBrick">\n' +
  '    <value name="TRANSPARENCY">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">50</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ChangeTransparencyByNBrick">\n' +
  '    <value name="TRANSPARENCY_CHANGE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">25</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetBrightnessBrick">\n' +
  '    <value name="BRIGHTNESS">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">50</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ChangeBrightnessByNBrick">\n' +
  '    <value name="BRIGHTNESS_CHANGE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">25</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetColorBrick">\n' +
  '    <value name="COLOR">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ChangeColorByNBrick">\n' +
  '    <value name="COLOR_CHANGE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">25</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ClearGraphicEffectBrick"></block>' +
  '<block type="SetBackgroundBrick">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_background">\n' +
  '        <field name="COSTUME">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetBackgroundByIndexBrick">\n' +
  '    <value name="LOOK_INDEX">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetBackgroundAndWaitBrick">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_costume">\n' +
  '        <field name="COSTUME">Space_Background_bigger</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="SetBackgroundByIndexAndWaitBrick">\n' +
  '    <value name="LOOK_INDEX">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="CameraBrick">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_camera">\n' +
  '        <field name="COSTUME">on</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="ChooseCameraBrick">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_camera2">\n' +
  '        <field name="COSTUME">front</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '<block type="FlashBrick">\n' +
  '    <value name="COSTUME">\n' +
  '      <shadow type="looks_camera">\n' +
  '        <field name="COSTUME">on</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#9966FF" secondaryColour="#9966FF">' +
    '<block type="PlaySoundBrick">\n' +
  '    <value name="SOUND_MENU">\n' +
  '      <shadow type="PlaySoundBrick_menu">\n' +
  '        <field name="SOUND_MENU">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="PlaySoundAndWaitBrick">\n' +
  '    <value name="SOUND_MENU">\n' +
  '      <shadow type="PlaySoundAndWaitBrick_menu">\n' +
  '        <field name="SOUND_MENU">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="StopAllSoundsBrick"></block>' +
    '<block type="SetVolumeToBrick">\n' +
  '    <value name="VOLUME">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">60</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="ChangeVolumeByNBrick">\n' +
  '    <value name="VOLUME_CHANGE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">-10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="SpeakBrick">\n' +
  '    <value name="SPEAK">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="SpeakAndWaitBrick">\n' +
  '    <value name="SPEAK">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">Hello!</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="AskSpeechBrick">\n' +
  '    <value name="ASK_SPEECH_QUESTION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">What\'s your name?</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="SOUND_MENU">\n' +
  '      <shadow type="AskSpeechBrick_menu">\n' +
  '        <field name="SOUND_MENU">name</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FF661A" secondaryColour="#CC9900">' +
    '<block type="WhenStartedBrick"></block>' +
    '<block type="WhenBrick"></block>' +
    '<block type="WhenTouchDownBrick"></block>' +
    '<block type="BroadcastReceiverBrick" id="" x="333" y="149">\n' +
  '  <value name="BROADCAST_MENU">\n' +
  '    <shadow type="BroadcastBrick_menu" id="">\n' +
  '      <field name="BROADCAST_MENU" id="" variabletype="broadcast_msg">new message</field>\n' +
  '    </shadow>\n' +
  '  </value>\n' +
  '</block>' +
    '<block type="BroadcastBrick">\n' +
    '  <value name="BROADCAST_MENU">\n' +
    '    <shadow type="BroadcastBrick_menu">\n' +
    '      <field name="BROADCAST_MENU">new...</field>\n' +
    '    </shadow>\n' +
    '  </value>\n' +
    '</block>' +
    '<block type="BroadcastWaitBrick">\n' +
  '    <value name="BROADCAST_MENU">\n' +
  '      <shadow type="BroadcastBrick_menu">\n' +
  '        <field name="BROADCAST_MENU" variabletype="broadcast_msg">new message</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="WhenConditionBrick">\n' +
  '    <value name="IF_CONDITION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1 &lt; 2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="CollisionReceiverBrick">\n' +
  '    <field name="BROADCAST_OPTION" variabletype="broadcast_msg">any edge, actor, or object</field>\n' +
  '  </block>' +
    '<block type="WhenBackgroundChangesBrick" >\n' +
  '    <field name="BROADCAST_OPTION" variabletype="broadcast_msg">Background</field>\n' +
  '  </block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">' +
    '<block type="WaitBrick" id="" x="255" y="414">\n' +
  '    <value name="TIME_TO_WAIT_IN_SECONDS">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="NoteBrick">\n' +
  '    <value name="NOTE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">add comment here...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="ForeverBrick"></block>' +
    '<block type="IfElseLogicBeginBrick">\n' +
  '        <value name="TEXT">\n' +
  '          <shadow type="text">\n' +
  '            <field name="TEXT">1&lt;2</field>\n' +
  '          </shadow>\n' +
  '        </value>\n' +
  '  </block>' +
    '<block type="IfLogicBeginBrick">\n' +
  '    <value name="TEXT">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1&lt;2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="WaitUntilBrick">\n' +
  '    <value name="IF_CONDITION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1&lt;2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="RepeatBrick">\n' +
  '    <value name="TIMES_TO_REPEAT">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">10</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="RepeatUntilBrick">\n' +
  '    <value name="REPEAT_UNTIL_CONDITION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1&lt;2</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="SceneTransitionBrick">\n' +
  '    <value name="sceneForTransition">\n' +
  '      <shadow type="control_continuescene_menu">\n' +
  '        <field name="SCENE_OPTION">new...</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="SceneStartBrick">\n' +
  '    <value name="sceneToStart">\n' +
  '      <shadow type="control_startscene_menu">\n' +
  '        <field name="SCENE_OPTION">Scene 1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="StopScriptBrick">\n' +
  '    <value name="spinnerSelection">\n' +
  '      <shadow type="control_stopscript_menu">\n' +
  '        <field name="SCENE_OPTION">this script</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="CloneBrick">\n' +
  '    <value name="objectToClone">\n' +
  '      <shadow type="control_createcloneof_menu">\n' +
  '        <field name="SCENE_OPTION">yourself</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="DeleteThisCloneBrick"></block>' +
  '</category>' +
  '<category name="Pen" id="sensing" colour="#0fBD8C" secondaryColour="#2E8EB8">' +
    '<block type="PenDownBrick"></block>' +
    '<block type="PenUpBrick"></block>' +
    '<block type="SetPenSizeBrick">\n' +
  '    <value name="PEN_SIZE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">3.15</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="SetPenColorBrick">\n' +
  '    <value name="PEN_COLOR_RED">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="PEN_COLOR_GREEN">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">0</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="PEN_COLOR_BLUE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">255</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="StampBrick"></block>' +
    '<block type="ClearBackgroundBrick"></block>' +
  '</category>' +
  '<category name="Data" id="operators" colour="#FF6680" secondaryColour="#389438">' +
    '<block type="SetVariableBrick">\n' +
  '    <field name="EFFECT">name</field>\n' +
  '    <value name="VARIABLE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="ChangeVariableBrick">\n' +
  '    <field name="EFFECT">name</field>\n' +
  '    <value name="VARIABLE_CHANGE">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="ShowTextBrick">\n' +
  '    <field name="EFFECT">name</field>\n' +
  '    <value name="X_POSITION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y_POSITION">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="ShowTextColorSizeAlignmentBrick">\n' +
  '    <value name="X_POSITION">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">100</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="Y_POSITION">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">200</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="SIZE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">120</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="COLOR">\n' +
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
    '<block type="HideTextBrick">\n' +
  '    <field name="VARIABLE" variabletype="">name</field>\n' +
  '  </block>' +
    '<block type="AddItemToUserListBrick">\n' +
  '    <field name="LIST" variabletype="list">list</field>\n' +
  '    <value name="LIST_ADD_ITEM">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">name</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="DeleteItemOfUserListBrick">\n' +
  '    <field name="LIST" variabletype="list">list</field>\n' +
  '    <value name="LIST_DELETE_ITEM">\n' +
  '      <shadow type="text">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="InsertItemIntoUserListBrick">\n' +
  '    <value name="INSERT_ITEM_INTO_USERLIST_VALUE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <field name="LIST" id="" variabletype="list">list</field>\n' +
  '    <value name="INSERT_ITEM_INTO_USERLIST_INDEX">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
    '<block type="ReplaceItemInUserListBrick">\n' +
  '    <field name="LIST" id="" variabletype="list">list</field>\n' +
  '    <value name="INSERT_ITEM_INTO_USERLIST_INDEX">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '    <value name="INSERT_ITEM_INTO_USERLIST_VALUE">\n' +
  '      <shadow type="text" id="">\n' +
  '        <field name="TEXT">1</field>\n' +
  '      </shadow>\n' +
  '    </value>\n' +
  '  </block>' +
  '</category>' +
  '</xml>';
