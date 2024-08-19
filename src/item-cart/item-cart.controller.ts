import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { CreateItemCartDto } from './dto/create-item-cart.dto';
import { UpdateItemCartDto } from './dto/update-item-cart.dto';

@Controller('item-cart')
export class ItemCartController {
  constructor(private readonly itemCartService: ItemCartService) {}

  @Post()
  create(@Body() createItemCartDto: CreateItemCartDto) {
    return this.itemCartService.create(createItemCartDto);
  }

  @Get()
  findAll() {
    return this.itemCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemCartDto: UpdateItemCartDto) {
    return this.itemCartService.update(+id, updateItemCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCartService.remove(+id);
  }
}
