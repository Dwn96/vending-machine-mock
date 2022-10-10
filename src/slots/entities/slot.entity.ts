import { Item } from 'src/items/entity/item.entity';

export class Slot {
  id: number;
  unitPrice: number;
  items: Item;
}
