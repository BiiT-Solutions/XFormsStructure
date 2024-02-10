import {Condition} from "./condition";
import {Question} from "./question";
import {TokenInValue} from "./token-in-value";

export class TokenIn extends Condition {
  question_id: string[];
  linkedQuestion: Question<any>;
  values: TokenInValue[];

  public static override copy(from: TokenIn, to: TokenIn): void {
    super.copy(from, to);
    to.question_id = from.question_id;
    to.linkedQuestion = from.linkedQuestion;
    to.values = from.values;
  }
  public static override clone(from: TokenIn): TokenIn {
    const to: TokenIn = new TokenIn();
    TokenIn.copy(from, to);
    return to;
  }
}
