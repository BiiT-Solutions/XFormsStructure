import {FormItem} from "./form-item";
import {Form} from "./form";
import {Question} from "./question";

export class Group extends FormItem {
  repeatable: boolean;
  isTable: boolean;
  numberOfColumns: number;
  duplicated: boolean = false;
  totalAnswersValue: number;
  _accValue: number;

  public static override copy(from: Group, to: Group): void {
    super.copy(from, to);
    to.repeatable = from.repeatable;
    to.isTable = from.isTable;
    to.numberOfColumns = from.numberOfColumns;
    to.totalAnswersValue = from.totalAnswersValue;
    to._accValue = from._accValue;
  }
  public static override clone(from: Group): Group {
    const to: Group = new Group();
    Group.copy(from, to);
    return to;
  }

  public static calcAccValue(group: Group): number {
    return group.children.filter(c => c instanceof Question).map(c => c as Question<any>)
      .filter(q => q.display)
      .map(q=> +q.response).filter(n => !isNaN(n)).reduce((acc, value) => acc + value, 0);
  }
}
