import { Module } from '@nestjs/common';
import { MaintainersService } from './maintainers.service';
import { MaintainersController } from './maintainers.controller';

@Module({
  controllers: [MaintainersController],
  providers: [MaintainersService]
})
export class MaintainersModule {}
