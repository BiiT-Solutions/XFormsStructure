import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'next'
})
export class NextPipe implements PipeTransform {

  transform<T>(object: T[], field: string, value: any): T {
    let found = false;
    for (let i = 0; i < object.length; i++) {
      if (object[i][field] === value) {
        found = true;
      } else if (found && !object[i]['hidden'] && object[i]['display']) {
        return object[i];
      }
    }
    return null;
  }

}
