import {FormItem} from "./form-item";

export class Form extends FormItem {
  version: number;
  organizationId: number;
  description: string;

  // TODO(jpastor): typify next variables properly
  flows: any[];
  webserviceCalls: any[];
  linkedFormVersions: any[];
  elementsToHide: any[];

  public static override copy(from: Form, to: Form): void {
    super.copy(from, to);
    to.version = from.version;
    to.organizationId = from.organizationId;
    to.description = from.description;
    to.flows = from.flows;
    to.webserviceCalls = from.webserviceCalls;
    to.linkedFormVersions = from.linkedFormVersions;
    to.elementsToHide = from.elementsToHide;
  }
  public static override clone(from: Form): Form {
    const to: Form = new Form();
    Form.copy(from, to);
    return to;
  }
}
