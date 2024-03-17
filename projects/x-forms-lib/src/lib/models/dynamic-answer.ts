import {Answer} from "./answer";

export class DynamicAnswer extends Answer{
  reference: string[]
  referencePath: string;

  public static override copy(from: DynamicAnswer, to: DynamicAnswer): void {
    super.copy(from, to);
    to.reference = from.reference;
    to.referencePath = to.reference && to.reference.length ? to.reference.join('/') : '';
  }
  public static override clone(from: DynamicAnswer): DynamicAnswer {
    const to: DynamicAnswer = new DynamicAnswer();
    DynamicAnswer.copy(from, to);
    return to;
  }

}
