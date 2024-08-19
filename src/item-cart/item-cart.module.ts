import { Module } from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { ItemCartController } from './item-cart.controller';

@Module({
  controllers: [ItemCartController],
  providers: [ItemCartService],
})
export class ItemCartModule {}
