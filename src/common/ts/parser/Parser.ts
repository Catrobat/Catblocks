import { ParserUtils } from './ParserUtils';
import { Formula } from './Formula';
import { getBrickSpinnerProperties } from '../../../library/js/blocks/bricks';
import { CatblocksBrick } from './CatblocksBrick';
import { CatblocksFile } from './CatblocksFile';
import { CatblocksObject } from './CatblocksObject';
import { CatblocksProject } from './CatblocksProject';
import { CatblocksScene } from './CatblocksScene';
import { CatblocksScript } from './CatblocksScript';
import { UserDefinedBrickDefinition } from './UserDefinedBrick';
import { UserDefinedBrickInputType } from './UserDefinedBrickInputType';
import { CatblocksSpinnerProperties } from './CatblocksSpinnerProperties';

export class CatblocksParser {
  private strCodeXml: string;
  private codeXml: Document;

  private isOldMultiPartBrickFormat = false;

  constructor(strCodeXml = '') {
    this.strCodeXml = strCodeXml;
    this.codeXml = new Document();
    if (this.strCodeXml) {
      this.parseXmlString(strCodeXml);
    }
  }

  public parseXmlString(strCodeXml: string): void {
    this.strCodeXml = strCodeXml;
    if (this.strCodeXml) {
      const parser = new DOMParser();
      this.codeXml = parser.parseFromString(strCodeXml, 'application/xml');
    }
  }

  public xmlToCatblocksProject(): CatblocksProject {
    if (!this.strCodeXml) {
      throw new Error('Please initialize the program xml first!');
    }

    this.assureProgramVersionSupported();

    const programNameNode = ParserUtils.getElementByXPath(this.codeXml, '/program/header/programName', this.codeXml);
    if (!programNameNode) {
      throw new Error('Program name not found');
    }

    const programName = programNameNode.textContent ?? '';
    const catblocksProject = new CatblocksProject(programName);

    ParserUtils.foreachElementByXPath(this.codeXml, '/program/scenes/scene', this.codeXml, (sceneNode: Element) => {
      const scene = this.parseScene(sceneNode);
      if (scene) {
        catblocksProject.scenes.push(scene);
      }
    });

    return catblocksProject;
  }

  public xmlToCatblocksObject(sceneNameToParse: string, objectNameToParse: string): CatblocksObject | null {
    if (!this.strCodeXml) {
      throw new Error('Please initialize the program xml first!');
    }
    this.assureProgramVersionSupported();

    let parsedObject: CatblocksObject | null = null;
    ParserUtils.foreachElementByXPath(this.codeXml, '/program/scenes/scene', this.codeXml, (sceneNode: Element) => {
      const sceneName = ParserUtils.getElementByXPath(this.codeXml, 'name', sceneNode)?.textContent ?? '';
      if (sceneName === sceneNameToParse) {
        ParserUtils.foreachElementByXPath(this.codeXml, 'objectList/object', sceneNode, (objectNode: Element) => {
          const objectName = ParserUtils.getAttrByXPath(this.codeXml, '@name', objectNode)?.textContent;
          if (objectName === objectNameToParse) {
            parsedObject = this.parseObject(objectNode);
            return;
          }
        });
        if (parsedObject) {
          return;
        }
      }
    });
    if (!parsedObject) {
      throw new Error(`The object ${objectNameToParse} was not found in scene ${sceneNameToParse}`);
    }
    return parsedObject;
  }

  private assureProgramVersionSupported() {
    const programVersionNode = ParserUtils.getElementByXPath(
      this.codeXml,
      '/program/header/catrobatLanguageVersion',
      this.codeXml
    );
    if (!programVersionNode) {
      throw new Error('Program version not found');
    }
    const strProgramVersion = ParserUtils.trimTextContent(programVersionNode.textContent);
    if (!strProgramVersion) {
      throw new Error('Program version is empty');
    }
    const programVersion = parseFloat(strProgramVersion);
    if (programVersion < 0.9994) {
      throw new Error(`Found program version ${programVersion}, minimum supported is 0.9994`);
    }
  }

