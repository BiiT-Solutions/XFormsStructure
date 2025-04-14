import {Form} from "../models/form";
import {FormResult} from "../models/form/form-result";
import {FormItem} from "../models/form-item";
import {FormItem as FormItemResult} from "../models/form/form-item";
import {Category} from "../models/category";
import {CategoryResult} from "../models/form/category-result";
import {Group} from "../models/group";
import {RepeatableGroupResult} from "../models/form/repeatable-group-result";
import {Question} from "../models/question";
import {QuestionWithValueResult} from "../models/form/question-with-value-result";
import {Answer} from "../models/answer";
import {SystemField} from "../models/system-field";
import {SystemFieldResult} from "../models/form/system-field-result";


export class FormConverter {

  public static convert(form: Form): FormResult {
    const formResult: FormResult = new FormResult();
    formResult.label = form.label;
    formResult.labelTranslations = form.labelTranslations;
    formResult.organizationId = form.organizationId;
    formResult.version = form.version;
    formResult.updatedBy = form.updatedBy;
    formResult.name = form.name;
    formResult.comparationId = form.comparationId;
    formResult.creationTime = form.creationTime;
    formResult.updateTime = form.updateTime;
    formResult.children = this.convertChildren(form.children);
    return formResult;
  }

  public static convertChildren(children: FormItem[], path: string[] = []): FormItemResult[] {
    const formItemResults: FormItemResult[] = [];
    children.forEach(child => {
      if (child.hidden || !child.display) {
        return;
      }
      if (child instanceof Category) {
        formItemResults.push(FormConverter.convertCategory(child, path));
      } else if (child instanceof Group) {
        formItemResults.push(FormConverter.convertGroup(child, path));
      } else if (child instanceof Question) {
        formItemResults.push(FormConverter.convertQuestion(child));
      } else if (child instanceof SystemField) {
        formItemResults.push(FormConverter.convertSystemField(child));
      }
    })
    return formItemResults;
  }

  private static convertCategory(category: Category, path: string[] = []): CategoryResult {
    const categoryResult: CategoryResult = new CategoryResult();
    this.setFormItemResult(category, categoryResult);
    categoryResult.children = FormConverter.convertChildren(category.children, [...path, category.name]);
    return categoryResult;
  }

  private static convertGroup(group: Group, path: string[] = []): RepeatableGroupResult {
    const groupResult: RepeatableGroupResult = new RepeatableGroupResult();
    this.setFormItemResult(group, groupResult);
    groupResult.children = FormConverter.convertChildren(group.children, [...path, group.name]);
    return groupResult;
  }

  private static convertQuestion(question: Question<any>): QuestionWithValueResult {
    const questionResult: QuestionWithValueResult = new QuestionWithValueResult();
    this.setFormItemResult(question, questionResult);
    questionResult.answerLabels = FormConverter.getAnswerLabels(question);
    questionResult.answerLabelTranslations = FormConverter.getAnswerLabelsTranslations(question);
    if (!question.children || !question.children.length) {
      questionResult.values = [question.response];
    } else {
      questionResult.values = FormConverter.getAnswerValues(question);
    }
    return questionResult;
  }

  private static convertSystemField(systemField: SystemField): SystemFieldResult {
    const systemFieldResult: SystemFieldResult = new SystemFieldResult();
    this.setFormItemResult(systemField, systemFieldResult);
    systemFieldResult.value = systemField.value;
    return systemFieldResult;
  }

  private static getAnswerValues(child: FormItem): string[] {
    const answerLabels: string[] = [];
    if (child instanceof Question) {
      if ((!child.children || !child.children.length) && child.response) {
        return [child.response];
      }
    }

    if (child instanceof Answer && child.selected && (!child.children || !child.children.length)) {
      return [child.name];
    }
    if (!child.children || !child.children.length) {
      return [];
    }
    child.children.filter(child => child instanceof Answer).map(child => child as Answer)
      .filter(child => child.selected).forEach(child => {
      const childValues: any[] = this.getAnswerValues(child);
      if (childValues && childValues.length) {
        answerLabels.push(...childValues);
      }
    })
    return answerLabels;
  }


  private static getAnswerLabels(child: FormItem): string[] {
    const answerLabels: string[] = [];
    if (child instanceof Question) {
      if ((!child.children || !child.children.length) && child.response) {
        return [child.response];
      }
    }

    if (child instanceof Answer && child.selected && (!child.children || !child.children.length)) {
      // return [translatePipe.transform(child.label, child.labelTranslations)];
      return [child.label];
    }
    if (!child.children || !child.children.length) {
      return [];
    }
    child.children.filter(child => child instanceof Answer).map(child => child as Answer)
      .filter(child => child.selected).forEach(child => {
      const childLabels: string[] = this.getAnswerLabels(child);
      if (childLabels && childLabels.length) {
        answerLabels.push(...childLabels);
      }
    })
    return answerLabels;
  }

  private static getAnswerLabelsTranslations(child: FormItem): { [key: string]: { [key: string]: string } } {
    const answerLabelTranslations: { [key: string]: { [key: string]: string } } = {};
    if (child instanceof Question) {
      if ((!child.children || !child.children.length) && child.response) {
        return answerLabelTranslations;
      }
    }

    if (child instanceof Answer && child.selected && (!child.children || !child.children.length)) {
      answerLabelTranslations[child.name] = child.labelTranslations;
      return answerLabelTranslations;
    }
    if (!child.children || !child.children.length) {
      return answerLabelTranslations;
    }
    child.children.filter(child => child instanceof Answer).map(child => child as Answer)
      .filter(child => child.selected).forEach(child => {
      const childLabels: { [key: string]: { [key: string]: string } } = this.getAnswerLabelsTranslations(child);
      if (childLabels) {
        Object.keys(childLabels).forEach(key => {
          answerLabelTranslations[key] = childLabels[key];
        })
      }
    })
    return answerLabelTranslations;
  }

  private static setFormItemResult(formItem: FormItem, formItemResult: FormItemResult): void {
    formItemResult.name = formItem.name;
    formItemResult.label = formItem.label;
    formItemResult.labelTranslations = formItem.labelTranslations;
    formItemResult.comparationId = formItem.comparationId;
    formItemResult.updateTime = formItem.updateTime;
    formItemResult.creationTime = formItem.creationTime;
  }
}
