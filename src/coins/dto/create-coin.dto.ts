import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCoinDto {
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
