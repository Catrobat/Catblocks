/* eslint-disable @typescript-eslint/no-unused-vars */
import '../scss/style.scss';
import '../scss/testing.scss';

import { CatBlocksMsgs } from '../../library/ts/i18n/CatBlocksMsgs';
import { Playground } from '../js/playground/playground';
import Blockly from 'blockly';
import { CatBlocksShare } from '../../library/ts/CatBlocksShare';
import * as shareUtils from '../../library/js/integration/utils';
import { CatblocksParser } from '../../common/ts/parser/Parser';
import { CatBlocksCatroid } from '../../library/ts/CatBlocksCatroid';
import { IAndroid } from '../../library/ts/IAndroid';

declare global {
  interface Window {
    Test: Test;
    Android: IAndroid;
  }
}

class MockAndroid implements IAndroid {
  public duplicateBrick(brickID: string): string {
    throw new Error('Method not implemented.');
  }
  public commentOutBrick(brickID: string): string {
    throw new Error('Method not implemented.');
  }
  public getCurrentProject(): string {
    throw new Error('Method not implemented.');
  }
  public updateScriptPosition(brickID: string, newX: number, newY: number): void {
    throw new Error('Method not implemented.');
  }
  public helpBrick(brickID: string): void {
    throw new Error('Method not implemented.');
  }
  public addBrickByName(category: string, brickType: string): string {
    throw new Error('Method not implemented.');
  }
  public getBrickCategoryInfos(): string {
    throw new Error('Method not implemented.');
  }
  public moveBricksToEmptyScriptBrick(brickIDs: string[]): string {
    throw new Error('Method not implemented.');
  }
  public moveBricks(parentBrickID: string, subStackIndex: number, brickIDsToMove: string[]): string {
    throw new Error('Method not implemented.');
  }
  public removeBricks(brickIDs: string[]): void {
    throw new Error('Method not implemented.');
  }
  public removeEmptyScriptBricks(): void {
    throw new Error('Method not implemented.');
  }
  public switchTo1D(brickID: string): void {
    throw new Error('Method not implemented.');
  }
}

class Test {
  Playground: Playground;
  Blockly: typeof Blockly;
  CatBlocksMsgs: typeof CatBlocksMsgs;
  CatBlocks: typeof CatBlocksShare;
  ShareUtils: typeof shareUtils;
  Parser: CatblocksParser;
  CatroidCatBlocks: typeof CatBlocksCatroid;

  constructor() {
    this.Playground = new Playground();
    this.Blockly = Blockly;
    this.CatBlocksMsgs = CatBlocksMsgs;
    this.CatBlocks = CatBlocksShare;
    this.ShareUtils = shareUtils;
    this.CatroidCatBlocks = CatBlocksCatroid;
    this.Parser = new CatblocksParser();
  }
}

(async function () {
  window.Test = new Test();
  window.Android = new MockAndroid();
})();