  private parseScene(sceneNode: Element): CatblocksScene | null {
    const sceneName = ParserUtils.getElementByXPath(this.codeXml, 'name', sceneNode)?.textContent ?? '';
    if (!sceneName) {
      return null;
    }
    const scene = new CatblocksScene(sceneName);

    ParserUtils.foreachElementByXPath(this.codeXml, 'objectList/object', sceneNode, (objectNode: Element) => {
      const object = this.parseObject(objectNode);
      if (object) {
        scene.objectList.push(object);
      }
    });

    return scene;
  }

  private parseObject(objectNode: Element): CatblocksObject | null {
    const objectName = objectNode.getAttribute('name');
    if (!objectName) {
      return null;
    }
    const object = new CatblocksObject(objectName);

    ParserUtils.foreachElementByXPath(this.codeXml, 'lookList/look', objectNode, (lookNode: Element) => {
      const look = this.parseCatblocksFile(lookNode);
      if (look) {
        object.lookList.push(look);
      }
    });

    ParserUtils.foreachElementByXPath(this.codeXml, 'soundList/sound', objectNode, (soundNode: Element) => {
      const sound = this.parseCatblocksFile(soundNode);
      if (sound) {
        object.soundList.push(sound);
      }
    });

    ParserUtils.foreachElementByXPath(
      this.codeXml,
      'userDefinedBrickList/brick',
      objectNode,
      (userBrickNode: Element) => {
        const userDefinedBrick = this.parseUserDefinedBrickDefinitions(userBrickNode);
        if (userDefinedBrick) {
          object.userDefinedBricks.push(userDefinedBrick);
        }
      }
    );

    ParserUtils.foreachElementByXPath(this.codeXml, 'scriptList/script', objectNode, (scriptNode: Element) => {
      const script = this.parseScript(scriptNode);
      if (!script) {
        return;
      }
      object.scriptList.push(script);
    });

    return object;
  }

  private parseCatblocksFile(fileNode: Element): CatblocksFile | null {
    const filename = fileNode.getAttribute('fileName');
    const name = fileNode.getAttribute('name');
    if (name && filename) {
      return new CatblocksFile(name, filename);
    }
    return null;
  }

  private parseUserDefinedBrickDefinitions(brickElement: Element): UserDefinedBrickDefinition | null {
    const userDefinedBrickID = ParserUtils.trimTextContent(
      ParserUtils.getElementByXPath(this.codeXml, 'userDefinedBrickID', brickElement)?.textContent
    );
    if (!userDefinedBrickID) {
      return null;
    }
    const udbDefinition = new UserDefinedBrickDefinition(userDefinedBrickID);

    const userBrickDataListNode = ParserUtils.getElementByXPath(this.codeXml, 'userDefinedBrickDataList', brickElement);
    if (!userBrickDataListNode) {
      return null;
    }

    let inputCounter = 1;
    if (!userBrickDataListNode?.children) {
      return null;
    }
    for (const childNode of userBrickDataListNode.children) {
      const dataNode = ParserUtils.flattenElementReference(this.codeXml, childNode);
      const dataType = ParserUtils.trimTextContent(
        ParserUtils.getElementByXPath(this.codeXml, 'type', dataNode)?.textContent
      );
      if (dataType?.toUpperCase() === 'LABEL') {
        const labelText = ParserUtils.trimTextContent(
          ParserUtils.getElementByXPath(this.codeXml, 'label', dataNode)?.textContent
        );
        udbDefinition.message += `${labelText} `;
      } else if (dataType?.toUpperCase() === 'INPUT') {
        const inputName = ParserUtils.trimTextContent(
          ParserUtils.getElementByXPath(this.codeXml, 'input/input', dataNode)?.textContent
        );
        if (inputName) {
          udbDefinition.inputTypes.push(new UserDefinedBrickInputType(dataType, inputName));
          udbDefinition.message += `%${inputCounter++}%${inputCounter++} `;
        }
      }
    }
    udbDefinition.message = udbDefinition.message.trim();

    return udbDefinition;
  }

