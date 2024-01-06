import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'previous'
})
export class PreviousPipe implements PipeTransform {

  transform<T>(object: T[], field: string, value: any): T {
    const index: number = object.findIndex(item => item[field] === value);
    if (index > 0) {
      const place: number = index - 1;
      for (let i: number = place; i >= 0; i--) {
        if (object[i]['display']) {
          return object[i];
        }
      }
    }
    return null;
  }
}
