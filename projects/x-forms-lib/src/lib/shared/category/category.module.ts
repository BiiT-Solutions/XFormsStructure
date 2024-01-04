import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import {FormElementModule} from "../form-element/form-element.module";



@NgModule({
  declarations: [
    CategoryComponent
  ],
  exports: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    FormElementModule
  ]
})
export class CategoryModule { }
