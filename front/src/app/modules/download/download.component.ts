import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from './service/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  asset: {
    fileName: string;
    price: number;
    seller: string;
    type: string;
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private downloadService: DownloadService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      let id = params.get('id');
      if (id !== null) {
        this.downloadService.getFile(id).subscribe((data) => {
          console.log(data);
          this.asset = data;
        });
      }
    });
  }
  paytodownload() {
    console.log('pay to download');
  }
}
