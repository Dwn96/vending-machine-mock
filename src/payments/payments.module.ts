import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ItemsService } from 'src/items/items.service';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';

@Module({
  imports: [AppConfigModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, ItemsService],
})
export class PaymentsModule {}
