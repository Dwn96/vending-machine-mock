import { Test, TestingModule } from '@nestjs/testing';
import { MaintainersController } from './maintainers.controller';
import { MaintainersService } from './maintainers.service';

describe('MaintainersController', () => {
  let controller: MaintainersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintainersController],
      providers: [MaintainersService],
    }).compile();

    controller = module.get<MaintainersController>(MaintainersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
