import { ICreatedUser, IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<ICreatedUser> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<any | null> {
    return this.usersService.deleteOne(id);
  }
}
