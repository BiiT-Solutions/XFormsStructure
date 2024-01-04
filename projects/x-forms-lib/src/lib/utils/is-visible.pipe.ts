import { Pipe, PipeTransform } from '@angular/core';
import {FormItem} from "../models/form-item";
import {Flow} from "../models/flow";

@Pipe({
  name: 'isVisible'
})
export class IsVisiblePipe implements PipeTransform {

  transform(visible: FormItem,  targetId: number, parent?: FormItem): boolean {
    return this.isVisible(visible, targetId, parent);
  }

  private isVisible(visible: FormItem,  targetId: number, parent?: FormItem): boolean {
    if (!visible) {
      return true;
    }
    if (visible.path.includes(targetId)) {
      return true;
    }
    if (visible['flows']) {
      const flows: Flow[] = visible['flows'];
      for(let flow of flows) {
        if (this.isVisible(flow.destiny, targetId)) {
          return true;
        }
      }
    }
    if (visible.children) {
      for(let child of visible.children) {
        if (this.isVisible(child, targetId)) {
          return true;
        }
      }
    }
    return parent ? !this.parentHasFlows(parent) : false;
  }

  private parentHasFlows(parent: FormItem): boolean {
    if (parent['flows']) {
      return true;
    }
    if (parent.children) {
      for(let child of parent.children) {
        if (this.parentHasFlows(child)) {
          return true;
        }
      }
    }
    return false;
  }

}
