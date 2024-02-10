import {Item} from "./item";
import {FlowType} from "./flow-type";
import {Condition} from "./condition";
import {Question} from "./question";
import {FormItem} from "./form-item";
import {Constants} from "../utils/constants";
import {Token} from "./token";
import {TokenComparationAnswer} from "./token-comparation-answer";
import {TokenComparationValue} from "./token-comparation-value";
import {TokenIn} from "./token-in";
import {TokenBetween} from "./token-between";

export class Flow extends Item {
  public originId: string[];
  public origin: FormItem;
  public flowType: FlowType;
  public destinyId: string[];
  public destiny: FormItem;
  public others: boolean;
  public condition: Condition[];

  public static override clone(from: Flow): Flow {
    const to: Flow = new Flow();
    Flow.copy(from, to);
    return to;
  }
  public static override copy(from: Flow, to: Flow): void {
    super.copy(from, to);
    to.originId = from.originId;
    to.flowType = from.flowType;
    to.destinyId = from.destinyId;
    to.others = from.others;
    to.condition = from.condition ? from.condition.map(c => Flow.cloneCondition(c)) : [];
  }

  private static cloneCondition(condition: Condition): Condition {
    const className: string = condition.class;
    if (className.endsWith(`.${Constants.ITEM_CLASSES.TOKEN}`)) {
      return Token.clone(condition as Token);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.TOKEN_COMPARATION_ANSWER}`)) {
      return TokenComparationAnswer.clone(condition as TokenComparationAnswer);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.TOKEN_COMPARATION_VALUE}`)) {
      return TokenComparationValue.clone(condition as TokenComparationValue);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.TOKEN_IN}`)) {
      return TokenIn.clone(condition as TokenIn);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.TOKEN_BETWEEN}`)) {
      return TokenBetween.clone(condition as TokenBetween);
    } else {
      return Condition.clone(condition);
    }
  }
}
