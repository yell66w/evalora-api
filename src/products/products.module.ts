import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productsProvider } from './products.provider';
import { DatabaseModule } from '@/database/database.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProvider],
  exports: [ProductsService],
})
export class ProductsModule {}
