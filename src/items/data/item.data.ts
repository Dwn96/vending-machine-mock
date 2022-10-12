import { v4 as uuid } from 'uuid';
import { Item } from '../entity/item.entity';

const MockItemStore: Item[] = [
  {
    id: '1',
    name: 'Soda Pop',
  },
  {
    id: uuid(),
    name: 'Cookies',
  },
  {
    id: uuid(),
    name: 'Krackles',
  },
  {
    id: uuid(),
    name: 'Vegetable Aite',
  },
];

export default MockItemStore;