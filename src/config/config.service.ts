import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get MAX_SLOTS(): number {
    return this.configService.get<number>('MAX_SLOTS');
  }

  get MAX_ITEMS_PER_SLOT(): number {
    return this.configService.get<number>('MAX_ITEMS_PER_SLOT');
  }

  get ALLOWED_DENOMINATIONS(): string[] {
    return this.configService.get<string>('ALLOWED_DENOMINATIONS').split(',');
  }
}
