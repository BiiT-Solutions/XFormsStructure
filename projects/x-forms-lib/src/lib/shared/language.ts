export class Language {
  static readonly LANGUAGE_STORAGE_KEY: string = 'pl';
  static language: string = 'en';

  static loadLanguage(): string {
    const language = localStorage.getItem(Language.LANGUAGE_STORAGE_KEY);
    if (language) {
      Language.language = language;
    } else {
      Language.language = 'en';
      return null;
    }
    return Language.language;
  }

  static setLanguage(language: string): void {
    Language.language = language;
    localStorage.setItem(Language.LANGUAGE_STORAGE_KEY, language);
  }

  static clear(): void {
    localStorage.removeItem(Language.LANGUAGE_STORAGE_KEY);
    Language.language = 'en';
  }
}
