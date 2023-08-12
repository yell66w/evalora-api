import { Inject, Injectable } from '@nestjs/common';
import { ICreatedUser, IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import constants from '@/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(constants.CONNECTIONS.USER)
    private userModel: Model<IUser>,
  ) {}

  async create(user: CreateUserDto): Promise<ICreatedUser> {
    const newUser = new this.userModel(user);
    const createdUser = await newUser.save();
    return {
      _id: createdUser._id,
      username: createdUser.username,
    };
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  async findOne(username: string, includes?: string[]): Promise<IUser | null> {
    return await this.userModel.findOne({ username }).select(includes);
  }

  async deleteOne(id: string): Promise<any | null> {
    return await this.userModel.deleteOne({ _id: id });
  }

  async deleteMany(ids: string[]): Promise<any | null> {
    if (ids.length < 0) return 'No user to delete';
    return await this.userModel.deleteMany({
      _id: {
        $in: ids,
      },
    });
  }
}
