import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from "../../models/question";
import {VariableType} from "../../models/variable-type";
import {Type} from "biit-ui/inputs";
import {AnswerType} from "../../models/answer-type";
import {CheckDatePipe} from "../../utils/check-date.pipe";
import {VariableFormat} from "../../models/variable-format";
import {GetRegexPipe} from "../../utils/get-regex.pipe";
import {Answer} from "../../models/answer";
import {MultiCheckboxComponent} from "../multi-checkbox/multi-checkbox.component";
import {Flow} from "../../models/flow";

@Component({
  selector: 'biit-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: Question<any>;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  protected readonly VariableType = VariableType;
  protected readonly Type = Type;
  protected readonly AnswerType = AnswerType;

  constructor(private checkDate: CheckDatePipe, private getRegex: GetRegexPipe) {
  }

  protected onChanged(response: any): void {
    this.question.valid = this.validate(response)
    if (!this.question.valid) {
      this.changed.emit(null);
    } else {
      this.changed.emit(this.question);
    }
  }
  private validate(response: any): boolean {
    if (this.question.mandatory && !response) {
      return false;
    }
    if (this.question.answerType === AnswerType.MULTIPLE_SELECTION) {
      if (!this.question.children.some(child => MultiCheckboxComponent.checkDeepAnswer(child as Answer))) {
        return false;
      }
    }
    if (this.question.answerFormat === VariableType.DATE) {
      return this.checkDate.transform(response, this.question.answerSubformat) === null;
    }
    const regex: RegExp = this.getRegex.transform(this.question.answerSubformat);
    if (regex) {
      return regex.test(response);
    }
    return true;
  }

  protected readonly console: Console = console;
}
