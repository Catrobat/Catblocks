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
 * @fileoverview Text input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldTextInput');

goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.userAgent');


/**
 * Class for an editable text field.
 * @param {string} text The initial content of the field.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns either the accepted text, a replacement
 *     text, or null to abort the change.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldTextInput = function(text, opt_validator) {
  Blockly.FieldTextInput.superClass_.constructor.call(this, text,
      opt_validator);
};
goog.inherits(Blockly.FieldTextInput, Blockly.Field);

/**
 * Construct a FieldTextInput from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (text, class, and
 *                          spellcheck).
 * @returns {!Blockly.FieldTextInput} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldTextInput.fromJson = function(options) {
  var text = Blockly.utils.replaceMessageReferences(options['text']);
  var field = new Blockly.FieldTextInput(text, options['class']);
  if (typeof options['spellcheck'] === 'boolean') {
    field.setSpellcheck(options['spellcheck']);
  }
  return field;
};

/**
 * Point size of text.  Should match blocklyText's font-size in CSS.
 */
Blockly.FieldTextInput.FONTSIZE = 11;

/**
 * The HTML input element for the user to type, or null if no FieldTextInput
 * editor is currently open.
 * @type {HTMLInputElement}
 * @private
 */
Blockly.FieldTextInput.htmlInput_ = null;

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldTextInput.prototype.CURSOR = 'text';

/**
 * Allow browser to spellcheck this field.
 * @private
 */
Blockly.FieldTextInput.prototype.spellcheck_ = true;

/**
 * Close the input widget if this input is being deleted.
 */
Blockly.FieldTextInput.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldTextInput.superClass_.dispose.call(this);
};

/**
 * Set the value of this field.
 * @param {?string} newValue New value.
 * @override
 */
Blockly.FieldTextInput.prototype.setValue = function(newValue) {
  if (newValue === null) {
    return;  // No change if null.
  }
  if (this.sourceBlock_) {
    var validated = this.callValidator(newValue);
    // If the new value is invalid, validation returns null.
    // In this case we still want to display the illegal result.
    if (validated !== null) {
      newValue = validated;
    }
  }
  Blockly.Field.prototype.setValue.call(this, newValue);
};

/**
 * Set the text in this field and fire a change event.
 * @param {*} newText New text.
 */
Blockly.FieldTextInput.prototype.setText = function(newText) {
  if (newText === null) {
    // No change if null.
    return;
  }
  newText = String(newText);
  if (newText === this.text_) {
    // No change.
    return;
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.BlockChange(
        this.sourceBlock_, 'field', this.name, this.text_, newText));
  }
  Blockly.Field.prototype.setText.call(this, newText);
};

/**
 * Set whether this field is spellchecked by the browser.
 * @param {boolean} check True if checked.
 */
Blockly.FieldTextInput.prototype.setSpellcheck = function(check) {
  this.spellcheck_ = check;
};

/**
 * Show the inline free-text editor on top of the text.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldTextInput.prototype.showEditor_ = function(opt_quietInput) {
  this.workspace_ = this.sourceBlock_.workspace;
  var quietInput = opt_quietInput || false;
  if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
                      goog.userAgent.IPAD)) {
    this.showPromptEditor_();
  } else {
    this.showInlineEditor_(quietInput);
  }
};

/**
 * Create and show a text input editor that is a prompt (usually a popup).
 * Mobile browsers have issues with in-line textareas (focus and keyboards).
 * @private
 */
Blockly.FieldTextInput.prototype.showPromptEditor_ = function() {
  var fieldText = this;
  Blockly.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_,
      function(newValue) {
        if (fieldText.sourceBlock_) {
          newValue = fieldText.callValidator(newValue);
        }
        fieldText.setValue(newValue);
      });
};

/**
 * Create and show a text input editor that sits directly over the text input.
 * @param {boolean} quietInput True if editor should be created without
 *     focus.
 * @private
 */
Blockly.FieldTextInput.prototype.showInlineEditor_ = function(quietInput) {
  Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
  var div = Blockly.WidgetDiv.DIV;
  // Create the input.
  var htmlInput =
      goog.dom.createDom(goog.dom.TagName.INPUT, 'blocklyHtmlInput');
  htmlInput.setAttribute('spellcheck', this.spellcheck_);
  var fontSize =
      (Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale) + 'pt';
  div.style.fontSize = fontSize;
  htmlInput.style.fontSize = fontSize;

  Blockly.FieldTextInput.htmlInput_ = htmlInput;
  div.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.text_;
  htmlInput.oldValue_ = null;
  this.validate_();
  this.resizeEditor_();
  if (!quietInput) {
    htmlInput.focus();
    htmlInput.select();
  }

  this.bindEvents_(htmlInput);
};

/**
 * Bind handlers for user input on this field and size changes on the workspace.
 * @param {!HTMLInputElement} htmlInput The htmlInput created in showEditor, to
 *     which event handlers will be bound.
 * @private
 */
Blockly.FieldTextInput.prototype.bindEvents_ = function(htmlInput) {
  // Bind to keydown -- trap Enter without IME and Esc to hide.
  htmlInput.onKeyDownWrapper_ =
      Blockly.bindEventWithChecks_(
          htmlInput, 'keydown', this, this.onHtmlInputKeyDown_);
  // Bind to keyup -- trap Enter; resize after every keystroke.
  htmlInput.onKeyUpWrapper_ =
      Blockly.bindEventWithChecks_(
          htmlInput, 'keyup', this, this.onHtmlInputChange_);
  // Bind to keyPress -- repeatedly resize when holding down a key.
  htmlInput.onKeyPressWrapper_ =
      Blockly.bindEventWithChecks_(
          htmlInput, 'keypress', this, this.onHtmlInputChange_);
  htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
  this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);
};

