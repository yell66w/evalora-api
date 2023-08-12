import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly username: string;
  readonly password: string;
}

export interface ICreatedUser {
  readonly _id: string;
  readonly username: string;
}
