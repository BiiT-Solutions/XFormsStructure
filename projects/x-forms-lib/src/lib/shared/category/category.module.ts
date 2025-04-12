import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CategoryComponent } from './category.component';
import {FormElementModule} from "../form-element/form-element.module";
import {BiitButtonModule} from "biit-ui/button";
import {MultimediaModule} from "../multimedia/multimedia.module";
import {UtilsModule} from "../../utils/utils.module";



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
        BiitButtonModule,
        NgOptimizedImage,
        MultimediaModule,
        UtilsModule
    ]
})
export class CategoryModule { }
