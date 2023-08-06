export class CatblocksBrick {
  name: string;
  id: string | null = null;
  loopOrIfBrickList: CatblocksBrick[] = new Array<CatblocksBrick>();
  elseBrickList: CatblocksBrick[] = new Array<CatblocksBrick>();
  colorVariation = 0;
  commentedOut = false;
  userDefinedBrickID: string | null = null;
  formValues: Map<string, string> = new Map<string, string>();

  constructor(name: string, id: string | null) {
    this.name = name;
    this.id = id;
  }
}
