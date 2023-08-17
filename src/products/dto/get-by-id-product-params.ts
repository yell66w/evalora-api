import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetByIdProductParams {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
