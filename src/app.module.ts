import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env', '.env.staging', '.env.prod'],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(appConfig().databaseUri),
    ProductsModule,
  ],
  controllers: [ProductsController],
  providers: [],
})
export class AppModule {}
