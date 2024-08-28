import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({ type: CreateProductDto })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // @Get()
  // async findAllFilter(
  //   @Query('page') page: number = 1,
  //   @Query('pageSize') pageSize: number = 16,
  // ) {
  //   return this.productService.findAll(page, pageSize);
  // }
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 16 })
  @ApiQuery({ name: 'sortByName', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'sortByPrice', required: false, enum: ['asc', 'desc'] })
  @Get('sorted')
  async getSortedProducts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 16,
    @Query('sortByName') sortByName?: 'asc' | 'desc',
    @Query('sortByPrice') sortByPrice?: 'asc' | 'desc',
  ) {
    return this.productService.findAllSorted(
      page,
      pageSize,
      sortByName,
      sortByPrice,
    );
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const { product, total } = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }
    return {
      product, total, };
  }

  @Get('sku/:id')
  async getProductSkuById(@Param('id') id: string) {
    const product = this.productService.getProductSkuById(id);
    if (!product) {
      throw new NotFoundException(`Product with SKU ID ${id} not found`);
    }
    return product;
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(
      id,
      updateProductDto,
    );
    if (!product) {
      throw new NotFoundException(`Product with ID ${id}not found`);
    }
    return product;
  }

  // @Roles(Role.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  // @Roles(Role.Admin)
  @Delete('sku/:id')
  async deleteSku(@Param('id') id: string): Promise<void> {
    await this.productService.deleteSku(id);
  }
}
