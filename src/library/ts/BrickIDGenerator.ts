import { BlockSvg } from 'blockly';

interface GenerateBrickOptions {
  brick: BlockSvg;
  id?: string;
  type?: string;
}

export class BrickIDGenerator {
  private static idBricksCounter = new Map();
  private static userDefinedBrickIDs = new Map();

  /**
   * Assign an ID to the given brick in the format <brickType>-<counter> and the first text child
   * element gets <brickType>-<counter>-text. Used for testing purposes.
   * @param {BlockSvg} brick a Brick from blockly workspace
   * @returns {string} id of brick
   */
  public createBrickID(brick: BlockSvg): string {
    return this.generateBrickID({ brick: brick });
  }

  /**
   * Assign an ID to a userDefinedScriptBrick. Uses the format UserDefinedScript-<counter>.
   * @param {BlockSVG} brick a Brick from blockly workspace
   * @param {string} userDefinedScriptID the user defined userDefinedScriptBrick ID
   * @returns {string} id of the brick
   */
  public createBrickIDForUserDefinedScript(brick: BlockSvg, userDefinedScriptID: string): string {
    const udbID = BrickIDGenerator.userDefinedBrickIDs.get(userDefinedScriptID);

    if (!udbID) {
      const givenID = this.generateBrickID({ brick: brick });
      BrickIDGenerator.userDefinedBrickIDs.set(userDefinedScriptID, givenID);

      return givenID;
    } else {
      return this.generateBrickID({ brick: brick, id: udbID });
    }
  }

  /**
   * Assign an ID to a userDefinedScript CallBrick. Uses the format <UDB-ID>-Call-<counter>.
   * f.e. UserDefinedScript-0-Call-0
   * @param {BlockSVG} brick a Brick from blockly workspace
   * @param {string} userDefinedScriptID the user defined userDefinedScriptBrick ID
   * @returns {string} id of the brick
   */
  public createBrickIDForUserDefinedScriptCall(brick: BlockSvg, userDefinedScriptID: string): string {
    let udbID = BrickIDGenerator.userDefinedBrickIDs.get(userDefinedScriptID);

    if (!udbID) {
      udbID = this.generateBrickID({ brick: brick, type: 'UserDefinedScript' });
      BrickIDGenerator.userDefinedBrickIDs.set(userDefinedScriptID, udbID);
    }

    return this.generateBrickID({ brick: brick, type: udbID + '-Call' });
  }

  /**
   * Get the first Text element of an Brick.
   * @param brickSVG the root of a blockly SVG
   * @returns {Element | null}
   */
  private getTextContainerOfBrick(brickSVG: SVGElement): Element | null {
    try {
      for (const htmlElement of brickSVG.children) {
        if (htmlElement.firstElementChild) {
          const classContent = htmlElement.firstElementChild.getAttribute('class') ?? '';
          if (classContent.includes('blocklyText')) {
            return htmlElement.firstElementChild;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    return null;
  }

  /**
   * Generate a new ID for a given brick type.
   * @param brickType
   * @returns {string} something like UserDefinedScript-0
   */
  private generateNewID(brickType: string) {
    let currentIDCount = BrickIDGenerator.idBricksCounter.get(brickType);
    if (currentIDCount == null) {
      currentIDCount = 0;
    }
    const idToUse = `${brickType}-${currentIDCount}`;
    BrickIDGenerator.idBricksCounter.set(brickType, ++currentIDCount);

    return idToUse;
  }

  /**
   * Assign an ID to the given brick in the format <brickType>-<counter> and the first text child
   * element gets <brickType>-<counter>-text. Used for testing purposes.
   * @param {BlockSVG} brick a Brick from blockly workspace
   * @param {string} [type] optional, to overwrite brick.type
   * @param {string} [id] optional, to overwrite used id
   * @returns
   */
  private generateBrickID(opts: GenerateBrickOptions) {
    const brick = opts.brick;
    const brickType = opts.type ?? brick.type;
    const idToUse = opts.id ?? this.generateNewID(brickType);

    return idToUse;
  }

  /**
   * Sets the id to the SVG root of the brick.
   * @param brick
   * @param id
   * @returns
   */
  public setBrickID(brick: BlockSvg, id: string): string {
    const brickSVG = brick.getSvgRoot();
    brickSVG.setAttribute('id', id);

    const brickGContainer = this.getTextContainerOfBrick(brickSVG);
    if (brickGContainer) {
      brickGContainer.setAttribute('id', id + '-text');
    }
    return id;
  }
}
