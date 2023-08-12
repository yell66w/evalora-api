import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
