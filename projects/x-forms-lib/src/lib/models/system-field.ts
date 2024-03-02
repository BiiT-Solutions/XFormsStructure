import {FormItem} from "./form-item";

export class SystemField extends FormItem {
  fieldName: string;

  public static override copy(from: SystemField, to: SystemField): void {
    super.copy(from, to);
    to.fieldName = from.fieldName;
  }
  public static override clone(from: SystemField): SystemField {
    const to: SystemField = new SystemField();
    SystemField.copy(from, to);
    return to;
  }
}
