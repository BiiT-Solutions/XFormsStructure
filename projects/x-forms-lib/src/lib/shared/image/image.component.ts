import {Component, Input} from '@angular/core';

@Component({
  selector: 'biit-form-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input() imageUrl: string;
  @Input() data: string;
  @Input() width: number;
  @Input() height: number;
  @Input() label: string;
}
