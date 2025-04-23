import {Pipe, PipeTransform} from '@angular/core';
import {Answer} from "../models/answer";
import {FormItem} from "../models/form-item";

@Pipe({
  name: 'sliderConverter'
})
export class SliderConverterPipe implements PipeTransform {

  transform(answers: FormItem[]): { value: string | number, label: string, description: string }[] {
    if (!answers || !answers.length) {
      return [];
    }
    return answers.filter(answer => answer instanceof Answer).map(answer => answer as Answer)
      .map(answer => {
        return {
          value: answer.name,
          label: this.getTranslation(answer.label, answer.labelTranslations),
          description: this.getTranslation(answer.description, answer.descriptionTranslations) ?? undefined
        }
      });
  }


  /**
   * Get the text depending on the languages available
   */
  private getTranslation(defaultLabel: string, translations: { [key: string]: string }): string {
    const availableTranslations: string[] = translations ? Object.keys(translations) : [];
    if (!translations || availableTranslations.length === 0) {
      return defaultLabel;
    }
    const browserLanguages: string[] = (navigator.languages || [navigator.language]).map(language => language.split('-')[0].toLowerCase());
    const availableLanguages: string[] = availableTranslations.map(language => language.toLowerCase());

    for (const lang of browserLanguages) {
      //English is the default language. So if it selected, the default label must be shown.
      if (lang === "en") {
        return defaultLabel;
      }
      if (availableLanguages.includes(lang)) {
        return translations[lang.toUpperCase()];
      }
    }
    return defaultLabel;
  }

}
