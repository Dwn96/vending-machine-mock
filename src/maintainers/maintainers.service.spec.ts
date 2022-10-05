import { Test, TestingModule } from '@nestjs/testing';
import { MaintainersService } from './maintainers.service';

describe('MaintainersService', () => {
  let service: MaintainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintainersService],
    }).compile();

    service = module.get<MaintainersService>(MaintainersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
