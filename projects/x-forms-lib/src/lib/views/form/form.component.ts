import {Component, Input, OnInit} from '@angular/core';
import {Form} from "../../models/form";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";

@Component({
  selector: 'biit-x-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() form: Form;

  protected onGroup(group: FormItem) {
    console.log(group.label)
  }

  ngOnInit(): void {
    this.linkQuestionToFlow();
  }

  private linkQuestionToFlow(): void {
    const questions: Map<string, Question<any>> = new Map();
    this.extractQuestions(this.form, questions);
    this.form.flows.forEach(flow => {
      const key: string[] = flow.originId;
      const question: Question<any> = questions.get(key.join('.'));
      if (question) {
        if (!question.flows) {
          question.flows = [];
        }
        question.flows.push(flow);
      }
    });
  }

  private extractQuestions(item: FormItem, map:  Map<string, Question<any>>, path?: string[]): void {
    if (!path) {
      path = [];
    } else {
      path.push(item.name)
    }
    if (item.children) {
      item.children.forEach(child => {
        if (child instanceof Question) {
          map.set([...path, child.name].join('.'), child);
        } else {
          this.extractQuestions(child, map, path)
        }
      })
    }
    path.pop();
  }
}
