import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';
import { DownloadService } from './service/download.service';

@NgModule({
  declarations: [DownloadComponent],
  imports: [CommonModule, DownloadRoutingModule],
  providers: [DownloadService],
})
export class DownloadModule {}
