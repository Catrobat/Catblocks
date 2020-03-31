
export default class Formula {
  constructor() {
    this.value = '';
    this.operator = '';
    this.left = null;
    this.right = null;
  }

  setLeft(leftBlock) {
    if (this.left === null) this.left = leftBlock;
    else this.left.setLeft(leftBlock);
  }

  setRight(rightBlock) {
    if (this.right === null) this.right = rightBlock;
    else this.right.setRight(rightBlock);
  }

  static getAllLayouts() {
    return {
      'BRACKET': '(%l%r)',
      'USER_LIST': '*%v*',
      'SIN': '%v(%l)',
      'COS': '%v(%l)',
      'TAN': '%v(%l)',
      'LN': '%v(%l)',
      'LOG': '%v(%l)',
      'ABS': '%v(%l)',
      'ROUND': '%v(%l)',
      'ARCSIN': '%v(%l)',
      'ARCCOS': '%v(%l)',
      'ARCTAN': '%v(%l)',
      'FLOOR': '%v(%l)',
      'CEIL': '%v(%l)',
      'EXP': '%v(%l)',
      'SQRT': '%v(%l)',
      'MULTI_FINGER_X': '%v(%l)',
      'MULTI_FINGER_Y': '%v(%l)',
      'MULTI_FINGER_TOUCHED': '%v(%l)',
      'ARCTAN2': '%v(%l, %r)',
      'POWER': '%v(%l, %r)',
      'MOD': '%v(%l, %r)',
      'RAND': '%v(%l, %r)',
      'MAX': '%v(%l, %r)',
      'MIN': '%v(%l, %r)',
      'LENGTH': '%v(%l%)',
      'LETTER': '%v(%l, %r)',
      'JOIN': '%v(%l, %r)',
      'REGEX': '%v(%l, %r)',
      'CONTAINS': '%v(%l, %r)',
      'NUMBER_OF_ITEMS': '%v(%l)',
      'DEFAULT': '%l %v %r'
    };
  }

  static getOpLayout(op) {
    if (op) {
      const layout = Formula.getAllLayouts()[op];
      if (layout) return layout;
    }
    return Formula.getAllLayouts()['DEFAULT'];
  }

  static packValue(layout, key, value) {
    if (['%v', '%l', '%r'].includes(key)) {
      if (value.length > 0) {
        return layout.replace(key, `${value.trim()}`);
      }
      return layout.replace(key, '').trim();
    }
    return layout;
  }

  static packLayout(op, value, left, right) {
    let layout = Formula.getOpLayout(op);
    layout = Formula.packValue(layout, '%v', value);
    layout = Formula.packValue(layout, '%l', left);
    layout = Formula.packValue(layout, '%r', right);
    return layout;
  }

  static stringify(f) {
    const left = (() => {
      if (f.left)
        return Formula.stringify(f.left);
      return '';
    })();
    const right = (() => {
      if (f.right)
        return Formula.stringify(f.right);
      return '';
    })();

    const nodeValue = Formula.packLayout(f.operator, f.value, left, right);
    console.log(nodeValue);
    return nodeValue;
  }
}