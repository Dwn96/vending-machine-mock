import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  public amount: number;
  @IsNotEmpty()
  @IsString()
  public itemId: string;
}
