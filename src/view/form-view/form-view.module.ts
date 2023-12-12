import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormViewComponent } from './form-view.component';
import {FormModule} from "../../../projects/x-forms-lib/src/lib/views/form/form.module";



@NgModule({
  declarations: [
    FormViewComponent
  ],
  exports: [
    FormViewComponent
  ],
  imports: [
    CommonModule,
    FormModule
  ]
})
export class FormViewModule { }
