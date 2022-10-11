import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  public slotId: number;

  @IsNumber()
  @IsOptional()
  public dollarCount: number;

  @IsNumber()
  @IsOptional()
  public halfDollarCount: number;

  @IsNumber()
  @IsOptional()
  public quarterCount: number;

  @IsNumber()
  @IsOptional()
  public dimeCount: number;

  @IsNumber()
  @IsOptional()
  public nickelCount: number;

  @IsNumber()
  @IsOptional()
  public pennyCount: number;
}
