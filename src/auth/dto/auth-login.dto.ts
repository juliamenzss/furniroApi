import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, Length } from "class-validator";

export class AuthLoginDTO {

  @ApiProperty({required: true})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsString()
  @Length(6, 30, { message: 'The password must be between 6 and 30 characters long.' })
  password: string;
}