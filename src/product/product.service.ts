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
  constructor(private readonly prisma: PrismaService) {}

  @Roles(Role.Admin)
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

  async findAll(page: number = 1, pageSize: number = 16) {
    pageSize = Math.min(pageSize, 16);
    const skip = (page - 1) * pageSize;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: pageSize,
        include: { productSkus: {
          orderBy: [],
        } },
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
      console.error('Error in findAllSorted:', error);
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
          orderBy: [] 
        }
      }
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found!`);
    }
    const total = await this.prisma.product.count(); 
    return {
      product,
      total
    };
  }
  
  @Roles(Role.Admin)
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

  // @Roles(Role.Admin)
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

  // @Roles(Role.Admin)
  async deleteSku(id: string): Promise<void> {
    const productSku = await this.prisma.productSku.delete({
      where: { id },
    });
    if (!productSku) {
      throw new NotFoundException('Product SKU not found');
    }
  }
}
