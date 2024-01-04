import {FormItem} from "../models/form-item";
import {Question} from "../models/question";

export class Structure {
  public static extractQuestions(item: FormItem, map:  Map<string, Question<any>>, path?: string[]): void {
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
          Structure.extractQuestions(child, map, path)
        }
      })
    }
    path.pop();
  }
}
