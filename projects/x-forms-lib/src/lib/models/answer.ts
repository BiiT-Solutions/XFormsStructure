import {FormItem} from "./form-item";

export class Answer extends FormItem {
  selected: boolean = false;
  description: string;
  public static override copy(from: Answer, to: Answer): void {
    super.copy(from, to);
    to.selected = from.selected;
    to.description = from.description;
  }
  public static override clone(from: Answer): Answer {
    const to: Answer = new Answer();
    Answer.copy(from, to);
    return to;
  }
}
