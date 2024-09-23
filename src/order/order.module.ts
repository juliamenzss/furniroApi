import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/modulePrisma/prisma.service';
import { PrismaModule } from 'src/modulePrisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [PrismaModule, forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  exports: [forwardRef(() => OrderModule)],
})
export class OrderModule {}
