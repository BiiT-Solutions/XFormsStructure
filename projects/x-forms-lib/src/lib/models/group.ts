import {FormItem} from "./form-item";
import {Form} from "./form";

export class Group extends FormItem {
  repeatable: boolean;
  isTable: boolean;
  numberOfColumns: number;

  public static override copy(from: Group, to: Group): void {
    super.copy(from, to);
    to.repeatable = from.repeatable;
    to.isTable = from.isTable;
    to.numberOfColumns = from.numberOfColumns;
  }
  public static override clone(from: Group): Group {
    const to: Group = new Group();
    Group.copy(from, to);
    return to;
  }
}
