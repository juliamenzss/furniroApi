import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany()
  }

  async show(id: number) {

    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }


  async update(id: number, {email, name, password, role}: UpdateUserDto) {

    await this.exists(id);
  

    const data: any = {};

    if(email) {
      data.email = email;
    }

    if(name) {
      data.name = name;
    }

    if(password) {
      data.password = password;
    }

    if(role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data,
      where: {
        id
      }
    })
  }

  async delete(id: number) {

    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }

  async exists(id:number) {
    if(!(await this.prisma.user.count({
      where: {
        id
      }
    }))) {
      throw new NotFoundException(`User ${id} not found.`)
    }
  }
}
