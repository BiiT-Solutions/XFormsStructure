import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import {BiitInputTextModule} from "biit-ui/inputs";
import {FormsModule} from "@angular/forms";



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
    FormsModule
  ]
})
export class QuestionModule { }
