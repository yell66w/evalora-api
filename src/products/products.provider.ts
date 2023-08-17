import { Connection } from 'mongoose';
import { ProductSchema } from './schemas/product.schema';
import constants from '@/constants';

export const productsProvider = [
  {
    provide: constants.CONNECTIONS.PRODUCT,
    useFactory: (connection: Connection) =>
      connection.model('Product', ProductSchema),
    inject: [constants.CONNECTIONS.DATABASE],
  },
];
