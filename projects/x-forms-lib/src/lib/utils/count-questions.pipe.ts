import { Pipe, PipeTransform } from '@angular/core';
import {Form} from "../models/form";
import {Question} from "../models/question";
import {Structure} from "./structure";
import {QuestionsCounted} from "./questions-counted";

@Pipe({
  name: 'countQuestions'
})
export class CountQuestionsPipe implements PipeTransform {

  transform(form: Form): QuestionsCounted {
    const questions: Map<string, Question<any>> = new Map();
    Structure.extractQuestions(form, questions);
    const enabledQuestions = Array.from(questions.values()).filter(question => question.disabled);
    const questionsCounted = new QuestionsCounted(0, enabledQuestions.length);
    enabledQuestions.forEach(question => {
      if (question.valid) {
        questionsCounted.answeredQuestions++;
      }
    });
    return questionsCounted;
  }

}
