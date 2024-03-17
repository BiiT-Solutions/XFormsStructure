import { Pipe, PipeTransform } from '@angular/core';
import {DataStoreService} from "./data-store.service";
import {Answer} from "../models/answer";
import {DynamicAnswer} from "../models/dynamic-answer";

@Pipe({
  name: 'varFormat'
})
export class VarFormatPipe implements PipeTransform {

  transform(value: string, dataStoreService: DataStoreService, reactivityID: string, defaultValue: string = ''): string {
    if (!value) {
      return value;
    }
    const variableRegex = new RegExp(/(?<=\${)(.*?)(?=})/gm);
    const matches: RegExpMatchArray = value.match(variableRegex);
    if (!matches) {
      return value;
    }
    matches.forEach(variable => {
      const variableValue = dataStoreService.getValue(variable);
      if (variableValue instanceof Answer) {
        if (variableValue instanceof DynamicAnswer) {
          value = value.replace(`$\{${variable}\}`, this.transform('${' + variableValue.referencePath + '}', dataStoreService, dataStoreService.fingerPrint, variableValue.label));
        } else {
          value = value.replace(`$\{${variable}\}`, variableValue.label);
        }
      } else {
        value = value.replace(`$\{${variable}\}`, variableValue ? variableValue : '');
      }
    })
    return value && value.length ? value : this.transform(defaultValue, dataStoreService, reactivityID);
  }

}
