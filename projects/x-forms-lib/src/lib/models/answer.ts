import {FormItem} from "./form-item";
import {Image} from "./image";

export class Answer extends FormItem {
  selected: boolean = false;
  description: string;
  answerDescriptionAlwaysVisible: boolean;
  image: Image;

  public static override copy(from: Answer, to: Answer): void {
    super.copy(from, to);
    to.selected = from.selected;
    to.description = from.description;
    to.answerDescriptionAlwaysVisible = from.answerDescriptionAlwaysVisible;
    to.image = from.image ? Image.clone(from.image) : null;
  }
  public static override clone(from: Answer): Answer {
    const to: Answer = new Answer();
    Answer.copy(from, to);
    return to;
  }
}