  private parseScript(scriptNode: Element): CatblocksScript | null {
    const scriptType = scriptNode.getAttribute('type');
    const strScriptPosX = scriptNode.getAttribute('posX');
    const strScriptPosY = scriptNode.getAttribute('posY');

    if (!scriptType) {
      return null;
    }

    const scriptIdNode = ParserUtils.getElementByXPath(this.codeXml, 'scriptId', scriptNode);
    let scriptId: string | null = null;
    if (scriptIdNode) {
      scriptId = ParserUtils.trimTextContent(scriptIdNode.textContent);
    }

    const script = new CatblocksScript(scriptType, scriptId);
    if (strScriptPosX && strScriptPosY) {
      script.posX = parseFloat(strScriptPosX);
      script.posY = parseFloat(strScriptPosY);
    }
    script.commentedOut = false;
    const commentedOutNode = ParserUtils.getElementByXPath(this.codeXml, 'commentedOut', scriptNode);
    if (commentedOutNode) {
      if (ParserUtils.trimTextContent(commentedOutNode.textContent).toLowerCase() === 'true') {
        script.commentedOut = true;
      }
    }

    const userDefinedBrickIDNode = ParserUtils.getElementByXPath(this.codeXml, 'userDefinedBrickID', scriptNode);
    if (userDefinedBrickIDNode) {
      script.userDefinedBrickID = ParserUtils.trimTextContent(userDefinedBrickIDNode.textContent);
    }

    this.parseFormulas(scriptNode, script);
    this.parseSpinners(scriptNode, script);

    ParserUtils.foreachElementByXPath(this.codeXml, 'brickList/brick', scriptNode, (brickNode: Element) => {
      const brick = this.parseBrick(brickNode);
      if (brick) {
        script.brickList.push(brick);
      }
    });

    this.fixBrickHierarchy(script);

    return script;
  }

  private fixBrickHierarchy(script: CatblocksScript) {
    if (!this.isOldMultiPartBrickFormat) {
      return;
    }

    const mainBricks: Array<CatblocksBrick> = [];
    const brickStack: Array<Array<CatblocksBrick>> = [];

    for (let i = 0; i < script.brickList.length; i++) {
      const brick = script.brickList[i];
      if (
        brick.name === 'RepeatBrick' ||
        brick.name === 'IfLogicBeginBrick' ||
        brick.name === 'IfThenLogicBeginBrick'
      ) {
        if (mainBricks.length > 0) {
          script.brickList.splice(i, 1);
          i--;
        }
        mainBricks.push(brick);
        brickStack.push([]);
        continue;
      }

      if (brick.name === 'LoopEndBrick' || brick.name === 'IfLogicElseBrick' || brick.name === 'IfThenLogicElseBrick') {
        const topBrick = mainBricks.pop();
        if (topBrick) {
          topBrick.loopOrIfBrickList = brickStack.pop() || [];
          if (brick.name === 'IfLogicElseBrick' || brick.name === 'IfThenLogicElseBrick') {
            mainBricks.push(topBrick);
            brickStack.push([]);
          } else {
            const newParent = brickStack.pop();
            if (newParent) {
              newParent.push(topBrick);
              brickStack.push(newParent);
            }
          }
        }
        script.brickList.splice(i, 1);
        i--;
      } else if (brick.name === 'IfLogicEndBrick' || brick.name === 'IfThenLogicEndBrick') {
        const topBrick = mainBricks.pop();
        if (topBrick) {
          topBrick.elseBrickList = brickStack.pop() || [];
          const newParent = brickStack.pop();
          if (newParent) {
            newParent.push(topBrick);
            brickStack.push(newParent);
          }
        }
        script.brickList.splice(i, 1);
        i--;
      } else {
        const currentStack = brickStack.pop();
        if (currentStack) {
          brickStack.push(currentStack);
          currentStack.push(script.brickList[i]);
          script.brickList.splice(i, 1);
          i--;
        }
      }
    }
  }

