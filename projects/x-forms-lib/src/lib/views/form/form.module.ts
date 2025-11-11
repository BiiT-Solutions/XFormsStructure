import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {UtilsModule} from "../../utils/utils.module";
import {CategoryModule} from "../../shared/category/category.module";
import {BiitButtonModule} from "@biit-solutions/wizardry-theme/button";
import {SubmittedModule} from "../submitted/submitted.module";
import {BiitIconModule} from "@biit-solutions/wizardry-theme/icon";
import {BiitProgressBarModule} from "@biit-solutions/wizardry-theme/info";
import {TranslocoRootModule} from "@biit-solutions/wizardry-theme/i18n";
import {BiitDropdownModule} from "@biit-solutions/wizardry-theme/inputs";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    CategoryModule,
    BiitButtonModule,
    SubmittedModule,
    BiitIconModule,
    BiitProgressBarModule,
    TranslocoRootModule,
    BiitDropdownModule,
    FormsModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule {
}
