import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [AppConfigModule],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}
