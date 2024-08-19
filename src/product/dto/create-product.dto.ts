import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUrl, IsBoolean, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Url } from 'url';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  longDescription?: string;

  @IsOptional()
  @IsBoolean()
  newProduct?: boolean;

  @IsUrl()
  image: string;


  @ValidateNested({ each: true })
  @Type(() => CreateProductSkuDto)
  @ArrayNotEmpty()
  skus: CreateProductSkuDto[];
}

export class CreateProductSkuDto {
  @IsString()
  sku: string;

  @IsString()
  colorId: string;

  @IsOptional()
  @IsString()
  sizeId: string;

  @IsString()
  quantity: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discountPrice?: number;

  @IsOptional()
  @IsBoolean()
  discountTag?: boolean;
}
