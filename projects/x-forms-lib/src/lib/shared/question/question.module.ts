import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import {
  BiitDatePickerModule, BiitDropdownModule,
  BiitInputTextModule,
  BiitMultiselectModule,
  BiitRadioButtonModule,
  BiitTextareaModule
} from "biit-ui/inputs";
import {FormsModule} from "@angular/forms";
import {UtilsModule} from "../../utils/utils.module";
import {MultiRadioModule} from "../multi-radio/multi-radio.module";
import {RequiredLabelModule} from "../required-label/required-label.module";
import {MultiCheckboxModule} from "../multi-checkbox/multi-checkbox.module";



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
    MultiRadioModule,
    BiitDropdownModule,
    RequiredLabelModule,
    MultiCheckboxModule
  ]
})
export class QuestionModule { }
