import { Pipe, PipeTransform } from '@angular/core';
import {Question} from "../models/question";

@Pipe({
  name: 'answerLabelExtractor'
})
export class AnswerLabelExtractorPipe implements PipeTransform {

  transform(question: Question<any>): string[] {
    const labels: string[] = question.children.map(child => child.label);
    return labels;
  }

}
