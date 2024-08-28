import { AuthController } from './auth.controller';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from 'src/modulePrisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';


@Module({
  imports: [JwtModule.register({
    secret: `iJ!P1kJu!fvNqx02VX:}Sx}£8i@732<0` 
  }),
  UserModule,
  PrismaModule
],
  exports:[AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {

}
