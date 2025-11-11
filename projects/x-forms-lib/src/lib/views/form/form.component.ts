import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Form} from "../../models/form";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";
import {Structure} from "../../utils/structure";
import {IsVisiblePipe} from "../../utils/is-visible.pipe";
import {Category} from "../../models/category";
import {BiitIconService} from "@biit-solutions/wizardry-theme/icon";
import {completeIconSet} from "@biit-solutions/biit-icons-collection";
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
import {FormConverter} from "../../utils/form-converter";
import {FormResult} from "../../models/form/form-result";
import {FormCounter} from "../../utils/form-counter";
import {CheckAnswersPipe} from "../../utils/check-answers.pipe";
import {BiitProgressBarType} from "@biit-solutions/wizardry-theme/info";
import {TRANSLOCO_SCOPE, TranslocoService} from "@ngneat/transloco";
import {Language} from "../../shared/language";

@Component({
  selector: 'biit-x-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      multi:true,
      useValue: {scope: 'xforms', alias: 'xforms'}
    }
  ]
})
export class FormComponent implements OnInit {

  @Input() form: Form;
  @Output() completed: EventEmitter<FormResult> = new EventEmitter<FormResult>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  @Input() submitted: boolean = false;
  protected category: Category;
  protected nextCategory: Category;
  protected previousCategory: Category;
  protected questionsCounted: FormCounter;
  protected availableLanguages: { key: string, value: string }[] = [];
  protected selectedLanguage: { key: string, value: string } = null;

  protected hiddenMenu: boolean = true;

  constructor(iconService: BiitIconService, private isVisible: IsVisiblePipe,
              private next: NextPipe, private previous: PreviousPipe,
              private translocoService: TranslocoService,
              private changeDetectorRef: ChangeDetectorRef
  ) {
    iconService.registerIcons(completeIconSet);
  }

  protected onCategory(category: FormItem): void {
    if (category.disabled) {
      return;
    }
    this.category = category as Category;
    this.category.visited = true;
    this.nextCategory = this.next.transform(this.form.children as Category[], 'id', this.category.id);
    this.previousCategory = this.previous.transform(this.form.children as Category[], "id", this.category.id);
  }

  ngOnInit(): void {
    this.linkQuestionToFlow();
    this.generateIdPath(this.form);
    this.generatePathName(this.form);
    this.displayChildren();
    this.hideByHiddenElements(this.form);
    this.startForm();
    this.loadLanguages();
    this.questionsCounted = this.countQuestions(this.form);
    console.debug("Form: ", this.form);
  }

  private loadLanguages(): void {
      this.availableLanguages.push({key:'EN', value: 'EN'});
      Object.keys(this.form.labelTranslations).forEach(key => {
        this.availableLanguages.push({key: key, value: key});
      });
      this.availableLanguages.sort((a, b) => a.value < b.value ? -1 : 1);
      const browserLanguages: Set<string> = new Set<string>();
    const savedLanguage: string = Language.loadLanguage();
    if (savedLanguage) {
      browserLanguages.add(savedLanguage);
    }
      (navigator.languages || [navigator.language]).forEach(language => {
        const lang: string = language.split('-')[0].toUpperCase();
          browserLanguages.add(lang);
      });


    for (const browserLang of browserLanguages) {
        const lang: { key: string, value: string } = this.availableLanguages.find(l => l.key === browserLang);
        if (lang) {
          this.selectedLanguage = lang;
          break;
        }
      }
      if (this.selectedLanguage) {
        this.onLanguageChange(this.selectedLanguage, false)
      }
  }

  protected onLanguageChange(selectedLanguage: { key: string, value: string }, save = true): void {
    this.translocoService.setActiveLang(selectedLanguage.key.toLowerCase());
    Language.setLanguage(selectedLanguage.key, save);
  }

