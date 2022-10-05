import { Injectable } from '@nestjs/common';
import MockItemStore from './data/Item.data';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  create(createItemDto: CreateItemDto) {
    return MockItemStore.push(createItemDto);
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
}
