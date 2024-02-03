import {AnswerType} from "./answer-type";
import {VariableType} from "./variable-type";
import {VariableFormat} from "./variable-format";
import {Directional} from "./directional";

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
  }
  public static override clone<T>(from: Question<T>): Question<T> {
    const to: Question<T> = new Question<T>();
    Question.copy(from, to);
    return to;
  }
}
