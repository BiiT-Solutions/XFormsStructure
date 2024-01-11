import {Component, Directive, Input} from '@angular/core';


@Directive({
  selector: '[value]'
})
export class RequiredLabelValueDirective {

  constructor(private parent: RequiredLabelComponent) {}

}

@Component({
  selector: 'label[required]',
  templateUrl: './required-label.component.html',
  styleUrls: ['./required-label.component.css']
})
export class RequiredLabelComponent {
  @Input() value: any;
  @Input() required: boolean;
}
