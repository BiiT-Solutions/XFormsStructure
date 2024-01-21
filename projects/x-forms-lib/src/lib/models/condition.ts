import {Item} from "./item";
import {VariableFormat} from "./variable-format";
import {TokenType} from "./token-type";
import {ConditionValue} from "./condition-value";
import {Answer} from "./answer";

export class Condition extends Item {
  public type: TokenType;
  public question_id: string[];
  public answer_id: string[];
  public linkedAnswer: Answer;
  public subformat: VariableFormat;
  public valueStart: string;
  public valueEnd: string;
  public values: ConditionValue[];
  public linkedValues: Answer[];

  public static override clone(from: Condition): Condition {
    const to: Condition = new Condition();
    Condition.copy(from, to);
    return to;
  }

  public static override copy(from: Condition, to: Condition): void {
    super.copy(from, to);
    to.type = from.type;
    to.question_id = from.question_id;
    to.answer_id = from.answer_id;
    to.subformat = from.subformat;
    to.valueStart = from.valueStart;
    to.valueEnd = from.valueEnd;
    to.values = from.values ? from.values.map(ConditionValue.clone) : null;
    to.linkedAnswer = from.linkedAnswer;
    to.linkedValues = from.linkedValues;
  }
}
