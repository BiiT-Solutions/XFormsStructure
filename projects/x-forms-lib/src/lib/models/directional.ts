import {Flow} from "./flow";
import {FormItem} from "./form-item";

export class Directional extends FormItem {
  flows: Flow[];

  public static override copy<T>(from: Directional, to: Directional): void {
    super.copy(from, to);
  }

  public static override clone<T>(from: Directional): Directional {
    const to: Directional = new Directional();
    Directional.copy(from, to);
    return to;
  }
}
