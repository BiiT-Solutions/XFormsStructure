import {FormItem} from "./form-item";
import {Form} from "./form";

export class Category extends FormItem {

  // displayedByDefault indicates category is displayed by default flow. Useful to hide categories by flows.
  public displayedByDefault: boolean = false;

  public static override copy(from: Category, to: Category): void {
    super.copy(from, to);
    to.displayedByDefault = from.displayedByDefault == undefined ? false : from.displayedByDefault;
    to.children = from.children ? from.children.map(Form.cloneFormItem) : [];
  }
  public static override clone(from: Category): Category {
    const to: Category = new Category();
    Category.copy(from, to);
    return to;
  }


}