  private parseBrick(brickNode: Element): CatblocksBrick | null {
    let brickType = brickNode.getAttribute('type');
    if (!brickType) {
      return null;
    }

    if (brickType === 'LoopEndBrick' || brickType === 'IfLogicEndBrick' || brickType === 'IfThenLogicEndBrick') {
      this.isOldMultiPartBrickFormat = true;
    }

    let brickId: string | null = null;
    const brickIdNode = ParserUtils.getElementByXPath(this.codeXml, 'brickId', brickNode);
    if (brickIdNode) {
      brickId = ParserUtils.trimTextContent(brickIdNode.textContent);
    }

    let userDefinedBrickID: string | null = null;
    if (brickType === 'UserDefinedBrick') {
      const userBrickIdNode = ParserUtils.getElementByXPath(this.codeXml, 'userDefinedBrickID', brickNode);
      if (userBrickIdNode) {
        userDefinedBrickID = ParserUtils.trimTextContent(userBrickIdNode.textContent);
        brickType = userDefinedBrickID;
      } else {
        throw new Error('UserDefinedBrick brick without userDefinedBrickID');
      }
    }

    const brick = new CatblocksBrick(brickType, brickId);
    brick.userDefinedBrickID = userDefinedBrickID;

    brick.commentedOut = false;
    const commentedOutNode = ParserUtils.getElementByXPath(this.codeXml, 'commentedOut', brickNode);
    if (commentedOutNode) {
      if (ParserUtils.trimTextContent(commentedOutNode.textContent).toLowerCase() === 'true') {
        brick.commentedOut = true;
      }
    }

    this.parseFormulas(brickNode, brick);
    this.parseSpinners(brickNode, brick);

    ParserUtils.foreachElementByXPath(
      this.codeXml,
      '*[self::ifBranchBricks or self::loopBricks]/brick',
      brickNode,
      (subBrickNode: Element) => {
        const subBricks = this.parseBrick(subBrickNode);
        if (subBricks) {
          brick.loopOrIfBrickList.push(subBricks);
        }
      }
    );

    ParserUtils.foreachElementByXPath(
      this.codeXml,
      '*[self::elseBranchBricks]/brick',
      brickNode,
      (subBrickNode: Element) => {
        const subBricks = this.parseBrick(subBrickNode);
        if (subBricks) {
          brick.elseBrickList.push(subBricks);
        }
      }
    );
    return brick;
  }

  private parseFormulas(brickNode: Element, brick: CatblocksBrick): void {
    ParserUtils.foreachElementByXPath(
      this.codeXml,
      '*[self::formulaList or self::formulaMap]/formula',
      brickNode,
      (formulaNode: Element) => {
        this.parseSingleFormula(formulaNode, brick);
      }
    );

    this.parseSpecialFormulas(brickNode, brick);
  }

  private parseSpecialFormulas(brickNode: Element, brick: CatblocksBrick): void {
    if (brick.name === 'ParameterizedBrick') {
      const formulaList = ParserUtils.getElementByXPath(this.codeXml, 'endBrick/formulaList', brickNode);
      if (formulaList) {
        const formulaNode = ParserUtils.getElementByXPath(this.codeXml, 'formula', formulaList);
        if (formulaNode) {
          this.parseSingleFormula(formulaNode, brick);
        }
      }

      let userListCounter = 0;
      ParserUtils.foreachElementByXPath(this.codeXml, 'userLists/userList', brickNode, (formulaNode: Element) => {
        if (formulaNode) {
          userListCounter++;
        }
      });

      let message =
        userListCounter === 1
          ? ParserUtils.getMessage(`ASSERTION_PARAMETERIZED_LIST_ONE`, 'list')
          : ParserUtils.getMessage(`ASSERTION_PARAMETERIZED_LIST_OTHER`, 'lists');
      message = message.replace('%d', userListCounter.toString());
      brick.formValues.set('CATBLOCKS_ASSERT_LISTS_SELECTED', message);
    }
  }

