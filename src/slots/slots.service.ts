import { Injectable, NotFoundException } from '@nestjs/common';
import MockItemsSlots from './data/slot.data';
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
    const slot = this.findOne(id);
    slot.unitPrice = updateSlotDto.unitPrice;
    return slot;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
