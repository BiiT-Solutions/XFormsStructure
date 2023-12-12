import {Component, OnInit} from '@angular/core';
import { Form } from 'projects/biit-forms-ui-lib/src/lib/models/form';
import {ActivatedRoute} from "@angular/router";
import { Constants } from "../../projects/biit-forms-ui-lib/src/lib/utils/constants";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        if (params['form']) {
          this.http.get(`${Constants.FORM_PATH}/${params['form']}.json`)
            .subscribe((form: any) => {
              this.form = Form.clone(form);
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
    this.form = Form.clone(JSON.parse(form));
    window['form'] = this.form;
  }
}
