import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaintainersService } from './maintainers.service';
import { CreateMaintainerDto } from './dto/create-maintainer.dto';
import { UpdateMaintainerDto } from './dto/update-maintainer.dto';

@Controller('maintainers')
export class MaintainersController {
  constructor(private readonly maintainersService: MaintainersService) {}

  @Post()
  create(@Body() createMaintainerDto: CreateMaintainerDto) {
    return this.maintainersService.create(createMaintainerDto);
  }

  @Get()
  findAll() {
    return this.maintainersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintainersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaintainerDto: UpdateMaintainerDto) {
    return this.maintainersService.update(+id, updateMaintainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintainersService.remove(+id);
  }
}
