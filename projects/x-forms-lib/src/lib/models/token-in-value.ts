import {Item} from "./item";
import {Answer} from "./answer";

export class TokenInValue extends Item {
  answer_id: string[];
  linkedAnswer: Answer;

  public static override copy(from: TokenInValue, to: TokenInValue): void {
    super.copy(from, to);
    to.answer_id = from.answer_id;
    to.linkedAnswer = from.linkedAnswer;
  }
  public static override clone(from: TokenInValue): TokenInValue {
    const to: TokenInValue = new TokenInValue();
    TokenInValue.copy(from, to);
    return to;
  }
}
