/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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

/**
 * @fileoverview Object representing a workspace.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Workspace');

goog.require('Blockly.VariableMap');
goog.require('goog.array');
goog.require('goog.math');


/**
 * Class for a workspace.  This is a data structure that contains blocks.
 * There is no UI, and can be created headlessly.
 * @param {!Blockly.Options=} opt_options Dictionary of options.
 * @constructor
 */
Blockly.Workspace = function(opt_options) {
  /** @type {string} */
  this.id = Blockly.utils.genUid();
  Blockly.Workspace.WorkspaceDB_[this.id] = this;
  /** @type {!Blockly.Options} */
  this.options = opt_options || {};
  /** @type {boolean} */
  this.RTL = !!this.options.RTL;
  /** @type {boolean} */
  this.horizontalLayout = !!this.options.horizontalLayout;
  /** @type {number} */
  this.toolboxPosition = this.options.toolboxPosition;

  /**
   * @type {!Array.<!Blockly.Block>}
   * @private
   */
  this.topBlocks_ = [];
  /**
   * @type {!Array.<!Function>}
   * @private
   */
  this.listeners_ = [];
  /**
   * @type {!Array.<!Blockly.Events.Abstract>}
   * @protected
   */
  this.undoStack_ = [];
  /**
   * @type {!Array.<!Blockly.Events.Abstract>}
   * @protected
   */
  this.redoStack_ = [];
  /**
   * @type {!Object}
   * @private
   */
  this.blockDB_ = Object.create(null);

  /**
   * A map from variable type to list of variable names.  The lists contain all
   * of the named variables in the workspace, including variables
   * that are not currently in use.
   * @type {!Blockly.VariableMap}
   * @private
   */
  this.variableMap_ = new Blockly.VariableMap(this);

  /**
   * Blocks in the flyout can refer to variables that don't exist in the main
   * workspace.  For instance, the "get item in list" block refers to an "item"
   * variable regardless of whether the variable has been created yet.
   * A FieldVariable must always refer to a Blockly.VariableModel.  We reconcile
   * these by tracking "potential" variables in the flyout.  These variables
   * become real when references to them are dragged into the main workspace.
   * @type {!Blockly.VariableMap}
   * @private
   */
  this.potentialVariableMap_ = null;
};

/**
 * Returns `true` if the workspace is visible and `false` if it's headless.
 * @type {boolean}
 */
Blockly.Workspace.prototype.rendered = false;

/**
 * Maximum number of undo events in stack. `0` turns off undo, `Infinity` sets it to unlimited.
 * @type {number}
 */
Blockly.Workspace.prototype.MAX_UNDO = 1024;

/**
 * Dispose of this workspace.
 * Unlink from all DOM elements to prevent memory leaks.
 */
Blockly.Workspace.prototype.dispose = function() {
  this.listeners_.length = 0;
  this.clear();
  // Remove from workspace database.
  delete Blockly.Workspace.WorkspaceDB_[this.id];
};

/**
 * Angle away from the horizontal to sweep for blocks.  Order of execution is
 * generally top to bottom, but a small angle changes the scan to give a bit of
 * a left to right bias (reversed in RTL).  Units are in degrees.
 * See: http://tvtropes.org/pmwiki/pmwiki.php/Main/DiagonalBilling.
 */
Blockly.Workspace.SCAN_ANGLE = 3;

/**
 * Add a block to the list of top blocks.
 * @param {!Blockly.Block} block Block to add.
 */
Blockly.Workspace.prototype.addTopBlock = function(block) {
  this.topBlocks_.push(block);
};

/**
 * Remove a block from the list of top blocks.
 * @param {!Blockly.Block} block Block to remove.
 */
Blockly.Workspace.prototype.removeTopBlock = function(block) {
  if (!goog.array.remove(this.topBlocks_, block)) {
    throw 'Block not present in workspace\'s list of top-most blocks.';
  }
};

