import {Item} from "./item";

export class FormItem extends Item{
  name: string;
  label: string;
  hidden: boolean;
  children: FormItem[];

  public static override copy(from: FormItem, to: FormItem): void {
    to.name = from.name;
    to.label = from.label;
    to.hidden = from.hidden;
    to.children = from.children;
  }
  public static override clone(from: FormItem): FormItem {
    const to: FormItem = new FormItem();
    FormItem.copy(from, to);
    return to;
  }
}
