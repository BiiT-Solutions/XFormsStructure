import {Component, Input} from '@angular/core';
import {Text} from "../../models/text";
import {Language} from "../language";

@Component({
  selector: 'biit-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  @Input() text: Text;
  protected readonly Language = Language;
}
