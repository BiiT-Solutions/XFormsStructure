import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {TokenComparationAnswer} from "../../models/token-comparation-answer";
import {TokenIn} from "../../models/token-in";
import {TokenComparationValue} from "../../models/token-comparation-value";
import {TokenBetween} from "../../models/token-between";
import {Directional} from "../../models/directional";

@Component({
  selector: 'biit-x-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() form: Form;
  @Output() closed = new EventEmitter<any>();
  protected category: Category;
  protected nextCategory: Category;
  protected previousCategory: Category;
  protected submitted: boolean = false;

  constructor(iconService: BiitIconService, private isVisible: IsVisiblePipe,
              private next: NextPipe, private previous: PreviousPipe) {
    iconService.registerIcons(completeIconSet);
  }

  protected onCategory(category: FormItem): void {
    if (category.disabled) {
      return;
    }
    this.category = category as Category;
    this.nextCategory = this.next.transform(this.form.children as Category[], 'id', this.category.id);
    this.previousCategory = this.previous.transform(this.form.children as Category[], "id", this.category.id);
  }

  ngOnInit(): void {
    this.linkQuestionToFlow();
    this.generateIdPath(this.form);
    this.displayChildren();
    this.hideByHiddenElements(this.form);
    this.startForm();
    console.log(this.form);
  }

  private hideByHiddenElements(formItem: FormItem): void {
    if (formItem.children) {
      formItem.children.forEach(child => this.hideByHiddenElements(child));
      if (formItem.children && formItem.children.length&& formItem.children.every(child => child.hidden)) {
        formItem.hidden = true;
        formItem.disabled = true;
        formItem.display = false;
      }
    }
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
      const question: Question<any> = key ? questions.get(key.join('.')) : null;
      if (question) {
        if (!question.flows) {
          question.flows = [];
        }
        question.flows.push(flow);
      } else {
        const text: Text = key ? texts.get(key.join('.')) : null;
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
      this.linkFlowConditionsAnswersToAnswers(flow, answers);
      this.linkFlowConditionQuestionsToQuestions(flow, questions);
    });
  }

  private linkFlowConditionQuestionsToQuestions(flow: Flow, questions: Map<string, Question<any>>): void {
    const conditions: Condition[] = flow.condition;
    conditions.forEach(condition => {
      if (condition instanceof TokenComparationAnswer || condition instanceof TokenIn
        || condition instanceof TokenComparationValue || condition instanceof TokenBetween){
        if (condition.question_id) {
          condition.linkedQuestion = questions.get(condition.question_id.join('.'));
        }
      }
    });
  }

  private linkFlowConditionsAnswersToAnswers(flow: Flow, answers: Map<string, Answer>): void {
    const conditions: Condition[] = flow.condition;
    conditions.forEach(condition => {
      if (condition instanceof TokenComparationAnswer){
        if (condition.answer_id) {
          condition.linkedAnswer = answers.get(condition.answer_id.join('.'));
        }
      }
      if (condition instanceof TokenIn) {
        if (condition.values) {
          condition.values.forEach(value => {
            if (value.answer_id) {
              value.linkedAnswer =answers.get(value.answer_id.join('.'));
            }
          })
        }
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
    const visibleCategories: FormItem[] = this.form.children.filter(child => !child.hidden);
    visibleCategories.forEach( (child, index) => {
      if (!child.display) {
        child.display = this.isVisible.transform(index < 1 ? null : visibleCategories[index - 1] , child.id);
        if (child.display) {
          (child as Category).displayedByDefault = true;
        }
      }
    });
  }

  private startForm(): void {
    const firstNode: Category = this.form.children.filter(child => !child.hidden)[0] as Category;
    firstNode.disabled = false;
    this.onCategory(firstNode);
  }

  protected onCategoryCompleted(completed: boolean): void {
    if (this.category) {
      const nextCategory: Category = this.next.transform(this.form.children as Category[], 'id', this.category.id);
      if (nextCategory) {
        nextCategory.disabled = !completed;
      }
    }
  }

  protected onNext() : void {
    if (this.category){
      const nextCategory: Category = this.next.transform(this.form.children as Category[], 'id', this.category.id);
      if (nextCategory) {
        this.previousCategory = this.category;
        this.category = nextCategory;
        this.nextCategory = this.next.transform(this.form.children as Category[], 'id', this.category.id);
      }
    }
  }
  protected onSubmit(): void {
    //TODO(jnavalon): Implement the submit form
    this.submitted = true;
  }

  protected onPrevious() : void {
    if (this.category) {
      if (this.previousCategory) {
        this.nextCategory = this.category;
        this.category = this.previousCategory;
        this.previousCategory = this.previous.transform(this.form.children as Category[], "id", this.category.id);
      }
    }
  }

  protected onFormChanged(): void {
    const visibleCategories: FormItem[] = this.form.children.filter(child => this.containsDisplayedDirectionals(child));
    visibleCategories.forEach(child => {
      child.display = true;
      child.disabled = false;
    });
    const hidedCategories: Category[] = this.form.children.filter(child => !this.containsDisplayedDirectionals(child)) as Category[];
    hidedCategories.forEach(child => {
      if (!child.displayedByDefault) {
        child.display = false;
      }
      child.disabled = true;
    })
    this.nextCategory = this.next.transform(this.form.children as Category[], 'id', this.category.id);
  }
  private containsDisplayedDirectionals(formItem: FormItem): boolean {
    if (formItem instanceof Directional && formItem.display) {
      return true;
    }
    if (formItem.children) {
      return formItem.children.some(child => this.containsDisplayedDirectionals(child));
    }
    return false;
  }

  protected readonly console = console;
}
