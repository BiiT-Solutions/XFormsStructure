import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isVisible'
})
export class IsVisiblePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
