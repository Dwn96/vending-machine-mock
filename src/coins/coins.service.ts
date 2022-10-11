import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MockCoinStore } from './data/MockCoinStore';
import { CreateCoinDto } from './dto/create-coin.dto';
import { AppConfigService } from 'src/config/config.service';
import CoinMap from './coins.map';
import { Coin } from '../coins/entities/coin.entity';

@Injectable()
export class CoinsService {
  constructor(private configService: AppConfigService) {}
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

  incrementCoinStore(denominationKey: keyof Coin, value: number) {
    MockCoinStore[denominationKey + 'Count'] += value;
  }

  decrementCoinStore(denominationKey: keyof Coin, value: number) {
    if (value > MockCoinStore[denominationKey]) {
      throw new InternalServerErrorException(
        `Your payment couldn't be accepted.Run out of ${denominationKey}`,
      );
    }
    Coin[denominationKey] - value;
  }

  computeDenominationValue(targetChange: number) {
    const acceptedDenominations = this.configService.ALLOWED_DENOMINATIONS;
    const coins = acceptedDenominations.map((denom) => CoinMap.get(denom));
    return this.computeChangeDenominationsHelper(coins, targetChange);
  }

  computeChangeDenominationsHelper(coins, amount) {
    if (amount === 0) {
      return 0;
    }
    let minCount = Number.MAX_VALUE;
    for (let i = 0; i < coins.length; i++) {
      if (coins[i] <= amount) {
        const currentCount = this.computeChangeDenominationsHelper(
          coins,
          amount - coins[i],
        );
        if (currentCount != Number.MAX_VALUE && currentCount + 1 < minCount) {
          minCount = currentCount + 1;
        }
      }
      if (minCount === Number.MAX_VALUE) {
        return -1;
      }
    }
    return minCount;
  }
}
