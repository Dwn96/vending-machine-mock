import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  controllers: [CoinsController],
  imports: [AppConfigModule],
  providers: [CoinsService],
})
export class CoinsModule {}
