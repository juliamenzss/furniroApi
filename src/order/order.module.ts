import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/modulePrisma/prisma.service';

@Module({
  exports: [PrismaService],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
