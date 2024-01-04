import {Item} from "./item";
import {Form} from "./form";

export class FormItem extends Item {
  name: string;
  label: string;
  hidden: boolean;
  children: FormItem[];
  display: boolean;
  path: number[];
  disabled: boolean = true;

  public static override copy(from: FormItem, to: FormItem): void {
    super.copy(from, to);
    to.name = from.name;
    to.label = from.label;
    to.hidden = from.hidden;
    to.children = from.children ? from.children.map(Form.cloneFormItem) : [];
  }
  public static override clone(from: FormItem): FormItem {
    const to: FormItem = new FormItem();
    FormItem.copy(from, to);
    return to;
  }
}