/**
 * Finds the top-level blocks and returns them.  Blocks are optionally sorted
 * by position; top to bottom (with slight LTR or RTL bias).
 * @param {boolean} ordered Sort the list if true.
 * @return {!Array.<!Blockly.Block>} The top-level block objects.
 */
Blockly.Workspace.prototype.getTopBlocks = function(ordered) {
  // Copy the topBlocks_ list.
  var blocks = [].concat(this.topBlocks_);
  if (ordered && blocks.length > 1) {
    var offset = Math.sin(goog.math.toRadians(Blockly.Workspace.SCAN_ANGLE));
    if (this.RTL) {
      offset *= -1;
    }
    blocks.sort(function(a, b) {
      var aXY = a.getRelativeToSurfaceXY();
      var bXY = b.getRelativeToSurfaceXY();
      return (aXY.y + offset * aXY.x) - (bXY.y + offset * bXY.x);
    });
  }
  return blocks;
};

/**
 * Find all blocks in workspace.  No particular order.
 * @return {!Array.<!Blockly.Block>} Array of blocks.
 */
Blockly.Workspace.prototype.getAllBlocks = function() {
  var blocks = this.getTopBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    blocks.push.apply(blocks, blocks[i].getChildren());
  }
  return blocks;
};

/**
 * Dispose of all blocks in workspace.
 */
Blockly.Workspace.prototype.clear = function() {
  var existingGroup = Blockly.Events.getGroup();
  if (!existingGroup) {
    Blockly.Events.setGroup(true);
  }
  while (this.topBlocks_.length) {
    this.topBlocks_[0].dispose();
  }
  if (!existingGroup) {
    Blockly.Events.setGroup(false);
  }
  this.variableMap_.clear();
  if (this.potentialVariableMap_) {
    this.potentialVariableMap_.clear();
  }
};

/* Begin functions that are just pass-throughs to the variable map. */
/**
 * Rename a variable by updating its name in the variable map. Identify the
 * variable to rename with the given ID.
 * @param {string} id ID of the variable to rename.
 * @param {string} newName New variable name.
 */
Blockly.Workspace.prototype.renameVariableById = function(id, newName) {
  this.variableMap_.renameVariableById(id, newName);
};

/**
 * Create a variable with a given name, optional type, and optional ID.
 * @param {!string} name The name of the variable. This must be unique across
 *     variables and procedures.
 * @param {string=} opt_type The type of the variable like 'int' or 'string'.
 *     Does not need to be unique. Field_variable can filter variables based on
 *     their type. This will default to '' which is a specific type.
 * @param {string=} opt_id The unique ID of the variable. This will default to
 *     a UUID.
 * @return {?Blockly.VariableModel} The newly created variable.
 */
Blockly.Workspace.prototype.createVariable = function(name, opt_type, opt_id) {
  return this.variableMap_.createVariable(name, opt_type, opt_id);
};

/**
 * Find all the uses of the given variable, which is identified by ID.
 * @param {string} id ID of the variable to find.
 * @return {!Array.<!Blockly.Block>} Array of block usages.
 */
Blockly.Workspace.prototype.getVariableUsesById = function(id) {
  return this.variableMap_.getVariableUsesById(id);
};

/**
 * Delete a variables by the passed in ID and all of its uses from this
 * workspace. May prompt the user for confirmation.
 * @param {string} id ID of variable to delete.
 */
Blockly.Workspace.prototype.deleteVariableById = function(id) {
  this.variableMap_.deleteVariableById(id);
};

/**
 * Deletes a variable and all of its uses from this workspace without asking the
 * user for confirmation.
 * @param {!Blockly.VariableModel} variable Variable to delete.
 * @param {!Array.<!Blockly.Block>} uses An array of uses of the variable.
 * @private
 */
Blockly.Workspace.prototype.deleteVariableInternal_ = function(variable, uses) {
  this.variableMap_.deleteVariableInternal_(variable, uses);
};

