import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly productCode: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly description?: string;
  readonly sizes?: string[];
  readonly colors?: string[];
}

export enum IProductSizes {
  S,
  M,
  L,
  XL,
  XXL,
}
