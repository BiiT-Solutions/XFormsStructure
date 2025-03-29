import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: number, total: number): number {
    return total === 0 ? 0 : Math.round(value / total * 100);
  }

}
