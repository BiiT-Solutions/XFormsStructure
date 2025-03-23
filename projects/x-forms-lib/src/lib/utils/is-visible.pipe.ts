import {Pipe, PipeTransform} from '@angular/core';
import {FormItem} from "../models/form-item";
import {Flow} from "../models/flow";
import {FlowType} from "../models/flow-type";

@Pipe({
  name: 'isVisible'
})
export class IsVisiblePipe implements PipeTransform {

  transform(visible: FormItem,  targetId: string): boolean {
    return this.isVisible(visible, targetId);
  }

  private isVisible(parent: FormItem,  targetId: string): boolean {
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

  private allFlowsReachNode(parent: FormItem, targetId: string): boolean {
      const flows: Flow[] = [];
      this.extractFlows(parent, flows);
      // All flows reach node if all flows have as destination the target node or if they have as destination itself and there are no flows ending the form
      return !flows.some(flow => flow.flowType === FlowType.END_FORM || (!flow.destinyId.includes(targetId.toString()) && !flow.destinyId.includes(parent.pathName)));
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
      (parent['flows'] as Flow[]).forEach(flow => flows.push(flow));
    }
    if (parent.children) {
      for(let child of parent.children) {
        this.extractFlows(child, flows);
      }
    }
  }
}
