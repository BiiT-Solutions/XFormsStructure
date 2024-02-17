import { Pipe, PipeTransform } from '@angular/core';
import {Question} from "../models/question";
import {FormItem} from "../models/form-item";
import {Answer} from "../models/answer";

@Pipe({
  name: 'nestedAnswers'
})
export class NestedAnswersPipe implements PipeTransform {

  transform(question:Question<any>): number {
    return question.children && question.children.length ? this.getNestedAnswersLevel(question.children) : 0;
  }

  private getNestedAnswersLevel(items: FormItem[], counter: number = 0): number {
    counter++;
    const counters: number[] =items.filter(item => item instanceof Answer && item.children && item.children.length)
      .map(answer => this.getNestedAnswersLevel(answer.children, counter));
    return counters.length ? Math.max(...counters) : counter;
  }

}
