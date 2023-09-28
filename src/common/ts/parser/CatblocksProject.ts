import { CatblocksScene } from './CatblocksScene';

export class CatblocksProject {
  scenes: CatblocksScene[] = new Array<CatblocksScene>();
  programName = '';

  constructor(programName: string) {
    this.programName = programName;
  }
}
