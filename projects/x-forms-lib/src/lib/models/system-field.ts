import {FormItem} from "./form-item";

export class SystemField extends FormItem {

  private static readonly CLASS: string = "com.biit.webforms.persistence.entity.SystemField";

  fieldName: string;
  value: any;

  constructor() {
    super();
    this.class = SystemField.CLASS;
  }

  public static override copy(from: SystemField, to: SystemField): void {
    super.copy(from, to);
    to.fieldName = from.fieldName;
    to.value = from.value;
  }

  public static override clone(from: SystemField): SystemField {
    const to: SystemField = new SystemField();
    SystemField.copy(from, to);
    return to;
  }
}
