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
  @Output() completed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  }

  // TODO(jnavalon): implement validate Flows and set display and disabled. Currently all flows are running to check flow functionality
  private validateFlows(question: Question<any>): void {
    if (!question) {
      return;
    }
    const flows: Flow[] = question.flows;
    if (flows && flows.length) {
      for (const flow of flows) {
        if (this.validateConditions(flow.condition)){
          if (flow.destiny) {
            flow.destiny.display = true;
            flow.destiny.disabled = false;
          }
        } else {
          flow.destiny.display = false;
          flow.destiny.disabled = true;
          // TODO(jnavalon): set display and disabled in cascade
        }
      }
    }
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
      return eval(`${condition.linkedQuestion?.response} ${TokenParser.parse(condition)} ${condition.value}`);
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
      return eval(`${condition.valueStart} < ${condition.linkedQuestion?.response} && ${condition.linkedQuestion?.response} < ${condition.valueEnd}`);
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
