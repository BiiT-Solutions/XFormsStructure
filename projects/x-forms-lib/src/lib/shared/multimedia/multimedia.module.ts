import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultimediaComponent } from './multimedia.component';
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";



@NgModule({
  declarations: [
    MultimediaComponent
  ],
  exports: [
    MultimediaComponent
  ],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule
  ]
})
export class MultimediaModule { }
