import { Locale } from './Locale';
import { setLocale as setBlocklyLocale } from 'blockly';

interface LocaleEntry {
  DROPDOWN_NAME: Locale;
  [key: string]: string;
}
interface LocaleJson {
  [key: string]: LocaleEntry;
}

export class CatBlocksMsgs {
  private static msgs = new Map<string, LocaleEntry>();
  private static currentLocale: Locale = Locale.en;
  private static fallbackLocale: Locale = Locale.en;
  private static i18nPath: string | null = null;

  public static init(i18n: string): void {
    this.i18nPath = i18n;
    if (!this.i18nPath.endsWith('/')) {
      this.i18nPath += '/';
    }
  }

  /**
   * Get old structure of locales.json, which includes DROPDOWN_NAME for every locale for Playground
   * @returns {LocaleJson}
   * @deprecated
   */
  public static getLocales(): LocaleJson {
    const oldStyleLocales: LocaleJson = {};
    for (const [key, value] of Object.entries(Locale)) {
      oldStyleLocales[key] = {
        DROPDOWN_NAME: value
      };
    }
    return oldStyleLocales;
  }

  /**
   * Set Locale for Blockly and Catblocks by locale key
   * @param localeKey locale key in format en, en_US, de, de_DE and so on
   * @returns {Promise<void>}
   */
  public static async setLocale(localeKey: string): Promise<void> {
    let locale: Locale = Locale[localeKey as keyof typeof Locale];
    if (!locale) {
      const localeWithoutSuffix = localeKey.substring(0, localeKey.indexOf('_'));
      if (locale != localeWithoutSuffix) {
        locale = Locale[localeWithoutSuffix as keyof typeof Locale];
      }
    }
    if (!locale) {
      console.warn(`Locale '${localeKey}' not found, falling back to ${this.fallbackLocale}`);
      locale = this.fallbackLocale;
    }

    if (this.hasLocaleLoaded(locale)) {
      this.currentLocale = locale;
      const msgs = this.msgs.get(locale) ?? {};
      setBlocklyLocale(msgs);
      return;
    }

    try {
      if (locale !== this.fallbackLocale && !this.hasLocaleLoaded(this.fallbackLocale)) {
        await this.loadNewLocale(this.fallbackLocale);
      }

      const newLocale = await this.loadNewLocale(locale);
      this.currentLocale = locale;
      setBlocklyLocale(newLocale);
    } catch (error) {
      console.error('Could not load locale', error);
    }
  }

  public static getTranslationForKey(key: string): string | null {
    const currentLocale = this.getCurrentLocaleValues();
    if (currentLocale && currentLocale[key]) {
      return currentLocale[key];
    }

    const fallbackKey = this.getLocaleKeyByValue(Locale, this.fallbackLocale);
    const fallbackLocale = this.msgs.get(fallbackKey);
    if (!fallbackLocale) {
      return null;
    }
    if (fallbackLocale[key]) {
      return fallbackLocale[key];
    }
    return null;
  }

  /**
   * Get the currently set locale
   * @returns {string} current locale key
   */
  public static getCurrentLocale(): string {
    return this.getLocaleKeyByValue(Locale, this.currentLocale);
  }

  /**
   * Get the whole translation json for the current locale
   * @returns {LocaleEntry} current locale entry
   */
  public static getCurrentLocaleValues(): LocaleEntry | undefined {
    return this.msgs.get(this.getCurrentLocale());
  }

  private static hasLocaleLoaded(locale: Locale): boolean {
    return this.msgs.get(locale) != null;
  }

  private static getLocaleKeyByValue(enumObj: typeof Locale, value: Locale): string {
    for (const key of Object.keys(enumObj)) {
      if ((enumObj as Record<string, string>)[key] === value) {
        return key;
      }
    }
    throw new Error('Could not map locale to key');
  }

  private static async loadNewLocale(locale: Locale): Promise<LocaleEntry> {
    const localeKey = this.getLocaleKeyByValue(Locale, locale);
    const url = new URL(`${this.i18nPath}${localeKey}.json`);
    const response = await fetch(url.toString());
    if (response.status !== 200) {
      throw new Error(`Failed to load locale ${locale}: ${response.statusText}`);
    }

    const localeJson: LocaleEntry = await response.json();
    this.msgs.set(localeKey, localeJson);
    return localeJson;
  }
}
