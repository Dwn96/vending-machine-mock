import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import MockPaymentStore from './data/MockPaymentStore';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import MockItemStore from 'src/items/data/Item.data';

@Injectable()
export class PaymentsService {
  create(createPaymentDto: CreatePaymentDto) {
    const item = MockItemStore.find(
      (item) => item.id === createPaymentDto.itemId,
    );
    if (!item) {
      throw new NotFoundException(
        `Item with id: ${createPaymentDto.itemId} couldn't be found`,
      );
    }

    if (createPaymentDto.amount > item.unitPrice) {
      const res = {
        id: uuid(),
        ...createPaymentDto,
        topUpAmount: 0,
        paymentComplete: true,
        change: createPaymentDto.amount - item.unitPrice,
      };
      return res;
    }

    MockPaymentStore.push({ id: uuid(), ...createPaymentDto });

    const totalPayments = this.getPaymentsByItemId(createPaymentDto.itemId);

    if (totalPayments > item.unitPrice || totalPayments === item.unitPrice) {
      const change = totalPayments - item.unitPrice;
      const res = {
        id: uuid(),
        ...createPaymentDto,
        topUpAmount: 0,
        paymentComplete: true,
        change: undefined,
      };

      if (change > 0) {
        res.change = change;
      }
      return res;
    }

    return {
      id: uuid(),
      ...createPaymentDto,
      paymentComplete: false,
      topUpAmount: item.unitPrice - totalPayments,
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

  getPaymentsByItemId(itemId: string) {
    return MockPaymentStore.filter(
      (payment) => payment.itemId === itemId,
    ).reduce((acc, pmt) => {
      return (acc += pmt.amount);
    }, 0);
  }
}
