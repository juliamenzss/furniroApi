import { CreateUserDto } from "src/user/dto/create-user.dto";
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AuthRegisterDTO{
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
    password: string
}