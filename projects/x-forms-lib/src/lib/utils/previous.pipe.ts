import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'previous'
})
export class PreviousPipe implements PipeTransform {

  transform<T>(object: T[], field: string, value: any): T {
    const visibleObjects = object.filter(item => !item['hidden']);
    const index: number = visibleObjects.findIndex(item => item[field] === value);
    if (index > 0) {
      const place: number = index - 1;
      for (let i: number = place; i >= 0; i--) {
        if (visibleObjects[i]['display']) {
          return visibleObjects[i];
        }
      }
    }
    return null;
  }
}
