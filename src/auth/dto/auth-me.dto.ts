import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class AuthMeDTO {

  @ApiProperty({required: true})
  @IsJWT()
  token: string;

}