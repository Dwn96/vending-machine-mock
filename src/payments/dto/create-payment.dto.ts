import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  public slotId: number;

  @IsNumber()
  @IsNotEmpty()
  public dollarCount: number;

  @IsNumber()
  @IsNotEmpty()
  public halfDollarCount: number;

  @IsNumber()
  @IsNotEmpty()
  public quarterCount: number;

  @IsNumber()
  @IsNotEmpty()
  public dimeCount: number;

  @IsNumber()
  @IsNotEmpty()
  public nickelCount: number;

  @IsNumber()
  @IsNotEmpty()
  public pennyCount: number;
}
