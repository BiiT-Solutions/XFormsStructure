import {Component, Input} from '@angular/core';
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

  protected readonly Group = Group;
  protected readonly Question = Question;
}
