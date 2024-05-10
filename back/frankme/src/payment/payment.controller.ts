import { Body, Controller, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('')
  async createPayment(@Body() payment: CreatePaymentDto, @Res() res: Response) {
    const response = await this.paymentService.pay(payment);

    res.json({ response });
  }
}
