/**
 * Catblocks formular class for parsing catroid programs
 */

export default class Formula {
  constructor() {
    this.value = '';
    this.operator = '';
    this.left = null;
    this.right = null;
    this.additionalChildren = null;
  }

  setLeft(leftBlock) {
    if (this.left === null) {
      this.left = leftBlock;
    } else {
      this.left.setLeft(leftBlock);
    }
  }

  setRight(rightBlock) {
    if (this.right === null) {
      this.right = rightBlock;
    } else {
      this.right.setRight(rightBlock);
    }
  }

  setAdditionalChildren(additionalChildrenBlock) {
    if (this.additionalChildren === null) {
      this.additionalChildren = additionalChildrenBlock;
    } else {
      this.additionalChildren.setAdditionalChildren(additionalChildrenBlock);
    }
  }

  static getAllLayouts() {
    return {
      ABS: '%v(%l)',
      ARCCOS: '%v(%l)',
      ARCSIN: '%v(%l)',
      ARCTAN: '%v(%l)',
      ARCTAN2: '%v(%l, %r)',
      BRACKET: '(%l%r)',
      CEIL: '%v(%l)',
      COLLIDES_WITH_COLOR: '%v(%l)',
      COLOR_AT_XY: '%v(%l, %r)',
      COLOR_EQUALS_COLOR: '%v(%l, %r)',
      COLOR_TOUCHES_COLOR: '%v(%l, %r)',
      CONTAINS: '%v(%l, %r)',
      COS: '%v(%l)',
      EXP: '%v(%l)',
      FLATTEN: '%v(%l)',
      FLOOR: '%v(%l)',
      IF_THEN_ELSE: '%v(%l,%r,%a)',
      INDEX_CURRENT_TOUCH: '%v(%l)',
      INDEX_OF_ITEM: '%v(%l, %r)',
      JOIN: '%v(%l, %r)',
      JOIN3: '%v(%l,%r,%a)',
      LENGTH: '%v(%l)',
      LETTER: '%v(%l, %r)',
      LIST_ITEM: '%v(%l, %r)',
      LN: '%v(%l)',
      LOG: '%v(%l)',
      MAX: '%v(%l, %r)',
      MIN: '%v(%l, %r)',
      MOD: '%v(%l, %r)',
      MULTI_FINGER_TOUCHED: '%v(%l)',
      MULTI_FINGER_X: '%v(%l)',
      MULTI_FINGER_Y: '%v(%l)',
      NUMBER_OF_ITEMS: '%v(%l)',
      POWER: '%v(%l, %r)',
      RAND: '%v(%l, %r)',
      REGEX: '%v(%l, %r)',
      ROUND: '%v(%l)',
      SIN: '%v(%l)',
      SQRT: '%v(%l)',
      STRING: "'%v'",
      TAN: '%v(%l)',
      USER_LIST: '*%v*',
      USER_VARIABLE: '"%v"',
      DEFAULT: '%l %v %r'
    };
  }

  static getOpLayout(op) {
    if (op) {
      const layout = Formula.getAllLayouts()[op];
      if (layout) {
        return layout;
      }
    }
    return Formula.getAllLayouts()['DEFAULT'];
  }

  static packValue(layout, key, value) {
    if (['%v', '%l', '%r', '%a'].includes(key)) {
      if (value.length > 0) {
        const result = value.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');
        return layout.replace(key, `${result}`);
      }
      return layout.replace(key, '');
    }
    return layout;
  }

  static packLayout(op, value, left, right, additionalChildren) {
    let layout = Formula.getOpLayout(op);
    layout = Formula.packValue(layout, '%v', value);
    layout = Formula.packValue(layout, '%l', left);
    layout = Formula.packValue(layout, '%r', right);
    layout = Formula.packValue(layout, '%a', additionalChildren);
    return layout;
  }

  static stringify(f) {
    const left = (() => {
      if (f.left) {
        return Formula.stringify(f.left);
      }
      return '';
    })();
    const right = (() => {
      if (f.right) {
        return Formula.stringify(f.right);
      }
      return '';
    })();
    const additionalChildren = (() => {
      if (f.additionalChildren) {
        return Formula.stringify(f.additionalChildren);
      }
      return '';
    })();

    return Formula.packLayout(f.operator, f.value, left, right, additionalChildren);
  }
}
