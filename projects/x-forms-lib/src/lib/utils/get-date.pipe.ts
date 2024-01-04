import { Pipe, PipeTransform } from '@angular/core';
import {VariableFormat} from "../models/variable-format";

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {

  transform(format: VariableFormat, limit: 'min' | 'max'): Date {
    const now: Date = new Date();
    switch (format) {
      case VariableFormat.DATE_FUTURE:
        return  limit === 'min' ?  now : null;
      case VariableFormat.DATE_PAST:
        return  limit === 'max' ?  now : null;
      case VariableFormat.DATE:
      default:
        return null;
    }
  }

}
