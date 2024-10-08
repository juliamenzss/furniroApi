import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/modulePrisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        productSkus: {
          create: createProductDto.skus,
        },
      },
      include: { productSkus: true },
    });

    if (!product) {
      throw new NotFoundException(`Error creating product`);
    }
    return product;
  }

  async findAllSorted(
    page: number = 1,
    pageSize: number = 16,
    sortByName?: 'asc' | 'desc',
    sortByPrice?: 'asc' | 'desc',
  ) {
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    const skip = (pageNumber - 1) * pageSizeNumber;

    const queryOptions: any = {
      skip,
      take: pageSizeNumber,
      include: {
        productSkus: {
          select: {
            id: true,
            price: true,
            discountPrice: true,
          },
        },
      },
      orderBy: [],
    };

    if (sortByPrice) {
      queryOptions.orderBy.push({
        productSkus: {
          price: sortByPrice,
        },
      });
    }

    if (sortByName) {
      queryOptions.orderBy.push({ name: sortByName });
    }

    try {
      const [products, total] = await Promise.all([
        this.prisma.product.findMany(queryOptions),
        this.prisma.product.count(),
      ]);

      return {
        products,
        total,
        pageNumber,
        pageSizeNumber,
        totalPages: Math.ceil(total / pageSizeNumber),
      };
    } catch (error) {
      throw new BadRequestException('Invalid request parameters.');
    }
  }

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        productSkus: {
          include: {
            color: true,
            size: true,
          },
          orderBy: [],
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found!`);
    }
    const total = await this.prisma.product.count();
    return {
      product,
      total,
    };
  }

  async getProductSkuById(id: string) {
    const productSku = await this.prisma.productSku.findUnique({
      where: { id },
      include: {
        color: true,
        size: true,
      },
    });

    if (!productSku) {
      throw new NotFoundException(`ID ${id} not found!`);
    }
    return productSku;
  }

  async findByName(name: string) {
    const trimmedName = name.trim();
    const product = await this.prisma.product.findFirst({
      where: {
        name: {
          equals: trimmedName,
          mode: 'insensitive',
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Product not found!`);
    }
    return product;
  }

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
              discountPrice: sku.discountPrice,
              quantity: sku.quantity,
              discountPercentage: sku.discountPercentage,
              newProduct: sku.newProduct,
              image: sku.image,
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

  async deleteProduct(id: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.prisma.productSku.deleteMany({
      where: { productId: id },
    });

    await this.prisma.product.delete({
      where: { id },
    });
  }

  async deleteSku(id: string): Promise<void> {
    const productSku = await this.prisma.productSku.delete({
      where: { id },
    });
    if (!productSku) {
      throw new NotFoundException('Product SKU not found');
    }
  }
}
