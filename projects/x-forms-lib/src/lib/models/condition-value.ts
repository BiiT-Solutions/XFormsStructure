import {Item} from "./item";

export class ConditionValue extends Item {
  answer_id: string[];

  public static override copy(from: ConditionValue, to: ConditionValue): void {
    super.copy(from, to);
    to.answer_id = from.answer_id;
  }
  public static override clone(from: ConditionValue): ConditionValue {
    const to: ConditionValue = new ConditionValue();
    ConditionValue.copy(from, to);
    return to;
  }
}
