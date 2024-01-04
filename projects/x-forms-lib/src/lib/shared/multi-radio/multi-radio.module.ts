import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiRadioComponent } from './multi-radio.component';
import {BiitRadioButtonModule} from "biit-ui/inputs";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MultiRadioComponent
  ],
  exports: [
    MultiRadioComponent
  ],
  imports: [
    CommonModule,
    BiitRadioButtonModule,
    FormsModule
  ]
})
export class MultiRadioModule { }
