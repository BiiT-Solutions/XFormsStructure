import {FormItem} from "./form-item";

export class QuestionWithValueResult extends FormItem {

  values: string[] = [];
  answerLabels: string[] = [];
  answerLabelTranslations: { [key: string]: { [key: string]: string } };

  constructor() {
    super('com.biit.form.result.QuestionWithValueResult');
  }

}
