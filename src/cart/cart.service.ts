// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InsertCartDto } from './dto/insert-cart.dto';
// import { Cart } from '@prisma/client';
// import { PrismaService } from 'src/modulePrisma/prisma.service';

// @Injectable()
// export class CartService {
//   constructor(private readonly prisma: PrismaService) {}

//   async verifyActiveCart(userId: string): Promise<Cart> {
//     const cart = await this.prisma.cart.findUnique({
//       where: {
//         userId,
//       },
//     });
//     if (!cart) {
//       throw new NotFoundException(`Cart active not found`);
//     }
//     return cart;
//   }

//   async createCart(userId: string): Promise<Cart> {
//     return this.prisma.cart.create({
//       data: {
//         active: true,
//         userId,
//       },
//     });
//   }

//   async insertProductInCart(
//     insertCartDto: InsertCartDto,
//     userId: string,
//   ): Promise<Cart> {
//     const cart = await this.verifyActiveCart(userId).catch(async () => {
//       return this.createCart(userId);
//     });
//     return cart;
//   }
// }



// //   findAll() {
// //     return `This action returns all cart`;
// //   }

// //   findOne(id: number) {
// //     return `This action returns a #${id} cart`;
// //   }

// //   update(id: number, updateCartDto: UpdateCartDto) {
// //     return `This action updates a #${id} cart`;
// //   }

// //   remove(id: number) {
// //     return `This action removes a #${id} cart`;
// //   }
// // }
