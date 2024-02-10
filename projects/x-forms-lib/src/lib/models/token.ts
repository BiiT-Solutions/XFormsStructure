import {Condition} from "./condition";

export class Token extends Condition {


  public static override copy(from: Token, to: Token): void {
    super.copy(from, to);
  }
  public static override clone(from: Token): Token {
    const to: Token = new Token();
    Token.copy(from, to);
    return to;
  }
}
