import {Item} from "./item";
import {Form} from "./form";

export class FormItem extends Item {
  name: string;
  label: string;
  labelTranslations: {[key: string]: string};
  hidden: boolean;
  children: FormItem[];
  // display means the item is reachable from the current node path, but user still has not reached the node.
  display: boolean;
  path: number[];
  pathName: string;
  // if item is disabled, item can not be shown because node path can not reach it by all its possible paths.
  disabled: boolean = true;

  public static override copy(from: FormItem, to: FormItem): void {
    super.copy(from, to);
    to.name = from.name;
    to.label = from.label;
    to.hidden = from.hidden;
    to.display = from.display;
    to.path = from.path;
    to.pathName = from.pathName;
    if (to.hidden) {
      to.display = false;
      to.disabled = true;
    }
    to.labelTranslations = {};
    if (from.labelTranslations) {
      Object.keys(from.labelTranslations).forEach((key: string) => {
        to.labelTranslations[key] = from.labelTranslations[key];
      });
    }
    to.children = from.children ? from.children.map(Form.cloneFormItem) : [];
  }
  public static override clone(from: FormItem): FormItem {
    const to: FormItem = new FormItem();
    FormItem.copy(from, to);
    return to;
  }
}
