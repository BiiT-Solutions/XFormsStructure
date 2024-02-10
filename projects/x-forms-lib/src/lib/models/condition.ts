import {Item} from "./item";
import {TokenType} from "./token-type";

export class Condition extends Item {
  public type: TokenType;

  public static override clone(from: Condition): Condition {
    const to: Condition = new Condition();
    Condition.copy(from, to);
    return to;
  }

  public static override copy(from: Condition, to: Condition): void {
    super.copy(from, to);
    to.type = from.type;
  }
}
