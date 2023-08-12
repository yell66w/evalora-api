import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { usersProviders } from './users.provider';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
