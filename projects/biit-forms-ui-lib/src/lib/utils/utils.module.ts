import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsVisiblePipe } from './is-visible.pipe';



@NgModule({
  declarations: [
    IsVisiblePipe
  ],
  imports: [
    CommonModule
  ]
})
export class UtilsModule { }
