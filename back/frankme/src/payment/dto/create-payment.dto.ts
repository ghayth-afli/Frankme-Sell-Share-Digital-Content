import { IsNotEmpty, IsPositive, IsUrl } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsPositive()
  amount: number;
  @IsNotEmpty()
  @IsUrl()
  originUrl: string;
}
