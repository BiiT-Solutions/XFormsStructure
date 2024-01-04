import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceof'
})
export class InstanceofPipe implements PipeTransform {

  transform(value: any, clazz: any): boolean {
    return value instanceof clazz;
  }

}
