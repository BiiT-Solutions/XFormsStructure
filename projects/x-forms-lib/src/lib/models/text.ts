import {Directional} from "./directional";

export class Text extends Directional {

  description: string;
  descriptionTranslations: {[key: string]: string};

  public static override copy(from: Text, to: Text): void {
    super.copy(from, to);
    to.description = from.description;
    to.descriptionTranslations = {};
    if (from.descriptionTranslations) {
      Object.keys(from.descriptionTranslations).forEach((key: string) => {
        to.descriptionTranslations[key] = from.descriptionTranslations[key];
      });
    }
  }
  public static override clone(from: Text): Text {
    const to: Text = new Text();
    Text.copy(from, to);
    return to;
  }
}
