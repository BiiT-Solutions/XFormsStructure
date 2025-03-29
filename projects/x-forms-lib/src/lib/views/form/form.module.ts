import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {UtilsModule} from "../../utils/utils.module";
import {CategoryModule} from "../../shared/category/category.module";
import {BiitButtonModule} from "biit-ui/button";
import {SubmittedModule} from "../submitted/submitted.module";
import {BiitIconModule} from "biit-ui/icon";
import {BiitProgressBarModule} from "biit-ui/info";



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    CategoryModule,
    BiitButtonModule,
    SubmittedModule,
    BiitIconModule,
    BiitProgressBarModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
