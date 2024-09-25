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
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({ type: CreateProductDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 16 })
  @ApiQuery({ name: 'sortByName', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'sortByPrice', required: false, enum: ['asc', 'desc'] })
  @Get()
  async getSortedProducts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 16,
    @Query('sortByName') sortByName?: 'asc' | 'desc',
    @Query('sortByPrice') sortByPrice?: 'asc' | 'desc',
  ) {
    const pageSizeNumber = Number(pageSize);
    const validPageSizes = [4, 8, 12, 16];
    const effectivePageSize = validPageSizes.includes(pageSizeNumber) ? pageSizeNumber : 16;

    return this.productService.findAllSorted(
      page,
      effectivePageSize,
      sortByName,
      sortByPrice,
    );
  }


  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  @Get('id/:id')
  async getProductById(@Param('id') id: string) {
    const { product, total } = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }
    return { product, total };
  }
 

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  @Get('sku/:id')
  async getProductSkuById(@Param('id') id: string) {
    const product = await this.productService.getProductSkuById(id);
    if (!product) {
      throw new NotFoundException(`Product with SKU ID ${id} not found`);
    }
    return product;
  }

  @Get(':productName')
  async getProductByName(@Param('productName') productName: string) {

    const product = await this.productService.findByName(productName);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(id, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Delete('sku/:id')
  async deleteSku(@Param('id') id: string): Promise<void> {
    await this.productService.deleteSku(id);
  }
}
