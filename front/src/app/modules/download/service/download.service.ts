import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../config/config';
import { Asset } from '../models/asset';
import { Payment } from '../models/payment';

@Injectable()
export class DownloadService {
  constructor(private http: HttpClient) {}

  getFile(id: string) {
    return this.http.get<Asset>(API_BASE_URL + `/links/download/${id}`);
  }

  payForFile(payment: Payment) {
    return this.http.post(API_BASE_URL + '/payment', payment);
  }

  downloadFile(linkId: string, paymentId: string) {
    return this.http.get(API_BASE_URL + `/links/download/${linkId}`, {
      params: {
        payment_id: paymentId,
      },
    });
  }
}
