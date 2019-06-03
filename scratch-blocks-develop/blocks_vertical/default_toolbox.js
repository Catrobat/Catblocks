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
 '<category name="%{BKY_CATEGORY_MOTION}" id= "motion" colour="#4C97FF" secondaryColour="#3373CC">' +
'<block type="PlaceAtBrick" x="" y="">' +
'  <value name="X_POSITION">' +
'    <shadow type="text">' +
'      <field name="TEXT">100</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="Y_POSITION">' +
'    <shadow type="text">' +
'      <field name="TEXT">200</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetXBrick" x="" y="">' +
'  <value name="X_POSITION">' +
'    <shadow type="text">' +
'      <field name="TEXT">100</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetYBrick" x="" y="">' +
'  <value name="Y_POSITION">' +
'    <shadow type="text">' +
'      <field name="TEXT">200</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeXByNBrick" x="" y="">' +
'  <value name="X_POSITION_CHANGE">' +
'    <shadow type="text">' +
'      <field name="TEXT">10</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeYByNBrick" x="" y="">' +
'  <value name="Y_POSITION_CHANGE">' +
'    <shadow type="text">' +
'      <field name="TEXT">10</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="GoToBrick" x="" y="">' +
'  <field name="DROPDOWN">touch position</field>' +
'</block>' +
'<block type="IfOnEdgeBounceBrick" x="" y="">' +
'</block>' +
'<block type="MoveNStepsBrick" x="" y="">' +
'  <value name="STEPS">' +
'    <shadow type="text">' +
'      <field name="TEXT">10</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="TurnRightBrick" x="" y="">' +
'  <value name="TURN_RIGHT_DEGREES">' +
'    <shadow type="text">' +
'      <field name="TEXT">15</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="TurnLeftBrick" x="" y="">' +
'  <value name="TURN_LEFT_DEGREES">' +
'    <shadow type="text">' +
'      <field name="TEXT">15</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="PointInDirectionBrick" x="" y="">' +
'  <value name="DEGREES">' +
'    <shadow type="math_angle">' +
'      <field name="TEXT">90</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="PointToBrick" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
' <block type="SetRotationStyleBrick">' +
'	 <field name="DROPDOWN">left-right only</field>' +
' </block>' +
'<block type="GlideToBrick" x="" y="">' +
'  <value name="DURATION_IN_SECONDS">' +
'    <shadow type="text">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="X_DESTINATION">' +
'    <shadow type="text">' +
'      <field name="TEXT">100</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="Y_DESTINATION">' +
'    <shadow type="text">' +
'      <field name="TEXT">200</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="GoNStepsBackBrick" x="" y="">' +
'  <value name="STEPS">' +
'    <shadow type="text">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ComeToFrontBrick" x="" y="">' +
'</block>' +
'<block type="VibrationBrick" x="" y="">' +
'  <value name="VIBRATE_DURATION_IN_SECONDS">' +
'    <shadow type="text">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetPhysicsObjectTypeBrick" x="" y="">' +
'    <field name="DROPDOWN">moving and bouncing under gravity</field>' +
'</block>' +
'<block type="SetVelocityBrick" x="" y="">' +
'  <value name="PHYSICS_VELOCITY_X">' +
'    <shadow type="text">' +
'      <field name="TEXT">0</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="PHYSICS_VELOCITY_Y">' +
'    <shadow type="text">' +
'      <field name="TEXT">0</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="TurnLeftSpeedBrick" x="" y="">' +
'  <value name="PHYSICS_TURN_LEFT_SPEED">' +
'    <shadow type="text">' +
'      <field name="TEXT">15</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="TurnRightSpeedBrick" x="" y="">' +
'  <value name="PHYSICS_TURN_RIGHT_SPEED">' +
'    <shadow type="text">' +
'      <field name="TEXT">15</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetGravityBrick" x="" y="">' +
'  <value name="PHYSICS_GRAVITY_X">' +
'    <shadow type="text">' +
'      <field name="TEXT">0</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="PHYSICS_GRAVITY_Y">' +
'    <shadow type="text">' +
'      <field name="TEXT">-10</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetMassBrick" x="307" y="235">' +
'  <value name="PHYSICS_MASS">' +
'    <shadow type="text">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetBounceBrick" x="" y="">' +
'  <value name="PHYSICS_BOUNCE_FACTOR">' +
'    <shadow type="text">' +
'      <field name="TEXT">80</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetFrictionBrick">' +
'<value name="PHYSICS_FRICTION">' +
'<shadow type="text">' +
'<field name="TEXT">80</field>' +
'  </shadow>' +
'</value>' +
'</block>' +
'</category>' +
 '<category name="%{BKY_CATEGORY_LOOKS}" id= "looks" colour="#59C059" secondaryColour="#59C059">' +
