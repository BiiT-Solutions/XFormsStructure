import { Pipe, PipeTransform } from '@angular/core';
import {DataStoreService} from "./data-store.service";

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
      value = value.replace(`$\{${variable}\}`, variableValue ? variableValue : '');
    })
    return value && value.length ? value : this.transform(defaultValue, dataStoreService, reactivityID);
  }

}
