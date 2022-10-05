import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MaintainersModule } from './maintainers/maintainers.module';

@Module({
  imports: [ItemsModule, MaintainersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
