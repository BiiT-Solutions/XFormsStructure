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
  @Output() moveTo: EventEmitter<Flow> = new EventEmitter();
  protected readonly VariableType = VariableType;
  protected readonly Type = Type;
  protected readonly AnswerType = AnswerType;

  constructor(private checkDate: CheckDatePipe, private getRegex: GetRegexPipe) {
  }

  protected onChanged(response: any): void {
    this.question.valid = this.validate(response);
    this.question.valid ? this.changed.emit(response) : this.changed.emit(null);
    if (this.question.flows) {
      const flow: Flow = this.question.flows.find(this.checkFlow);
      if (flow) {
        this.moveTo.emit(flow);
      }
    }
  }
  private validate(response: any): boolean {
    if (this.question.mandatory && !response) {
      return false;
    }
    if (this.question.answerType === AnswerType.MULTIPLE_SELECTION) {
      debugger
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

  private checkFlow(flow: Flow): boolean {

    return true;
  }
  protected readonly console: Console = console;
}
