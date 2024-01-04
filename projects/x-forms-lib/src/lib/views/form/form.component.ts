import {Component, Input, OnInit} from '@angular/core';
import {Form} from "../../models/form";
import {FormItem} from "../../models/form-item";
import {Question} from "../../models/question";
import {Structure} from "../../utils/structure";
import {IsVisiblePipe} from "../../utils/is-visible.pipe";
import {Category} from "../../models/category";

@Component({
  selector: 'biit-x-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() form: Form;
  protected category: Category;

  constructor(private isVisible: IsVisiblePipe) {
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
    this.form.flows.forEach(flow => {
      if (!flow.originId || !flow.destinyId) {
        return;
      }
      const originKey: string = flow.originId.join('.')
      const destinyKey: string = flow.destinyId.join('.');
      flow.origin = questions.get(originKey);
      flow.destiny = questions.get(destinyKey);
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
    let latestVisibleNode: FormItem = this.findLatestVisibleNode();
    this.form.children.forEach( (child, index) => {
      if (!child.display) {
        child.display = this.isVisible.transform(latestVisibleNode, child.id, index ? this.form.children[index - 1] : null);
        if (child.display) {
          latestVisibleNode = child;
        }
      }
    })
  }
  private findLatestVisibleNode(): FormItem {
    const visibleNodes: FormItem[] = this.form.children.filter(child => child.display);
    if (visibleNodes.length) {
      return visibleNodes[visibleNodes.length - 1];
    } else {
      this.form.children[0].display = true;
      return this.form.children[0];
    }
  }

  private startForm(): void {
    const firstNode: Category = this.form.children[0];
    firstNode.disabled = false;
    this.onCategory(firstNode);
  }
}
