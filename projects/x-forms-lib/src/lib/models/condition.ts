import {Item} from "./item";
import {VariableFormat} from "./variable-format";
import {TokenType} from "./token-type";

export class Condition extends Item {
  public type: TokenType;
  public question_id: string[];
  public subformat: VariableFormat;
  public valueStart: string;
  public valueEnd: string;

  public static override clone(from: Condition): Condition {
    const to: Condition = new Condition();
    Condition.copy(from, to);
    return to;
  }

  public static override copy(from: Condition, to: Condition): void {
    super.copy(from, to);
    to.type = from.type;
    to.question_id = from.question_id;
    to.subformat = from.subformat;
    to.valueStart = from.valueStart;
    to.valueEnd = from.valueEnd;
  }
}
