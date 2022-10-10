import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MaintainersModule } from './maintainers/maintainers.module';
import { PaymentsModule } from './payments/payments.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SlotsModule } from './slots/slots.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        MAX_SLOTS: Joi.string().required(),
        MAX_ITEMS_PER_SLOT: Joi.number().required(),
        ALLOWED_DENOMINATIONS: Joi.string().required(),
      }),
    }),
    ItemsModule,
    MaintainersModule,
    PaymentsModule,
    AnalyticsModule,
    SlotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
