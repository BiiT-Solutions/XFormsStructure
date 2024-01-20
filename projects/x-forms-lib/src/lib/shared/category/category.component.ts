import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../models/category";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";
import {Group} from "../../models/group";
import {FormElementComponent} from "../form-element/form-element.component";

@Component({
  selector: 'biit-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() category: Category;
  @Output() completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private completionSentinel: boolean = false;

  // When received a form event we need to check the complete form to check the complete category status
  protected onFormChanged(): void {
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
      for(let child
        of item.children) {
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
