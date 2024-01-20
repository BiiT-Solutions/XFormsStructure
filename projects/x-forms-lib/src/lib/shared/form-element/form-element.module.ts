import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementComponent } from './form-element.component';
import {UtilsModule} from "../../utils/utils.module";
import {BiitInputTextModule} from "biit-ui/inputs";
import {QuestionModule} from "../question/question.module";
import {BiitIconModule} from "biit-ui/icon";



@NgModule({
  declarations: [
    FormElementComponent
  ],
  exports: [
    FormElementComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    BiitInputTextModule,
    QuestionModule,
    BiitIconModule
  ]
})
export class FormElementModule { }
