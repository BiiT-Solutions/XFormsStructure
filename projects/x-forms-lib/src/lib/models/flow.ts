import {Item} from "./item";
import {FlowType} from "./flow-type";
import {Condition} from "./condition";
import {Question} from "./question";

export class Flow extends Item {
  public  originId: string[];
  public origin: Question<any>;
  public flowType: FlowType;
  public destinyId: string[];
  public destiny: Question<any>;
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
    to.condition = from.condition ? from.condition.map(Condition.clone) : [];
  }
}
