import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormItem} from "../../models/form-item";

@Component({
  selector: 'biit-multi-radio',
  templateUrl: './multi-radio.component.html',
  styleUrls: ['./multi-radio.component.css']
})
export class MultiRadioComponent {
  @Input() label: string;
  @Input() answers: FormItem[];
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  protected selectedAnswer: FormItem;
  protected response: string;

  protected onSelected(value: string): void {
    this.selectedAnswer = null;
    const node: FormItem = this.answers.find(answer => answer.name === value);
    if (!node) {
      console.error(`Node "${value}" not found and this should exist.`);
      return;
    }
    if (node.children && node.children.length) {
      this.selectedAnswer = node;
      this.selected.emit(null);
    } else {
      this.selected.emit(value);
    }
  }
}
