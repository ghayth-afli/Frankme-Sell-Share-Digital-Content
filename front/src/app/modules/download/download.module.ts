import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';


@NgModule({
  declarations: [
    DownloadComponent
  ],
  imports: [
    CommonModule,
    DownloadRoutingModule
  ]
})
export class DownloadModule { }
