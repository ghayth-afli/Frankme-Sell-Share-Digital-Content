import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from './service/download.service';
import { MyBASE_URL, S3_URL_Bucket } from '../../config/config';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  paymentId: string;
  linkId: string;
  asset: {
    fileName: string;
    price: number;
    seller: string;
    type: string;
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private downloadService: DownloadService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      let id = params.get('id');
      if (id !== null) {
        this.linkId = id;
        this.downloadService.getFile(id).subscribe((data) => {
          console.log(data);
          this.asset = data;
        });
      }
    });
    //query params to get payment_id
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        console.log(params);
        if (params['payment_id']) {
          console.log('Payment ID', params['payment_id']);
          this.paymentId = params['payment_id'];
        }
      },
      (error) => {
        console.error('Error getting query params', error);
      }
    );
  }

  paytodownload() {
    console.log('Paying for download');
    this.downloadService
      .payForFile({
        amount: this.asset.price,
        originUrl: MyBASE_URL + '/#/download/' + this.linkId,
      })
      .subscribe({
        next: (response: any) => {
          //console.log('Payment response', response);
          //window.location.href = response.data.result.link;
          this.document.location.href = response.response.result.link;
        },
        error: (error) => {
          console.error('Error during payment', error);
        },
      });
  }

  download() {
    console.log('Downloading');
    this.downloadService.downloadFile(this.linkId, this.paymentId).subscribe({
      next: (response: any) => {
        console.log('Download response', response);
        //this.document.location.href = response.response.result.link;
        this.document.location.href = S3_URL_Bucket + response.result;
      },
      error: (error) => {
        console.error('Error during download', error);
      },
    });
  }
}
