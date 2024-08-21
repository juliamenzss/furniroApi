import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({ type: CreateProductDto })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('sorted')
  async getSortedProducts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 16,
    @Query('sortByName') sortByName: 'asc' | 'desc',
    @Query('sortByPrice') sortByPrice: 'asc' | 'desc'
  ) {
    return this.productService.findAllSorted(page, pageSize, sortByName, sortByPrice);
  }
  

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get('sku/:id')
  getProductSkuById(@Param('id') id: string) {
    return this.productService.getProductSkuById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  deleteSku(@Param('id') id: string) {
    return this.productService.deleteSku(id);
  }


  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    const product =  await this.productService.deleteProduct(id);
    if (!product) {
      throw new BadRequestException(`Product not found`);
    }
  }
}
