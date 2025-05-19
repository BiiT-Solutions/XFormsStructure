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
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import {TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "./transloco-root.module";

registerLocaleData(localeEn, 'en')
registerLocaleData(localeEs, 'es');
registerLocaleData(localeNL, 'nl');
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeDe, 'de');

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
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es', 'nl', 'fr', 'de'],
        defaultLang: 'en',
        fallbackLang: 'en',
        missingHandler: {
          useFallbackTranslation: true
        },
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
