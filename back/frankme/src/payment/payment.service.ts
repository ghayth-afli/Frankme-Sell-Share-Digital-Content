import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { verifyPaymentDto } from './dto/verify-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async pay(paymentDto: CreatePaymentDto) {
    const { amount, originUrl } = paymentDto;
    const payload = {
      app_token: this.configService.getOrThrow('APP_TOKEN'),
      app_secret: this.configService.getOrThrow('APP_SECRET'),
      amount,
      accept_card: 'true',
      session_timeout_secs: 1200,
      success_link: originUrl,
      fail_link: 'https://perfectmotherfuckingwebsite.com/',
      developer_tracking_id: this.configService.getOrThrow('DEV_TRACKING_ID'),
    };

    try {
      const paymentResponse = await this.httpService.axiosRef.post(
        'https://developers.flouci.com/api/generate_payment',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(paymentResponse.data);

      return await paymentResponse.data;
    } catch (error) {
      throw new BadRequestException(error.data.message);
    }
  }

  async verifyPayment(verifyPayment: verifyPaymentDto) {
    const { paymentId } = verifyPayment;
    const result = {
      isVerified: false,
    };
    try {
      const paymentVerificationResult = await this.httpService.axiosRef.get(
        `https://developers.flouci.com/api/verify_payment/${paymentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            apppublic: this.configService.getOrThrow('APP_TOKEN'),
            appsecret: this.configService.getOrThrow('APP_SECRET'),
          },
        },
      );

      const paymentData = await paymentVerificationResult.data;

      if (paymentData.result.status) {
        result.isVerified = true;
      }

      return result;
    } catch (error) {
      return result;
      // throw new BadRequestException(
      //   `Couldnt verify payment with id ${paymentId} `,
      // );
    }
  }
}
