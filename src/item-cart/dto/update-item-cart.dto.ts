import { PartialType } from '@nestjs/swagger';
import { CreateItemCartDto } from './create-item-cart.dto';

export class UpdateItemCartDto extends PartialType(CreateItemCartDto) {}
