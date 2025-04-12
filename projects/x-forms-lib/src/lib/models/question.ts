import {AnswerType} from "./answer-type";
import {VariableType} from "./variable-type";
import {VariableFormat} from "./variable-format";
import {Directional} from "./directional";
import {FormItem} from "./form-item";
import {Answer} from "./answer";
import {Image} from "./image";

export class Question<T> extends Directional {
  answerType: AnswerType;
  answerFormat: VariableType;
  answerSubformat: VariableFormat;
  mandatory: boolean;
  horizontal: boolean;
  inverseAnswerOrder: boolean;
  description: string;
  descriptionTranslations: {[key: string]: string};
  descriptionAlwaysVisible: boolean;
  answerDescriptionAlwaysVisible: boolean;
  image: Image;
  // Question answer
  response: T;
  // Check if question has a valid answer
  valid: boolean = false;
  editionDisabled: boolean = false;
  maxAnswersSelected: number = -1;
  answersValuesOnTooltip: boolean = true;


  public static override copy<T>(from: Question<T>, to: Question<T>): void {
    super.copy(from, to);
    to.answerType = from.answerType;
    to.answerFormat = from.answerFormat;
    to.answerSubformat = from.answerSubformat;
    to.mandatory = from.mandatory;
    to.horizontal = from.horizontal;
    to.description = from.description;
    to.response = from.response;
    to.inverseAnswerOrder = from.inverseAnswerOrder;
    to.descriptionAlwaysVisible = from.descriptionAlwaysVisible;
    to.answerDescriptionAlwaysVisible = from.answerDescriptionAlwaysVisible;
    to.image = from.image ? Image.clone(from.image) : null;
    to.editionDisabled = from.editionDisabled;
    to.maxAnswersSelected = from.maxAnswersSelected;
    to.answersValuesOnTooltip = from.answersValuesOnTooltip;
    to.descriptionTranslations = {};
    if (from.descriptionTranslations) {
      Object.keys(from.descriptionTranslations).forEach((key: string) => {
        to.descriptionTranslations[key] = from.descriptionTranslations[key];
      });
    }
    Question.setDefaultValues(from, to);
  }

  public static override clone<T>(from: Question<T>): Question<T> {
    const to: Question<T> = new Question<T>();
    Question.copy(from, to);
    return to;
  }

  // This method is a workaround to merge all the default values
  private static setDefaultValues(from: any, to: Question<any>): void {
    if (from['defaultValueString']) {
      to.response = from['defaultValueString'];
      to.valid = true;
    }
    if (from['defaultValueAnswer']) {
      const answer: FormItem = to.children.find(child => child.name === from['defaultValueAnswer']);
      if (answer && answer instanceof Answer) {
        answer.selected = true;
        to.valid = true;
      }
      to.response = to.answerType === AnswerType.SINGLE_SELECTION_SLIDER ? answer.name : answer;
    }
    if (from['defaultValueTime']) {
      to.response = new Date(from['defaultValueTime']);
      to.valid = true;
    }
  }
}
