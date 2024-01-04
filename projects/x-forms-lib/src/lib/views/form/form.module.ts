import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {UtilsModule} from "../../utils/utils.module";
import {CategoryModule} from "../../shared/category/category.module";



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    CategoryModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
