import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../models/category";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";
import {Group} from "../../models/group";
import {FormElementComponent} from "../form-element/form-element.component";
import {Condition} from "../../models/condition";
import {Directional} from "../../models/directional";
import {Flow} from "../../models/flow";
import {Answer} from "../../models/answer";
import {Token} from "../../models/token";
import {TokenParser} from "../../utils/token-parser";
import {TokenComparationAnswer} from "../../models/token-comparation-answer";
import {TokenType} from "../../models/token-type";
import {TokenIn} from "../../models/token-in";
import {TokenComparationValue} from "../../models/token-comparation-value";
import {TokenBetween} from "../../models/token-between";
import {FlowType} from "../../models/flow-type";
import {Form} from "../../models/form";
import {Structure} from "../../utils/structure";

@Component({
  selector: 'biit-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input('category') set _category(category: Category) {
    this.category = category;
    if (this.category && this.category.children) {
      this.enableElements(this.category.children);
    }
  }
  @Input() form: Form;
  @Output() completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changed: EventEmitter<void> = new EventEmitter<void>();
  private completionSentinel: boolean = false;
  protected category: Category;

  private enableElements(items: FormItem[]): void {
    if (!this.isNestedChildrenDisplayed(items)) {
      this.displayNodeDown(items[0], true)
    }
    this.expandDisplayedChildren(items, false);
  }


  /**
   * Looks into all nodes from child to parent.
   * If child has a node displayed it displays his siblings
   * If found a flow it hides the siblings until found another sibling displayed,
   * @param items Children
   * @param display Boolean to tell is displayed or not
   * @private Returns if found a flow or if displayed
   */
  private expandDisplayedChildren(items: FormItem[], display: boolean): boolean {
    let currentDisplay = display;
    for (let item of items) {
      if (!(item instanceof Question) && item.children && item.children.length) {
        currentDisplay = this.expandDisplayedChildren(item.children, currentDisplay);
        item.display = item.children.some(child => child.display);
      } else {
        if (!item.display){
          item.display = currentDisplay;
        } else {
          currentDisplay = item.display;
        }
        if (item.display) {
          if (item instanceof Directional) {
            if (item.flows && item.flows.length) {
              currentDisplay = false;
            }
          }
        }
      }
    }
    return currentDisplay;
  }

  private displayNodeDown(item: FormItem, firstChild: boolean = false): void {
    item.display = true;
    if (item.children && item.children.length) {
      if (firstChild) {
        this.displayNodeDown(item.children[0]);
      } else {
        item.children.forEach(child => this.displayNodeDown(child));
      }
    }
  }

  /**
   * Checks if a nested child is displayed
   * @param items children nodes
   * @private true if a nested child is displayed or false otherwise
   */
  private isNestedChildrenDisplayed(items: FormItem[]): boolean {
    return items.some(child => {
      if (child.display) {
        return true;
      }
      if (child.children) {
        return this.isNestedChildrenDisplayed(child.children);
      }
      return false;
    })
  }

  // When received a form event we need to check the complete form to check the complete category status
  protected onFormChanged(question?: Question<any>): void {
    this.validateFlows(question);
    this.enableElements(this.category.children);
    if (CategoryComponent.isCompleted(this.category)) {
      this.completed.emit(true);
      this.completionSentinel = true;
    } else {
      if (this.completionSentinel) {
        this.completed.emit(false);
        this.completionSentinel = false;
      }
    }
    this.changed.emit();
  }

  private validateFlows(directional: Directional): void {
    if (!directional) {
      return;
    }
    const flows: Flow[] = directional.flows;
    if (flows && flows.length) {
      if (directional instanceof Question) {
        if (!directional.valid) {
          return;
        }
      }
      let defaultFlow: Flow;
      let pathFound: boolean = false;
      for (const flow of flows) {
        if (flow.others) {
          defaultFlow = flow;
        } else {
          if (this.validateConditions(flow.condition)){
            if (flow.destiny) {
              pathFound = true;
              flow.destiny.display = true;
              flow.destiny.disabled = false;
              if (flow.destiny instanceof Directional) {
                this.validateFlows(flow.destiny);
              }
            }
          } else {
            if (flow.destiny) {
              flow.destiny.display = false;
              flow.destiny.disabled = true;
              this.disableDeep(flow.destiny)
            }
          }
        }
      }
      if (defaultFlow && defaultFlow.flowType !== FlowType.END_FORM) {
        if (pathFound) {
          defaultFlow.destiny.display = false;
          defaultFlow.destiny.disabled = true;
        } else {
          defaultFlow.destiny.display = true;
          defaultFlow.destiny.disabled = false;
          if (defaultFlow.destiny instanceof Directional) {
            if (defaultFlow.destiny instanceof Question) {
              if (defaultFlow.destiny.valid) {
                this.validateFlows(defaultFlow.destiny);
              }
            }
          }
        }
      }
    } else {
      // Disabled to fix first issue
      if (directional instanceof Question) {
        if (directional.valid) {
          const nextNode: Directional = this.getNextNode(directional);
          if (nextNode) {
            nextNode.display = true;
            nextNode.disabled = false;
            this.validateFlows(nextNode);
          }
        }
      }
    }
  }

  private disableDeep(item: FormItem) {
    if (!item ) {
      return;
    }
    if (item instanceof Directional) {
      if (!item.flows || !item.flows.length) {
        this.disableNextNode(item);
        return;
      }
      let activatedFlow: Flow = item.flows.find(flow => flow.destiny && flow.destiny.display == true);
      if (!activatedFlow) {
        activatedFlow = item.flows.find(flow => flow.others);
      }
      if (activatedFlow) {
        if (activatedFlow.destiny) {
          activatedFlow.destiny.disabled = true;
          activatedFlow.destiny.display = false;
          this.disableDeep(activatedFlow.destiny)
        }
      }
    }
  }

  private disableNextNode(item: Directional): void {
    const directionals: Directional[] = Structure.getDirectionals(this.form);
    const directional: Directional =this.getNextNode(item, directionals);
    if (directional) {
      directional.disabled = true;
      directional.display = false;
      this.disableDeep(directional);
    }
  }

  private getNextNode(item: Directional, directionals: Directional[] = Structure.getDirectionals(this.form)): Directional {
    if (!item) {
      return null;
    }
    if (item.flows && item.flows.length) {
      const defeaultFlow: Flow = item.flows.find(flow => flow.others);
      for (let flow of item.flows){
        if (!flow.others) {
          if (this.validateConditions(flow.condition)) {
            return flow.destiny as Directional;
          }
        }
        if (defeaultFlow){
          return defeaultFlow.destiny as Directional;
        }
      }
    }
    let found: boolean = false;
    for (let directional of directionals) {
      if (found) {
        return directional;
      }
      if (item === directional) {
        found = true;
      }
    }
    return null;
  }

  private validateConditions(conditions: Condition[]): boolean {
    const statementParts: string[] = [];
    conditions.forEach(condition => {
      if (condition instanceof Token) {
        statementParts.push(TokenParser.parse(condition));
      } else {
        statementParts.push(this.validateCondition(condition) ? 'true' : 'false');
      }
    });
    const statement: string = statementParts.join(' ');
    console.log ('Evaluating:', statement, 'Result:', eval(statement));
    return eval(statement);
  }

  private validateCondition(condition: Condition): boolean {
    if (condition instanceof TokenComparationValue) {
      if (condition.type === TokenType.EMPTY) {
        return condition.value && condition.value.length === 0;
      }
      if (!condition.linkedQuestion || !condition.linkedQuestion.response || !condition.linkedQuestion.response.length) {
        return false;
      }
      const result: boolean = eval(`'${condition.linkedQuestion.response}' ${TokenParser.parse(condition)} '${condition.value}'`);
      console.log('Evaluating:', `${condition.linkedQuestion?.response} ${TokenParser.parse(condition)} ${condition.value}`, result);
      return result;
    }

    if (condition instanceof TokenComparationAnswer) {
      if (condition.type == TokenType.EQ) {
        return condition.linkedAnswer?.selected;
      }
      if (condition.type == TokenType.NE) {
        return !(condition.linkedAnswer?.selected);
      }
    }

    if (condition instanceof TokenIn) {
      return condition.values.some(value => value.linkedAnswer?.selected);
    }
    if (condition instanceof TokenBetween) {
      if (!condition.linkedQuestion || !condition.linkedQuestion.response || !condition.linkedQuestion.response.length) {
        return false;
      }
      return eval(`${condition.valueStart} < ${condition.linkedQuestion.response} && ${condition.linkedQuestion.response} < ${condition.valueEnd}`);
    }
    return true;
  }

  public static isCompleted(item: FormItem): boolean {
    if (item instanceof Question) {
      if (item.mandatory && !item.valid) {
        return false;
      }
      if (item.mandatory && !item.response) {
        return false;
      }
    }
    if (item.children) {
      const displayedChildren: FormItem[] = item.children.filter(child => child.display);
      for(let child
        of displayedChildren) {
        if (!CategoryComponent.isCompleted(child)) {
          return false;
        }
      }
    }
    return true;
  }

  private clearResponse(formItem: FormItem): void {
    if (formItem.children) {
      formItem.children.forEach(child => this.clearResponse(child));
    }
    if (formItem instanceof Question) {
      formItem.response = null;
      formItem.valid = false;
    }
    if (formItem instanceof Answer) {
      formItem.selected = false;
    }
  }

  protected onDuplicated(group: Group, children: FormItem[]): void {
    this.clearResponse(group);
    this.displayNodeDown(group);
    FormElementComponent.insertDuplicated(group, children);
    this.onFormChanged();
  }
  protected onRemoved(group: Group, children: FormItem[]): void {
    FormElementComponent.removeDuplicated(group, children);
  }
}
