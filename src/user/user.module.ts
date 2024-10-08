import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/modulePrisma/prisma.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { AuthModule } from "src/auth/auth.module";
import { AuthGuard } from "src/guards/auth.guard";

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule),],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({
        path: 'users/:id',
        method: RequestMethod.ALL,
      });
  }
}
