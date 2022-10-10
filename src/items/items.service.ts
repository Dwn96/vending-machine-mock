import { Injectable } from '@nestjs/common';
import MockItemStore from './data/Item.data';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { v4 as uuid } from 'uuid';
import MockItemsSlots from 'src/slots/data/slot.data';
@Injectable()
export class ItemsService {
  create(createItemDto: CreateItemDto) {
    const slot = MockItemsSlots.find(
      (slot) => slot.item.name === createItemDto.name,
    );
    if (slot) {
      slot.quantity = slot.quantity + 1;
      return;
    }
    MockItemsSlots.push({
      id: MockItemStore.length + 1,
      unitPrice: createItemDto.unitPrice,
      quantity: createItemDto.quantity,
      item: { id: uuid(), ...createItemDto },
    });
  }
  findAll() {
    return MockItemStore;
  }

  findOne(id: string) {
    return MockItemStore.find((item) => item.id === id);
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    MockItemStore.map((item) => {
      if (item.id === id) {
        return { ...item, ...updateItemDto };
      }
      return item;
    });
    return updateItemDto;
  }

  remove(id: string) {
    const remainingItems = MockItemStore.filter((item) => item.id !== id);
    MockItemStore.length = 0;
    MockItemStore.push(...remainingItems);
    return MockItemStore;
  }

  decrementItemInSlot(slotId: number) {
    const slot = MockItemsSlots.find((slot) => slot.id === slotId);
    if (!slot) return;
    slot.quantity = slot.quantity -= 1;
    return slot.quantity;
  }
}
