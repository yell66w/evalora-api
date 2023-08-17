import constants from '@/constants';
import {
  Inject,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductsDto } from './dto/list-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(constants.CONNECTIONS.PRODUCT)
    private productModel: Model<IProduct>,
  ) {}
  async findAll(query: ListProductsDto): Promise<IProduct[]> {
    return await this.productModel.find({
      quantity: {
        $gte: query.minQty || 0,
        ...(query.maxQty !== undefined && { $lte: query.maxQty }),
      },
    });
  }

  async create(product: CreateProductDto): Promise<IProduct> {
    try {
      const newProduct = await this.productModel.create(product);
      console.log({
        id: 'create-product-success',
        type: 'service',
        product,
        newProduct,
      });
      return newProduct;
    } catch (error) {
      console.log({
        id: 'create-product-error',
        type: 'service',
        product,
        error,
      });
      if (error.code === 11000) {
        throw new ConflictException('Product code already exists.');
      }
      throw new Error(error);
    }
  }

  async update(id: string, update: CreateProductDto): Promise<IProduct> {
    try {
      const newProduct = await this.productModel.findOneAndUpdate(
        { _id: id },
        update,
        { new: true },
      );
      console.log({
        id: 'update-product-success',
        type: 'service',
        updateId: id,
        update,
        newProduct,
      });
      return newProduct;
    } catch (error) {
      console.log({
        id: 'update-product-error',
        type: 'service',
        updateId: id,
        update,
        error,
      });
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IProduct> {
    try {
      const deletedProduct = await this.productModel
        .findOneAndDelete({
          _id: id,
        })
        .exec();

      if (!deletedProduct) {
        throw new Error('Product does not exists.');
      }
      console.log({
        id: 'delete-product-success',
        type: 'service',
        deleteId: id,
        deletedProduct,
      });
      return deletedProduct;
    } catch (error) {
      console.log({
        id: 'delete-product-error',
        type: 'service',
        deleteId: id,
        error,
      });
      if (error.message === 'Product does not exists.') {
        throw new NotFoundException();
      }
      throw new Error(error);
    }
  }
}
