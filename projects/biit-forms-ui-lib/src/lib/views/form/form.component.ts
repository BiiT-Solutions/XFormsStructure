import {Component, Input} from '@angular/core';
import {Form} from "../../models/form";
import {FormItem} from "../../models/form-item";

@Component({
  selector: 'biit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() form: Form;

  protected onGroup(group: FormItem) {
    console.log(group.label)
  }
}
