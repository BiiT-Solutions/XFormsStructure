import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionTitleComponent } from './question-title.component';



@NgModule({
  declarations: [
    QuestionTitleComponent
  ],
  exports: [
    QuestionTitleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QuestionTitleModule { }
