import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 45, { message: 'Name must be between 3 and 45 characters long' })
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}