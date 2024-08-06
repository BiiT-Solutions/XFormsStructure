import { Pipe, PipeTransform } from '@angular/core';
import {Answer} from "../models/answer";
import {FormItem} from "../models/form-item";

@Pipe({
  name: 'sliderConverter'
})
export class SliderConverterPipe implements PipeTransform {

  transform(answers: FormItem[]): {value: string | number, label: string, description: string }[] {
    if (!answers || !answers.length) {
      return [];
    }
    const values = answers.filter(answer => answer instanceof Answer).map(answer => answer as Answer)
      .map(answer => {
        return {value: answer.name, label: answer.label, description: answer.description ?? undefined}
      });

    return values;
  }

}
