import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {UtilsModule} from "../../utils/utils.module";
import {CategoryModule} from "../../shared/category/category.module";
import {BiitButtonModule} from "biit-ui/button";



@NgModule({
  declarations: [
    FormComponent
  ],
    imports: [
        CommonModule,
        UtilsModule,
        CategoryModule,
        BiitButtonModule
    ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
