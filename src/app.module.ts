import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ItemCartModule } from './item-cart/item-cart.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, CartModule, ItemCartModule],
  controllers: [],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
