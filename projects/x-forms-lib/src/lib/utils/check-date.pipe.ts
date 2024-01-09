import { Pipe, PipeTransform } from '@angular/core';
import {VariableFormat} from "../models/variable-format";

@Pipe({
  name: 'checkDate'
})
export class CheckDatePipe implements PipeTransform {

  transform(date: Date, format: VariableFormat): string {
    if (!date) {
      return null;
    }
    switch (format) {
      case VariableFormat.DATE:
        return null;
      case VariableFormat.DATE_PAST:
        return date.getTime() > new Date().getTime() ? 'date_not_past' : null;
      case VariableFormat.DATE_FUTURE:
        return date.getTime() < new Date().getTime() ? 'date_not_future' : null;
      default:
        return 'wrong_implementation';
    }
  }

}
