import { IsNumber, IsOptional } from 'class-validator';
export class UpdateSlotDto {
  @IsNumber()
  @IsOptional()
  public unitPrice?: number;

  @IsNumber()
  @IsOptional()
  public quantity?: number;
}
