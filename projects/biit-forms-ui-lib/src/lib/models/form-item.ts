export class FormItem {
  class: string;
  id: number;
  comparationId: string;
  creationTime: Date;
  updateTime: Date;
  createdBy: number;
  updatedBy: number;
  name: string;
  label: string;
  hidden: boolean;
  children: FormItem[];

  public static copy(from: FormItem, to: FormItem): void {
    to.class = from.class;
    to.id = from.id;
    to.comparationId = from.comparationId;
    to.creationTime = from.creationTime ? new Date(from.creationTime) : null;
    to.updateTime = from.updateTime ? new Date(from.updateTime) : null;
    to.createdBy = from.createdBy;
    to.updatedBy = from.updatedBy;
    to.name = from.name;
    to.label = from.label;
    to.hidden = from.hidden;
    to.children = from.children;
  }
  public static clone(from: FormItem): FormItem {
    const to: FormItem = new FormItem();
    FormItem.copy(from, to);
    return to;
  }
}
