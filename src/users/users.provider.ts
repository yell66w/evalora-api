import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import constants from '@/constants';

export const usersProviders = [
  {
    provide: constants.CONNECTIONS.USER,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [constants.CONNECTIONS.DATABASE],
  },
];
