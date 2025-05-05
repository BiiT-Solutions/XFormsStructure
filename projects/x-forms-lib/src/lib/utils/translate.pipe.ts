import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(label: string, translations: { [key: string]: string }, language: string): string {
    if (language && translations[language.toUpperCase()]) {
      return translations[language.toUpperCase()];
    }
    return label;
  }

}
