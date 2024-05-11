import { IsNotEmpty, IsString } from 'class-validator';

export class verifyPaymentDto {
  @IsNotEmpty()
  @IsString()
  paymentId: string;
}
