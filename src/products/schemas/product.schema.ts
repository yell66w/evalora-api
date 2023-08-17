import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import getPrice from '../utils/get-price';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  toJSON: {
    getters: true,
  },
})
export class Product {
  @Prop({ required: true, unique: true })
  productCode: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Decimal128,
    get: getPrice,
  })
  price: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  sizes: string[];

  @Prop()
  colors: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
