import { CatblocksBrick } from './CatblocksBrick';

export class CatblocksScript extends CatblocksBrick {
  posX: number | null = null;
  posY: number | null = null;
  brickList: CatblocksBrick[] = new Array<CatblocksBrick>();

  constructor(brickType: string, scriptId: string | null) {
    super(brickType, scriptId);
  }
}
