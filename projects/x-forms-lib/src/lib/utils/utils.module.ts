import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsVisiblePipe } from './is-visible.pipe';
import { NextPipe } from './next.pipe';
import { TypeofPipe } from './typeof.pipe';
import { InstanceofPipe } from './instanceof.pipe';
import { GetRegexPipe } from './get-regex.pipe';
import { GetDatePipe } from './get-date.pipe';
import { PreviousPipe } from './previous.pipe';
import { CheckDatePipe } from './check-date.pipe';
import { CheckAnswersPipe } from './check-answers.pipe';
import { AsGroupPipe } from './as-group.pipe';
import { NestedAnswersPipe } from './nested-answers.pipe';
import { VarFormatPipe } from './var-format.pipe';
import { VarFormatAnswersPipe } from './var-format-answers.pipe';
import { SliderConverterPipe } from './slider-converter.pipe';
import {CountQuestionsPipe} from './count-questions.pipe';
import { PercentagePipe } from './percentage.pipe';
import { TranslatePipe } from './translate.pipe';



@NgModule({
    declarations: [
        IsVisiblePipe,
        NextPipe,
        TypeofPipe,
        InstanceofPipe,
        GetRegexPipe,
        GetDatePipe,
        PreviousPipe,
        CheckDatePipe,
        CheckAnswersPipe,
        AsGroupPipe,
        NestedAnswersPipe,
        VarFormatPipe,
        VarFormatAnswersPipe,
        SliderConverterPipe,
        CountQuestionsPipe,
        PercentagePipe,
        TranslatePipe
    ],
  imports: [
    CommonModule
  ], exports: [
    IsVisiblePipe,
    NextPipe,
    TypeofPipe,
    InstanceofPipe,
    GetRegexPipe,
    GetDatePipe,
    PreviousPipe,
    CheckDatePipe,
    CheckAnswersPipe,
    AsGroupPipe,
    NestedAnswersPipe,
    VarFormatPipe,
    VarFormatAnswersPipe,
    SliderConverterPipe,
    CountQuestionsPipe,
    PercentagePipe,
    TranslatePipe
  ], providers: [
    IsVisiblePipe,
    NextPipe,
    PreviousPipe,
    CheckAnswersPipe,
    CheckDatePipe,
    GetRegexPipe,
    VarFormatPipe,
    NestedAnswersPipe,
    TranslatePipe
  ]
})
export class UtilsModule { }
