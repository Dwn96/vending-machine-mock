import { Item } from 'src/items/entity/item.entity';

export class Slot {
  id: number;
  unitPrice: number;
  quantity: number;
  item: Item;
}
