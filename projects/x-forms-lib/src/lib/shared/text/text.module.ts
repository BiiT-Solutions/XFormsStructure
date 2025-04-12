import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './text.component';
import {UtilsModule} from "../../utils/utils.module";



@NgModule({
  declarations: [
    TextComponent
  ],
  exports: [
    TextComponent
  ],
    imports: [
        CommonModule,
        UtilsModule
    ]
})
export class TextModule { }
