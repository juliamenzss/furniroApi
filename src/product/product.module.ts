import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/modulePrisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule, forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  exports:[forwardRef(() => ProductModule)]
})
export class ProductModule {}
