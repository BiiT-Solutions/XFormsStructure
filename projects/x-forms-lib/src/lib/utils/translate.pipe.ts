import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(label: string, translations: { [key: string]: string }): string {
    const availableTranslations: string[] = translations ? Object.keys(translations) : [];
    const language: string = this.getBrowserLanguage(availableTranslations);
    if (language && translations[language.toUpperCase()]) {
      return translations[language.toUpperCase()];
    }
    return label;
  }

  /**
   * Get the browser language depending on the languages available
   * @param languages
   */
  private getBrowserLanguage(languages: string[]): string {
    if (!languages || languages.length === 0) {
      return null;
    }
    const browserLanguages: string[] = (navigator.languages || [navigator.language]).map(language => language.split('-')[0].toLowerCase());
    const availableLanguages: string[] = languages.map(language => language.toLowerCase());
    let languageAvailable: string = null;

    for (const lang of browserLanguages) {
      //English is the default language. So if it selected, the default label must be shown.
      if (lang === "en") {
        return null;
      }
      if (availableLanguages.includes(lang)) {
        return lang;
      }
    }
    return languageAvailable;
  }
}
