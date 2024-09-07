import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiRadioComponent } from './multi-radio.component';
import {BiitRadioButtonModule} from "biit-ui/inputs";
import {FormsModule} from "@angular/forms";
import {BiitTooltipIconModule} from "biit-ui/info";
import {RequiredLabelModule} from "../required-label/required-label.module";
import {UtilsModule} from "../../utils/utils.module";
import {ImageModule} from "../image/image.module";



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
        FormsModule,
        BiitTooltipIconModule,
        RequiredLabelModule,
        UtilsModule,
        ImageModule
    ]
})
export class MultiRadioModule { }
