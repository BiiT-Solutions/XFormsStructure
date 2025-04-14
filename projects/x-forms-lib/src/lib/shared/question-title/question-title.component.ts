import {Component, Input} from '@angular/core';

@Component({
  selector: 'biit-question-title',
  templateUrl: './question-title.component.html',
  styleUrls: ['./question-title.component.css']
})
export class QuestionTitleComponent {
  @Input() title: string;
  @Input() required: boolean;
  @Input() completed: boolean;
}
