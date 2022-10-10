import { v4 as uuid } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import MockPaymentStore from './data/MockPaymentStore';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import MockItemsSlots from 'src/slots/data/slot.data';
import PaymentResponse from './dto/payment-res.dto';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class PaymentsService {
  constructor(private itemsService: ItemsService) {}
  create(createPaymentDto: CreatePaymentDto): PaymentResponse {
    const slot = MockItemsSlots.find(
      (slot) => slot.id === createPaymentDto.slotId,
    );
    if (!slot) {
      throw new NotFoundException(
        `Slot with id: ${createPaymentDto.slotId} couldn't be found`,
      );
    }
    if (slot.items.quantity < 1) {
      throw new BadRequestException(`Slot id: ${slot.id} is currently empty`);
    }
    const { items } = slot;
    const paidAmount = this.computeTotalPaidAmount(createPaymentDto);
    MockPaymentStore.push({ id: uuid(), amount: paidAmount, slotId: slot.id });

    if (paidAmount > items.unitPrice) {
      this.itemsService.decrementItemInSlot(slot.id);
      return {
        remainingAmount: 0,
        paymentComplete: true,
        change: paidAmount - items.unitPrice,
      };
    }

    const totalPayments = this.getPaymentsByItemId(slot.id);

    if (totalPayments > items.unitPrice || totalPayments === items.unitPrice) {
      const change = totalPayments - items.unitPrice;
      return {
        remainingAmount: 0,
        paymentComplete: true,
        change,
      };
    }

    return {
      paymentComplete: false,
      remainingAmount: items.unitPrice - totalPayments,
    };
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  getPaymentsByItemId(slotId: number) {
    return MockPaymentStore.filter(
      (payment) => payment.slotId === slotId,
    ).reduce((acc, pmt) => {
      return (acc += pmt.amount);
    }, 0);
  }

  computeTotalPaidAmount(payment: CreatePaymentDto): number {
    let amount = 0;

    if (payment.dollarCount > 0) {
      amount += payment.dollarCount * 100;
    }

    if (payment.halfDollarCount > 0) {
      amount += payment.halfDollarCount * 50;
    }

    if (payment.quarterCount > 0) {
      amount += payment.quarterCount * 25;
    }

    if (payment.dimeCount > 0) {
      amount += payment.dimeCount * 10;
    }

    if (payment.nickelCount > 0) {
      amount += payment.nickelCount * 5;
    }

    if (payment.pennyCount > 0) {
      amount += payment.pennyCount;
    }

    return amount / 100;
  }
}
