import {Component, OnInit} from '@angular/core';
import { Form } from 'projects/x-forms-lib/src/lib/models/form';
import {ActivatedRoute} from "@angular/router";
import { Constants } from "../../projects/x-forms-lib/src/lib/utils/constants";
import {HttpClient} from "@angular/common/http";
import {BiitIconService} from "@biit-solutions/wizardry-theme/icon";
import {completeIconSet} from "@biit-solutions/biit-icons-collection";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              transloco: TranslocoService,
              biitIconService: BiitIconService,
              private http: HttpClient) {
    biitIconService.registerIcons(completeIconSet);
    transloco.setActiveLang(navigator.language.split('-')[0]);
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        if (params['form']) {
          const path = `${Constants.FORM_PATH}/${params['form']}.json`
          this.http.get(path)
            .subscribe((form: any) => {
              this.form = Form.import(form);
              window['form'] = this.form;
            });
        }
      })
  }

  protected form: Form;
  protected upload(event): void {
    const file: File = event.target.files[0];
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      this.loadForm(fileReader.result as string);
    }
    fileReader.readAsText(file, 'UTF-8');
  }

  private loadForm(form: string): void {
    this.form = Form.import(JSON.parse(form));
    window['form'] = this.form;
  }
}
