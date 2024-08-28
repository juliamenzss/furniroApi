import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  async list() {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async show(@ParamId() id: string) {
    return this.userService.findOne(id);
  }

  // @Roles(Role.Admin)
  @Patch(':id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async update(
    @Body() data: UpdateUserDto,
    @ParamId('id') id: string,
  ): Promise<User> {
    const user = this.userService.update(id, data);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
  // @Roles(Role.Admin)
  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async remove(@ParamId('id') id: string): Promise<void> {
    const user = this.userService.remove(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
  }
}