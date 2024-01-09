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



@NgModule({
  declarations: [
    IsVisiblePipe,
    NextPipe,
    TypeofPipe,
    InstanceofPipe,
    GetRegexPipe,
    GetDatePipe,
    PreviousPipe,
    CheckDatePipe
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
    CheckDatePipe
  ], providers: [
    IsVisiblePipe,
    NextPipe,
    PreviousPipe,
    CheckDatePipe,
    GetRegexPipe
  ]
})
export class UtilsModule { }
