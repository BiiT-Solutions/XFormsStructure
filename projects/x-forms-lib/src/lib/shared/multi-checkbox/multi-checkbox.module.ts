import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiCheckboxComponent } from './multi-checkbox.component';
import {BiitCheckboxModule, BiitRadioButtonModule} from "@biit-solutions/wizardry-theme/inputs";
import {FormsModule} from "@angular/forms";
import {RequiredLabelModule} from "../required-label/required-label.module";
import {UtilsModule} from "../../utils/utils.module";
import {BiitTooltipIconModule} from "@biit-solutions/wizardry-theme/info";
import {BiitIconModule} from "@biit-solutions/wizardry-theme/icon";
import {MultimediaModule} from "../multimedia/multimedia.module";



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
        BiitIconModule,
        MultimediaModule
    ]
})
export class MultiCheckboxModule { }
