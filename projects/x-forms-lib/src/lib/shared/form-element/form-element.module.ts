import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementComponent } from './form-element.component';
import {UtilsModule} from "../../utils/utils.module";
import {BiitInputTextModule} from "biit-ui/inputs";
import {QuestionModule} from "../question/question.module";



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
        QuestionModule
    ]
})
export class FormElementModule { }
