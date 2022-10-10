import { v4 as uuid } from 'uuid';
import { Slot } from '../entities/slot.entity';

const MockItemsSlots: Slot[] = [
  {
    id: 1,
    unitPrice: 50,
    items: {
      id: uuid(),
      name: 'Soda Pop',
      quantity: 12,
    },
  },
  {
    id: 2,
    unitPrice: 5,
    items: {
      id: uuid(),
      name: 'Tums',
      quantity: 12,
    },
  },
  {
    id: 3,
    unitPrice: 75,
    items: {
      id: uuid(),
      name: 'Probiotic Yoghurt',
      quantity: 12,
    },
  },
];

export default MockItemsSlots;
