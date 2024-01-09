import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../models/category";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";

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
    if (this.isCompleted(this.category)) {
      this.completed.emit(true);
      this.completionSentinel = true;
    } else {
      if (this.completionSentinel) {
        this.completed.emit(false);
        this.completionSentinel = false;
      }
    }
  }

  private isCompleted(item: FormItem): boolean {
    if (item instanceof Question) {
      if (!item.valid) {
        return false;
      }
      if (item.mandatory && !item.response) {
        return false;
      }
    }
    if (item.children) {
      for(let child of item.children) {
        if (!this.isCompleted(child)) {
          return false;
        }
      }
    }
    return true;
  }
}
