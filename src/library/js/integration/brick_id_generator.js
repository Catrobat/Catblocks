export class BrickIDGenerator {
  static idBricksCounter = new Map();
  static userDefinedBrickIDs = new Map();

  /**
   * Assign an ID to the given brick in the format <brickType>-<counter> and the first text child
   * element gets <brickType>-<counter>-text. Used for testing purposes.
   * @param {BlockSVG} brick a Brick from blockly workspace
   * @returns {string} id of brick
   */
  createBrickID(brick) {
    return this._createBrickID({ brick: brick });
  }

  /**
   * Assign an ID to a userDefinedScriptBrick. Uses the format UserDefinedScript-<counter>.
   * @param {BlockSVG} brick a Brick from blockly workspace
   * @param {string} userDefinedScriptID the user defined userDefinedScriptBrick ID
   * @returns {string} id of the brick
   */
  createBrickIDForUserDefinedScript(brick, userDefinedScriptID) {
    const udbID = BrickIDGenerator.userDefinedBrickIDs.get(userDefinedScriptID);

    if (!udbID) {
      const givenID = this._createBrickID({ brick: brick });
      BrickIDGenerator.userDefinedBrickIDs.set(userDefinedScriptID, givenID);

      return givenID;
    } else {
      return this._createBrickID({ brick: brick, id: udbID });
    }
  }

  /**
   * Assign an ID to a userDefinedScript CallBrick. Uses the format <UDB-ID>-Call-<counter>.
   * f.e. UserDefinedScript-0-Call-0
   * @param {BlockSVG} brick a Brick from blockly workspace
   * @param {string} userDefinedScriptID the user defined userDefinedScriptBrick ID
   * @returns {string} id of the brick
   */
  createBrickIDForUserDefinedScriptCall(brick, userDefinedScriptID) {
    let udbID = BrickIDGenerator.userDefinedBrickIDs.get(userDefinedScriptID);
    if (!udbID) {
      udbID = this._generateNewID('UserDefinedScript');
      BrickIDGenerator.userDefinedBrickIDs.set(userDefinedScriptID, udbID);
    }
    return this._createBrickID({ brick: brick, type: udbID + '-Call' });
  }

  /**
   * Get the first Text element of an Brick.
   * @param {HTMLElement} brickSVG the root of a blockly SVG
   * @returns {HTMLElement|null}
   */
  _getTextContainerOfBrick(brickSVG) {
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
   * @param {string} brickType
   * @returns {string} something like UserDefinedScript-0
   */
  _generateNewID(brickType) {
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
  _createBrickID({ brick, type, id }) {
    const brickType = type ?? brick.type;
    const idToUse = id ?? this._generateNewID(brickType);

    const brickSVG = brick.getSvgRoot();
    brickSVG.setAttribute('id', idToUse);

    const brickGContainer = this._getTextContainerOfBrick(brickSVG);
    if (brickGContainer) {
      brickGContainer.setAttribute('id', idToUse + '-text');
    }

    return idToUse;
  }
}
