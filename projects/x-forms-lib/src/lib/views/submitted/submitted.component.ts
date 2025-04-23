import {Component, EventEmitter, Output} from '@angular/core';
import {TRANSLOCO_SCOPE} from "@ngneat/transloco";

@Component({
  selector: 'biit-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.css'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      multi:true,
      useValue: {scope: 'xforms', alias: 'xforms'}
    }
  ],
})
export class SubmittedComponent {
  @Output() onReturn= new EventEmitter<void>();
}
