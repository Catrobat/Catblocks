import { CatblocksFile } from './CatblocksFile';
import { CatblocksScript } from './CatblocksScript';
import { UserDefinedBrickDefinition } from './UserDefinedBrick';

export class CatblocksObject {
  name: string;
  scriptList: CatblocksScript[] = new Array<CatblocksScript>();
  lookList: CatblocksFile[] = new Array<CatblocksFile>();
  soundList: CatblocksFile[] = new Array<CatblocksFile>();
  userDefinedBricks: UserDefinedBrickDefinition[] = new Array<UserDefinedBrickDefinition>();

  constructor(name: string) {
    this.name = name;
  }
}
