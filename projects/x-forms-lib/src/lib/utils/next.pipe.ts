import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'next'
})
export class NextPipe implements PipeTransform {

  transform<T>(object: T[], field: string, value: any): T {
    const visibleObjects: T[] = object.filter(item => !item['hidden']);
    const index: number = visibleObjects.findIndex(item => item[field] === value);
    if (index > -1 && index < visibleObjects.length - 1) {
      const place: number = index + 1;
      for (let i: number = place; i < visibleObjects.length; i++) {
        if (visibleObjects[i]['display']) {
          return visibleObjects[i];
        }
      }
    }
    return null;
  }

}
