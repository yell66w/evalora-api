import appConfig from '@/config/app.config';
import constants from '@/constants';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: constants.CONNECTIONS.DATABASE,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(appConfig().databaseUri),
  },
];
