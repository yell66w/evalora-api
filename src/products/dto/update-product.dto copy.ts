import {
  IsArray,
  IsDecimal,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  productCode: string;

  @IsOptional()
  @MaxLength(40)
  name: string;

  @IsOptional()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  price: string | number;

  @IsOptional()
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