  private parseSingleFormula(formulaNode: Element, brick: CatblocksBrick): void {
    const formulaCategoryAttr = ParserUtils.getAttrByXPath(this.codeXml, '@category | @input', formulaNode);
    if (formulaCategoryAttr) {
      const formulaCategory = formulaCategoryAttr.textContent;
      if (!formulaCategory) {
        throw new Error('Formula category is empty');
      }
      const formula = Formula.parse(formulaNode, this.codeXml);
      if (formula) {
        brick.formValues.set(formulaCategory, formula.toFormulaString());
      }
    }
  }

  private parseSpinners(brickNode: Element, brick: CatblocksBrick) {
    const spinners: Array<CatblocksSpinnerProperties> = getBrickSpinnerProperties(brick.name);
    if (spinners) {
      for (const spinnerProperties of spinners) {
        try {
          this.parseSpinner(brickNode, spinnerProperties, brick);
        } catch (error) {
          throw new Error(
            `Spinner value node not found for brick '${brick.name}' spinner '${spinnerProperties.name}': ${error}`
          );
        }
      }
    }
  }

  private parseSpinner(brickNode: Element, spinnerProperties: CatblocksSpinnerProperties, brick: CatblocksBrick): void {
    const inputName: string = spinnerProperties.name;
    const messageFormat: string = spinnerProperties.messageFormat;

    let referenceNode: Node = brickNode;
    for (let i = 0; i < spinnerProperties.valueXPath.length; i++) {
      const xPath = spinnerProperties.valueXPath[i];
      const valueNode = ParserUtils.getFlatNodeByXPath(this.codeXml, xPath, referenceNode);
      if (valueNode) {
        if (i < spinnerProperties.valueXPath.length - 1) {
          referenceNode = valueNode;
          continue;
        }
        let message: string | null = null;
        if (valueNode instanceof Element) {
          const value = valueNode.textContent;
          message = value;
        } else if (valueNode instanceof Attr) {
          const value = valueNode.textContent;
          if (value) {
            message = value;
          }
        }
        if (message !== null && messageFormat !== undefined) {
          if (messageFormat) {
            message = messageFormat.replace('%v', message);
          }

          brick.formValues.set(inputName, ParserUtils.getMessage(message, message));
          break;
        } else {
          throw new Error(`Spinner value node not found for brick ${brick.name} spinner ${spinnerProperties.name} (1)`);
        }
      } else {
        const message = this.handleSpecialBrickSpinner(brick, spinnerProperties.name, brickNode);
        if (message !== null && messageFormat !== undefined) {
          brick.formValues.set(inputName, ParserUtils.getMessage(message, message));
          break;
        } else {
          brick.formValues.set(inputName, '');
          console.warn(`Spinner value node not found for brick ${brick.name} spinner ${spinnerProperties.name} (2)`);
        }
      }
    }
  }

  private handleSpecialBrickSpinner(brick: CatblocksBrick, fieldName: string, brickNode: Element): string | null {
    if (brick.name === 'CloneBrick') {
      return 'CONTROL_OFYOURSELF';
    }
    if (brick.name === 'GoToBrick') {
      const spinnerSelection = ParserUtils.getElementByXPath(this.codeXml, 'spinnerSelection', brickNode);
      if (spinnerSelection) {
        const selection = ParserUtils.trimTextContent(spinnerSelection.textContent);
        if (selection) {
          return `GO_TO_POSITION_${selection}`;
        }
      }
    }
    if (brick.name === 'WhenBounceOffScript') {
      return 'WHEN_BOUNCE_OFF_ANYTHING';
    }
    if (brick.name === 'SetListeningLanguageBrick') {
      return '';
    }
    return null;
  }
}
