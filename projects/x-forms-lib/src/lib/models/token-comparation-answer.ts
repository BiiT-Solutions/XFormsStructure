import {Condition} from "./condition";
import {Question} from "./question";
import {Answer} from "./answer";

export class TokenComparationAnswer extends Condition {
  question_id: string[];
  linkedQuestion: Question<any>;
  answer_id: string[];
  linkedAnswer: Answer;

  public static override copy(from: TokenComparationAnswer, to: TokenComparationAnswer): void {
    super.copy(from, to);
    to.question_id = from.question_id;
    to.linkedQuestion = from.linkedQuestion;
    to.answer_id = from.answer_id;
    to.linkedAnswer = from.linkedAnswer;
  }
  public static override clone(from: TokenComparationAnswer): TokenComparationAnswer {
    const to: TokenComparationAnswer = new TokenComparationAnswer();
    TokenComparationAnswer.copy(from, to);
    return to;
  }
}
