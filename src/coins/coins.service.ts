import { Injectable } from '@nestjs/common';
import { MockCoinStore } from './data/MockCoinStore';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Injectable()
export class CoinsService {
  create(createCoinDto: CreateCoinDto) {
    return Object.assign(MockCoinStore, createCoinDto);
  }

  findAll() {
    return MockCoinStore;
  }

  findOne(id: number) {
    return `This action returns a #${id} coin`;
  }

  update({ ...updateCoinDto }) {
    return Object.assign(MockCoinStore, updateCoinDto);
  }

  remove() {
    return Object.values(MockCoinStore).forEach((v) => (MockCoinStore[v] = 0));
  }
}
