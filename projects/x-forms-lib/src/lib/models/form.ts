import {FormItem} from "./form-item";
import {Flow} from "./flow";
import {Constants} from "../utils/constants";
import {Category} from "./category";
import {Group} from "./group";
import {VariableType} from "./variable-type";
import {Question} from "./question";
import {Text} from "./text";
import {Answer} from "./answer";
import {SystemField} from "./system-field";
import {DynamicAnswer} from "./dynamic-answer";
import {Structure} from "../utils/structure";
import {AnswerType} from "./answer-type";

export class Form extends FormItem {
  version: number;
  organizationId: number;
  description: string;
  flows: Flow[];

  // TODO(jpastor): typify next variables properly
  webserviceCalls: any[];
  linkedFormVersions: any[];
  elementsToHide: any[];

  public static override copy(from: Form, to: Form): void {
    super.copy(from, to);
    to.version = from.version;
    to.organizationId = from.organizationId;
    to.description = from.description;
    to.flows = from.flows ? from.flows.map(Flow.clone) : [];
    to.webserviceCalls = from.webserviceCalls;
    to.linkedFormVersions = from.linkedFormVersions;
    to.elementsToHide = from.elementsToHide;
  }

  /**
   * It transforms a json into a Form Object and add properties into the proper system field
   * @param from
   * @param properties properties to be inserted into the proper system field. Key should match with systemField name
   */

  public static import(from: Form, properties: Map<string, any> = new Map()): Form {
    const form: Form = Form.clone(from);
    const systemFields: Map<string, SystemField> = new Map();
    Structure.extractSystemFields(form, systemFields);
    Array.from(systemFields.values()).forEach(sf => {
      const property: any = properties.get(sf.name);
      if (property !== undefined) {
        sf.value = property;
      }
    });
    const questions: Map<string, Question<any>> = new Map();
    Structure.extractQuestions(form, questions);
    Array.from(questions.values()).forEach(q => {
      if (q.answerType !== AnswerType.SINGLE_SELECTION_SLIDER
        && q.children && q.children.length) {
        if (!q.response) {
          q.response = [];
        }
        q.children.forEach(child => {
          const childProperty: any = properties.get(child.name);
          if (childProperty !== undefined) {
            (child as Answer).selected = true;
            q.response.add(child);
          }
        });
      } else {
        const property: any = properties.get(q.name);
        if (property !== undefined) {
          q.response = property;
        }
      }
    });
    return form;
  }

  public static override clone(from: Form): Form {
    const to: Form = new Form();
    Form.copy(from, to);
    return to;
  }

  // As it is quite impossible to check the class type of FormItem by its similar structure with other classes we use className

  public static cloneFormItem(item: FormItem): FormItem {
    const className: string = item.class;
    if (className.endsWith(`.${Constants.ITEM_CLASSES.CATEGORY}`)) {
      return Category.clone(item as Category);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.TEXT}`)) {
      return Text.clone(item as Text);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.GROUP}`)) {
      return Group.clone(item as Group);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.SYSTEM_FIELD}`)) {
      return SystemField.clone(item as SystemField);
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.QUESTION}`)) {
      const type: VariableType = (item as Question<any>).answerFormat;
      switch (type) {
        case VariableType.DATE:
          return Question.clone(item as Question<Date>);
        case VariableType.NUMBER:
          return Question.clone(item as Question<number>);
        default:
          return Question.clone(item as Question<string>);
      }
    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.DYNAMIC_ANSWER}`)) {
      return DynamicAnswer.clone(item as DynamicAnswer);

    } else if (className.endsWith(`.${Constants.ITEM_CLASSES.ANSWER}`)) {
      return Answer.clone(item as Answer);
    } else {
      return FormItem.clone(item);
    }
  }
}
