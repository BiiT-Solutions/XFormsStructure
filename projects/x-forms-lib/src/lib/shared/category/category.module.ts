import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import {FormElementModule} from "../form-element/form-element.module";
import {BiitButtonModule} from "biit-ui/button";



@NgModule({
  declarations: [
    CategoryComponent
  ],
  exports: [
    CategoryComponent
  ],
    imports: [
        CommonModule,
        FormElementModule,
        BiitButtonModule
    ]
})
export class CategoryModule { }
