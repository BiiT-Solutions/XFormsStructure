import {FormItem} from "./form-item";

export class FormResult extends FormItem {
  submittedAt: Date = new Date();
  updatedBy: number;
  version: number;
  organizationId: number;
  children: FormItem[] = [];

  constructor() {
    super('com.biit.form.result.FormResult');
  }

  public static override clone(from: FormResult): FormResult {
    const to: FormResult = new FormResult();
    FormResult.copy(from, to);
    return to;
  }

  public static override copy(from: FormResult, to: FormResult): void {
    super.copy(from, to);
    to.submittedAt = from.submittedAt;
    to.updatedBy = from.updatedBy;
    to.version = from.version;
    to.organizationId = from.organizationId;
    to.children = from.children ? from.children.map(FormItem.clone) : [];
  }

}
