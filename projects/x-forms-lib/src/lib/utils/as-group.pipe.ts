import { Pipe, PipeTransform } from '@angular/core';
import {FormItem} from "../models/form-item";
import {Group} from "../models/group";

@Pipe({
  name: 'asGroup'
})
export class AsGroupPipe implements PipeTransform {

  transform(value: FormItem): Group {
    if (value instanceof Group) {
      return value as Group;
    } else {
      return null;
    }
  }
}
