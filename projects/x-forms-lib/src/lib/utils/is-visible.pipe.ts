import { Pipe, PipeTransform } from '@angular/core';
import {FormItem} from "../models/form-item";
import {Flow} from "../models/flow";

@Pipe({
  name: 'isVisible'
})
export class IsVisiblePipe implements PipeTransform {

  transform(visible: FormItem,  targetId: number): boolean {
    return this.isVisible(visible, targetId);
  }

  private isVisible(parent: FormItem,  targetId: number): boolean {
    // There is no parent, then it is visible (First node)
    if (!parent) {
      return true;
    }
    // If parent can not be reached, then its children can not be reached either
    if (!parent.disabled) {
      return false;
    }
    if (this.allFlowsReachNode(parent, targetId)) {
      return true;
    }
    return false;
  }

  private allFlowsReachNode(parent: FormItem, targetId: number): boolean {
      const flows: Flow[] = [];
      this.extractFlows(parent, flows);
      return !flows.some(flow => !flow.destinyId.includes(targetId.toString()));
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

  private extractFlows(parent: FormItem, flows: Flow[]): void {
    if (parent['flows']) {
      parent['flows'].forEach(flow => flows.push(flow as Flow));
    }
    if (parent.children) {
      for(let child of parent.children) {
        this.extractFlows(child, flows);
      }
    }
  }
}
