import Blockly from 'blockly';

export class CatblocksSpinner extends Blockly.FieldDropdown {
  static fromJson(options) {
    if (!Object.prototype.hasOwnProperty.call(options, 'options')) {
      options['options'] = [['unset', 'unset']];
    } else {
      if (!options.options) {
        options['options'] = [['unset', 'unset']];
      }
    }

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
    this.domID = '';
  }

  setDomIdPrefix(id) {
    this.domIdPrefix = id;
  }

  createSVGArrow_() {
    let advancedModeEnabled = null;
    if (this.sourceBlock_ & this.sourceBlock_.workspace) {
      try {
        advancedModeEnabled = this.sourceBlock_.workspace.getTheme().name.toLowerCase() === 'advanced';
      } catch {
        advancedModeEnabled = null;
      }
    }
    if (advancedModeEnabled === null) {
      try {
        advancedModeEnabled = Android.isAdvancedMode();
      } catch {
        advancedModeEnabled = false;
      }
    }
    if (!advancedModeEnabled) {
      super.createSVGArrow_();
    }
  }
  updateSpinnerValues(values) {
    const availableItems = [];

    if (values) {
      for (let i = 0; i < values.length; ++i) {
        availableItems.push([values[i], i]);
      }
    } else {
      availableItems.push(['---', -1]);
    }

    this.menuGenerator_ = availableItems;
  }

  onItemSelected_(menu, menuItem) {
    super.onItemSelected_(menu, menuItem);

    if (menuItem.getValue() !== 'unset') {
      Android.updateSpinnerSelecion(this.sourceBlock_.id, this.catroid_field_id, menuItem.getValue());
    }
  }

  render_() {
    super.render_();
    if (this.domIdPrefix && this.fieldGroup_) {
      this.fieldGroup_.id = `${this.domIdPrefix}-${this.catroid_field_id}`;
    }
  }
}

Blockly.fieldRegistry.register('field_catblocksspinner', CatblocksSpinner);
