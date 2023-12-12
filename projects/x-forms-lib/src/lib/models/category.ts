import {FormItem} from "./form-item";
import {Form} from "./form";

export class Category extends FormItem {


  public static override copy(from: Category, to: Category): void {
    super.copy(from, to);
    to.children = from.children ? from.children.map(Form.cloneFormItem) : [];
  }
  public static override clone(from: Category): Category {
    const to: Category = new Category();
    Category.copy(from, to);
    return to;
  }


}
