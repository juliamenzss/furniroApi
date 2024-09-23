import { BadRequestException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/modulePrisma/prisma.service';
import { Order } from '@prisma/client';
import { identity } from 'rxjs';



@Injectable()
export class OrderService {
  constructor(  private readonly prisma: PrismaService,
  ) {}

// async createOrder(createOrderDto: any, userId: string): Promise<any> {
//   const { products, ...orderData } = createOrderDto;

//   for (const product of products as { productId: string; quantity: number }[]) {
//     const existingProductSku = await this.prisma.productSku.findUnique({
//       where: { id: product.productId },
//     });

//     if (!existingProductSku) {
//       throw new NotFoundException(`Product SKU ID ${product.productId} not found.`);
//     }
//   }
//     try {
//       const order = await this.prisma.order.create({
//         data: {
//           ...orderData,
//           userId,
//           orderProducts: {
//             create: products.map(product => ({
//               productId: product.productId,
//               quantity: product.quantity,
//             })),
//           },
//         },
//         include: {
//           orderProducts: true,
//         },
//       });
//         return order;
//       } catch (error) {
//             console.error(error); 
//             throw new BadRequestException(`Error creating order`);
//           }
// }

  async create(createOrderDto: any, @Req() req) {
    const { products, ...orderData } = createOrderDto;

    const userId = req.user?.id;

    if(!userId) {
      throw new UnauthorizedException("User not authenticated");
    }

    for (const product of products as { productId: string; quantity: number }[]) {
      const existingProductSku = await this.prisma.productSku.findUnique({
        where: { id: product.productId },
      });
  
      if (!existingProductSku) {
        throw new NotFoundException(`Product SKU ID ${product.productId} not found.`);
      }
    }
  
    try {
      const order = await this.prisma.order.create({
        data: {
          ...orderData,
          userId,
          orderProducts: {
            create: products.map(product => ({
              productId: product.productId,
              quantity: product.quantity|| 1,
            })),
          },
        },
        include: {
          orderProducts: true,
        },
      });
  
      return order;
    } catch (error) {
      console.error(error); 
      throw new BadRequestException(`Error creating order`);
    }
  }

  async findAll() {
    return this.prisma.order.findMany()
  }

  async findOne(id: string) {
    await this.exists(id);

    return this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  }


  async findOrderByUser(userId: string) {

     const order = await this.prisma.order.findMany({
      where: { userId: userId},
      include: {
        orderProducts: true,
      }
    });
    return order;
  }



  async exists(id: string): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }

}
