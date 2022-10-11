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
import Denomination from './entities/Denominations';
import { AppConfigService } from 'src/config/config.service';
import { CoinsService } from 'src/coins/coins.service';
import * as _ from 'lodash';
import { SlotsService } from 'src/slots/slots.service';

@Injectable()
export class PaymentsService {
  constructor(
    private configService: AppConfigService,
    private coinService: CoinsService,
    private slotService: SlotsService,
  ) {}
  create(createPaymentDto: CreatePaymentDto): PaymentResponse {
    const slot = MockItemsSlots.find(
      (slot) => slot.id === createPaymentDto.slotId,
    );
    if (!slot) {
      throw new NotFoundException(
        `Slot with id: ${createPaymentDto.slotId} couldn't be found`,
      );
    }
    if (slot.quantity < 1) {
      throw new BadRequestException(`Slot id: ${slot.id} is currently empty`);
    }
    const unitPrice = slot.unitPrice;
    const { amount, valid, invalidDenominations } =
      this.computeAndValidatePayment(createPaymentDto);
    if (!valid) {
      throw new BadRequestException(
        `Your payment could not be accepted because the system does not permit the following denominations: ${invalidDenominations.join(
          ',',
        )}`,
      );
    }
    MockPaymentStore.push({ id: uuid(), amount, slotId: slot.id });

    if (amount > unitPrice) {
      this.slotService.decrementItemInSlot(slot.id);
      MockPaymentStore.length = 0;
      return {
        remainingAmount: 0,
        paymentComplete: true,
        change: amount - unitPrice,
      };
    }

    const totalPayments = this.getPaymentsByItemId(slot.id);

    if (totalPayments > unitPrice || totalPayments === unitPrice) {
      this.slotService.decrementItemInSlot(slot.id);
      MockPaymentStore.length = 0;
      const change = totalPayments - slot.unitPrice;
      return {
        remainingAmount: 0,
        paymentComplete: true,
        change,
      };
    }

    return {
      paymentComplete: false,
      remainingAmount: unitPrice - totalPayments,
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

  computeAndValidatePayment(payment: CreatePaymentDto): {
    amount: number;
    valid: boolean;
    invalidDenominations: string[];
  } {
    let amount = 0;
    let valid = true;
    let invalidDenominations = [];

    if (payment.dollarCount > 0) {
      const res = this.validatePayment(
        Denomination.Dollar,
        payment.dollarCount,
      );
      valid = res.valid;
      invalidDenominations = res.invalidDenominations;
      amount += payment.dollarCount * 100;
    }

    if (payment.halfDollarCount > 0) {
      const res = this.validatePayment(
        Denomination.HalfDollar,
        payment.halfDollarCount,
      );
      valid = res.valid;
      invalidDenominations = res.invalidDenominations;
      amount += payment.halfDollarCount * 50;
    }

    if (payment.quarterCount > 0) {
      const res = this.validatePayment(
        Denomination.Quarter,
        payment.quarterCount,
      );
      valid = res.valid;
      invalidDenominations = res.invalidDenominations;
      amount += payment.quarterCount * 25;
    }

    if (payment.dimeCount > 0) {
      const res = this.validatePayment(Denomination.Dime, payment.dimeCount);
      valid = res.valid;
      invalidDenominations = res.invalidDenominations;
      amount += payment.dimeCount * 10;
    }

    if (payment.nickelCount > 0) {
      const res = this.validatePayment(
        Denomination.Nickel,
        payment.nickelCount,
      );
      valid = res.valid;
      invalidDenominations = res.invalidDenominations;
      amount += payment.nickelCount * 5;
    }

    if (payment.pennyCount > 0) {
      const res = this.validatePayment(Denomination.Penny, payment.pennyCount);
      valid = res.valid;
      invalidDenominations = res.invalidDenominations;
      amount += payment.pennyCount;
    }

    return {
      amount: amount / 100,
      valid,
      invalidDenominations,
    };
  }

  validatePayment(context: string, value: number) {
    this.coinService.incrementCoinStore(_.camelCase(context) as any, value);
    const acceptedDenominations = this.configService.ALLOWED_DENOMINATIONS;
    const invalidDenominations: string[] = [];
    const valid = acceptedDenominations.some(
      (denomination) => denomination.toUpperCase() === context,
    );

    if (!valid) {
      invalidDenominations.push(context);
    }
    return {
      valid,
      invalidDenominations,
    };
  }
}
