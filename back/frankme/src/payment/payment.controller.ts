import { Body, Controller, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Response } from 'express';
import { verifyPaymentDto } from './dto/verify-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('verify')
  async verifyPayment(@Body() paymentVerification: verifyPaymentDto) {
    const response =
      await this.paymentService.verifyPayment(paymentVerification);
    return response;
  }

  @Post('')
  async createPayment(@Body() payment: CreatePaymentDto, @Res() res: Response) {
    const response = await this.paymentService.pay(payment);

    res.json({ response });
  }
}
