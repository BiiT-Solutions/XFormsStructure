import {Pipe, PipeTransform} from '@angular/core';
import {Answer} from "../models/answer";
import {FormItem} from "../models/form-item";

@Pipe({
  name: 'sliderConverter'
})
export class SliderConverterPipe implements PipeTransform {

  transform(answers: FormItem[], language: string): { value: string | number, label: string, description: string}[] {
    if (!answers || !answers.length) {
      return [];
    }
    return answers.filter(answer => answer instanceof Answer).map(answer => answer as Answer)
      .map(answer => {
        return {
          value: answer.name,
          label: this.getTranslation(answer.label, answer.labelTranslations, language),
          description: this.getTranslation(answer.description, answer.descriptionTranslations, language) ?? undefined
        }
      });
  }


  /**
   * Get the text depending on the languages available
   */
  private getTranslation(label: string, translations: { [key: string]: string }, language: string): string {
    if (language && translations[language.toUpperCase()]) {
      return translations[language.toUpperCase()];
    }
    return label;
  }

}
