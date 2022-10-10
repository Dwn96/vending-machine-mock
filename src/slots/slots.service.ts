import { Injectable, NotFoundException } from '@nestjs/common';
import MockItemsSlots from './data/slot.data';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Injectable()
export class SlotsService {
  findAll() {
    return MockItemsSlots;
  }

  findOne(slotId: number) {
    const res = MockItemsSlots.find((slot) => slot.id === slotId);
    if (!res) throw new NotFoundException(`Slot ${slotId} not found`);
    return res;
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
