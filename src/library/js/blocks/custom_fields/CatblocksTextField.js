import Blockly from 'blockly';
import { browserEvents } from 'blockly';

export class CatblocksTextField extends Blockly.FieldTextInput {
  static fromJson(options) {
    const createdField = super.fromJson(options);

    if (createdField) {
      if (Object.prototype.hasOwnProperty.call(options, 'catroid_field_id')) {
        createdField.catroid_field_id = options['catroid_field_id'];
      } else {
        createdField.catroid_field_id = options['name'];
      }
    }

    return createdField;
  }

  constructor(value, validator) {
    super(value, validator);
    this.domIdPrefix = '';
  }

  setDomIdPrefix(id) {
    this.domIdPrefix = id;
  }

  bindEvents_() {
    super.bindEvents_();

    const clickTarget = this.getClickTarget_();
    this.mouseDownWrapper_ = browserEvents.conditionalBind(clickTarget, 'click', this, this.handleCatblocksClick);
  }

  handleCatblocksClick() {
    console.log('clicked brick ' + this.sourceBlock_.id + ' field ' + this.catroid_field_id);
    Android.showFormulaEditor(this.sourceBlock_.id, this.catroid_field_id);
  }

  render_() {
    super.render_();
    if (this.domIdPrefix && this.fieldGroup_) {
      this.fieldGroup_.id = `${this.domIdPrefix}-${this.catroid_field_id}`;
    }
  }
}

Blockly.fieldRegistry.register('field_catblockstext', CatblocksTextField);
