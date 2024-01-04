import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'next'
})
export class NextPipe implements PipeTransform {

  transform<T>(value: T[], id: string): T {
    const index: number = value.findIndex(item => item[id] === id);
    if (index > -1 && index < value.length - 1) {
      return value[index + 1];
    }
    return null;
  }

}
