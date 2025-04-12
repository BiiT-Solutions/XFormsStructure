export class FormItem {
  class: string;
  comparationId: string;
  creationTime: Date = new Date();
  updateTime: Date = new Date();
  name: string;
  label: string;
  labelTranslations: {[key: string]: string};

  constructor(clazz: string) {
    this.class = clazz;
   }

  public static clone(from: FormItem): FormItem {
    const to: FormItem = new FormItem(from.class);
    this.copy(from, to);
    return to;
  }

  public static copy(from: FormItem, to: FormItem): void {
    to.comparationId = from.comparationId;
    to.creationTime = from.creationTime;
    to.updateTime = from.updateTime;
    to.name = from.name;
    to.label = from.label;
    to.labelTranslations = {};
    if (from.labelTranslations) {
      Object.keys(from.labelTranslations).forEach((key: string) => {
        to.labelTranslations[key] = from.labelTranslations[key];
      });
    }
  }

}
