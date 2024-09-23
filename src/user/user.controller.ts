import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { User as PrismaUser} from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Roles(Role.User)
  @Get()
  async list() {
    return this.userService.findAll();
  }

  @Roles(Role.User)
  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async show(@ParamId() id: string) {
    return this.userService.findOne(id);
  }


  @Roles(Role.Admin)
  @Patch(':id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async update(
    @Body() data: UpdateUserDto,
    @ParamId('id') id: string, 
    @User() authenticatedUser: PrismaUser,
  ): Promise<PrismaUser> {

    if (authenticatedUser.id !== id) {
      throw new UnauthorizedException()
    }

    const user = await this.userService.update(id, data);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async remove(@ParamId('id') id: string): Promise<void> {
    const user = this.userService.remove(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
  }
}