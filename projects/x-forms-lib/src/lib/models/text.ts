import {Directional} from "./directional";

export class Text extends Directional {

  description: string;

  public static override copy(from: Text, to: Text): void {
    super.copy(from, to);
    to.description = from.description;
  }
  public static override clone(from: Text): Text {
    const to: Text = new Text();
    Text.copy(from, to);
    return to;
  }
}
