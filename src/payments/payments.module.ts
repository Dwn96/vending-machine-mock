import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ItemsService } from 'src/items/items.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, ItemsService],
})
export class PaymentsModule {}
