import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormItem} from "../../models/form-item";
import {Answer} from "../../models/answer";

@Component({
  selector: 'biit-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.css']
})
export class MultiCheckboxComponent {
  @Input() label: string;
  @Input() answers: FormItem[];
  @Input() required: boolean = false;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  protected answered: boolean;

  protected onSelected(selected: FormItem): void {
    if (!(selected as Answer).selected) {
      this.unselectDeep(selected as Answer);
    }
    this.selected.emit(selected?.name);
    this.checkAnswer();
  }

  private unselectDeep(selected: Answer): void {
    selected.selected = false;
    if (selected.children && selected.children.length) {
      selected.children.forEach(child => this.unselectDeep(child as Answer));
    }
  }
  protected checkAnswer(): void {
    this.answered = this.answers.map(answer => answer as Answer)
      .some(MultiCheckboxComponent.checkDeepAnswer) ? true : null;
  }

  public static checkDeepAnswer(answer: Answer): boolean {
    if (answer.children && answer.children.length) {
      return (answer.children as Answer[]).some(MultiCheckboxComponent.checkDeepAnswer);
    }
    return answer.selected;
  }
}