/**
 * Check whether a variable exists with the given name.  The check is
 * case-insensitive.
 * @param {string} _name The name to check for.
 * @return {number} The index of the name in the variable list, or -1 if it is
 *     not present.
 * @deprecated April 2017
 */

Blockly.Workspace.prototype.variableIndexOf = function(_name) {
  console.warn(
      'Deprecated call to Blockly.Workspace.prototype.variableIndexOf');
  return -1;
};

/**
 * Find the variable by the given name and return it. Return null if it is not
 *     found.
 * @param {!string} name The name to check for.
 * @param {string=} opt_type The type of the variable.  If not provided it
 *     defaults to the empty string, which is a specific type.
 * @return {?Blockly.VariableModel} the variable with the given name.
 */
// TODO (#1199): Possibly delete this function.
Blockly.Workspace.prototype.getVariable = function(name, opt_type) {
  return this.variableMap_.getVariable(name, opt_type);
};

/**
 * Find the variable by the given ID and return it. Return null if it is not
 *     found.
 * @param {!string} id The ID to check for.
 * @return {?Blockly.VariableModel} The variable with the given ID.
 */
Blockly.Workspace.prototype.getVariableById = function(id) {
  return this.variableMap_.getVariableById(id);
};

/**
 * Find the variable with the specified type. If type is null, return list of
 *     variables with empty string type.
 * @param {?string} type Type of the variables to find.
 * @return {Array.<Blockly.VariableModel>} The sought after variables of the
 *     passed in type. An empty array if none are found.
 */
Blockly.Workspace.prototype.getVariablesOfType = function(type) {
  return this.variableMap_.getVariablesOfType(type);
};

/**
 * Return all variable types.
 * @return {!Array.<string>} List of variable types.
 * @package
 */
Blockly.Workspace.prototype.getVariableTypes = function() {
  return this.variableMap_.getVariableTypes();
};

/**
 * Return all variables of all types.
 * @return {!Array.<Blockly.VariableModel>} List of variable models.
 */
Blockly.Workspace.prototype.getAllVariables = function() {
  return this.variableMap_.getAllVariables();
};

/* End functions that are just pass-throughs to the variable map. */

/**
 * Returns the horizontal offset of the workspace.
 * Intended for LTR/RTL compatibility in XML.
 * Not relevant for a headless workspace.
 * @return {number} Width.
 */
Blockly.Workspace.prototype.getWidth = function() {
  return 0;
};

/**
 * Obtain a newly created block.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
 *     create a new ID.
 * @return {!Blockly.Block} The created block.
 */
Blockly.Workspace.prototype.newBlock = function(prototypeName, opt_id) {
  return new Blockly.Block(this, prototypeName, opt_id);
};

/**
 * The number of blocks that may be added to the workspace before reaching
 *     the maxBlocks.
 * @return {number} Number of blocks left.
 */
Blockly.Workspace.prototype.remainingCapacity = function() {
  if (isNaN(this.options.maxBlocks)) {
    return Infinity;
  }
  return this.options.maxBlocks - this.getAllBlocks().length;
};

/**
 * Undo or redo the previous action.
 * @param {boolean} redo False if undo, true if redo.
 */
Blockly.Workspace.prototype.undo = function(redo) {
  var inputStack = redo ? this.redoStack_ : this.undoStack_;
  var outputStack = redo ? this.undoStack_ : this.redoStack_;
  var inputEvent = inputStack.pop();
  if (!inputEvent) {
    return;
  }
  var events = [inputEvent];
  // Do another undo/redo if the next one is of the same group.
  while (inputStack.length && inputEvent.group &&
      inputEvent.group == inputStack[inputStack.length - 1].group) {
    events.push(inputStack.pop());
  }
  // Push these popped events on the opposite stack.
  for (var i = 0, event; event = events[i]; i++) {
    outputStack.push(event);
  }
  events = Blockly.Events.filter(events, redo);
  Blockly.Events.recordUndo = false;
  try {
    for (var i = 0, event; event = events[i]; i++) {
      event.run(redo);
    }
  } finally {
    Blockly.Events.recordUndo = true;
  }
};

