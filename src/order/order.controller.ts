import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@ApiTags('order')
@ApiBearerAuth()
@Controller('order')
@UseGuards(AuthGuard, RoleGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.User)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.orderService.create(createOrderDto, req);
  }

  @Roles(Role.User)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Roles(Role.User)
  @Get(':id')
  findOrderById(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Roles(Role.User)
  @Get('user/:userId')
  findOrderByUser(@Param('userId') userId: string) {
    return this.orderService.findOrderByUser(userId);
  }
}
