import {AnswerType} from "./answer-type";
import {VariableType} from "./variable-type";
import {VariableFormat} from "./variable-format";
import {Directional} from "./directional";
import {FormItem} from "./form-item";
import {Answer} from "./answer";

export class Question<T> extends Directional {
  answerType: AnswerType;
  answerFormat: VariableType;
  answerSubformat: VariableFormat;
  mandatory: boolean;
  horizontal: boolean;
  description: string;
  // Question answer
  response: T;
  // Check if question has a valid answer
  valid: boolean = false;


  public static override copy<T>(from: Question<T>, to: Question<T>): void {
    super.copy(from, to);
    to.answerType = from.answerType;
    to.answerFormat = from.answerFormat;
    to.answerSubformat = from.answerSubformat;
    to.mandatory = from.mandatory;
    to.horizontal = from.horizontal;
    to.description = from.description;
    to.response = from.response;
    Question.setDefaultValues(from, to);
  }
  public static override clone<T>(from: Question<T>): Question<T> {
    const to: Question<T> = new Question<T>();
    Question.copy(from, to);
    return to;
  }

  // This method is a workaround to merge all the default values
  private static setDefaultValues<T>(from: any, to: Question<T>): void {
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
      to.response = answer as T;
    }
    if (from['defaultValueTime']) {
      to.response = new Date(from['defaultValueTime']) as T;
      to.valid = true;
    }
  }
}
