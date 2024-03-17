import { Pipe, PipeTransform } from '@angular/core';
import {Answer} from "../models/answer";
import {DynamicAnswer} from "../models/dynamic-answer";
import {VarFormatPipe} from "./var-format.pipe";
import {DataStoreService} from "./data-store.service";

@Pipe({
  name: 'varFormatAnswers'
})
export class VarFormatAnswersPipe implements PipeTransform {

  constructor(private varFormatPipe: VarFormatPipe) {
  }

  transform<T>(value: T[], dataStoreService: DataStoreService, reactivityID: string): Answer[] {
    const answers: Answer[] = value.filter(answer => answer instanceof Answer).map(answer => answer as Answer);
    answers.forEach(answer => {
      if (answer instanceof DynamicAnswer) {
        answer.label = this.varFormatPipe.transform('${' + answer.referencePath + '}', dataStoreService, dataStoreService.fingerPrint, answer.label);
      } else {
        this.varFormatPipe.transform(answer.label, dataStoreService, reactivityID);
      }
    })
    debugger
    return answers;
  }

}
