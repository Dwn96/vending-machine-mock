import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ItemsService } from 'src/items/items.service';
import { AppConfigModule } from 'src/config/config.module';
import { CoinsService } from 'src/coins/coins.service';

@Module({
  imports: [AppConfigModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, ItemsService, CoinsService],
})
export class PaymentsModule {}
