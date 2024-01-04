import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from "../../models/question";
import {VariableType} from "../../models/variable-type";
import {Type} from "biit-ui/inputs";

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

  protected onChanged(response: any): void {
    this.changed.emit(response);
  }

}
