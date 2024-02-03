import {Component, Input, OnInit} from '@angular/core';
import {Form} from "../../models/form";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";
import {Structure} from "../../utils/structure";
import {IsVisiblePipe} from "../../utils/is-visible.pipe";
import {Category} from "../../models/category";
import {BiitIconService} from "biit-ui/icon";
import {completeIconSet} from "biit-icons-collection";
import {NextPipe} from "../../utils/next.pipe";
import {PreviousPipe} from "../../utils/previous.pipe";
import {Text} from "../../models/text";
import {Answer} from "../../models/answer";
import {Flow} from "../../models/flow";
import {Condition} from "../../models/condition";

@Component({
  selector: 'biit-x-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() form: Form;
  protected category: Category;

  constructor(iconService: BiitIconService, private isVisible: IsVisiblePipe,
              private next: NextPipe, private previous: PreviousPipe) {
    iconService.registerIcons(completeIconSet);
  }

  protected onCategory(category: FormItem): void {
    if (category.disabled) {
      return;
    }
    this.category = category;
  }

  ngOnInit(): void {
    this.linkQuestionToFlow();
    this.generateIdPath(this.form);
    this.displayChildren();
    this.startForm();
    console.log(this.form);
  }

  private linkQuestionToFlow(): void {
    const questions: Map<string, Question<any>> = new Map();
    Structure.extractQuestions(this.form, questions);
    const texts: Map<string, Text> = new Map();
    Structure.extractTexts(this.form, texts);
    const answers: Map<string, Answer> = new Map();
    Structure.extractAnswers(this.form, answers);
    this.form.flows.forEach(flow => {
      const key: string[] = flow.originId;
      const question: Question<any> = questions.get(key.join('.'));
      if (question) {
        if (!question.flows) {
          question.flows = [];
        }
        question.flows.push(flow);
      } else {
        const text: Text = texts.get(key.join('.'));
        if (text) {
          if (!text.flows) {
            text.flows = [];
          }
          text.flows.push(flow);
        }
      }
    });
    this.form.flows.forEach(flow => {
      if (!flow.originId || !flow.destinyId) {
        return;
      }
      const originKey: string = flow.originId.join('.')
      const destinyKey: string = flow.destinyId.join('.');
      flow.origin = questions.get(originKey);
      if (!flow.origin) {
        flow.origin = texts.get(originKey);
      }
      flow.destiny = questions.get(destinyKey);
      if (!flow.destiny) {
        flow.destiny = texts.get(destinyKey);
      }
      this.linkFlowAnswersToAnswers(flow, answers);
    });
  }

  private linkFlowAnswersToAnswers(flow: Flow, answers: Map<string, Answer>): void {
    //TODO(jnavalon): Continue implementing this method is not linking properly answers.
    const conditions: Condition[] = flow.condition;
    conditions.forEach(condition => {
      if (condition.answer_id) {
        condition.linkedAnswer = answers.get(condition.answer_id.join('.'));
      }
      if (condition.values) {
        condition.linkedValues = [];
        condition.values.forEach(value => {
          if (value.answer_id) {
            condition.linkedValues.push(answers.get(value.answer_id.join('.')));
          }
        })
      }
    });
  }



  private generateIdPath(formItem: FormItem, path: number[] = []): void {
    formItem.path = path;
    if (formItem.children) {
      formItem.children.forEach(child => {
        this.generateIdPath(child, path.concat([child.id]))
      });
    }
  }

  private displayChildren(): void {
    this.form.children.forEach( (child, index) => {
      if (!child.display) {
        child.display = this.isVisible.transform(index < 1 ? null : this.form.children[index - 1] , child.id);
      }
    });
  }

  private startForm(): void {
    const firstNode: Category = this.form.children[0];
    firstNode.disabled = false;
    this.onCategory(firstNode);
  }

  protected onCategoryCompleted(completed: boolean): void {
    if (this.category) {
      const nextCategory: Category = this.next.transform(this.form.children, 'id', this.category.id);
      if (nextCategory) {
        nextCategory.disabled = !completed;
      }
    }
  }

  protected onNext() {
    if (this.category){
      const nextCategory: Category = this.next.transform(this.form.children, 'id', this.category.id);
      if (nextCategory) {
        this.category = nextCategory;
      }
    }
  }

  protected onPrevious() {
    if (this.category) {
      const previousCategory: Category = this.previous.transform(this.form.children, 'id', this.category.id);
      if (previousCategory) {
        this.category = previousCategory;
      }
    }
  }
}
