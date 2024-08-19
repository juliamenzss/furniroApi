import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { generateSKU } from '../generateSKU'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        productSkus: {
          create: createProductDto.skus,
        },
      },
    });
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

  async findAllSorted(page: number = 1, pageSize: number = 16,   sortByName?: 'asc' | 'desc',
    sortByPrice?: 'asc' | 'desc') {
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
    ])
    return {
      products,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total/pageSize),
    };

  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
