import {Pipe, PipeTransform} from '@angular/core';
import {VariableFormat} from "../models/variable-format";

@Pipe({
  name: 'getRegex'
})
export class GetRegexPipe implements PipeTransform {

  transform(format: VariableFormat): RegExp {
    switch (format) {
      case VariableFormat.EMAIL:
        // RFC 5322 https://tools.ietf.org/html/rfc5322
        return new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
      case VariableFormat.PHONE:
        return new RegExp('^\\+?[1-9]\\d{4,14}$');
      case VariableFormat.BSN:
        return new RegExp('^\\d{9}$');
      case VariableFormat.IBAN:
        return new RegExp('^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$');
      case VariableFormat.NUMBER:
        return new RegExp('^-?\\d+$');
      case VariableFormat.FLOAT:
        return new RegExp('^-?\\d+(\\.\\d+)?$');
      case VariableFormat.POSITIVE_NUMBER:
      case VariableFormat.POSITIVE_FLOAT:
        return new RegExp('^\\d+(\\.\\d+)?$');
      case VariableFormat.NEGATIVE_NUMBER:
      case VariableFormat.NEGATIVE_FLOAT:
        return new RegExp('-\\d+(\\.\\d+)?$');
      default:
        return null;
    }
  }

}
