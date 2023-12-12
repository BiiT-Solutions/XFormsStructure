import {FormItem} from "./form-item";
import {AnswerType} from "./answer-type";
import {VariableType} from "./variable-type";
import {VariableFormat} from "./variable-format";
import {Flow} from "./flow";

export class Question<T> extends FormItem {
  answerType: AnswerType;
  answerFormat: VariableType;
  answerSubformat: VariableFormat;
  mandatory: boolean;
  horizontal: boolean;
  description: string;
  response: T;

  flows: Flow[];

  public static override copy<T>(from: Question<T>, to: Question<T>): void {
    super.copy(from, to);
    to.answerType = from.answerType;
    to.answerFormat = from.answerFormat;
    to.answerSubformat = from.answerSubformat;
    to.mandatory = from.mandatory;
    to.horizontal = from.horizontal;
    to.description = from.description;
    to.response = from.response;
  }
  public static override clone<T>(from: Question<T>): Question<T> {
    const to: Question<T> = new Question<T>();
    Question.copy(from, to);
    return to;
  }
}