  private hideByHiddenElements(formItem: FormItem): void {
    if (formItem.children) {
      formItem.children.forEach(child => this.hideByHiddenElements(child));
      if (formItem.children && formItem.children.length && formItem.children.every(child => child.hidden)) {
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
        || condition instanceof TokenComparationValue || condition instanceof TokenBetween) {
        if (condition.question_id) {
          condition.linkedQuestion = questions.get(condition.question_id.join('.'));
        }
      }
    });
  }

  private linkFlowConditionsAnswersToAnswers(flow: Flow, answers: Map<string, Answer>): void {
    const conditions: Condition[] = flow.condition;
    conditions.forEach(condition => {
      if (condition instanceof TokenComparationAnswer) {
        if (condition.answer_id) {
          condition.linkedAnswer = answers.get(condition.answer_id.join('.'));
        }
      }
      if (condition instanceof TokenIn) {
        if (condition.values) {
          condition.values.forEach(value => {
            if (value.answer_id) {
              value.linkedAnswer = answers.get(value.answer_id.join('.'));
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

  private generatePathName(formItem: FormItem, namePath: string[] = []): void {
    formItem.pathName = namePath.join('/');
    if (formItem.children) {
      formItem.children.forEach(child => {
        this.generatePathName(child, namePath.concat([child.name]))
      });
    }
  }

  private displayChildren(): void {
    const visibleCategories: FormItem[] = this.form.children.filter(child => !child.hidden);
    visibleCategories.forEach((child, index) => {
      if (!child.display) {
        child.display = this.isVisible.transform(index < 1 ? null : visibleCategories[index - 1], child.pathName);
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

  protected onNext(): void {
    if (this.category) {
      const nextCategory: Category = this.next.transform(this.form.children as Category[], 'id', this.category.id);
      if (nextCategory) {
        this.previousCategory = this.category;
        this.category = nextCategory;
        this.category.visited = true;
        this.nextCategory = this.next.transform(this.form.children as Category[], 'id', this.category.id);
      }
    }
  }

  protected reload(): void {
    window.location.reload();
  }

  protected onSubmit(): void {
    const formResult: FormResult = FormConverter.convert(this.form);
    //console.log(JSON.stringify(formResult));
    this.completed.emit(formResult);
  }

  protected onPrevious(): void {
    if (this.category) {
      if (this.previousCategory) {
        this.nextCategory = this.category;
        this.category = this.previousCategory;
        this.previousCategory = this.previous.transform(this.form.children as Category[], "id", this.category.id);
      }
    }
  }

  /**
   * This method is called always that the form changes (any question is answered or modified)
   * @protected
   */
  protected onFormChanged(): void {
    this.changeDetectorRef.detectChanges();
    // Get all visible categories (those categories that have at least one visible question)
    const visibleCategories: FormItem[] = this.form.children.filter(child => this.containsDisplayedDirectionals(child) || !child.disabled);
    visibleCategories.forEach(child => {
      child.display = true;
      child.disabled = false;
    });
    const hidedCategories: Category[] = this.form.children.filter(child => !this.containsDisplayedDirectionals(child) && child.disabled) as Category[];
    hidedCategories.forEach(child => {
      if (!child.displayedByDefault) {
        child.display = false;
      }
      child.disabled = true;
    })
    this.nextCategory = this.next.transform(this.form.children as Category[], 'id', this.category.id);
    this.questionsCounted = this.countQuestions(this.form);
  }

  //NOTE: This is an approximation to the real count of questions (not possible to get the complete flow of the form)
  private countQuestions(form: Form): FormCounter {
    /* Getting all questions to get the total number of questions on the form */
    const questions: Map<string, Question<any>> = new Map();
    Structure.extractQuestions(form, questions);
    const questionArray: Question<any>[] = Array.from(questions.values());
    const formCounter = new FormCounter(0, questionArray.length);
    const categories: FormItem[] = form.children.filter(child => child instanceof Category);
    /* Getting all visited categories to count all the questions in them */
    let visitedCategories: FormItem[] = categories.filter(child => child instanceof Category).filter(child => (child as Category).visited && child.id !== this.category.id);
    const latestVisitedCategory: Category = visitedCategories.length > 0 ? visitedCategories[visitedCategories.length - 1] as Category : null;
    if (latestVisitedCategory && !latestVisitedCategory.completed) {
      visitedCategories = visitedCategories.filter(child => child.id !== latestVisitedCategory.id);
    }
    let countedQuestions: number = 0;
    const questionsInVisitedCategories: Map<string, Question<any>> = new Map();
    visitedCategories.forEach(category => {Structure.extractQuestions(category, questionsInVisitedCategories)});
    countedQuestions += questionsInVisitedCategories.size;
    const questionsInCurrentCategory: Map<string, Question<any>> = new Map();
    Structure.extractQuestions(this.category, questionsInCurrentCategory);
    if (latestVisitedCategory && !latestVisitedCategory.completed) {
      Structure.extractQuestions(latestVisitedCategory, questionsInCurrentCategory);
    }
    /*Counting current category*/
    questionsInCurrentCategory.forEach(question => {
      if (question.display){
        if (!question.mandatory) {
          countedQuestions++;
        } else {
          if (question.valid) {
            countedQuestions++;
          }
        }
      } else {
        countedQuestions++;
      }
    });
    formCounter.answeredQuestions=countedQuestions;
    return formCounter;
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

  protected readonly console: Console = console;
  protected readonly BiitProgressBarType = BiitProgressBarType;
  protected readonly Language = Language;
}
