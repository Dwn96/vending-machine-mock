import { v4 as uuid } from 'uuid';
import { Slot } from '../entities/slot.entity';

const MockItemsSlots: Slot[] = [
  {
    id: 1,
    unitPrice: 50,
    quantity: 12,
    item: {
      id: uuid(),
      name: 'Soda Pop',
    },
  },
  {
    id: 2,
    unitPrice: 5,
    quantity: 14,
    item: {
      id: uuid(),
      name: 'Tums',
    },
  },
  {
    id: 3,
    unitPrice: 75,
    quantity: 9,
    item: {
      id: uuid(),
      name: 'Probiotic Yoghurt',
    },
  },
];

export default MockItemsSlots;
