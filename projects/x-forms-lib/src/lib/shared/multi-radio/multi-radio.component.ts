import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormItem} from "../../models/form-item";
import {Answer} from "../../models/answer";
import {DynamicAnswer} from "../../models/dynamic-answer";
import {DataStoreService} from "../../utils/data-store.service";

@Component({
  selector: 'biit-multi-radio',
  templateUrl: './multi-radio.component.html',
  styleUrls: ['./multi-radio.component.css']
})
export class MultiRadioComponent {
  @Input() label: string;
  @Input() answers: FormItem[];
  @Input() info: string;
  @Input() showAnswersDescription = false;
  @Output() selected: EventEmitter<FormItem> = new EventEmitter<FormItem>();
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  protected selectedAnswer: FormItem;
  protected response: string;

  constructor(protected dataStoreService: DataStoreService) {}

  protected onSelected(value: string): void {
    this.selectedAnswer = null;
    this.unselectDeep(this.answers);
    const node: FormItem = this.findDeepAnswer(this.answers, value);
    if (!node) {
      console.error(`Node "${value}" not found and this should exist.`);
      return;
    }
    (node as Answer).selected = true;
    if (node.children && node.children.length) {
      this.selectedAnswer = node;
      this.selected.emit(null);
    } else {
      this.selected.emit(node);
    }
  }
  private unselectDeep(answers: FormItem[]): void {
    answers.map(answer => answer as Answer).forEach(answer => {
      answer.selected = false;
      if (answer.children && answer.children.length) {
        this.unselectDeep(answer.children);
      }
    });
  }

  protected childSelected(value: FormItem): void {
    this.selected.emit(value);
  }

  protected findDeepAnswer(answers: FormItem[], value: string): FormItem {
    for (const answer of answers) {
      if (answer.name === value) {
        return answer;
      }
      if (answer.children && answer.children.length) {
        const node: FormItem = this.findDeepAnswer(answer.children, value);
        if (node) {
          return node;
        }
      }
    }
    return null;
  }

  public static checkDeepAnswer(answer: Answer): boolean {
    if (answer.children && answer.children.length) {
      return (answer.children as Answer[]).some(MultiRadioComponent.checkDeepAnswer);
    }
    return answer.selected;
  }

  protected readonly Answer = Answer;
  protected readonly DynamicAnswer = DynamicAnswer;
}
