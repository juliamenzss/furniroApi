import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, ValidateNested } from "class-validator";

class OrderProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string; 
  
    @ApiProperty()
    @IsNotEmpty()
    quantity: number;
  }

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 45, { message: 'Name must be between 3 and 45 characters long' })
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 45, { message: 'Name must be between 3 and 45 characters long' })
    lastName: string;
  
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP must be in the format 12345-678 or 12345678' })
    zipCode: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    region: string;
  
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    town: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    province: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    addOnAddress?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    addInformation?: string;
  
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    total: number;

    @ApiProperty({ type: [OrderProductDto] })
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    products: OrderProductDto[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    payment: string;
}