'<block type="SetLookBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="SetLookByIndexBrick" id="" x="" y="">' +
'  <value name="LOOK_INDEX">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="NextLookBrick" id="" x="140" y="375">' +
'</block>' +
'<block type="PreviousLookBrick" id="" x="" y="">' +
'</block>' +
'<block type="SetSizeToBrick" id="" x="" y="">' +
'  <value name="SIZE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">60</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="HideBrick" id="" x="" y="">' +
'</block>' +
'<block type="ShowBrick" id="" x="" y="">' +
'</block>' +
'<block type="AskBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">name</field>' +
'  <value name="ASK_QUESTION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">What\'s your name?</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'' +
'<block type="SayBubbleBrick" id="" x="" y="">' +
'  <value name="SAY_BRICK">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">Hello!</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SayForBubbleBrick" id="" x="" y="">' +
'  <value name="SAY_BRICK">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">Hello!</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="DURATION_IN_SECONDS">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ThinkBubbleBrick" id="" x="" y="">' +
'  <value name="THINK_BRICK">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">Hmmmm!</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ThinkForBubbleBrick" id="" x="" y="">' +
'  <value name="THINK_BRICK">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">Hmmmm!</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="DURATION_IN_SECONDS">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetTransparencyBrick" id="" x="" y="">' +
'  <value name="TRANSPARENCY">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">50</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeSizeByNBrick" id="" x="" y="">' +
'  <value name="SIZE_CHANGE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">10</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeTransparencyByNBrick" id="" x="" y="">' +
'  <value name="TRANSPARENCY_CHANGE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">25</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetBrightnessBrick" id="" x="" y="">' +
'  <value name="BRIGHTNESS">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">50</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeBrightnessByNBrick" id="" x="" y="">' +
'  <value name="BRIGHTNESS_CHANGE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">25</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetColorBrick" id="" x="" y="">' +
'  <value name="COLOR">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">0</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeColorByNBrick" id="" x="" y="">' +
'  <value name="COLOR_CHANGE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">25</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ClearGraphicEffectBrick" id="" x="" y="">' +
'</block>' +
'<block type="SetBackgroundBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="SetBackgroundByIndexBrick" id="" x="" y="">' +
'  <value name="LOOK_INDEX">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetBackgroundAndWaitBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="SetBackgroundByIndexAndWaitBrick" id="" x="" y="">' +
'  <value name="LOOK_INDEX">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="CameraBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">on</field>' +
'</block>' +
'<block type="ChooseCameraBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">front</field>' +
'</block>' +
'<block type="FlashBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">on</field>' +
'</block>' +
'</category>' +
 '<category name="%{BKY_CATEGORY_SOUND}" id= "sound" colour="#9966FF" secondaryColour="#9966FF">' +
'<block type="PlaySoundBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>>' +
'</block>' +
'<block type="PlaySoundAndWaitBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
' </block>' +
'<block type="StopAllSoundsBrick" id="" x="" y="">' +
'</block>' +
'<block type="SetVolumeToBrick" id="" x="" y="">' +
'  <value name="VOLUME">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">60</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeVolumeByNBrick" id="" x="" y="">' +
'  <value name="VOLUME_CHANGE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">-10</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SpeakBrick" id="" x="" y="">' +
'  <value name="SPEAK">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">Hello!</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SpeakAndWaitBrick" id="" x="" y="">' +
'  <value name="SPEAK">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">Hello!</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="AskSpeechBrick" id="" x="" y="">' +
'  <value name="ASK_SPEECH_QUESTION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">What\'s your name?</field>' +
'    </shadow>' +
'  </value>' +
'  <field name="DROPDOWN">name</field>' +
'</block>' +
'</category>' +
 '<category name="%{BKY_CATEGORY_EVENTS}" id= "events" colour="#FF661A" secondaryColour="#CC9900">' +
