export class QuestionsCounted {
  answeredQuestions: number = 0;
  totalQuestions: number = 0;

  constructor(answeredQuestions: number, totalQuestions: number) {
    this.answeredQuestions = answeredQuestions;
    this.totalQuestions = totalQuestions;
  }
}
