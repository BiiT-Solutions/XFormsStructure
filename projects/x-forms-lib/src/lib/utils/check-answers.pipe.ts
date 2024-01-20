import { Pipe, PipeTransform } from '@angular/core';
import {Form} from "../models/form";
import {FormItem} from "../models/form-item";
import {CategoryComponent} from "../shared/category/category.component";

@Pipe({
  name: 'checkAnswers', pure: false
})
export class CheckAnswersPipe implements PipeTransform {

  transform(form: Form): boolean {
    if (!form) {
      return true;
    }
    return form.children.filter(category => category.display).every(CategoryComponent.isCompleted);
  }
}
