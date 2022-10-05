import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public unitPrice: number;

  @IsNumber()
  @IsNotEmpty()
  public quantity: number;
}
