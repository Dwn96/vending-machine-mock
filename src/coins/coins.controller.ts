import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Post()
  create(@Body() createCoinDto: CreateCoinDto) {
    return this.coinsService.create(createCoinDto);
  }

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Patch()
  update(@Body() updateCoinDto: UpdateCoinDto) {
    return this.coinsService.update(updateCoinDto);
  }

  @Delete()
  remove() {
    return this.coinsService.remove();
  }
}
