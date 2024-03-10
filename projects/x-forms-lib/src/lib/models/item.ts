export class Item {
  class: string;
  id: number;
  comparationId: string;
  creationTime: Date;
  updateTime: Date;
  createdBy: number;
  updatedBy: number;
  public static copy(from: Item, to: Item): void {
    to.class = from.class;
    to.id = isNaN(from.id) ? Item.generateIdFromComparationId(from.comparationId) : from.id;
    to.comparationId = from.comparationId;
    to.creationTime = from.creationTime ? new Date(from.creationTime) : null;
    to.updateTime = from.updateTime ? new Date(from.updateTime) : null;
    to.createdBy = from.createdBy;
    to.updatedBy = from.updatedBy;
  }
  public static clone(from: Item): Item {
    const to: Item = new Item();
    Item.copy(from, to);
    return to;
  }

  private static generateIdFromComparationId(comparativeId: string): number {
    if (!comparativeId) {
      return null;
    }
    const hex: string = comparativeId.split('-').pop();
    return Number('0x' + hex);
  }
}
