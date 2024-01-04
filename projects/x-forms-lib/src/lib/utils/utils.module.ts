import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsVisiblePipe } from './is-visible.pipe';
import { NextPipe } from './next.pipe';
import { TypeofPipe } from './typeof.pipe';
import { InstanceofPipe } from './instanceof.pipe';
import { GetRegexPipe } from './get-regex.pipe';



@NgModule({
  declarations: [
    IsVisiblePipe,
    NextPipe,
    TypeofPipe,
    InstanceofPipe,
    GetRegexPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    IsVisiblePipe,
    NextPipe,
    TypeofPipe,
    InstanceofPipe,
    GetRegexPipe
  ], providers: [
    IsVisiblePipe,
    NextPipe
  ]
})
export class UtilsModule { }
