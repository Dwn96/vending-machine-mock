import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { AppConfigModule } from 'src/config/config.module';
import { CoinsService } from 'src/coins/coins.service';
import { SlotsService } from 'src/slots/slots.service';

@Module({
  imports: [AppConfigModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, CoinsService, SlotsService],
})
export class PaymentsModule {}
