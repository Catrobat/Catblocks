import { CatblocksObject } from './CatblocksObject';

export class CatblocksScene {
  name: string;
  objectList: CatblocksObject[] = new Array<CatblocksObject>();

  constructor(name: string) {
    this.name = name;
  }
}
