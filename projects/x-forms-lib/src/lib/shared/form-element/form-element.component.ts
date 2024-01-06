import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormItem} from "../../models/form-item";
import {Group} from "../../models/group";
import {Question} from "../../models/question";

@Component({
  selector: 'biit-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent {

  @Input() element: FormItem;
  @Output() changed: EventEmitter<any> = new EventEmitter();

  protected readonly Group = Group;
  protected readonly Question = Question;
  protected readonly Text = Text;
}
