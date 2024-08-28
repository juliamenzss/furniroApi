import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/modulePrisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(  private readonly prisma: PrismaService,
  ) {}

  async create(createOrderDto: any) {
    const { products, ...orderData } = createOrderDto;

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
          orderProducts: {
            create: products.map(product => ({
              productId: product.productId,
              quantity: product.quantity,
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

  async exists(id: string): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }
}
