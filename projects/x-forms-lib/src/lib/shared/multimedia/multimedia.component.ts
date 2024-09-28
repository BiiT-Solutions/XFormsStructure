import {Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'biit-form-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent {

  protected readonly MultimediaType = MultimediaType;

  @Input() url: string;
  @Input() data: string;
  @Input() width: number;
  @Input() height: number;
  @Input() label: string;
  @Input() mId: string;
  @Input() type: MultimediaType = MultimediaType.IMAGE;
}

export enum MultimediaType {
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO"
}
