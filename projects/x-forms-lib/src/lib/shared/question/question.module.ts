import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import {
  BiitDatePickerModule,
  BiitInputTextModule,
  BiitMultiselectModule,
  BiitRadioButtonModule,
  BiitTextareaModule
} from "biit-ui/inputs";
import {FormsModule} from "@angular/forms";
import {UtilsModule} from "../../utils/utils.module";
import {MultiRadioModule} from "../multi-radio/multi-radio.module";



@NgModule({
  declarations: [
    QuestionComponent
  ],
  exports: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    BiitInputTextModule,
    FormsModule,
    UtilsModule,
    BiitDatePickerModule,
    BiitTextareaModule,
    BiitRadioButtonModule,
    BiitMultiselectModule,
    MultiRadioModule
  ]
})
export class QuestionModule { }
