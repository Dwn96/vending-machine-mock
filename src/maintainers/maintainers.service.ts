import { Injectable } from '@nestjs/common';
import { CreateMaintainerDto } from './dto/create-maintainer.dto';
import { UpdateMaintainerDto } from './dto/update-maintainer.dto';

@Injectable()
export class MaintainersService {
  create(createMaintainerDto: CreateMaintainerDto) {
    return 'This action adds a new maintainer';
  }

  findAll() {
    return `This action returns all maintainers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintainer`;
  }

  update(id: number, updateMaintainerDto: UpdateMaintainerDto) {
    return `This action updates a #${id} maintainer`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintainer`;
  }
}
