import { CatBlocksConfig } from './config/CatBlocksConfig';
import { initBricks } from '../js/blocks/bricks';
import { Catroid } from '../js/integration/catroid';
import { Share } from '../js/integration/share';
import { ConfigValidator } from './config/ConfigValidator';
import { CatBlocksMsgs } from './i18n/CatBlocksMsgs';

export abstract class CatBlocksBase {
  protected static instance_: CatBlocksBase;
  protected static controller_: Catroid | Share;
  protected static config_: CatBlocksConfig;

  public static get instance(): CatBlocksBase {
    if (!this.instance_) {
      throw new Error('CatBlocks not initialized');
    }
    return this.instance_;
  }

  protected static get controller(): Catroid | Share {
    return this.controller_;
  }

  protected static get config(): CatBlocksConfig {
    return this.config_;
  }

  protected static init(config: Partial<CatBlocksConfig>): Promise<void> {
    this.config_ = ConfigValidator.parseOptions(config);

    const container = document.getElementById(this.config.container);
    if (!container) {
      throw new Error('Program Container not found');
    }

    initBricks(this.config.advancedMode);
    CatBlocksMsgs.init(this.config.i18n);
    return this.controller.init(this.config);
  }
}
