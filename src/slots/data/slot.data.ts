import { v4 as uuid } from 'uuid';
import { Slot } from '../entities/slot.entity';

const MockItemsSlots: Slot[] = [
  {
    id: 1,
    items: {
      id: uuid(),
      name: 'Soda Pop',
      quantity: 12,
      unitPrice: 50,
    },
  },
  {
    id: 2,
    items: {
      id: uuid(),
      name: 'Tums',
      quantity: 12,
      unitPrice: 5,
    },
  },
  {
    id: 3,
    items: {
      id: uuid(),
      name: 'Probiotic Yoghurt',
      quantity: 12,
      unitPrice: 75,
    },
  },
];

export default MockItemsSlots;
