import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../models/category";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";
import {Group} from "../../models/group";
import {FormElementComponent} from "../form-element/form-element.component";
import {Condition} from "../../models/condition";

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


  //TODO(jnavalon): This method looks complex, probably I can implement a workaround to display the proper nodes depending the flow.
  private enableElements(items: FormItem[]): boolean {
    if (items.length === 0) {
      return true;
    }
    for (let item of items) {
      if (!this.enableElement(item)) {
        return false;
      }
    }
    return true;
  }

  private enableElement(item: FormItem): boolean {
    if (!item) {
      return true;
    }
    if (item.children) {
      if(!this.enableElements(item.children)) {
        if (this.hasChildDisplayed(item)) {
          item.display = true;
        }
        return false;
      }
    }
    if (item instanceof Question) {
      if (item.flows){
        item.display = true;
        // We need to stop the process if there is a flow, because it could be a node jump.
        this.checkFlow(item);
        // TODO(jnavalon): this should be false to stop the process. Let on true to show the complete form.
        return true;
      }
    }
    item.display = true;
    return true;
  }

  private hasChildDisplayed(item: FormItem)  {
    if (item.children) {
      for(let child of item.children) {
        if (child.display) {
          return true;
        }
      }
    }
    return false;
  }

  private checkFlow(item: Question<any>): void {
    const validation: boolean = true;
    //If return false, process will stop to set display to true
    if (item.flows) {
      for (let flow of item.flows) {
        if(flow.condition && flow.destiny) {
          const conditions: Condition[] = flow.condition;
          flow.destiny.display = conditions.some(condition => this.checkCondition(condition, item));
          if (flow.destiny.display) {
            console.log(flow.destiny);
          }
        }
      }
    }
  }

  private checkCondition(condition: Condition, item: Question<any>): boolean {
    if (condition.linkedAnswer) {
      return !!condition.linkedAnswer.selected;
    }
    return false;
  }

  // When received a form event we need to check the complete form to check the complete category status
  protected onFormChanged(): void {
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

  protected onDuplicated(group: Group, children: FormItem[]): void {
    FormElementComponent.insertDuplicated(group, children);
  }
  protected onRemoved(group: Group, children: FormItem[]): void {
    FormElementComponent.removeDuplicated(group, children);
  }
}