/**
 * Unbind handlers for user input and workspace size changes.
 * @param {!HTMLInputElement} htmlInput The html for this text input.
 * @private
 */
Blockly.FieldTextInput.prototype.unbindEvents_ = function(htmlInput) {
  Blockly.unbindEvent_(htmlInput.onKeyDownWrapper_);
  Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
  Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
  this.workspace_.removeChangeListener(
      htmlInput.onWorkspaceChangeWrapper_);
};

/**
 * Handle key down to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputKeyDown_ = function(e) {
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  var tabKey = 9, enterKey = 13, escKey = 27;
  if (e.keyCode == enterKey) {
    Blockly.WidgetDiv.hide();
  } else if (e.keyCode == escKey) {
    htmlInput.value = htmlInput.defaultValue;
    Blockly.WidgetDiv.hide();
  } else if (e.keyCode == tabKey) {
    Blockly.WidgetDiv.hide();
    this.sourceBlock_.tab(this, !e.shiftKey);
    e.preventDefault();
  }
};

/**
 * Handle a change to the editor.
 * @param {!Event} _e Keyboard event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(_e) {
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  // Update source block.
  var text = htmlInput.value;
  if (text !== htmlInput.oldValue_) {
    htmlInput.oldValue_ = text;
    this.setValue(text);
    this.validate_();
  } else if (goog.userAgent.WEBKIT) {
    // Cursor key.  Render the source block to show the caret moving.
    // Chrome only (version 26, OS X).
    this.sourceBlock_.render();
  }
  this.resizeEditor_();
  Blockly.svgResize(this.sourceBlock_.workspace);
};

/**
 * Check to see if the contents of the editor validates.
 * Style the editor accordingly.
 * @private
 */
Blockly.FieldTextInput.prototype.validate_ = function() {
  var valid = true;
  goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  if (this.sourceBlock_) {
    valid = this.callValidator(htmlInput.value);
  }
  if (valid === null) {
    Blockly.utils.addClass(htmlInput, 'blocklyInvalidInput');
  } else {
    Blockly.utils.removeClass(htmlInput, 'blocklyInvalidInput');
  }
};

/**
 * Resize the editor and the underlying block to fit the text.
 * @private
 */
Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
  var div = Blockly.WidgetDiv.DIV;
  var bBox = this.getScaledBBox_();
  div.style.width = bBox.right - bBox.left + 'px';
  div.style.height = bBox.bottom - bBox.top + 'px';

  // In RTL mode block fields and LTR input fields the left edge moves,
  // whereas the right edge is fixed.  Reposition the editor.
  var x = this.sourceBlock_.RTL ? bBox.right - div.offsetWidth : bBox.left;
  var xy = new goog.math.Coordinate(x, bBox.top);

  // Shift by a few pixels to line up exactly.
  xy.y += 1;
  if (goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top) {
    // Firefox mis-reports the location of the border by a pixel
    // once the WidgetDiv is moved into position.
    xy.x -= 1;
    xy.y -= 1;
  }
  if (goog.userAgent.WEBKIT) {
    xy.y -= 3;
  }
  div.style.left = xy.x + 'px';
  div.style.top = xy.y + 'px';
};

/**
 * Close the editor, save the results, and dispose of the editable
 * text field's elements.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldTextInput.prototype.widgetDispose_ = function() {
  var thisField = this;
  return function() {
    var htmlInput = Blockly.FieldTextInput.htmlInput_;
    // Save the edit (if it validates).
    thisField.maybeSaveEdit_();

    thisField.unbindEvents_(htmlInput);
    Blockly.FieldTextInput.htmlInput_ = null;
    Blockly.Events.setGroup(false);

    // Delete style properties.
    var style = Blockly.WidgetDiv.DIV.style;
    style.width = 'auto';
    style.height = 'auto';
    style.fontSize = '';
  };
};

Blockly.FieldTextInput.prototype.maybeSaveEdit_ = function() {
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  // Save the edit (if it validates).
  var text = htmlInput.value;
  if (this.sourceBlock_) {
    var text1 = this.callValidator(text);
    if (text1 === null) {
      // Invalid edit.
      text = htmlInput.defaultValue;
    } else {
      // Validation function has changed the text.
      text = text1;
      if (this.onFinishEditing_) {
        this.onFinishEditing_(text);
      }
    }
  }
  this.setText(text);
  this.sourceBlock_.rendered && this.sourceBlock_.render();
};

/**
 * Ensure that only a number may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid number, or null if invalid.
 */
Blockly.FieldTextInput.numberValidator = function(text) {
  console.warn('Blockly.FieldTextInput.numberValidator is deprecated. ' +
               'Use Blockly.FieldNumber instead.');
  if (text === null) {
    return null;
  }
  text = String(text);
  // TODO: Handle cases like 'ten', '1.203,14', etc.
  // 'O' is sometimes mistaken for '0' by inexperienced users.
  text = text.replace(/O/ig, '0');
  // Strip out thousands separators.
  text = text.replace(/,/g, '');
  var n = parseFloat(text || 0);
  return isNaN(n) ? null : String(n);
};

/**
 * Ensure that only a nonnegative integer may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid int, or null if invalid.
 */
Blockly.FieldTextInput.nonnegativeIntegerValidator = function(text) {
  var n = Blockly.FieldTextInput.numberValidator(text);
  if (n) {
    n = String(Math.max(0, Math.floor(n)));
  }
  return n;
};

Blockly.Field.register('field_input', Blockly.FieldTextInput);
