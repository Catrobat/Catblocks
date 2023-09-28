import { BlockDefinition } from 'blockly/core/blocks';
import { UserDefinedBrickInputType } from './UserDefinedBrickInputType';

export class UserDefinedBrickDefinition {
  userDefinedBrickID: string;
  inputTypes: UserDefinedBrickInputType[] = new Array<UserDefinedBrickInputType>();
  message = '';

  constructor(userDefinedBrickID: string) {
    this.userDefinedBrickID = userDefinedBrickID;
  }

  private getArgs(fieldNameEqualsContent: boolean): Partial<BlockDefinition>[] {
    const args: Partial<BlockDefinition>[] = [];
    for (let i = 0; i < this.inputTypes.length; ++i) {
      if (this.inputTypes[i].type.toUpperCase() == 'INPUT') {
        args.push({
          type: 'field_catblockstext',
          name: this.inputTypes[i].name,
          text: fieldNameEqualsContent ? this.inputTypes[i].name : 'unset'
        });
        args.push({
          type: 'field_image',
          name: `${this.inputTypes[i].name}_INFO`,
          src: `${document.location.pathname}media/info_icon.svg`,
          height: 24,
          width: 24,
          alt: '(i)',
          flip_rtl: true
        });
      }
    }
    return args;
  }

  public getJson(): BlockDefinition {
    const args = this.getArgs(false);
    return {
      message0: this.message,
      args0: args,
      args2: args,
      category: 'user',
      colour: '#3556a2',
      extensions: ['shapeBrick']
    };
  }

  public getJsonForDefinitionBrick(): BlockDefinition {
    const args = this.getArgs(true);
    const argValues = new Map<string, string>();
    for (let i = 0; i < this.inputTypes.length; ++i) {
      if (this.inputTypes[i].type.toUpperCase() == 'INPUT') {
        argValues.set(this.inputTypes[i].name, this.inputTypes[i].name);
      }
    }
    return {
      message0: this.message,
      args0: args,
      category: 'user',
      colour: '#3556a2',
      previousStatement: 'userdefinedtemplate',
      nextStatement: 'userdefinedtemplate',
      formValueMap: argValues
    };
  }
}
