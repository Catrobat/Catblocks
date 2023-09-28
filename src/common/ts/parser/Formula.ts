import { ParserUtils } from './ParserUtils';

export abstract class Formula {
  protected static simpleFormulaTypes: readonly string[] = [
    'NUMBER',
    'STRING',
    'SENSOR',
    'USER_LIST',
    'USER_VARIABLE',
    'USER_DEFINED_BRICK_INPUT'
  ];

  protected type: string;
  protected value: string;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }

  public static parse(formulaNode: Element, codeXml: Document): Formula {
    let value = '';
    const valueNode = ParserUtils.getElementByXPath(codeXml, 'value', formulaNode);
    if (valueNode) {
      value = valueNode.textContent ?? '';
    }

    const typeNode = ParserUtils.getElementByXPath(codeXml, 'type', formulaNode);
    if (typeNode) {
      const strType = ParserUtils.trimTextContent(typeNode.textContent);
      if (Formula.simpleFormulaTypes.includes(strType)) {
        return SimpleFormula.parseSimpleFormula(strType, value);
      } else {
        return ComplexFormula.parseComplexFormula(value, strType, formulaNode, codeXml);
      }
    }
    throw new Error('No valid forumla type found.');
  }

  public abstract toFormulaString(): string;
}

class SimpleFormula extends Formula {
  private static readonly defaultSimpleFormulaFormat: string = '%v';
  private static readonly simpleFormulaFormats: Map<string, string> = new Map<string, string>([
    ['USER_LIST', '*%v*'],
    ['STRING', "'%v'"],
    ['USER_VARIABLE', '"%v"'],
    ['USER_DEFINED_BRICK_INPUT', '[%v]']
  ]);

  constructor(type: string, value: string) {
    super(type, value);
  }

  public static parseSimpleFormula(type: string, value: string): SimpleFormula {
    return new SimpleFormula(type, value);
  }

  public override toFormulaString(): string {
    const formulaFormat: string =
      SimpleFormula.simpleFormulaFormats.get(this.type) ?? SimpleFormula.defaultSimpleFormulaFormat;
    const messageValue = ParserUtils.getMessage(this.value, this.value);
    return formulaFormat.replace('%v', messageValue);
  }
}

class ComplexFormula extends Formula {
  private static readonly defaultComplexFormulaFormat: string = '%l %v %r';
  private static readonly complexFormulaFormats: Map<string, string> = new Map<string, string>([
    ['BRACKET', '(%l%r)'],
    ['SIN', '%v(%l)'],
    ['COS', '%v(%l)'],
    ['TAN', '%v(%l)'],
    ['LN', '%v(%l)'],
    ['LOG', '%v(%l)'],
    ['ABS', '%v(%l)'],
    ['ROUND', '%v(%l)'],
    ['ARCSIN', '%v(%l)'],
    ['ARCCOS', '%v(%l)'],
    ['ARCTAN', '%v(%l)'],
    ['FLOOR', '%v(%l)'],
    ['CEIL', '%v(%l)'],
    ['EXP', '%v(%l)'],
    ['SQRT', '%v(%l)'],
    ['MULTI_FINGER_X', '%v(%l)'],
    ['MULTI_FINGER_Y', '%v(%l)'],
    ['MULTI_FINGER_TOUCHED', '%v(%l)'],
    ['TEXT_BLOCK_X', '%v(%l)'],
    ['TEXT_BLOCK_Y', '%v(%l)'],
    ['TEXT_BLOCK_SIZE', '%v(%l)'],
    ['TEXT_BLOCK_LANGUAGE_FROM_CAMERA', '%v(%l)'],
    ['ARDUINOANALOG', '%v(%l)'],
    ['ARDUINODIGITAL', '%v(%l)'],
    ['ARCTAN2', '%v(%l, %r)'],
    ['POWER', '%v(%l, %r)'],
    ['RASPIDIGITAL', '%v(%l)'],
    ['MOD', '%v(%l, %r)'],
    ['RAND', '%v(%l, %r)'],
    ['MAX', '%v(%l, %r)'],
    ['MIN', '%v(%l, %r)'],
    ['IF_THEN_ELSE', '%v(%l, %r, %m)'],
    ['LENGTH', '%v(%l)'],
    ['LETTER', '%v(%l, %r)'],
    ['JOIN', '%v(%l, %r)'],
    ['JOIN3', '%v(%l, %r, %m)'],
    ['FLATTEN', '%v(%l)'],
    ['INDEX_OF_ITEM', '%v(%l, %r)'],
    ['INDEX_CURRENT_TOUCH', '%v(%l)'],
    ['COLOR_AT_XY', '%v(%l, %r)'],
    ['COLOR_TOUCHES_COLOR', '%v(%l, %r)'],
    ['COLOR_EQUALS_COLOR', '%v(%l, %r)'],
    ['COLLIDES_WITH_COLOR', '%v(%l)'],
    ['REGEX', '%v(%l, %r)'],
    ['CONTAINS', '%v(%l, %r)'],
    ['NUMBER_OF_ITEMS', '%v(%l)'],
    ['LIST_ITEM', '%v(%l, %r)']
  ]);