/**
 * Clear the undo/redo stacks.
 */
Blockly.Workspace.prototype.clearUndo = function() {
  this.undoStack_.length = 0;
  this.redoStack_.length = 0;
  // Stop any events already in the firing queue from being undoable.
  Blockly.Events.clearPendingUndo();
};

/**
 * When something in this workspace changes, call a function.
 * @param {!Function} func Function to call.
 * @return {!Function} Function that can be passed to
 *     removeChangeListener.
 */
Blockly.Workspace.prototype.addChangeListener = function(func) {
  this.listeners_.push(func);
  return func;
};

/**
 * Stop listening for this workspace's changes.
 * @param {Function} func Function to stop calling.
 */
Blockly.Workspace.prototype.removeChangeListener = function(func) {
  goog.array.remove(this.listeners_, func);
};

/**
 * Fire a change event.
 * @param {!Blockly.Events.Abstract} event Event to fire.
 */
Blockly.Workspace.prototype.fireChangeListener = function(event) {
  if (event.recordUndo) {
    this.undoStack_.push(event);
    this.redoStack_.length = 0;
    if (this.undoStack_.length > this.MAX_UNDO) {
      this.undoStack_.unshift();
    }
  }
  for (var i = 0, func; func = this.listeners_[i]; i++) {
    func(event);
  }
};

/**
 * Find the block on this workspace with the specified ID.
 * @param {string} id ID of block to find.
 * @return {Blockly.Block} The sought after block or null if not found.
 */
Blockly.Workspace.prototype.getBlockById = function(id) {
  return this.blockDB_[id] || null;
};

/**
 * Checks whether all value and statement inputs in the workspace are filled
 * with blocks.
 * @param {boolean=} opt_shadowBlocksAreFilled An optional argument controlling
 *     whether shadow blocks are counted as filled. Defaults to true.
 * @return {boolean} True if all inputs are filled, false otherwise.
 */
Blockly.Workspace.prototype.allInputsFilled = function(opt_shadowBlocksAreFilled) {
  var blocks = this.getTopBlocks(false);
  for (var i = 0, block; block = blocks[i]; i++) {
    if (!block.allInputsFilled(opt_shadowBlocksAreFilled)) {
      return false;
    }
  }
  return true;
};

/**
 * Return the variable map that contains "potential" variables.  These exist in
 * the flyout but not in the workspace.
 * @return {?Blockly.VariableMap} The potential variable map.
 * @package
 */
Blockly.Workspace.prototype.getPotentialVariableMap = function() {
  return this.potentialVariableMap_;
};

/**
 * Create and store the potential variable map for this workspace.
 * @package
 */
Blockly.Workspace.prototype.createPotentialVariableMap = function() {
  this.potentialVariableMap_ = new Blockly.VariableMap(this);
};

/**
 * Return the map of all variables on the workspace.
 * @return {?Blockly.VariableMap} The  variable map.
 */
Blockly.Workspace.prototype.getVariableMap = function() {
  return this.variableMap_;
};

/**
 * Database of all workspaces.
 * @private
 */
Blockly.Workspace.WorkspaceDB_ = Object.create(null);

/**
 * Find the workspace with the specified ID.
 * @param {string} id ID of workspace to find.
 * @return {Blockly.Workspace} The sought after workspace or null if not found.
 */
Blockly.Workspace.getById = function(id) {
  return Blockly.Workspace.WorkspaceDB_[id] || null;
};

// Export symbols that would otherwise be renamed by Closure compiler.
Blockly.Workspace.prototype['clear'] = Blockly.Workspace.prototype.clear;
Blockly.Workspace.prototype['clearUndo'] =
    Blockly.Workspace.prototype.clearUndo;
Blockly.Workspace.prototype['addChangeListener'] =
    Blockly.Workspace.prototype.addChangeListener;
Blockly.Workspace.prototype['removeChangeListener'] =
    Blockly.Workspace.prototype.removeChangeListener;
