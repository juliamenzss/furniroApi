import { PrismaService } from 'src/modulePrisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/enums/role.enum';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role ?? Role.User,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<any> {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, { email, name, password, role }: UpdateUserDto) {
    await this.exists(id);

    const data: Partial<UpdateUserDto> = {};

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
