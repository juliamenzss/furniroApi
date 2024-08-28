import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUrl, IsBoolean, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  longDescription?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  newProduct?: boolean;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateProductSkuDto)
  @ArrayNotEmpty()
  skus: CreateProductSkuDto[];
}

export class CreateProductSkuDto {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  colorId: string;

  @ApiProperty()
  @IsString()
  sizeId: string;

  @ApiProperty()
  @IsString()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  discountTag?: boolean;

  @IsString()
  id: any;
  discountPercentage: any;
  newProduct: any;
  image: any;
}
