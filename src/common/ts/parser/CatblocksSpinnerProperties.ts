export class CatblocksSpinnerProperties {
  name: string;
  valueXPath: string[];
  messageFormat: string;

  constructor(name: string, valueXPath: string[], messageFormat: string) {
    this.name = name;
    this.valueXPath = valueXPath;
    this.messageFormat = messageFormat;
  }
}
