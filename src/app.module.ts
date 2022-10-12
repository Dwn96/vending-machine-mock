import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaintainersModule } from './maintainers/maintainers.module';
import { PaymentsModule } from './payments/payments.module';
import { SlotsModule } from './slots/slots.module';
import { ConfigModule } from '@nestjs/config';
import { CoinsModule } from './coins/coins.module';
import { ItemsModule } from './items/items.module';
import * as Joi from 'joi';
import Denomination from './payments/entities/Denominations';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        MAX_SLOTS: Joi.string().required(),
        MAX_ITEMS_PER_SLOT: Joi.number().required(),
        ALLOWED_DENOMINATIONS: Joi.string().custom((val, helper) => {
          const invalidValue = val
            .split(',')
            .filter(
              (el) => !Object.values(Denomination).includes(el.trim() as any),
            );
          if (invalidValue.length > 0) {
            return helper.message({
              custom: `Encountered invalid denomination configuration: ${invalidValue.join(
                ',',
              )}`,
            });
          }
          return true;
        }),
      }),
    }),
    MaintainersModule,
    PaymentsModule,
    SlotsModule,
    CoinsModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
