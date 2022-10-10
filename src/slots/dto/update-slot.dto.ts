import { IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateSlotDto {
  @IsNumber()
  @IsNotEmpty()
  public unitPrice: number;
}
