import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormItem} from "../../models/form-item";
import {Group} from "../../models/group";
import {Question} from "../../models/question";
import {Text} from "../../models/text";

@Component({
  selector: 'biit-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent {

  @Input() element: FormItem;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() duplicated: EventEmitter<Group> = new EventEmitter();
  @Output() removed: EventEmitter<Group> = new EventEmitter();

  protected readonly Group = Group;
  protected readonly Question = Question;
  protected readonly Text = Text;
  protected duplicate(): void {
    if (!(this.element instanceof Group)) {
      return;
    }
    const group: Group = Group.clone(this.element);
    this.element.duplicated = true;
    this.duplicated.emit(group);
  }

  protected remove(): void {
    if (!(this.element instanceof Group)) {
      return;
    }
    this.removed.emit(this.element);
  }

  protected onDuplicated(group: Group, children: FormItem[]) {
    FormElementComponent.insertDuplicated(group, children);
  }

  protected onRemoved(group: Group, children: FormItem[]) {
    FormElementComponent.removeDuplicated(group, children);
  }

  public static insertDuplicated(group: Group, children: FormItem[]): void {
    // Group comes cloned and it is out of the form scope!
    const index: number = children.findIndex(child => child.id === group.id);
    if (index < 0) {
      console.error(`DUPLICATE: Group not found with id ${group.id} in form!`);
      return;
    }
    group.id = this.increaseSubId(group.id);
    children.splice(index + 1, 0, group);
  }

  public static removeDuplicated(group: Group, children: FormItem[]): void {
    const index: number = children.findIndex(child => child.id === group.id);
    if (index < 0) {
      console.error(`REMOVING: Group not found with id ${group.id} in form!`);
      return;
    }
    children.splice(index, 1);
  }

  private static increaseSubId(id: number): number {
    // Increase the id by 1 / 10^8. This is made due to limitations with JS number calculations
    const increasedId: number = id + 1 / Math.pow(10, 8);
    return Math.round(increasedId * Math.pow(10, 8)) / Math.pow(10, 8);
  }



}
