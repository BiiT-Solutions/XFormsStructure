import {Condition} from "./condition";

export class TokenBetween extends Condition {
  question_id: string[];
  linkedQuestion: any;
  valueStart: string;
  valueEnd: string;

  public static override copy(from: TokenBetween, to: TokenBetween): void {
    super.copy(from, to);
    to.question_id = from.question_id;
    to.linkedQuestion = from.linkedQuestion;
    to.valueStart = from.valueStart;
    to.valueEnd = from.valueEnd;
  }
  public static override clone(from: TokenBetween): TokenBetween {
    const to: TokenBetween = new TokenBetween();
    TokenBetween.copy(from, to);
    return to;
  }
}
