import {Question} from "./question";
import {VariableFormat} from "./variable-format";
import {Condition} from "./condition";

export class TokenComparationValue extends Condition {
  question_id: string[];
  linkedQuestion: Question<any>;
  subformat: VariableFormat;
  value: string;

  public static override copy(from: TokenComparationValue, to: TokenComparationValue): void {
    super.copy(from, to);
    to.question_id = from.question_id;
    to.linkedQuestion = from.linkedQuestion;
    to.subformat = from.subformat;
    to.value = from.value;
  }

  public static override clone(from: TokenComparationValue): TokenComparationValue {
    const to: TokenComparationValue = new TokenComparationValue();
    TokenComparationValue.copy(from, to);
    return to;
  }
}
