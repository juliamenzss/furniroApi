import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // @UseInterceptors(LogInterceptor)
  
  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
  
  @Roles(Role.Admin)
  @Get()
  async list() {
    return this.userService.list()
  }

  @Roles(Role.Admin)
  @Get(':id')
  async show(@ParamId() id: number) {
    return this.userService.show(id)
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(
    @Body() data: UpdateUserDto,
    @ParamId() id: number,
  ) {
    return this.userService.update(id, data)
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
