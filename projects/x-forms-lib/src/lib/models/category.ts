import {FormItem} from "./form-item";

export class Category extends FormItem {


  public static override copy(from: Category, to: Category): void {
    super.copy(from, to);
  }
  public static override clone(from: Category): Category {
    const to: Category = new Category();
    Category.copy(from, to);
    return to;
  }

}
