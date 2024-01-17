import { Pipe, PipeTransform } from '@angular/core';
import {Form} from "../models/form";
import {FormItem} from "../models/form-item";
import {CategoryComponent} from "../shared/category/category.component";

@Pipe({
  name: 'checkAnswers'
})
export class CheckAnswersPipe implements PipeTransform {

  transform(form: Form): boolean {
    debugger
    if (!form) {
      return true;
    }
    return form.children.filter(category => category.display).every(CategoryComponent.isCompleted);
  }

  private checkAnswers(item: FormItem): void {


  }
}
