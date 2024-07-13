import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiCheckboxComponent } from './multi-checkbox.component';
import {BiitCheckboxModule, BiitRadioButtonModule} from "biit-ui/inputs";
import {FormsModule} from "@angular/forms";
import {RequiredLabelModule} from "../required-label/required-label.module";
import {UtilsModule} from "../../utils/utils.module";
import {BiitTooltipIconModule} from "biit-ui/info";
import {BiitIconModule} from "biit-ui/icon";



@NgModule({
  declarations: [
    MultiCheckboxComponent
  ],
  exports: [
    MultiCheckboxComponent
  ],
  imports: [
    CommonModule,
    BiitRadioButtonModule,
    FormsModule,
    BiitCheckboxModule,
    RequiredLabelModule,
    UtilsModule,
    BiitTooltipIconModule,
    BiitIconModule
  ]
})
export class MultiCheckboxModule { }