  leftChild: Formula | null = null;
  rightChild: Formula | null = null;
  middleChild: Formula | null = null;

  constructor(
    type: string,
    value: string,
    leftChild: Formula | null,
    rightChild: Formula | null = null,
    middleChild: Formula | null = null
  ) {
    super(type, value);
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.middleChild = middleChild;
  }

  public static parseComplexFormula(
    type: string,
    value: string,
    formulaNode: Element,
    codeXml: Document
  ): ComplexFormula {
    const leftChildNode = ParserUtils.getElementByXPath(codeXml, 'leftChild', formulaNode);
    const rightChildNode = ParserUtils.getElementByXPath(codeXml, 'rightChild', formulaNode);
    const additionalChildrenNode = ParserUtils.getElementByXPath(codeXml, 'additionalChildren', formulaNode);

    let leftFormula: Formula | null = null;
    let rightFormula: Formula | null = null;
    let middleFormula: Formula | null = null;

    if (leftChildNode) {
      leftFormula = Formula.parse(leftChildNode, codeXml);
    }
    if (rightChildNode) {
      rightFormula = Formula.parse(rightChildNode, codeXml);
    }
    if (additionalChildrenNode) {
      const additionalChild = ParserUtils.getElementByXPath(
        codeXml,
        'org.catrobat.catroid.formulaeditor.FormulaElement',
        additionalChildrenNode
      );
      if (additionalChild) {
        middleFormula = Formula.parse(additionalChild, codeXml);
      }
    }
    return new ComplexFormula(value, type, leftFormula, rightFormula, middleFormula);
  }

  public override toFormulaString(): string {
    const valueString: string = ParserUtils.getMessage(this.value, this.value);

    let leftString = '';
    let middleString = '';
    let rightString = '';
    if (this.leftChild) {
      leftString = this.leftChild.toFormulaString();
    }
    if (this.rightChild) {
      rightString = this.rightChild.toFormulaString();
    }
    if (this.middleChild) {
      middleString = this.middleChild.toFormulaString();
    }

    let formulaFormat = ComplexFormula.complexFormulaFormats.get(this.type);
    if (!formulaFormat) {
      formulaFormat =
        ComplexFormula.complexFormulaFormats.get(this.value) ?? ComplexFormula.defaultComplexFormulaFormat;
    }
    if (formulaFormat === ComplexFormula.defaultComplexFormulaFormat) {
      if (!leftString) {
        formulaFormat = formulaFormat.replace('%l ', '');
      }
      if (!rightString) {
        formulaFormat = formulaFormat.replace(' %r', '');
      }
    }
    return formulaFormat
      .replace('%v', valueString)
      .replace('%l', leftString)
      .replace('%r', rightString)
      .replace('%m', middleString);
  }
}
