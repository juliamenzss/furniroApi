import { Injectable } from '@nestjs/common';
import { CreateItemCartDto } from './dto/create-item-cart.dto';
import { UpdateItemCartDto } from './dto/update-item-cart.dto';

@Injectable()
export class ItemCartService {
  create(createItemCartDto: CreateItemCartDto) {
    return 'This action adds a new itemCart';
  }

  findAll() {
    return `This action returns all itemCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemCart`;
  }

  update(id: number, updateItemCartDto: UpdateItemCartDto) {
    return `This action updates a #${id} itemCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemCart`;
  }
}
