/* eslint-disable no-unused-vars */
interface IAndroid {
  switchTo1D(brickID: string): void;
  duplicateBrick(brickID: string): string;
  commentOutBrick(brickID: string): void;
  getCurrentProject(): string; // returns coeXML
  updateScriptPosition(brickID: string, newX: number, newY: number): void;
  helpBrick(brickID: string): void;
  addBrickByName(category: string, brickType: string): string; // returns JSON
  getBrickCategoryInfos(): string; // returns JSON
  moveBricksToEmptyScriptBrick(brickIDs: string[]): string;
  moveBricks(parentBrickID: string, subStackIndex: number, brickIDsToMove: string[]): string;
  removeBricks(brickIDs: string[]): void;
  removeEmptyScriptBricks(): void;
}

export { IAndroid };
