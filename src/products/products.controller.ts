import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from './interfaces/product.interface';
import { ProductsService } from './products.service';
import { ListProductsDto } from './dto/list-products.dto';
import { UpdateProductDto } from './dto/update-product.dto copy';
import { GetByIdProductParams } from './dto/get-by-id-product-params';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: ListProductsDto): Promise<IProduct[]> {
    try {
      return this.productsService.findAll(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    try {
      return this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Put(':id')
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Param() params: GetByIdProductParams,
  ): Promise<IProduct> {
    try {
      return this.productsService.update(params.id, updateProductDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(
    @Body() updateProductDto: UpdateProductDto,
    @Param() params: GetByIdProductParams,
  ): Promise<IProduct> {
    try {
      return this.productsService.delete(params.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
