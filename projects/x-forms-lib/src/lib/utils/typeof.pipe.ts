import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: any): any {
    debugger;
    return typeof value;
  }

}
