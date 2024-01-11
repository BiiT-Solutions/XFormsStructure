import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequiredLabelComponent, RequiredLabelValueDirective} from './required-label.component';



@NgModule({
  declarations: [
    RequiredLabelComponent,
    RequiredLabelValueDirective
  ],
  exports: [
    RequiredLabelComponent,
    RequiredLabelValueDirective
  ],
  providers: [
    RequiredLabelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RequiredLabelModule { }
