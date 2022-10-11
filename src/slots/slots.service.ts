import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppConfigService } from 'src/config/config.service';
import MockItemsSlots from './data/slot.data';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Injectable()
export class SlotsService {
  constructor(private configService: AppConfigService) {}
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
    if (updateSlotDto.unitPrice > 0) {
      slot.unitPrice = updateSlotDto.unitPrice;
    }
    if (updateSlotDto.quantity !== undefined) {
      if (updateSlotDto.quantity > this.configService.MAX_ITEMS_PER_SLOT) {
        throw new BadRequestException(
          `Quantity ${updateSlotDto.quantity} exceeded maximum allowed quantity per slot ${this.configService.MAX_ITEMS_PER_SLOT}`,
        );
      }
      slot.quantity = updateSlotDto.quantity;
    }
    return slot;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }

  decrementItemInSlot(slotId: number) {
    const slot = MockItemsSlots.find((slot) => slot.id === slotId);
    if (!slot) return;
    slot.quantity = slot.quantity -= 1;
    return slot.quantity;
  }
}
