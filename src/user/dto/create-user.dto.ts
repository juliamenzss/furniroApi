import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDto {
  
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;


  @IsOptional()
  @IsEnum(Role)
  role: number;
}