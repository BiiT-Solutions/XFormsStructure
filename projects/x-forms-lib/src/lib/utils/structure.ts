import {FormItem} from "../models/form-item";
import {Question} from "../models/question";
import {Text} from "../models/text";

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
  public static extractTexts(item: FormItem, map:  Map<string, Text>, path?: string[]): void {
    if (!path) {
      path = [];
    } else {
      path.push(item.name)
    }
    if (item.children) {
      item.children.forEach(child => {
        if (child instanceof Text) {
          map.set([...path, child.name].join('.'), child);
        } else {
          Structure.extractTexts(child, map, path)
        }
      })
    }
    path.pop();
  }
}
