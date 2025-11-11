import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Question} from "../../models/question";
import {VariableType} from "../../models/variable-type";
import {Type} from "@biit-solutions/wizardry-theme/inputs";
import {AnswerType} from "../../models/answer-type";
import {CheckDatePipe} from "../../utils/check-date.pipe";
import {GetRegexPipe} from "../../utils/get-regex.pipe";
import {Answer} from "../../models/answer";
import {MultiCheckboxComponent} from "../multi-checkbox/multi-checkbox.component";
import {NestedAnswersPipe} from "../../utils/nested-answers.pipe";
import {MultiRadioComponent} from "../multi-radio/multi-radio.component";
import {DataStoreService} from "../../utils/data-store.service";
import {TRANSLOCO_SCOPE, TranslocoService} from "@ngneat/transloco";
import {Language} from "../language";

@Component({
  selector: 'biit-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      multi:true,
      useValue: {scope: 'xforms', alias: 'xforms'}
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class QuestionComponent {
  @Input() question: Question<any>;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  protected readonly VariableType = VariableType;
  protected readonly Type = Type;
  protected readonly AnswerType = AnswerType;
  protected exceeded: string;


  constructor(private checkDate: CheckDatePipe,
              protected dataStoreService: DataStoreService,
              private getRegex: GetRegexPipe,
              private transloco: TranslocoService,
              private nestedAnswers: NestedAnswersPipe) {
  }

  protected onChanged(response: any): void {
    this.question.valid = this.validate(response);
    if (!response) {
      this.dataStoreService.removeValue(this.question.pathName);
    } else {
      this.dataStoreService.setValue(this.question.pathName, response);
    }
    this.changed.emit(this.question);
  }
  protected onSliderSelected(response: number): void {
    if (this.question.children && this.question.children.length >= response) {
      this.question.children.forEach(child => (child as Answer).selected = false);
      (this.question.children[response - 1] as Answer).selected = true;
    }
  }

  protected onSliderOptionSelected(response: string | number): void {
    if (this.question.children) {
      this.question.children.forEach(child => (child as Answer).selected = false);
      this.question.children.filter(child => child.name == response)
        .map(child => child as Answer).forEach(answer => answer.selected = true);
    }
  }

  private validate(response: any): boolean {
    if (this.question.mandatory && !response) {
      return false;
    }
    if (this.question.maxAnswersSelected > 0) {
      if (this.question.children.filter(child => (child as Answer).selected).length > this.question.maxAnswersSelected) {
        this.exceeded = this.transloco.translate('xforms.error-max-selected').replace('{0}', this.question.maxAnswersSelected.toString());
        return false;
      } else {
        this.exceeded = null;
      }
    }
    if (this.question.answerType === AnswerType.SINGLE_SELECTION_SLIDER) {
      if (!this.question.children.some(child => (child as Answer).selected)) {
        return false;
      }
    }
    if (this.question.answerType === AnswerType.MULTIPLE_SELECTION) {
      if (!this.question.children.some(child => MultiCheckboxComponent.checkDeepAnswer(child as Answer))) {
        return false;
      }
    }
    if (this.question.answerType === AnswerType.SINGLE_SELECTION_RADIO && this.nestedAnswers.transform(this.question) > 1) {
      if (!this.question.children.some(child => MultiRadioComponent.checkDeepAnswer(child as Answer))) {
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

  log(event: unknown) {
    console.log('DEVELOPMENT LOG: ', event);
  }

  protected readonly console: Console = console;
  protected readonly Answer = Answer;
  protected readonly Language = Language;
}
