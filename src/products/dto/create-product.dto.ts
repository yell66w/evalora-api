import {
  IsArray,
  IsDecimal,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  price: string | number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsOptional()
  @IsArray()
  @IsIn(['S', 'M', 'L', 'XL', 'XXL'], {
    each: true,
  })
  sizes: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors: string;
}
