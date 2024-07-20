import {FormItem} from "../models/form-item";
import {Question} from "../models/question";
import {Text} from "../models/text";
import {Answer} from "../models/answer";
import {Directional} from "../models/directional";
import {by} from "ng-packagr/lib/graph/select";
import {Form} from "../models/form";
import {Group} from "../models/group";

export class Structure {

  public static extractGroups(item: FormItem, map:  Map<string, Group>, path?: string[]): void {
    if (!path) {
      path = [];
    } else {
      path.push(item.name)
    }
    if (item.children) {
      item.children.filter(child => !child.hidden).forEach(child => {
        if (child instanceof Group) {
          map.set([...path, child.name].join('.'), child);
        } else {
          Structure.extractGroups(child, map, path)
        }
      })
    }
    path.pop();
  }

  public static extractQuestions(item: FormItem, map:  Map<string, Question<any>>, path?: string[]): void {
    if (!path) {
      path = [];
    } else {
      path.push(item.name)
    }
    if (item.children) {
      item.children.filter(child => !child.hidden).forEach(child => {
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
      if (!item.hidden) {
        path.push(item.name)
      }
    }
    if (item.children) {
      item.children.filter(child => !child.hidden).forEach(child => {
        if (child instanceof Text) {
          map.set([...path, child.name].join('.'), child);
        } else {
          Structure.extractTexts(child, map, path)
        }
      })
    }
    path.pop();
  }

  public static extractAnswers(item: FormItem, map:  Map<string, Answer>, path?: string[]): void {
    if (!path) {
      path = [];
    } else {
      if (!item.hidden) {
        path.push(item.name)
      }
    }
    if (item.children) {
      item.children.filter(child => !child.hidden).forEach(child => {
        if (child instanceof Answer) {
          map.set([...path, child.name].join('.'), child);
        }
        // Answers may have Answers as children. We need to iterate over them as well.
        Structure.extractAnswers(child, map, path);
      })
    }
    path.pop();
  }

  public static getDirectionals(item: FormItem): Directional[] {
    const directionals: Directional[] = [];
    if (item instanceof Directional) {
      directionals.push(item);
    } else {
      if (item.children) {
        item.children.filter(child => !child.hidden).forEach(child => {
          if (child instanceof Directional) {
            directionals.push(child);
          } else {
            const childDirectionals: Directional[] = Structure.getDirectionals(child);
            directionals.push(...childDirectionals);
          }
        })
      }
    }
    return directionals.filter(directionals => !directionals.hidden);
  }

  public static getParent(item: FormItem, root: FormItem): FormItem {
    if (!item) {
      return null;
    }
    let parent = root;
    if (item.path === root.path) {
      return null;
    }
    for (let child of root.children) {
      if (child.path === item.path) {
        return root;
      }
      if (child.children) {
        parent = Structure.getParent(item, child);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }
}
