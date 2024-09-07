import {FormItem} from "./form-item";

export class Image extends FormItem {
  filename: string;
  width: number;
  height: number;
  imageUrl: string;
  data: string;

  public static override copy(from: Image, to: Image): void {
    super.copy(from, to);
    to.filename = from.filename;
    to.width = from.width;
    to.height = from.height;
    to.imageUrl = from.imageUrl;
    to.data = from.data;
  }
  public static override clone(from: Image): Image {
    const to: Image = new Image();
    Image.copy(from, to);
    return to;
  }
}
