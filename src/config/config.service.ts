import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get MAX_SLOTS(): string {
    return this.configService.get<string>('MAX_SLOTS');
  }

  get MAX_ITEMS_PER_SLOT(): string {
    return this.configService.get<string>('MAX_ITEMS_PER_SLOT');
  }

  get ALLOWED_DENOMINATIONS(): string[] {
    return this.configService.get<string>('ALLOWED_DENOMINATIONS').split(',');
  }
}
