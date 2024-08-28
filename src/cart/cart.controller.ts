// import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { CartService } from './cart.service';
// import { Cart } from '@prisma/client';
// import { InsertCartDto } from './dto/insert-cart.dto';
// import { User } from 'src/decorators/user.decorator';
// import { Role } from 'src/enums/role.enum';
// import { Roles } from 'src/decorators/roles.decorator';


// @ApiTags('Cart')
// // @Roles(Role.Admin, Role.User)
// @Controller('cart')
// export class ProductController {
//   constructor(private readonly cartService: CartService) {}
  
//   @ApiBody({ type: InsertCartDto })
//   @Post()
//   async createCart(@Body() insertCartDto: InsertCartDto, @User() userId: string ): Promise<Cart> {
//     return this.cartService.insertProduct(insertCartDto, userId)
//   }










  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }


  // @Get(':id')
  // async getProductById(@Param('id') id: string) {
  //   const product = await this.cartService.getProductById(id);
  //   if(!product) {
  //     throw new NotFoundException(`Product with ${id} not found`)
  //   }
  //   return product;
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   const product = await this.cartService.updateProduct(id, updateProductDto);
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${id}not found`);
  //   }
  //   return product;
  // }

  // @Delete(':id')
  // async deleteSku(@Param('id') id: string) {
  //   const product = await this.cartService.deleteSku(id);
  //   if(!product) {
  //     throw new NotFoundException(`Product SKU not found`)
  //   }
  //   return null;
  // }
// }
