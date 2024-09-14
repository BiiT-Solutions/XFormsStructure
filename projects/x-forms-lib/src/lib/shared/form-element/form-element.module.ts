import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementComponent } from './form-element.component';
import {UtilsModule} from "../../utils/utils.module";
import {BiitGroupModule, BiitInputTextModule} from "biit-ui/inputs";
import {QuestionModule} from "../question/question.module";
import {BiitIconModule} from "biit-ui/icon";
import {TextModule} from "../text/text.module";



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
        BiitIconModule,
        TextModule,
        BiitGroupModule
    ]
})
export class FormElementModule { }
