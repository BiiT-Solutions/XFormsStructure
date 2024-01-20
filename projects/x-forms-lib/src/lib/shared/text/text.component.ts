import {Component, Input} from '@angular/core';
import {Text} from "../../models/text";

@Component({
  selector: 'biit-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  @Input() text: Text;
}
