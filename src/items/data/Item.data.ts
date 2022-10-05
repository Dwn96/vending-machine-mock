import { v4 as uuid } from 'uuid';
import { Item } from '../entity/item.entity';

const MockItemStore: Item[] = [
  {
    id: uuid(),
    name: 'Soda Pop',
    quantity: 100,
    unitPrice: 50,
  },
  {
    id: uuid(),
    name: 'Cookies',
    quantity: 50,
    unitPrice: 5,
  },
  {
    id: uuid(),
    name: 'Krackles',
    quantity: 100,
    unitPrice: 50,
  },
  {
    id: uuid(),
    name: 'Vegetable Aite',
    quantity: 10,
    unitPrice: 5,
  },
];

export default MockItemStore;