'<block type="StartScript" id="" x="" y="">' +
'</block>' +
'<block type="WhenBrick" id="" x="" y="">' +
'</block>' +
'<block type="WhenTouchDownBrick" id="" x="" y="">' +
'</block>' +
'<block type="BroadcastScript" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="BroadcastBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'' +
'' +
'<block type="BroadcastWaitBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="WhenConditionScript" id="" x="" y="">' +
'  <value name="IF_CONDITION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1 &lt; 2</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="CollisionScript" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="WhenBackgroundChangesScript" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'</category>' +
 '<category name="%{BKY_CATEGORY_CONTROL}" id= "control" colour="#FFAB19" secondaryColour="#CF8B17">' +
'<block type="ForeverBrick" id="" x="" y="">' +
'</block>' +
'<block type="WaitBrick" id="" x="" y="">' +
'  <value name="TIME_TO_WAIT_IN_SECONDS">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="NoteBrick" id="" x="" y="">' +
'  <value name="NOTE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">add comment here...</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="IfElseLogicBeginBrick" id="" x="" y="">' +
'    <value name="TEXT">' +
'      <shadow type="text" id="">' +
'        <field name="TEXT">1&lt;2</field>' +
'      </shadow>' +
'    </value>' +
'</block>' +
'<block type="IfLogicBeginBrick" id="" x="" y="">' +
'  <value name="TEXT">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1&lt;2</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="WaitUntilBrick" id="" x="" y="">' +
'  <value name="IF_CONDITION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1&lt;2</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="RepeatBrick" id="" x="" y="">' +
'  <value name="TIMES_TO_REPEAT">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">10</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="RepeatUntilBrick" id="" x="" y="">' +
'  <value name="REPEAT_UNTIL_CONDITION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1&lt;2</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SceneTransitionBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="SceneStartBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="StopScriptBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="CloneBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'<block type="DeleteThisCloneBrick" id="" x="" y="">' +
'</block>' +
'<block type="control_whenyoustartasaclone" id="*9Mi7?/wFw.|?`ucvf+K" x="" y="">' +
'</block>' +
'</category>' +
 '<category name="Pen" id= "sensing" colour="#0fBD8C" secondaryColour="#2E8EB8">' +
'<block type="PenDownBrick" id="" x="" y="">' +
'</block>' +
'<block type="PenUpBrick" id="" x="" y="">' +
'</block>' +
'<block type="SetPenSizeBrick" id="" x="" y="">' +
'  <value name="PEN_SIZE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">3.15</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="SetPenColorBrick" id="" x="" y="">' +
'  <value name="PEN_COLOR_RED">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">0</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="PEN_COLOR_GREEN">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">0</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="PEN_COLOR_BLUE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">255</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="StampBrick" id="" x="" y="">' +
'</block>' +
'<block type="ClearBackgroundBrick" id="" x="" y="">' +
'</block>' +
'</category>' +
 '<category name="Data" id= "operators" colour="#FF6680" secondaryColour="#389438">' +
'<block type="SetVariableBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="VARIABLE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ChangeVariableBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="VARIABLE_CHANGE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ShowTextBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="X_POSITION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">100</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="Y_POSITION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">200</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ShowTextColorSizeAlignmentBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="X_POSITION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">100</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="Y_POSITION">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">200</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="SIZE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">120</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="COLOR">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">#FF0000</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="CHANGE">' +
'    <shadow type="math_number" id="">' +
'      <field name="NUM">1</field>' +
'    </shadow>' +
'  </value>' +
'  <field name="DROPDOWN2">new...</field>' +
'</block>' +
'<block type="DeleteItemOfUserListBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="LIST_DELETE_ITEM">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="AddItemToUserListBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="LIST_ADD_ITEM">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">name</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="InsertItemIntoUserListBrick" id="" x="" y="">' +
'  <value name="INSERT_ITEM_INTO_USERLIST_VALUE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="INSERT_ITEM_INTO_USERLIST_INDEX">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="ReplaceItemInUserListBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'  <value name="INSERT_ITEM_INTO_USERLIST_INDEX">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'  <value name="INSERT_ITEM_INTO_USERLIST_VALUE">' +
'    <shadow type="text" id="">' +
'      <field name="TEXT">1</field>' +
'    </shadow>' +
'  </value>' +
'</block>' +
'<block type="HideTextBrick" id="" x="" y="">' +
'  <field name="DROPDOWN">new...</field>' +
'</block>' +
'</category>'+ '</xml>';