import { Component, Input } from '@angular/core';
import { Form } from 'projects/x-forms-lib/src/lib/models/form';

@Component({
  selector: 'biit-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent {

  @Input() form: Form;
  public test;
  constructor() {
  }
}
