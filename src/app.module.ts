import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
