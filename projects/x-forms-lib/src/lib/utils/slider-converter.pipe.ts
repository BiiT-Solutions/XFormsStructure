import { Pipe, PipeTransform } from '@angular/core';
import {FormItem, Question} from "x-forms-lib";
import {Answer} from "../models/answer";

@Pipe({
  name: 'sliderConverter'
})
export class SliderConverterPipe implements PipeTransform {

  transform(answers: FormItem[]): {value: string | number, label: string, description: string }[] {
    if (!answers || !answers.length) {
      return [];
    }
    return answers.filter(answer => answer instanceof Answer).map(answer => answer as Answer)
      .map(answer => {
        return {value: answer.name, label: answer.label, description: answer.description_always_visible ? answer.description : undefined}
      });
  }

}
