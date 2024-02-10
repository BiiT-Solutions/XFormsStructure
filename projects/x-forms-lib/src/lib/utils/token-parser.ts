import {Token} from "../models/token";
import {TokenType} from "../models/token-type";

export class TokenParser {
  public static parse(token: Token):"&&"|"||"|"("|")"|"!"|""|"=="|"!="|">"|"<"|">="|"<=" {
    switch (token.type) {
      case TokenType.AND:
        return '&&';
      case TokenType.OR:
        return '||';
      case TokenType.NOT:
        return '!';
      case TokenType.LEFT_PAR:
        return '(';
      case TokenType.RIGHT_PAR:
        return ')';
      case TokenType.EQ:
        return '==';
      case TokenType.NE:
        return '!=';
      case TokenType.GT:
        return '>';
      case TokenType.LT:
        return '<';
      case TokenType.GE:
        return '>=';
      case TokenType.LE:
        return '<=';
      case TokenType.WHITES:
      case TokenType.EMPTY:
      case TokenType.IN:
      case TokenType.BETWEEN:
      default:
          return '';
    }
  }
}
