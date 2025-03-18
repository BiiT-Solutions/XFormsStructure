import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormViewModule} from "../view/form-view/form-view.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";

import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeNL from '@angular/common/locales/nl';
import {TRANSLOCO_CONFIG, translocoConfig} from "@ngneat/transloco";

registerLocaleData(localeEn, 'en')
registerLocaleData(localeEs, 'es');
registerLocaleData(localeNL, 'nl');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormViewModule,
    RouterModule.forRoot([]),
    HttpClientModule
  ],
  providers: [{
    provide: TRANSLOCO_CONFIG,
    useValue: translocoConfig({
      availableLangs: ['en', 'es', 'nl'],
      defaultLang: 'en',
      fallbackLang: 'en',
      reRenderOnLangChange: true,
      prodMode: !isDevMode()
    })
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
