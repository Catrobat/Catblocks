import { CatBlocksConfig } from './CatBlocksConfig';

export class ConfigValidator implements CatBlocksConfig {
  advancedMode: boolean;
  container: string;
  renderSize: number;
  shareRoot: string;
  media: string;
  language: string;
  rtl: boolean;
  i18n: string;
  noImageFound: string;
  renderScripts: boolean;
  renderLooks: boolean;
  renderSounds: boolean;
  readOnly: boolean;

  constructor(config: Partial<CatBlocksConfig>) {
    const validatedConfig = { ...this.defaultConfig, ...config } as CatBlocksConfig;
    this.advancedMode = validatedConfig.advancedMode;
    this.container = validatedConfig.container;
    this.renderSize = validatedConfig.renderSize;
    this.shareRoot = validatedConfig.shareRoot;
    this.media = validatedConfig.media;
    this.language = validatedConfig.language;
    this.rtl = validatedConfig.rtl;
    this.i18n = validatedConfig.i18n;
    this.noImageFound = validatedConfig.noImageFound;
    this.renderScripts = validatedConfig.renderScripts;
    this.renderLooks = validatedConfig.renderLooks;
    this.renderSounds = validatedConfig.renderSounds;
    this.readOnly = validatedConfig.readOnly;

    this.preparePaths();
  }

  public static parseOptions(config: Partial<CatBlocksConfig>): CatBlocksConfig {
    const validatedConfig = new this(config);
    return validatedConfig;
  }

  private get defaultConfig() {
    return {
      advancedMode: false,
      container: 'body',
      renderSize: 0.75,
      shareRoot: '',
      media: 'media/',
      language: 'en',
      rtl: false,
      i18n: 'i18n/',
      noImageFound: 'No_Image_Available.jpg', // TODO: never used anywhere,
      renderScripts: true,
      renderLooks: true,
      renderSounds: true,
      readOnly: true
    };
  }

  private preparePaths(): void {
    this.shareRoot = this.addTrailingSlash(this.shareRoot);
    this.shareRoot = this.shareRoot.replace(/^\//, '');

    this.media = this.addTrailingSlash(this.media);
    this.i18n = this.addTrailingSlash(this.i18n);

    this.media = this.createURL(this.media);
    this.i18n = this.createURL(this.i18n);

    if (!this.shareRoot.startsWith('http')) {
      this.shareRoot = '/' + this.shareRoot;
    }
  }

  private createURL(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    if (path.startsWith('/')) {
      return window.location.origin + path;
    }

    if (this.shareRoot.startsWith('http')) {
      return this.shareRoot + path;
    }
    return window.location.origin + '/' + this.shareRoot + path;
  }

  private addTrailingSlash(uri: string): string {
    if (!uri.endsWith('/')) {
      return uri + '/';
    }
    return uri;
  }
}
