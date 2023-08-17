import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ListProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minQty?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxQty?: number;
}
