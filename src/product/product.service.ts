import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/modulePrisma/prisma.service';
import { Product } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  @Roles(Role.Admin)
  async create(createProductDto: CreateProductDto) {
    const product = this.prisma.product.create({
      data: {
        ...createProductDto,
        productSkus: {
          create: createProductDto.skus,
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Error creating product`);
    }
    return product;
  }

  async findAll(page: number = 1, pageSize: number = 16) {
    const skip = (page - 1) * pageSize;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: pageSize,
        include: { productSkus: true },
      }),
      this.prisma.product.count(),
    ]);

    return {
      products,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findAllSorted(
    page: number = 1,
    pageSize: number = 16,
    sortByName?: 'asc' | 'desc',
    sortByPrice?: 'asc' | 'desc',
  ) {
    const skip = (page - 1) * pageSize;

    const orderBy = [];
    if (sortByName) orderBy.push({ name: sortByName });
    if (sortByPrice) orderBy.push({ price: sortByPrice });

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: pageSize,
        include: { productSkus: true },
        orderBy,
      }),
      this.prisma.product.count(),
    ]);
    return {
      products,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  @Roles(Role.Admin)
  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`ID ${id} not found!`);
    }
    return product;
  }

  @Roles(Role.Admin)
  async getProductSkuById(id: string) {
    const productSku = await this.prisma.productSku.findUnique({
      where: { id },
    });
    if (!productSku) {
      throw new NotFoundException(`ID ${id} not found!`);
    }
    return productSku;
  }

  @Roles(Role.Admin)
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const { skus, ...productData } = updateProductDto;

      const productSkusData = skus
        ? skus.map((sku) => ({
            where: { id: sku.id },
            update: {
              price: sku.price,
              colorId: sku.colorId,
              sizeId: sku.sizeId,
            },
            create: {
              ...sku,
            },
          }))
        : [];

      const product = await this.prisma.product.update({
        where: { id },
        data: {
          ...productData,
          productSkus: {
            upsert: productSkusData,
          },
        },
      });

      return product;
    } catch (e) {
      throw new BadRequestException(`Error update product`);
    }
  }

  @Roles(Role.Admin)
  async deleteSku(id: string) {
    const productSku = await this.prisma.productSku.delete({
      where: { id },
    });
    return productSku;
  }

  @Roles(Role.Admin)
  async deleteProduct(id: string) {
    const product = await this.prisma.product.delete({
      where: { id },
    });
    return product;
  }
}
