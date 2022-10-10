import { v4 as uuid } from 'uuid';
import { Item } from '../entity/item.entity';

const MockItemStore: Item[] = [
  {
    id: '1',
    name: 'Soda Pop',
    quantity: 100,
  },
  {
    id: uuid(),
    name: 'Cookies',
    quantity: 50,
  },
  {
    id: uuid(),
    name: 'Krackles',
    quantity: 100,
  },
  {
    id: uuid(),
    name: 'Vegetable Aite',
    quantity: 10,
  },
];

export default MockItemStore;
